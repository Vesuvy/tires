import React from 'react';
import { Modal } from 'antd';

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <Modal
      title={product.name}
      visible={true}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <p><strong>Бренд:</strong> {product.brand}</p>
      <p><strong>Модель:</strong> {product.model}</p>
      <p><strong>Ширина:</strong> {product.width}</p>
      <p><strong>Профиль:</strong> {product.height}</p>
      <p><strong>Диаметр:</strong> {product.diameter}</p>
      <p><strong>Сезон:</strong> {product.season}</p>
      <p><strong>Цена:</strong> {product.price}₽</p>
      <p><strong>Оптовая цена:</strong> {product.opt}₽</p>
      <p><strong>Поставщик:</strong> {product.supplier}</p>
      <p><strong>CAE:</strong> {product.cae}</p>
    </Modal>
  );
}

export default ProductModal;
