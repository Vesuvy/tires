import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductViewModal from './ProductViewModal';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для навигации

axios.defaults.baseURL = 'http://localhost:5000';

const ArchivedProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // Инициализируем useNavigate

  const fetchArchivedProducts = async () => {
    try {
      const response = await axios.get('/products/archived');
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при получении архивированных продуктов:', error);
    }
  };

  useEffect(() => {
    fetchArchivedProducts();
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleGoBack = () => {
    navigate('/'); // Перенаправляем на страницу ProductList
  };

  return (
    <div>
      <button onClick={handleGoBack}>Назад</button> {/* Добавляем кнопку "Назад" */}
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Тип</th>
            <th>Ширина</th>
            <th>Диаметр</th>
            <th>Профиль</th>
            <th>Сезон</th>
            <th>Вылет ET</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_товара} onClick={() => handleRowClick(product)}>
              <td>{product.Название}</td>
              <td>{product.Тип}</td>
              <td>{product.Ширина}</td>
              <td>{product.Диаметр}</td>
              <td>{product.Профиль}</td>
              <td>{product.Сезон}</td>
              <td>{product.ВылетET}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ProductViewModal
          product={selectedProduct}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default ArchivedProductList;