import { useState, useEffect } from 'react';
import axios from 'axios';

const useDisks = () => {
  const [disks, setDisks] = useState([]);
  const [filteredDisks, setFilteredDisks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    diskWidth: '',
    diskDiameter: '',
    diskHoles: '',
    diskEt: '',
    diskDiamCenter: '',
    diskType: '',
    diskDiamHoles: '',
  });

  useEffect(() => {
    const fetchDisks = async () => {
      const urls = [
        'https://yngmzleen.github.io/Apipostavschiki/brinex_disks.xml',
        'https://yngmzleen.github.io/Apipostavschiki/4tochki_disk.xml',
        'https://yngmzleen.github.io/Apipostavschiki/zapaska_disks.xml',
      ];

      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const parsedDisks = responses.map((response) => parseXml(response.data));

      const disks = parsedDisks.flatMap((parsedDisk) => {
        return Array.from(parsedDisk.querySelectorAll('item')).map((item) => ({
          name: item.querySelector('name')?.textContent,
          article: item.querySelector('article')?.textContent,
          cae: item.querySelector('cae')?.textContent,
          price: parseFloat(item.querySelector('price')?.textContent) || 0,
          opt: parseFloat(item.querySelector('opt')?.textContent) || 0,
          count: item.querySelector('count')?.textContent,
          stock: item.querySelector('stock')?.textContent,
          brand: item.querySelector('brand')?.textContent,
          width: item.querySelector('width')?.textContent,
          diameter: item.querySelector('diameter')?.textContent,
          color: item.querySelector('color')?.textContent,
          holes: item.querySelector('holes')?.textContent,
          et: item.querySelector('et')?.textContent,
          diamCenter: item.querySelector('diam_center')?.textContent,
          typeDisk: item.querySelector('type')?.textContent,
          diamHoles: item.querySelector('diam_holes')?.textContent,
          supplier: item.querySelector('supplier')?.textContent,
        }));
      });

      setDisks(disks);
      setFilteredDisks(disks);
    };

    fetchDisks();
  }, []);

  useEffect(() => {
    const { search, minPrice, maxPrice, diskWidth, diskDiameter, diskHoles, diskEt, diskDiamCenter, diskType, diskDiamHoles } = filters;
    const filtered = disks.filter((disk) => {
      const searchMatch = !search || (disk.name && disk.name.toLowerCase().includes(search.toLowerCase()));
      const priceMatch = (!minPrice || (disk.price && disk.price >= minPrice)) && (!maxPrice || (disk.price && disk.price <= maxPrice));
      const widthMatch = !diskWidth || (disk.width && disk.width === diskWidth);
      const diameterMatch = !diskDiameter || (disk.diameter && disk.diameter === diskDiameter);
      const holesMatch = !diskHoles || (disk.holes && disk.holes === diskHoles);
      const etMatch = !diskEt || (disk.et && disk.et === diskEt);
      const diamCenterMatch = !diskDiamCenter || (disk.diamCenter && disk.diamCenter === diskDiamCenter);
      const typeMatch = !diskType || (disk.typeDisk && disk.typeDisk === diskType);
      const diamHolesMatch = !diskDiamHoles || (disk.diamHoles && disk.diamHoles === diskDiamHoles);

      return searchMatch && priceMatch && widthMatch && diameterMatch && holesMatch && etMatch && diamCenterMatch && typeMatch && diamHolesMatch;
    });

    setFilteredDisks(filtered);
  }, [filters, disks]);

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
      diskWidth: '',
      diskDiameter: '',
      diskHoles: '',
      diskEt: '',
      diskDiamCenter: '',
      diskType: '',
      diskDiamHoles: '',
    });
  };

  return { filteredDisks, handleFilterChange, handleSearch, handleReset };
};

const parseXml = (xmlString) => {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, 'application/xml');
};

export default useDisks;