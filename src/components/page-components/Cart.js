import React from 'react';
import '../pages/styles/tyres_style.css'

function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Корзина</h2>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}₽</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <strong>Итого: {total}₽</strong>
      </div>
    </div>
  );
}

export default Cart;