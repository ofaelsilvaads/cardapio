import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <img src="caminho/para/sua-logo.png" alt="Logo Alex Salgados" className="logo" />
        <h1>Alex Salgados</h1>
        <h2>Atendimento Delivery: Terça a Sábado das 15:30 às 20:00</h2>
        <button onClick={() => navigate("/products")}>Ver Produtos</button>
      </div>
    </div>
  );
};

export default Home;