import React, { useState, useEffect } from 'react';
import './styles/ProductFormModal.css'; // Импортируем стили

const ProductEditModal = ({ product, onClose, onSubmit }) => {
  const [name, setName] = useState(product ? product.Название : '');
  const [type, setType] = useState(product ? product.Тип : '');
  const [width, setWidth] = useState(product ? product.Ширина : '');
  const [diameter, setDiameter] = useState(product ? product.Диаметр : '');
  const [profile, setProfile] = useState(product ? product.Профиль : '');
  const [season, setSeason] = useState(product ? product.Сезон : '');
  const [et, setEt] = useState(product ? product.ВылетET : '');
  const [sold, setSold] = useState(product ? product.Продано : 'Нет');

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    width: '',
    diameter: '',
    profile: '',
    season: '',
    et: '',
  });

  useEffect(() => {
    setName(product ? product.Название : '');
    setType(product ? product.Тип : '');
    setWidth(product ? product.Ширина : '');
    setDiameter(product ? product.Диаметр : '');
    setProfile(product ? product.Профиль : '');
    setSeason(product ? product.Сезон : '');
    setEt(product ? product.ВылетET : '');
    setSold(product ? product.Продано : 'Нет');
  }, [product]);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        return value.trim() === '' ? 'Поле "Название" обязательно для заполнения' : '';
      case 'type':
        return !/^[A-Za-z]+$/.test(value) ? 'Поле "Тип" должно содержать только буквы' : '';
      case 'width':
      case 'diameter':
      case 'profile':
      case 'et':
        return !/^\d+$/.test(value) ? `Поле "${fieldName === 'et' ? 'Вылет ET' : fieldName}" должно содержать только цифры` : '';
      case 'season':
        return !/^[A-Za-z]+$/.test(value) ? 'Поле "Сезон" должно содержать только буквы' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;
    const error = validateField(fieldName, value);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));

    switch (fieldName) {
      case 'name':
        setName(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'width':
        setWidth(value);
        break;
      case 'diameter':
        setDiameter(value);
        break;
      case 'profile':
        setProfile(value);
        break;
      case 'season':
        setSeason(value);
        break;
      case 'et':
        setEt(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProduct = {
      Название: name,
      Тип: type,
      Ширина: width,
      Диаметр: diameter,
      Профиль: profile,
      Сезон: season,
      ВылетET: et,
      Продано: sold,
    };
    onSubmit(newProduct);
  };

  const isFormValid = () => {
    return Object.values(errors).every(error => error === '') && name.trim() !== '';
  };

  return (
    <div className="product-details-modal" onClick={onClose}>
      <div className="product-details-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Название:
            <input
              type="text"
              value={name}
              onChange={(event) => handleInputChange(event, 'name')}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </label>
          <label>
            Тип:
            <input
              type="text"
              value={type}
              onChange={(event) => handleInputChange(event, 'type')}
              className={errors.type ? 'error' : ''}
            />
            {errors.type && <div className="error-message">{errors.type}</div>}
          </label>
          <label>
            Ширина:
            <input
              type="text"
              value={width}
              onChange={(event) => handleInputChange(event, 'width')}
              className={errors.width ? 'error' : ''}
            />
            {errors.width && <div className="error-message">{errors.width}</div>}
          </label>
          <label>
            Диаметр:
            <input
              type="text"
              value={diameter}
              onChange={(event) => handleInputChange(event, 'diameter')}
              className={errors.diameter ? 'error' : ''}
            />
            {errors.diameter && <div className="error-message">{errors.diameter}</div>}
          </label>
          <label>
            Профиль:
            <input
              type="text"
              value={profile}
              onChange={(event) => handleInputChange(event, 'profile')}
              className={errors.profile ? 'error' : ''}
            />
            {errors.profile && <div className="error-message">{errors.profile}</div>}
          </label>
          <label>
            Сезон:
            <input
              type="text"
              value={season}
              onChange={(event) => handleInputChange(event, 'season')}
              className={errors.season ? 'error' : ''}
            />
            {errors.season && <div className="error-message">{errors.season}</div>}
          </label>
          <label>
            Вылет ET:
            <input
              type="text"
              value={et}
              onChange={(event) => handleInputChange(event, 'et')}
              className={errors.et ? 'error' : ''}
            />
            {errors.et && <div className="error-message">{errors.et}</div>}
          </label>
          <label>
            Продано:
            <select value={sold} onChange={(event) => setSold(event.target.value)}>
              <option value="Нет">Нет</option>
              <option value="Да">Да</option>
            </select>
          </label>
          <button type="submit" disabled={!isFormValid()}>Сохранить</button>
        </form>
      </div>
    </div>
  );
};


export default ProductEditModal;