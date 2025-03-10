import React from "react";

const WhatsAppButton = ({
  cart,
  paymentMethod,
  addToOrderHistory,
  clearCart,
  deliveryOption,
  address,
}) => {
  const sendOrder = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    if (!paymentMethod) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    let message = "Olá, gostaria de fazer um pedido:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity}x - R$ ${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });

    message += `\nForma de Pagamento: ${paymentMethod}\n`;
    message += `\nLocal de Entrega: ${
      deliveryOption === "inside" ? "Condomínio Parque dos Sonhos" : "Motoboy da Uber"
    }\n`;
    message += `\nEndereço: ${address}\n`;

    const phoneNumber = "5511932938890"; // Substitua pelo número do WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Adicionar o pedido ao histórico
    addToOrderHistory({
      items: cart,
      paymentMethod,
      deliveryOption,
      address,
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    });

    // Limpar o carrinho
    clearCart();

    window.open(url, "_blank");
  };

  return <button onClick={sendOrder}>Enviar Pedido pelo WhatsApp</button>;
};

export default WhatsAppButton;