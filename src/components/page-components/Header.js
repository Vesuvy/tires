import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/styles/disks_style.css';
import { Layout, Menu } from 'antd';

const {Header:AntHeader} = Layout;

const Header = () => {
  return (
    <AntHeader className="header">
      <div className="logo">
        <img src="/img/logo.png" alt="Логотип" />
      </div>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Легковые</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/truck-tires">Грузовые / легкогрузовые</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/disks">Диски</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/storage-page">Склад</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/tire-storage">Хранение шин</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;