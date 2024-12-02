import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TiresPage from './components/pages/TiresPage'; // страница шин 1
import TruckTiresPage from './components/pages/TruckTiresPage'; // страница шин 2
import DisksPage from './components/pages/DisksPage'; // страница диски
import StoragePage from './components/pages/StoragePage'; // страница склада всего
import ArchivedProductList from './components/page-components/ArchivedProductList'; // 
import TireStorageList from './components/pages/TireStoragePage'; // 
import LoginPage from './components/pages/LoginPage'; // страница авторизации
import RegisterPage from './components/pages/RegisterPage'; // страница регистрации

import Header from './components/page-components/Header';
// import './components/pages/styles/tyres_style.css'; // Импортируем стили
import 'antd/dist/antd';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

              <Route path="/tires-page" element={<TiresPage />} />
              <Route path="/truck-tires" element={<TruckTiresPage />} />
              <Route path="/disks" element={<DisksPage />} />
              <Route path="/storage-page" element={<StoragePage />} />
              <Route path="/archive" element={<ArchivedProductList />} />
              <Route path="/tire-storage" element={<TireStorageList />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;