import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import "./styles.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);

  // Carregar o carrinho e o histórico do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedHistory = localStorage.getItem("orderHistory");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedHistory) {
      setOrderHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Salvar o carrinho no localStorage sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Salvar o histórico no localStorage sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQuantity(cart.indexOf(existingProduct), existingProduct.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const addToOrderHistory = (order) => {
    setOrderHistory([...orderHistory, order]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products addToCart={addToCart} cart={cart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              clearCart={clearCart}
              calculateTotal={calculateTotal}
              addToOrderHistory={addToOrderHistory}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;