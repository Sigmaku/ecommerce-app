import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, Truck, Shield } from 'lucide-react';

const Checkout = ({ cart, cartTotal, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [cart, navigate, orderComplete]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.match(/^\d{5}$/)) newErrors.zipCode = 'Valid ZIP code required';
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Valid 16-digit card number required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiryDate = 'MM/YY format required';
    if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = 'CVV required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order ID
      const generatedOrderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      setOrderId(generatedOrderId);
      
      // Mark order as complete
      setOrderComplete(true);
      
      // Clear cart after successful order
      setTimeout(() => {
        if (clearCart) clearCart();
      }, 1000);
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const shippingCost = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + tax;

  if (orderComplete) {
    return (
      <div className="checkout-success-page">
        <div className="success-container">
          <div className="success-icon">
            <CheckCircle size={80} color="#10b981" />
          </div>
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="order-details">
            <div className="order-detail-item">
              <span className="detail-label">Order Number:</span>
              <span className="detail-value">{orderId}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value">${grandTotal.toFixed(2)}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Estimated Delivery:</span>
              <span className="detail-value">3-5 business days</span>
            </div>
          </div>
          <div className="success-actions">
            <button 
              className="btn-primary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/orders')}
            >
              View Order Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart-checkout">
        <h2>Your cart is empty</h2>
        <p>Please add items to your cart before proceeding to checkout.</p>
        <button 
          className="btn-primary"
          onClick={() => navigate('/products')}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <span className="step active">Cart</span>
          <span className="step active">Information</span>
          <span className="step">Payment</span>
          <span className="step">Review</span>
        </div>
      </div>
      
      <div className="checkout-container">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Shipping Information */}
            <section className="form-section">
              <h2 className="section-title">
                <Truck size={24} />
                Shipping Information
              </h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="John"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Doe"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Shipping Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="123 Main Street"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                    placeholder="New York"
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? 'error' : ''}
                    placeholder="NY"
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={errors.zipCode ? 'error' : ''}
                    placeholder="10001"
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>
              </div>
            </section>
            
            {/* Payment Information */}
            <section className="form-section">
              <h2 className="section-title">
                <CreditCard size={24} />
                Payment Details
              </h2>
              
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="cardName">Name on Card *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={errors.cardName ? 'error' : ''}
                  placeholder="John Doe"
                />
                {errors.cardName && <span className="error-message">{errors.cardName}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date (MM/YY) *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={errors.expiryDate ? 'error' : ''}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={errors.cvv ? 'error' : ''}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
            </section>
            
            {/* Submit Button */}
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-order-btn"
                disabled={isSubmitting || cart.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  `Pay $${grandTotal.toFixed(2)}`
                )}
              </button>
              
              <button 
                type="button"
                className="back-to-cart-btn"
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="order-summary-container">
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">× {item.quantity}</span>
                  </div>
                  <span className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="security-notice">
              <Lock size={18} />
              <span>Secure SSL encryption</span>
            </div>
            
            <div className="guarantee-notice">
              <Shield size={18} />
              <span>30-day money back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;