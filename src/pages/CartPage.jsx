import React, { useState } from "react";
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
  setDeliveryOption,
  address,
  setAddress,
  calculateTotal,
  clearCart,
  addToOrderHistory,
}) => {
  const navigate = useNavigate();
  const [observation, setObservation] = useState(""); // Estado para observações

  // Função para atualizar o endereço
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Função para atualizar observações
  const handleObservationChange = (e) => {
    setObservation(e.target.value);
  };

  // Função para aumentar quantidade
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateQuantity(updatedCart);
  };

  // Função para diminuir quantidade
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateQuantity(updatedCart);
    }
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
          <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>
      </nav>
      
      <button onClick={() => navigate("/products")} className="back-button">
        <GoArrowLeft className="left"></GoArrowLeft> Voltar
      </button>
      <h1 className="bt-carrinho">Seu pedido</h1>

      {/* Componente do Carrinho com funcionalidade de edição */}
      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Seu carrinho está vazio</p>
          </div>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>R$ {item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button 
                    onClick={() => decreaseQuantity(index)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(index)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="item-total">Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button 
                onClick={() => removeFromCart(index)}
                className="remove-btn"
              >
                Remover
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <>
          <button
            onClick={clearCart}
            className="clear-cart-btn"
          >
            Limpar Carrinho
          </button>

          {/* Seção de Forma de Pagamento */}
          <div className="payment-section">
            <label>Forma de Pagamento: </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select"
            >
              <option value="">Selecione</option>
              <option value="PIX">PIX</option>
              <option value="Cartão">Cartão</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </div>

          {/* Seção de Opção de Entrega */}
          <div className="delivery-section">
            <label>Local de Entrega: </label>
            <select
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
              className="delivery-select"
            >
              <option value="inside">Condomínio Parque dos Sonhos</option>
              <option value="outside">Endereço (Consultar valor motoboy da uber)</option>
            </select>
          </div>

          {/* Seção de Endereço */}
          <div className="address-section">
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
              className="address-textarea"
            />
          </div>

          {/* Seção de Observações */}
          <div className="observation-section">
            <h3>Observações do Pedido</h3>
            <textarea
              placeholder="Alguma observação especial? (opcional)"
              value={observation}
              onChange={handleObservationChange}
              className="observation-textarea"
            />
          </div>

          {/* Seção de Total */}
          <div className="total-section">
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
            observation={observation}
          />
        </>
      )}
    </div>
  );
};

export default CartPage;