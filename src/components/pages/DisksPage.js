import React, { useState, useEffect, useCallback } from 'react';
import SidebarDisks from '../page-components/SidebarDisks';
import ProductList from '../page-components/ProductList';
import Cart from '../page-components/Cart';
import ProductModal from '../page-components/ProductModal';
import { fetchDisks } from '../../utils/api';
import { filterProducts, groupProductsByCAE, populateFilters } from '../../utils/helpers';
// import './styles/disks_style.css';
import { Layout, Button, Input, Select, Pagination } from 'antd';

const { Content } = Layout;
const { Option } = Select;

const DisksPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 12; // Количество товаров на одной странице

  useEffect(() => {
    fetchDisks().then(data => {
      setProducts(data);
      setFilteredProducts(data);
      populateFilters(data); // Заполняем фильтры один раз
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

  const handleResetFilters = () => {
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
    setSelectedProduct(null); // Сбрасываем выбранный товар
  };

  const handleResetCart = () => {
    setCart([]);
    handleResetFilters();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Функция для отображения данных на текущей странице
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const groupedProducts = groupProductsByCAE(currentItems);

  return (
    <Layout className="tires-page">
      <Content className="container">
      <SidebarDisks onFilterChange={handleFilterChange} onReset={handleResetFilters} />
      <ProductList
          products={groupedProducts}
          onAddToCart={handleAddToCart}
          onProductSelect={handleProductSelect}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          paginate={paginate}
          totalItems={filteredProducts.length}
        />
        {cart.length > 0 && <Cart items={cart} onReset={handleResetCart} />}
      </Content>
      {showModal && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </Layout>
  );
};

export default DisksPage;