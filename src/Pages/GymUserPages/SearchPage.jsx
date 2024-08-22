import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import GymCard from '../../components/GymCard';
import api from '../../api/axios';
import SearchPageNavbar from '../../components/SearchPageNavbar';

const SearchPage = () => {
  const [gymsToRender, setGymsToRender] = useState([]);
  const [displayedGyms, setDisplayedGyms] = useState([]);
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ distance: '', price: '', time: '', rating: '' });
  const [sort, setSort] = useState(''); // State for sorting criteria

  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['gyms', search, filters, location, sort],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get('/gyms', {
        params: {
          page: pageParam,
          search,
          location,
          ...filters,
          sort_by: sort, // Update to match the API sorting parameter
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
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
      const newGyms = data.pages.flatMap(page => page.gyms);
      setGymsToRender(newGyms);
    }
  }, [data]);

  useEffect(() => {
    // Filter gyms based on search text
    if (search) {
      const filteredGyms = gymsToRender.filter(gym =>
        gym.gym_name.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedGyms(filteredGyms);
    } else {
      setDisplayedGyms(gymsToRender);
    }
  }, [search, gymsToRender]);

  useEffect(() => {
    // Re-apply search filter after sorting
    if (search) {
      const filteredGyms = gymsToRender.filter(gym =>
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
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handleSortChange = (sortCriteria) => {
    setSort(sortCriteria);
  };

  return (
    <>
      <SearchPageNavbar 
        onLocationChange={handleLocationChange} 
        onSearchChange={handleSearchChange} 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange} // Pass the sort handler to navbar
      />
      <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 lg:grid-cols-3 ">
        {displayedGyms.map(gym => (
          <GymCard
            key={gym._id}
            gymId={gym._id}
            gymName={gym.gym_name}
            imageSrc={gym.images[0]}
            rating={gym.average_rating}
          />
        ))}
        <div ref={ref} />
        {isFetchingNextPage && <div>Loading more gyms...</div>}
      </div>
    </>
  );
};

export default SearchPage;