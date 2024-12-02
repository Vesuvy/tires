import React, { useState, useEffect } from 'react';
import { Layout, Pagination } from 'antd';
import Sidebar from '../page-components/Sidebar';
import ProductList from '../page-components/ProductList';
import Cart from '../page-components/Cart';
import ProductModal from '../page-components/ProductModal';
import { fetchTires } from '../../utils/api';
import { filterProducts, groupProductsByCAE } from '../../utils/helpers';
import './styles/tyres_style.css';

const { Content } = Layout;

function TiresPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 12; // Количество товаров на одной странице

  useEffect(() => {
    fetchTires()
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching tires:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = filterProducts(products, filters);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
  };

  const groupedProducts = groupProductsByCAE(filteredProducts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    
    <Layout className="tires-page">
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

export default TiresPage;