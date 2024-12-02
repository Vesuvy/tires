import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import '../pages/styles/tyres_style.css';

const { Option } = Select;

function Sidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: '',
    width: '',
    profile: '',
    diameter: '',
    season: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      width: '',
      profile: '',
      diameter: '',
      season: '',
      minPrice: '',
      maxPrice: '',
    });
    onFilterChange({});
  };

  return (
    <div className="sidebar">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="search"
          placeholder="Поиск..."
          value={filters.search}
          onChange={handleInputChange}
          style={{ marginBottom: '8px' }}
        />
        <Input
          type="text"
          name="width"
          placeholder="Ширина"
          value={filters.width}
          onChange={handleInputChange}
          style={{ marginBottom: '8px' }}
        />
        <Input
          type="text"
          name="profile"
          placeholder="Профиль"
          value={filters.profile}
          onChange={handleInputChange}
          style={{ marginBottom: '8px' }}
        />
        <Input
          type="text"
          name="diameter"
          placeholder="Диаметр"
          value={filters.diameter}
          onChange={handleInputChange}
          style={{ marginBottom: '8px' }}
        />
        <Select
          name="season"
          placeholder="Выберите сезон"
          value={filters.season}
          onChange={(value) => setFilters({ ...filters, season: value })}
          style={{ marginBottom: '8px', width: '100%' }}
        >
          <Option value="summer">Лето</Option>
          <Option value="winter">Зима</Option>
          <Option value="all-season">Всесезонные</Option>
        </Select>
        <Input
          type="number"
          name="minPrice"
          placeholder="Мин. цена"
          value={filters.minPrice}
          onChange={handleInputChange}
          style={{ marginBottom: '8px' }}
        />
        <Input
          type="number"
          name="maxPrice"
          placeholder="Макс. цена"
          value={filters.maxPrice}
          onChange={handleInputChange}
          style={{ marginBottom: '8px' }}
        />
        <Button
          type="submit"
          htmlType="submit"
          variant='outlined'
          style={{
            marginBottom: '5px'
          }}
          block
        >
          Применить фильтры
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant='outlined'
          style={{
          }}
          block
        >
          Сбросить фильтры
        </Button>
      </form>
    </div>
  );
}

export default Sidebar;
