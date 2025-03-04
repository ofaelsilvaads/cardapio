import React, { useState } from "react";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  // Estado local para gerenciar o valor temporário da quantidade
  const [tempQuantities, setTempQuantities] = useState({});

  // Função para lidar com a mudança na quantidade
  const handleQuantityChange = (index, value) => {
    // Atualiza o valor temporário
    setTempQuantities((prev) => ({ ...prev, [index]: value }));

    // Se o valor for um número válido, atualiza a quantidade no carrinho
    if (!isNaN(value) && value !== "") {
      updateQuantity(index, parseInt(value, 10));
    }
  };

  return (
    <div className="cart">
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <h3>{item.name}</h3>
          <p>Preço: R$ {item.price.toFixed(2)}</p>
          <p>
            Quantidade:
            <input
              type="number"
              value={tempQuantities[index] !== undefined ? tempQuantities[index] : item.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              min="1"
            />
          </p>
          <button onClick={() => removeFromCart(index)}>Remover</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;