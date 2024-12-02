import React from 'react';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import '../pages/styles/tyres_style.css'
import { Table } from 'antd'

function ProductList({ products, onAddToCart, onProductSelect, currentPage, setCurrentPage }) {
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Object.entries(products).slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>Бренд</th>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Поставщик</th>
            <th>CAE</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(([cae, productsGroup]) => (
            productsGroup.map((product, index) => (
              <ProductItem
                key={`${product.cae}-${index}`}
                product={product}
                onAddToCart={onAddToCart}
                onProductSelect={onProductSelect}
                isFirstInGroup={index === 0}
                isLastInGroup={index === productsGroup.length - 1}
              />
            ))
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={Object.keys(products).length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ProductList;