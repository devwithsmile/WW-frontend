import React, { useState, useEffect, lazy } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import "react-loading-skeleton/dist/skeleton.css";
import api from "../../api/axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const GymCard = lazy(() => import("../../components/Search/GymCard"));
const SearchPanel = lazy(() => import("../../components/Search/SearchPanel"));
const GymCardSkeleton = lazy(() =>
  import("../../components/Skeletons/GymCardSkeleton")
);

const Search = () => {
  const [gymsToRender, setGymsToRender] = useState([]);
  const [displayedGyms, setDisplayedGyms] = useState([]);
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("");

  const { ref, inView } = useInView({ triggerOnce: false });

  // Get user's current coordinates
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  // Fetch gyms based on available parameters
  const fetchGyms = async ({ pageParam = 1 }) => {
    const params = {};
    if (location) {
      params.city = location;
    }

    // Use coordinates as default if available
    if (coordinates.latitude && coordinates.longitude) {
      params.latitude = coordinates.latitude;
      params.longitude = coordinates.longitude;
    } else if (location) {
      params.city = location;
    }

    // Add sorting criteria if provided
    if (sort) {
      params.sort_by = sort;
    }

    // Include the page parameter
    params.page = pageParam;

    const res = await api.get("/gyms", { params });

    // Log total pages and current page number
    // console.log(`Total Pages: ${res.data.totalPages}, Current Page: ${pageParam}`);

    return res.data;
  };

  // Debounced search handler
  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  // Handle sort change
  const handleSortChange = (sortCriteria) => {
    if (
      sortCriteria === "distance" &&
      !coordinates.latitude &&
      !coordinates.longitude
    ) {
      toast.error("Please allow location  sort by distance.");
      return;
    }
    setSort(sortCriteria);
  };

  // Use React Query's useInfiniteQuery for API calls
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["gyms", search, sort, location, coordinates],
      queryFn: fetchGyms,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  // Fetch the next page when the inView component comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Update gyms to render when new data is fetched
  useEffect(() => {
    if (data) {
      const newGyms = data.pages.flatMap((page) => page.gyms);
      setGymsToRender(newGyms);
    }
  }, [data]);

  // Filter gyms based on the search input
  useEffect(() => {
    const filteredGyms = search
      ? gymsToRender.filter((gym) =>
          gym.gym_name.toLowerCase().includes(search.toLowerCase())
        )
      : gymsToRender;
    setDisplayedGyms(filteredGyms);
  }, [search, gymsToRender]);

  // Handle location change from the search panel
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  // Handle search input change from the search panel
  const handleSearchChange = (newSearch) => {
    debouncedSearch(newSearch);
  };

  return (
    <div className="mx-6 mt-4 space-y-3">
      <SearchPanel
        onLocationChange={handleLocationChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:px-6">
        {isLoading || gymsToRender.length === 0
          ? Array(6)
              .fill(null)
              .map((_, index) => <GymCardSkeleton key={index} />)
          : displayedGyms.map((gym) => (
              <GymCard
                key={gym._id}
                gymId={gym._id}
                gymName={gym.gym_name}
                imageSrc={gym.images[0]}
                rating={gym.average_rating}
              />
            ))}
        <div ref={ref} />
        {isFetchingNextPage && <GymCardSkeleton />}
      </div>
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Display error messages */}
    </div>
  );
};

export default Search;
