import React from 'react';
import { Input, Button } from 'antd';

const SidebarTideStoragePage = ({ setSelectedTireStorage, setModalType, setIsModalOpen }) => {

  const handleAddContract = () => {
    setSelectedTireStorage(null);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleAddStorage = () => {
    setSelectedTireStorage(null);
    setModalType('edit');
    setIsModalOpen(true);
  };

  return (
    <div className="sidebar">
      <Input
        type="text"
        placeholder="Поиск..."
      />
      {/* <Button
          type="submit"
          htmlType="submit"
          variant='outlined'
          onClick={handleAddContract}
          style={{
            marginBottom: '5px'
          }}
          block
        >
          Добавить договор
        </Button> */}
        <Button
          type="button"
          onClick={handleAddStorage}
          variant='outlined'
          style={{
          }}
          block
        >
          Добавить хранение шин
        </Button>
    </div>
  );
};

export default SidebarTideStoragePage;