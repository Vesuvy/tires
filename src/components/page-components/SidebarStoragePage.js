import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';

const SidebarStoragePage = ({ onAddProduct }) => {
  const navigate = useNavigate();

  const handleArchiveClick = () => {
    navigate('/archive'); // Переход на страницу архива
  };

  return (
    <div className="sidebar">
        <Input
            type="text"
            placeholder="Поиск..."
        />
        <Button
          type="submit"
          htmlType="submit"
          variant='outlined'
          onClick={handleArchiveClick}
          style={{
            marginBottom: '5px'
          }}
          block
        >
          Архив
        </Button>
        <Button
          type="button"
          onClick={onAddProduct}
          variant='outlined'
          style={{
          }}
          block
        >
          Добавить товар
        </Button>
    
    </div>
  );
};

export default SidebarStoragePage;