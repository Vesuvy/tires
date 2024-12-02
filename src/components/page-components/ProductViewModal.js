import React from 'react';
import { Modal, Typography, Row, Col } from 'antd';

const ProductViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      visible={true}
      onCancel={onClose}
      title="Product Details"
      footer={null}
    >
      
      <Row>
        <Col span={12}>
          <Typography.Text strong>Название:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.Название}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Typography.Text strong>Тип:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.Тип}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Typography.Text strong>Ширина:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.Ширина}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Typography.Text strong>Диаметр:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.Диаметр}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Typography.Text strong>Профиль:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.Профиль}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Typography.Text strong>Сезон:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.Сезон}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Typography.Text strong>Вылет ET:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.ВылетET}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Typography.Text strong>Продано:</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>{product.Продано}</Typography.Text>
        </Col>
      </Row>
      {product.Фото && (
        <Row>
          <Col span={24}>
            <img src={product.Фото} alt="Product" style={{ maxWidth: '100%' }} />
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default ProductViewModal;