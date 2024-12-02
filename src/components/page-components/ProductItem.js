import React from 'react';
import { Table, Button, Tooltip } from 'antd';

function ProductItem({ product, onAddToCart, onProductSelect, isFirstInGroup, isLastInGroup }) {
  const rowClass = `${isFirstInGroup ? 'first-in-group' : ''} ${isLastInGroup ? 'last-in-group' : ''}`;

  return (
    <tr className={`product-item ${rowClass}`}>
      <td style={{ width: '120px' }}>{product.brand}</td>
      <td style={{ width: '200px' }}>{product.name}</td>
      <td style={{ width: '100px' }}>{product.count}</td>
      <td style={{ width: '150px' }}>
        <Tooltip title={`Опт: ${product.opt}₽`}>
          <span>{product.price}₽</span>
        </Tooltip>
      </td>
      <td style={{ width: '150px' }}>{product.supplier}</td>
      <td style={{ width: '100px' }}>{product.cae}</td>
      <td style={{ width: '200px' }}>
        <Button type="primary" size="small" onClick={() => onAddToCart(product)} 
          style={{ background: '#eafc23', color: '#111'}}>
          В корзину
        </Button>
        <Button size="small" onClick={() => onProductSelect(product)} 
          style={{ marginLeft: '8px', background: '#111', color: '#fff'}}>
          Подробнее
        </Button>
      </td>
    </tr>
  );
}

export default ProductItem;
