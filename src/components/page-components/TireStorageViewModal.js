import React from 'react';

const TireStorageViewModal = ({ tireStorage, onClose }) => {
  return (
    <div className="product-details-modal">
      <div className="product-details-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Просмотр данных о хранении шин</h2>
        <p><strong>Адрес:</strong> {tireStorage.адрес}</p>
        <p><strong>Стоимость:</strong> {tireStorage.стоимость}</p>
        <p><strong>Дата начала хранения:</strong> {tireStorage.дата_начала_хранения}</p>
        <p><strong>Дата окончания хранения:</strong> {tireStorage.дата_окончания_хранения}</p>
        <p><strong>Документ:</strong> {tireStorage.документ}</p>
        <p><strong>ФИО:</strong> {tireStorage.фио}</p>
        <p><strong>Телефон:</strong> {tireStorage.телефон}</p>
        <p><strong>Названия шин:</strong> {tireStorage.названия_шин}</p>
      </div>
    </div>
  );
};

export default TireStorageViewModal;