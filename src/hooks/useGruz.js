import { useState, useEffect } from 'react';
import axios from 'axios';

const useGruz = () => {
  const [gruz, setGruz] = useState([]);
  const [filteredGruz, setFilteredGruz] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    tireWidth: '',
    tireProfile: '',
    tireDiameter: '',
    tireSeason: '',
  });

  useEffect(() => {
    const fetchGruz = async () => {
      const urls = [
        'https://yngmzleen.github.io/Apipostavschiki/zapaska_gruz.xml',
        'https://yngmzleen.github.io/Apipostavschiki/brinex_gruz.xml',
      ];

      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const gruz = responses.flatMap((response) => response.data.items || []);
      setGruz(gruz);
      setFilteredGruz(gruz);
    };

    fetchGruz();
  }, []);

  useEffect(() => {
    const { search, minPrice, maxPrice, tireWidth, tireProfile, tireDiameter, tireSeason } = filters;
    const filtered = gruz.filter((item) => {
      const searchMatch = !search || (item.name && item.name.toLowerCase().includes(search.toLowerCase()));
      const priceMatch = (!minPrice || (item.price && item.price >= minPrice)) && (!maxPrice || (item.price && item.price <= maxPrice));
      const widthMatch = !tireWidth || (item.width && item.width === tireWidth);
      const profileMatch = !tireProfile || (item.height && item.height === tireProfile);
      const diameterMatch = !tireDiameter || (item.diameter && item.diameter === tireDiameter);
      const seasonMatch = !tireSeason || (item.season && item.season === tireSeason);

      return searchMatch && priceMatch && widthMatch && profileMatch && diameterMatch && seasonMatch;
    });

    setFilteredGruz(filtered);
  }, [filters, gruz]);

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const handleSearch = (search) => {
    setFilters({ ...filters, search });
  };

  const handleReset = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      tireWidth: '',
      tireProfile: '',
      tireDiameter: '',
      tireSeason: '',
    });
  };

  return { filteredGruz, handleFilterChange, handleSearch, handleReset };
};

export default useGruz;