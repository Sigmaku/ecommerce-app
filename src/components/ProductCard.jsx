import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart(product);
      // Feedback visual
      e.target.classList.add('added');
      setTimeout(() => {
        e.target.classList.remove('added');
      }, 300);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop';
              e.target.onerror = null;
            }}
          />
          {product.brand && (
            <span className="product-badge">{product.brand}</span>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <span className="stock-badge">Only {product.stock} left</span>
          )}
        </div>
        
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">
            {product.description.length > 60 
              ? `${product.description.substring(0, 60)}...` 
              : product.description}
          </p>
          
          <div className="product-rating">
            <span className="rating-stars">
              {Array(5).fill().map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating || 4) ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
            </span>
            <span className="rating-text">({product.rating || 4.0})</span>
          </div>
          
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </Link>
      
      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <span className="cart-icon">🛒</span>
        <span className="btn-text">
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </span>
      </button>
    </div>
  );
};

export default ProductCard;