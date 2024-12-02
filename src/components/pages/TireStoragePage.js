import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TireStorageViewModal from '../page-components/TireStorageViewModal';
import TireStorageEditModal from '../page-components/TireStorageEditModal';
import SidebarTideStoragePage from '../page-components/SidebarTireStoragePage';
import { Table, Button, Modal, message, Spin } from 'antd';

axios.defaults.baseURL = 'http://localhost:5000';

const TireStoragePage = () => {
  const [tireStorages, setTireStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTireStorage, setSelectedTireStorage] = useState(null);
  const [modalType, setModalType] = useState('view'); // 'view' или 'edit'

  useEffect(() => {
    fetchTireStorages();
  }, []);

  const fetchTireStorages = async () => {
    try {
      const response = await axios.get('/tire-storages');
      setTireStorages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении данных о хранении шин:', error);
      setLoading(false);
    }
  };

  const deleteTireStorage = async (tireStorageId) => {
    try {
      await axios.delete(`/tire-storages/${tireStorageId}`);
      message.success('Данные успешно удалены');
      fetchTireStorages();
    } catch (error) {
      console.error('Ошибка при удалении данных о хранении шин:', error);
      message.error('Ошибка при удалении данных');
    }
  };

  const handleRowClick = (tireStorage) => {
    setSelectedTireStorage(tireStorage);
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleEditClick = (tireStorage) => {
    setSelectedTireStorage(tireStorage);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTireStorage(null);
  };

  const handleFormSubmit = async (tireStorage) => {
    try {
      if (selectedTireStorage) {
        await axios.put(`/tire-storages/${selectedTireStorage.id}`, tireStorage);
      } else {
        await axios.post('/tire-storages', tireStorage);
      }
      message.success('Данные успешно обновлены');
      fetchTireStorages();
      handleModalClose();
    } catch (error) {
      console.error('Ошибка при добавлении/редактировании данных о хранении шин:', error);
      message.error('Ошибка при сохранении данных');
    }
  };

  const columns = [
    { title: 'Адрес', dataIndex: 'адрес', key: 'адрес' },
    { title: 'Стоимость', dataIndex: 'стоимость', key: 'стоимость' },
    { title: 'Дата начала хранения', dataIndex: 'дата_начала_хранения', key: 'дата_начала_хранения' },
    { title: 'Дата окончания хранения', dataIndex: 'дата_окончания_хранения', key: 'дата_окончания_хранения' },
    { title: 'Документ', dataIndex: 'документ', key: 'документ' },
    { title: 'ФИО', dataIndex: 'фио', key: 'фио' },
    { title: 'Телефон', dataIndex: 'телефон', key: 'телефон' },
    { title: 'Названия шин', dataIndex: 'названия_шин', key: 'названия_шин' },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(record);
            }}
          >
            Изменить
          </Button>
          <Button
            danger
            onClick={(e) => {
              e.stopPropagation();
              deleteTireStorage(record.id);
            }}
          >
            Удалить
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="container">
        <SidebarTideStoragePage
          setSelectedTireStorage={setSelectedTireStorage}
          setModalType={setModalType}
          setIsModalOpen={setIsModalOpen}
        />
        {loading ? (
          <Spin />
        ) : (
          <Table
            columns={columns}
            dataSource={tireStorages}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        )}
        {isModalOpen && modalType === 'view' && (
          <TireStorageViewModal
            tireStorage={selectedTireStorage}
            onClose={handleModalClose}
          />
        )}
        {isModalOpen && modalType === 'edit' && (
          <TireStorageEditModal
            tireStorage={selectedTireStorage}
            onClose={handleModalClose}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default TireStoragePage;