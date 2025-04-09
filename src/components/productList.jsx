import React, { useState, useEffect } from "react";
import BolinhoDeQueijo from "../assets/bolinho de queijo.jpg"; // Importe a imagem
import carne from "../assets/carne.jpg";
import carneseca from "../assets/carneseca.jpg";
import coxinha from "../assets/coxinha.jpg";
import presuntequeijo from "../assets/presuntoequeijo.jpg";
import coxinhacatupiry from "../assets/coxinhacatupiry.jpg";

// Lista de produtos com as imagens locais
const localProducts = [
  {
    id: 1,
    name: "Coxinha de Frango",
    description: "110g Consultar disponibilidade",
    price: 7,
    image: coxinha,
  },
  {
    id: 2,
    name: "Coxinha de Frango c/ Catupiry",
    description: "120g",
    price: 8,
    image: coxinhacatupiry,
  },
  {
    id: 3,
    name: "Coxinha de Carne Seca c/ Catupiry",
    description: "120g",
    price: 10,
    image: carneseca,
  },
  {
    id: 4,
    name: "Bolinha de Queijo",
    description: "110g",
    price: 7,
    image: BolinhoDeQueijo,
  },
  {
    id: 5,
    name: "Salgado Presunto e Queijo",
    description: "110g",
    price: 7,
    image: presuntequeijo,
  },
  {
    id: 6,
    name: "Bolinho de Carne",
    description: "110g",
    price: 7,
    image: carne,
  },
];

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // URL da API gerada pelo sheet.best
    const sheetUrl = "https://sheetdb.io/api/v1/l2q58cg2rt0g4";

    // Busca os dados da planilha
    fetch(sheetUrl)
      .then((response) => response.json())
      .then((data) => {
        // Filtra apenas os produtos disponíveis
        const availableProducts = data.filter((product) => product.Disponível === "Sim");

        // Combina os dados da planilha com as imagens locais
        const updatedProducts = localProducts.map((localProduct) => {
          const productAvailability = availableProducts.find(
            (product) => product.ID === localProduct.id.toString()
          );
          return {
            ...localProduct,
            available: productAvailability ? true : false,
          };
        });

        // Filtra os produtos que estão disponíveis
        const filteredProducts = updatedProducts.filter((product) => product.available);
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Erro ao buscar os produtos:", error);
      });
  }, []);

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