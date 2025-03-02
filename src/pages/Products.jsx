import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/productList";
import "../styles.css";
import logo from "../assets/logo.jpg";

const Products = ({ addToCart, cart }) => {
  const navigate = useNavigate();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000); // Mensagem desaparece após 2 segundos
  };

  return (

    <div class="container">

        <div class="fundo-logo">
            <div className="home-content">
            <img src={logo} alt="Logo Alex Salgados" className="logo" />
            <h1>Alex Salgados</h1>
            <h2>Atendimento Delivery:<br></br> Terça a Sábado das 15:30 às 20:00</h2>
        </div>

        </div>

         <div className="products-container">
        
        <button onClick={() => navigate("/cart")} className="cart-button">
          Ver Carrinho ({cart.length})
        </button>
  
        {/* Mensagem de produto adicionado */}
        {showAddedMessage && (
          <div className="added-message">
            Produto adicionado ao carrinho!
          </div>
        )}
  
        {/* Lista de Produtos */}
        <ProductList addToCart={handleAddToCart} />
      </div>

      <div class="text">
        <a href="incodet.com">Desenvolvido por Incodet</a>
      </div>

    </div>        
    

   
  );
};

export default Products;