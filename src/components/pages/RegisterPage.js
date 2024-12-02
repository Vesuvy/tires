// RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Layout, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './styles/auth_style.css'; // Импортируем стили

const { Content } = Layout;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      await axios.post('/register', values);
      message.success('Регистрация прошла успешно');
      form.resetFields();
      navigate('/'); // Перенаправление на страницу авторизации после успешной регистрации
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      message.error('Ошибка при регистрации');
    }
  };

  return (
    <Layout className="auth-layout">
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={20} sm={16} md={12} lg={8}>
            <div className="auth-form-container">
              <h2>Регистрация</h2>
              <Form form={form} onFinish={handleFormSubmit}>
                <Form.Item
                  label="Имя"
                  name="имя"
                  rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите ваш email' },
                    { type: 'email', message: 'Пожалуйста, введите корректный email' }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Пароль"
                  name="пароль"
                  rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Зарегистрироваться
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default RegisterPage;