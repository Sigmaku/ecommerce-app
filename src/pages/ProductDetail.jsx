import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import productsData from '../data/products.json';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const itemToAdd = {
      ...product,
      quantity: quantity
    };
    
    addToCart(itemToAdd);
    
    // Show notification or feedback
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    const itemToAdd = {
      ...product,
      quantity: quantity
    };
    
    addToCart(itemToAdd);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate('/products')} className="back-button">
        <ArrowLeft size={20} /> Back to Products
      </button>
      
      <div className="product-detail-container">
        <div className="product-images-section">
          <div className="main-image">
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
              }}
            />
          </div>
        </div>
        
        <div className="product-info-section">
          <div className="product-header">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                    stroke={i < Math.floor(product.rating) ? "#fbbf24" : "#d1d5db"}
                  />
                ))}
                <span className="rating-text">({product.rating})</span>
              </div>
            </div>
          </div>
          
          <div className="product-price-section">
            <span className="current-price">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="product-description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-specs-section">
            <h3>Specifications</h3>
            <div className="specs-list">
              {product.specs?.map((spec, index) => (
                <div key={index} className="spec-item">
                  {spec}
                </div>
              ))}
            </div>
            
            <div className="brand-info">
              <h4>Brand: {product.brand}</h4>
              <div className="warranty-info">
                <Shield size={20} />
                <span>2 Year Manufacturer Warranty</span>
              </div>
            </div>
          </div>
          
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button
                className="quantity-btn minus"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1 && value <= product.stock) {
                    setQuantity(value);
                  }
                }}
                className="quantity-input"
              />
              <button
                className="quantity-btn plus"
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="action-buttons-section">
            <button
              className="btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            
            <button
              className="btn-secondary buy-now-btn"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>
          
          <div className="features-section">
            <div className="feature-item">
              <Truck size={24} />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders over $100</p>
              </div>
            </div>
            <div className="feature-item">
              <Shield size={24} />
              <div>
                <h4>30-Day Returns</h4>
                <p>Money back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;