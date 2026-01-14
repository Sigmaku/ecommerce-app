import { useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  
  // Hide footer on login and admin pages
  const noFooterPaths = [
    '/login',
    '/register',
    '/admin',
    '/admin-login',
    '/admin/login',
    '/admin/dashboard'
  ];
  
  if (noFooterPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-red">NARS</span>STORE
          </div>
          <p className="footer-description">
            Your premier destination for modern shopping experience. 
            Quality products with exceptional service.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><Facebook size={20} /></a>
            <a href="#" className="social-link"><Twitter size={20} /></a>
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/products">All Products</a></li>
            <li><a href="/cart">Shopping Cart</a></li>
            <li><a href="/checkout">Checkout</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul className="footer-links">
            <li><a href="/products?category=Laptop">Laptops</a></li>
            <li><a href="/products?category=Smartphone">Smartphones</a></li>
            <li><a href="/products?category=PC+Desktop">PC Desktop</a></li>
            <li><a href="/products?category=Tablet">Tablets</a></li>
            <li><a href="/products?category=Air+Conditioner">AC & Cooling</a></li>
            <li><a href="/products?category=Washing+Machine">Home Appliances</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <Mail size={16} />
              <span>support@modernstore.com</span>
            </li>
            <li>
              <MapPin size={16} />
              <span>123 Business Ave, City, Country</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} ModernStore. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/shipping">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;