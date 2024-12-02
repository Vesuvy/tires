import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Pagination } from 'antd';
import Sidebar from '../page-components/Sidebar';
import ProductList from '../page-components/ProductList';
import Cart from '../page-components/Cart';
import ProductModal from '../page-components/ProductModal';
import { fetchTruckTires } from '../../utils/api';
import { filterProducts, groupProductsByCAE } from '../../utils/helpers';
import './styles/tyres_style.css';

const { Content } = Layout;

function TruckTiresPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 12; // Количество товаров на одной странице

  useEffect(() => {
    fetchTruckTires().then(data => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = filterProducts(products, filters);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.cae === product.cae);
      if (existingProduct) {
        return prevCart.map(item => 
          item.cae === product.cae ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const groupedProducts = groupProductsByCAE(filteredProducts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <Layout className="truck-tires-page">
      <Content className="container">
        <Sidebar onFilterChange={handleFilterChange} />
        <ProductList
          products={groupedProducts}
          onAddToCart={handleAddToCart}
          onProductSelect={handleProductSelect}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {cart.length > 0 && <Cart items={cart} />}
      </Content>
      {showModal && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </Layout>
  );
}

export default TruckTiresPage;