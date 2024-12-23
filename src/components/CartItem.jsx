import React from 'react';

function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
  const formattedPrice = price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <li className="cart-item">
      <p>{name} - {quantity} x ₹ {formattedPrice}</p>
      <p className="cart-item-actions">
        <button onClick={onDecrease} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
