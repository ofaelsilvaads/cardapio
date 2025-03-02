import React, { useState } from "react";
import ProductList from "./components/productList";
import Cart from "./components/cart";
import WhatsAppButton from "./components/whatsAppButton";
import "./styles.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Meu Carrinho</h1>
      <ProductList addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
      <WhatsAppButton cart={cart} />
    </div>
  );
};

export default App;
