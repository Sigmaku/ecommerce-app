import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import CartItem from '../components/CartItem';

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart, cartTotal }) => {
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">
          <ShoppingBag size={64} />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <Link to="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <h2>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</h2>
            <button className="clear-cart-btn" onClick={clearCart}>
              <Trash2 size={18} />
              Clear All
            </button>
          </div>
          
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${cartTotal > 100 ? '0.00' : '9.99'}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>
                ${(cartTotal + (cartTotal > 100 ? 0 : 9.99) + (cartTotal * 0.08)).toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="promo-code">
            <input type="text" placeholder="Enter promo code" />
            <button className="btn-promo">Apply</button>
          </div>
          
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
            <ArrowRight size={20} />
          </Link>
          
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;