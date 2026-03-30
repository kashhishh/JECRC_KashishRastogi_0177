import React from 'react';
import CartItem from './CartItem';

function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout, total, orderPlaced }) {
  return (
    <div className="cart">
      <h2>🧺 Your Cart</h2>

      {/* Order success message */}
      {orderPlaced && (
        <div className="order-success">
          ✅ Order placed successfully! Thank you for shopping!
        </div>
      )}

      {cartItems.length === 0 && !orderPlaced ? (
        <p className="empty-cart">Your cart is empty. Add some items!</p>
      ) : cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}

          {/* Total */}
          <div className="total">
            <strong>Total: ${total}</strong>
          </div>

          {/* Cart item count */}
          <div className="item-count">
            {cartItems.reduce((sum, i) => sum + i.quantity, 0)} item(s) in cart
          </div>

          {/* Action Buttons */}
          <div className="cart-actions">
            <button className="clear-btn" onClick={onClearCart}>
              🗑️ Clear Cart
            </button>
            <button className="checkout-btn" onClick={onCheckout}>
              ✅ Checkout
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Cart;