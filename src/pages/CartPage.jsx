import React from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../components/cart";
import WhatsAppButton from "../components/whatsAppButton";
import "../styles.css";
import { FaShoppingCart } from "react-icons/fa"; // Ícone de carrinho
import { GoArrowLeft } from "react-icons/go";
import logo from "../assets/logo.jpg";



const CartPage = ({
  cart,
  removeFromCart,
  updateQuantity,
  paymentMethod,
  setPaymentMethod,
  deliveryOption,
  setDeliveryOption, // Recebendo a função
  address, // Recebendo o estado address
  setAddress, // Recebendo a função setAddress
  calculateTotal, // Recebendo a função
  clearCart, // Recebendo a função
  addToOrderHistory, // Recebendo a função
}) => {
  const navigate = useNavigate();

  console.log("setDeliveryOption no CartPage:", setDeliveryOption);

  // Função para atualizar o endereço
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="cart-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          
          <h1>Ale Salgados</h1>
        </div>
        <div className="navbar-right" onClick={() => navigate("/cart")}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cart.length}</span>
        </div>
      </nav>
      <button onClick={() => navigate("/products")} className="back-button">
        <GoArrowLeft className="left"></GoArrowLeft> Voltar
      </button>
      <h1 className="bt-carrinho">Seu pedido</h1>

      {/* Componente do Carrinho */}
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity} // Passando a função para o componente Cart
      />
      <button
        onClick={clearCart}
        style={{ backgroundColor: "#dc3545", marginBottom: "10px" }}
      >
        Limpar Carrinho
      </button>

      {/* Seção de Forma de Pagamento */}
      <div className="pagamento">
        <label>Forma de Pagamento: </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="PIX">PIX</option>
          <option value="Cartão">Cartão</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
      </div>

      {/* Seção de Opção de Entrega */}
      <div>
        <label>Local de Entrega: </label>
        <select
          value={deliveryOption}
          onChange={(e) => setDeliveryOption(e.target.value)} // Usando a função
        >
          <option value="inside">Condomínio Parque dos Sonhos</option>
          <option value="outside">Endereço (Consultar valor motoboy da uber)</option>
        </select>
      </div>

      {/* Seção de Endereço */}
      <div className="endereco">
        <h3>
          {deliveryOption === "inside"
            ? "Endereço no Condomínio"
            : "Endereço para Entrega"}
        </h3>
        <textarea
          name="address"
          placeholder={
            deliveryOption === "inside"
              ? "Digite o endereço no formato: Residencial X, Bloco Y, Apartamento Z"
              : "Digite o endereço completo"
          }
          value={address}
          onChange={handleAddressChange}
        />
      </div>

      {/* Seção de Total e Botões */}
      <div>
        <h3>Total: R$ {calculateTotal()}</h3>
      </div>
      

      {/* Botão do WhatsApp */}
      <WhatsAppButton
        cart={cart}
        paymentMethod={paymentMethod}
        addToOrderHistory={addToOrderHistory}
        clearCart={clearCart}
        deliveryOption={deliveryOption}
        address={address}
      />
    </div>
  );
};

export default CartPage;