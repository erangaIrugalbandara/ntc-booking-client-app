import React from 'react';

const CheckoutPage = () => {
  const handlePayLater = () => {
    alert('Seat booking completed!');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button>Pay Now</button>
      <button onClick={handlePayLater}>Pay Later</button>
    </div>
  );
};

export default CheckoutPage;