import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
//import '../pages/styles/disks_style.css';

const { Option } = Select;

function SidebarDisks({ onFilterChange }) {
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
        />
        <Input
          type="number"
          name="minPrice"
          placeholder="Мин. цена"
          value={filters.minPrice}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="maxPrice"
          placeholder="Макс. цена"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="diskWidth"
          list="diskWidthOptions"
          placeholder="Ширина"
          value={filters.diskWidth}
          onChange={handleInputChange}
        />
        <datalist id="diskWidthOptions">
          {/* Опции будут заполнены динамически */}
        </datalist>
        <Input
          type="text"
          name="diskDiameter"
          list="diskDiameterOptions"
          placeholder="Диаметр"
          value={filters.diskDiameter}
          onChange={handleInputChange}
        />
        <datalist id="diskDiameterOptions">
          {/* Опции будут заполнены динамически */}
        </datalist>
        <Input
          type="text"
          name="diskHoles"
          list="diskHolesOptions"
          placeholder="Отверстия"
          value={filters.diskHoles}
          onChange={handleInputChange}
        />
        <datalist id="diskHolesOptions">
          {/* Опции будут заполнены динамически */}
        </datalist>
        <Input
          type="text"
          name="diskEt"
          list="diskEtOptions"
          placeholder="Вылет ЕТ"
          value={filters.diskEt}
          onChange={handleInputChange}
        />
        <datalist id="diskEtOptions">
          {/* Опции будут заполнены динамически */}
        </datalist>
        <Input
          type="text"
          name="diskDiamCenter"
          list="diskDiamCenterOptions"
          placeholder="ЦО"
          value={filters.diskDiamCenter}
          onChange={handleInputChange}
        />
        <datalist id="diskDiamCenterOptions">
          {/* Опции будут заполнены динамически */}
        </datalist>
        <Input
          type="text"
          name="diskType"
          list="diskTypeOptions"
          placeholder="Тип"
          value={filters.diskType}
          onChange={handleInputChange}
        />
        <datalist id="diskTypeOptions">
          {/* Опции будут заполнены динамически */}
        </datalist>
        <Input
          type="text"
          name="diskDiamHoles"
          list="diskDiamHolesOptions"
          placeholder="Расстояние между болтами"
          value={filters.diskDiamHoles}
          onChange={handleInputChange}
        />
        <datalist id="diskDiamHolesOptions">
          {/* Опции будут заполнены динамически */}
        </datalist>
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

export default SidebarDisks;