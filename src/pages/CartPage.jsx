import React from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../components/cart";
import WhatsAppButton from "../components/whatsAppButton";
import "../styles.css";

const CartPage = ({ cart, removeFromCart, updateQuantity, paymentMethod, setPaymentMethod, clearCart, calculateTotal, addToOrderHistory }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-page">
        <button onClick={() => navigate("/products")} className="back-button">
        Voltar para Produtos
      </button>
      <h1>Carrinho</h1>

      {/* Carrinho */}
      <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />

      {/* Forma de Pagamento */}
      <div class="pagamento">
        <label>Forma de Pagamento: </label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">Selecione</option>
          <option value="PIX">PIX</option>
          <option value="Cartão">Cartão</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
      </div>

      {/* Total e Botões */}
      <div>
        <h3>Total: R$ {calculateTotal()}</h3>
      </div>
      <button onClick={clearCart} style={{ backgroundColor: "#dc3545", marginBottom: "10px" }}>
        Limpar Carrinho
      </button>
      <WhatsAppButton
        cart={cart}
        paymentMethod={paymentMethod}
        addToOrderHistory={addToOrderHistory}
        clearCart={clearCart}
      />
    </div>
  );
};

export default CartPage;