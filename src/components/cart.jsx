import React, { useState } from "react";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <div>
      
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - R$ {item.price.toFixed(2)}
              <input
                type="number"
                min="1"
                value={item.quantity || 1}
                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(index)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;