import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const subtotal = item.price * item.quantity;

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-info">
        <Link to={`/product/${item.id}`} className="cart-item-title">
          {item.name}
        </Link>
        <p className="cart-item-category">{item.category}</p>
        
        <div className="cart-item-price">
          ${item.price.toFixed(2)} × {item.quantity} = 
          <span className="subtotal"> ${subtotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
          >
            <Minus size={16} />
          </button>
          
          <span className="quantity">{item.quantity}</span>
          
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(1)}
            disabled={item.quantity >= (item.stock || 10)}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button 
          className="remove-btn"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 size={18} />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;