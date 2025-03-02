import React from "react";
import BolinhoDeQueijo from "../assets/bolinho de queijo.jpg"; // Importe a imagem
import carne from "../assets/carne.jpg";
import carneseca from "../assets/carneseca.jpg";
import coxinha from "../assets/coxinha.jpg";
import logo from "../assets/logo.jpg";
import presuntequeijo from "../assets/presuntoequeijo.jpg"
import coxinhacatupiry from "../assets/coxinhacatupiry.jpg"

const products = [
  {
    id: 1,
    name: "Coxinha de Frango",
    description: "110g",
    price: 7,
    image: coxinha, // Substitua pelo caminho correto
  },
  {
    id: 2,
    name: "Coxinha de Frango c/ Catupiry",
    description: "120g",
    price: 8,
    image: coxinhacatupiry // Substitua pelo caminho correto
  },
  {
    id: 3,
    name: "Coxinha de Carne Seca c/ Catupiry",
    description: "120g",
    price: 10,
    image: carneseca // Substitua pelo caminho correto
  },
  {
    id: 4,
    name: "Bolinha de Queijo",
    description: "110g",
    price: 7,
    image: BolinhoDeQueijo, // Use a imagem importada
  },
  {
    id: 5,
    name: "Salgado Presunto e Queijo",
    description: "110g",
    price: 7,
    image: presuntequeijo, // Substitua pelo caminho correto
  },
  {
    id: 6,
    name: "Bolinho de Carne",
    description: "110g",
    price: 7,
    image: carne, // Substitua pelo caminho correto
  },
  
];

const ProductList = ({ addToCart }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>R$ {product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;