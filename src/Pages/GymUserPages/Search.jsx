import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import GymCard from "../../components/Search/GymCard";
import SearchPanel from "../../components/Search/SearchPanel";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../../api/axios";
import GymCardSkeleton from "../../components/Skeletons/GymCardSkeleton";



const Search = () => {
  const [gymsToRender, setGymsToRender] = useState([]);
  const [displayedGyms, setDisplayedGyms] = useState([]);
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    distance: "",
    price: "",
    time: "",
    rating: "",
  });
  const [sort, setSort] = useState(""); // State for sorting criteria

  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  const params = {
    city: location,
    sort_by: sort, // Update to match the API sorting parameter
  };

console.log(gymsToRender);

  useEffect(() => {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          console.log(coordinates.latitude);
          console.log(coordinates.longitude);

        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []); 


  if (!coordinates) {
    params.latitude = coordinates.latitude ?? 18.630614;
    params.longitude = coordinates.longitude ?? 73.8152839;
    console.log("default location used");
    
  }

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["gyms", search, filters, location, sort],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await api.get("/gyms", { params: params });
        console.log(res);

        return res.data;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        console.log(lastPage);
        
        return undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const newGyms = data.pages.flatMap((page) => page.gyms);
      setGymsToRender(newGyms);
    }
  }, [data]);

  useEffect(() => {
    if (search) {
      const filteredGyms = gymsToRender.filter((gym) =>
        gym.gym_name.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedGyms(filteredGyms);
    } else {
      setDisplayedGyms(gymsToRender);
    }
  }, [search, gymsToRender]);

  useEffect(() => {
    if (search) {
      const filteredGyms = gymsToRender.filter((gym) =>
        gym.gym_name.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedGyms(filteredGyms);
    } else {
      setDisplayedGyms(gymsToRender);
    }
  }, [sort, gymsToRender]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handleSortChange = (sortCriteria) => {
    setSort(sortCriteria);
  };

  return (
    <div className="mx-6 mt-4 space-y-3">
      <SearchPanel
        onLocationChange={handleLocationChange}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange} // Pass the sort handler to navbar
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
        {isFetchingNextPage && <div><GymCardSkeleton/></div>}
      </div>
    </div>
  );
};

export default Search;