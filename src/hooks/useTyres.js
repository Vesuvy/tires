import { useState, useEffect } from 'react';
import axios from 'axios';

const useTyres = () => {
  const [tires, setTires] = useState([]);
  const [filteredTires, setFilteredTires] = useState([]);
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
    const fetchTires = async () => {
      const urls = [
        'https://yngmzleen.github.io/Apipostavschiki/4tochki_tyres.xml',
        'https://yngmzleen.github.io/Apipostavschiki/brinex_tyres.xml',
        'https://yngmzleen.github.io/Apipostavschiki/zapaska_tyres.xml',
      ];

      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const tires = responses.flatMap((response) => response.data.items || []);
      setTires(tires);
      setFilteredTires(tires);
    };

    fetchTires();
  }, []);

  useEffect(() => {
    const { search, minPrice, maxPrice, tireWidth, tireProfile, tireDiameter, tireSeason } = filters;
    const filtered = tires.filter((tire) => {
      const searchMatch = !search || (tire.name && tire.name.toLowerCase().includes(search.toLowerCase()));
      const priceMatch = (!minPrice || (tire.price && tire.price >= minPrice)) && (!maxPrice || (tire.price && tire.price <= maxPrice));
      const widthMatch = !tireWidth || (tire.width && tire.width === tireWidth);
      const profileMatch = !tireProfile || (tire.height && tire.height === tireProfile);
      const diameterMatch = !tireDiameter || (tire.diameter && tire.diameter === tireDiameter);
      const seasonMatch = !tireSeason || (tire.season && tire.season === tireSeason);

      return searchMatch && priceMatch && widthMatch && profileMatch && diameterMatch && seasonMatch;
    });

    setFilteredTires(filtered);
  }, [filters, tires]);

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

  return { filteredTires, handleFilterChange, handleSearch, handleReset };
};

export default useTyres;