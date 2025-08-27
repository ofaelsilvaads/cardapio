import React, { useState, useEffect } from "react";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://sheetdb.io/api/v1/l2q58cg2rt0g4");
        const data = await response.json();
        
        // Debug: verifique os dados no console
        console.log("Dados da planilha:", data);

        // Verifica as colunas reais (pode ser case sensitive)
        const sampleProduct = data[0];
        const disponivelKey = Object.keys(sampleProduct).find(key => 
          key.toLowerCase().includes('dispon') || key.toLowerCase().includes('available')
        );
        
        const nomeKey = Object.keys(sampleProduct).find(key => 
          key.toLowerCase().includes('nome') || key.toLowerCase().includes('name')
        );
        
        const precoKey = Object.keys(sampleProduct).find(key => 
          key.toLowerCase().includes('preço') || key.toLowerCase().includes('price') || key.toLowerCase().includes('preco')
        );
        
        const imagemKey = Object.keys(sampleProduct).find(key => 
          key.toLowerCase().includes('imagem') || key.toLowerCase().includes('image')
        );
        
        const idKey = Object.keys(sampleProduct).find(key => 
          key.toLowerCase().includes('id')
        );

        console.log("Chaves encontradas:", { disponivelKey, nomeKey, precoKey, imagemKey, idKey });

        // Filtra produtos disponíveis
        const availableProducts = data.filter((product) => {
          const disponivelValue = product[disponivelKey] ? product[disponivelKey].toString().toLowerCase().trim() : '';
          const isAvailable = disponivelValue === "sim" || 
                             disponivelValue === "yes" ||
                             disponivelValue === "true";
          
          return isAvailable && product[nomeKey] && product[precoKey];
        });

        console.log("Produtos disponíveis:", availableProducts);

        // Formata os produtos
        const formattedProducts = availableProducts.map((product) => {
          // Limpa e converte o preço
          let priceValue = 0;
          try {
            const priceString = product[precoKey].toString();
            priceValue = parseFloat(
              priceString
                .replace('R$', '')
                .replace(',', '.')
                .replace(/[^\d.]/g, '')
                .trim()
            );
          } catch (error) {
            console.error("Erro ao converter preço:", product[precoKey]);
          }

          return {
            id: product[idKey] || Math.random(),
            name: product[nomeKey],
            description: product.Descrição || product.descricao || "",
            price: priceValue || 0, // Garante que sempre tenha um valor
            image: product[imagemKey],
            available: true
          };
        });

        setProducts(formattedProducts);
        setLoading(false);

      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="products-list">
      {products.length === 0 ? (
        <div className="no-products">
          <p>Nenhum produto disponível no momento.</p>
          <p>Verifique o console para detalhes (F12 → Console)</p>
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  // Fallback seguro usando data URI (SVG inline)
                  e.target.onerror = null; // Previne loop infinito
                  e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iMC4zNWVtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZpbGw9IiM2NjYiPjx0c3BhbiBkeT0iLTAuNWVtIj5JbWFnZW08L3RzcGFuPjx0c3BhbiBkeT0iMC43ZW0iPm7Dg28gZGlzcG9uw612ZWw8L3RzcGFuPjwvdGV4dD48L3N2Zz4=`;
                  e.target.style.opacity = "0.8";
                }}
              />
            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;