import React from 'react';
import Header from '../page-components/Header';
import Sidebar from '../page-components/Sidebar';
import ProductList from '../page-components/ProductList';
import useTires from '../../hooks/useTyres';
import './styles/styles/tyres_style.css';

const HomePage = () => {
  const { filteredTires, handleFilterChange, handleSearch, handleReset } = useTires();

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar
          filters={[
            { id: 'minPrice', label: 'Минимальная цена', type: 'number', placeholder: 'От' },
            { id: 'maxPrice', label: 'Максимальная цена', type: 'number', placeholder: 'До' },
            { id: 'tireWidth', label: 'Ширина', type: 'text', placeholder: 'Выберите' },
            { id: 'tireProfile', label: 'Профиль', type: 'text', placeholder: 'Выберите' },
            { id: 'tireDiameter', label: 'Диаметр', type: 'text', placeholder: 'Выберите' },
            { id: 'tireSeason', label: 'Сезон', type: 'select', placeholder: 'Выберите' },
          ]}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <ProductList products={filteredTires} />
      </div>
    </div>
  );
};

export default HomePage;