import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/productList";
import "../styles.css";
import logo from "../assets/logo.jpg";
import { FaShoppingCart } from "react-icons/fa"; // Ícone de carrinho
import { FaStar } from "react-icons/fa";

const Products = ({ addToCart, cart }) => {
  const navigate = useNavigate();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000); // Mensagem desaparece após 2 segundos
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Alex Salgados</h1>
        </div>
        <div className="navbar-right" onClick={() => navigate("/cart")}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cart.length}</span>
        </div>
      </nav>

      <div className="fundo-logo">
        <div className="home-content">
          <img src={logo} alt="Logo Alex Salgados" className="logo" />
          <p className="avaliação">Avaliação<br></br> <FaStar className="avaliacao"/>
          <FaStar className="avaliacao"/>
          <FaStar className="avaliacao"/>
          <FaStar className="avaliacao"/>
          <FaStar className="avaliacao"/> (5.0)</p>
          <h2>Atendimento Delivery:<br></br> Terça a Sábado das 15:30 às 20:00</h2>
        </div>
      </div>

      <div className="products-container">
        {/* Mensagem de produto adicionado */}
        {showAddedMessage && (
          <div className="added-message">
            Produto adicionado ao carrinho!
          </div>
        )}

        {/* Lista de Produtos */}
        <ProductList addToCart={handleAddToCart} />
      </div>

      <div className="text">
        <a href="incodet.com">Desenvolvido por Incodet</a>
      </div>
    </div>
  );
};

export default Products;