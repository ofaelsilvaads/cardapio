import React, { useState } from "react";
import ProductList from "./components/productList";
import CartPage from "./pages/CartPage";
import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

console.log("setDeliveryOption no App:", setDeliveryOption);

const App = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("inside"); // Estado para a opção de entrega
  const [address, setAddress] = useState(""); // Estado para o endereço

  // Função para adicionar um produto ao carrinho
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Função para remover um produto do carrinho
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Função para calcular o total do carrinho
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Função para adicionar o pedido ao histórico
  const addToOrderHistory = (order) => {
    // Aqui você pode salvar o pedido no localStorage ou em um estado de histórico
    console.log("Pedido adicionado ao histórico:", order);
  };

  return (
    <div>
      <h1>Meu Carrinho</h1>
      <ProductList addToCart={addToCart} />
      <CartPage
        cart={cart}
        removeFromCart={removeFromCart}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        deliveryOption={deliveryOption}
        setDeliveryOption={setDeliveryOption} // Passando a função
        address={address} // Passando o estado address
        setAddress={setAddress} // Passando a função setAddress
        calculateTotal={calculateTotal} // Passando a função
        clearCart={clearCart} // Passando a função
        addToOrderHistory={addToOrderHistory} // Passando a função
      />
    </div>
  );
};

export default App;