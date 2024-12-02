import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductViewModal from '../page-components/ProductViewModal';
import ProductEditModal from '../page-components/ProductEditModal';
import SidebarStoragePage from '../page-components/SidebarStoragePage';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, message, Spin } from 'antd';

axios.defaults.baseURL = 'http://localhost:5000';

const StoragePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState('view'); // 'view' или 'edit'
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products/active');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении активных продуктов:', error);
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      message.success('Продукт удален успешно');
      fetchProducts();
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
      message.error('Ошибка при удалении продукта');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = async (product) => {
    try {
      if (selectedProduct) {
        await axios.put(`/products/${selectedProduct.id_товара}`, product);
      } else {
        await axios.post('/products', product);
      }
      message.success('Данные успешно сохранены');
      fetchProducts();
      handleModalClose();
      if (product.Продано === 'Да') {
        navigate('/archive');
      }
    } catch (error) {
      console.error('Ошибка при добавлении/редактировании продукта:', error);
      message.error('Ошибка при сохранении данных');
    }
  };

  const handleAddProductClick = () => {
    setSelectedProduct(null);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'Название', dataIndex: 'название', key: 'название' },
    { title: 'Тип', dataIndex: 'тип', key: 'тип' },
    { title: 'Ширина', dataIndex: 'ширина', key: 'ширина' },
    { title: 'Диаметр', dataIndex: 'диаметр', key: 'диаметр' },
    { title: 'Профиль', dataIndex: 'профиль', key: 'профиль' },
    { title: 'Сезон', dataIndex: 'сезон', key: 'сезон' },
    { title: 'Вылет ET', dataIndex: 'вылетet', key: 'вылетet' },
    { title: 'Продано', dataIndex: 'продано', key: 'продано' },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={(e) => { e.stopPropagation(); handleEditClick(record); }}
                  style={{ background: '#eafc23', color: '#111' }}>
            Изменить
          </Button>
          <Button onClick={(e) => { e.stopPropagation(); deleteProduct(record.id_товара); }}
                  style={{ marginLeft: '8px', background: '#111', color: '#fff' }}>
            Удалить
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="container">
        <SidebarStoragePage onAddProduct={handleAddProductClick} />
        {loading ? (
          <Spin />
        ) : (
          <Table
            columns={columns}
            dataSource={products}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        )}
        {isModalOpen && modalType === 'view' && (
          <ProductViewModal
            product={selectedProduct}
            onClose={handleModalClose}
          />
        )}
        {isModalOpen && modalType === 'edit' && (
          <ProductEditModal
            product={selectedProduct}
            onClose={handleModalClose}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default StoragePage;