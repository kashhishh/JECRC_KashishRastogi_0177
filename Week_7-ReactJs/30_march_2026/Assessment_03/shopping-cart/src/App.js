import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

const PRODUCTS = [
  { id: 1, name: ' T-Shirt', price: 25 },
  { id: 2, name: ' Hoodie', price: 45 },
  { id: 3, name: ' Cap', price: 15 },
  { id: 4, name: ' Mug', price: 12 },
  {id: 5, name: ' Backpack', price: 60 },
  {id: 6, name: ' Sneakers', price: 80 },
  {id: 7, name: ' Jeans', price: 50 },
  {id: 8, name: ' Sunglasses', price: 30 },
  {id: 9, name: ' Watch', price: 120 },
  {id: 10, name: ' Jacket', price: 100 },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setOrderPlaced(false);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setOrderPlaced(false);
  };

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
    setCartItems([]);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <h1>🛒 React Shopping Cart</h1>
      <div className="layout">
        <ProductList products={PRODUCTS} onAddToCart={addToCart} />
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
          total={total}
          orderPlaced={orderPlaced}
        />
      </div>
    </div>
  );
}

export default App;