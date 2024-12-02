import React from 'react';
import Header from '../page-components/Header';
import Sidebar from '../page-components/Sidebar';
import ProductList from '../page-components/ProductList';
import useGruz from '../../hooks/useGruz';
import './styles/styles/tyres_style.css';

const GruzPage = () => {
  const { filteredGruz, handleFilterChange, handleSearch, handleReset } = useGruz();

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar
          filters={[
            { id: 'minPrice', label: 'Минимальная цена', type: 'number', placeholder: 'От' },
            { id: 'maxPrice', label: 'Максимальная цена', type: 'number', placeholder: 'До' },
            { id: 'tireWidth', label: 'Ширина', type: 'text', placeholder: 'Выберите' },
            { id: 'tireProfile', label: 'ПрофильQQQ', type: 'text', placeholder: 'Выберите' },
            { id: 'tireDiameter', label: 'Диаметр', type: 'text', placeholder: 'Выберите' },
            { id: 'tireSeason', label: 'Сезон', type: 'select', placeholder: 'Выберите' },
          ]}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <ProductList products={filteredGruz} />
      </div>
    </div>
  );
};

export default GruzPage;