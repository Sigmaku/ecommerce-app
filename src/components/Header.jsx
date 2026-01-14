import { Link } from 'react-router-dom';
import { useState } from 'react';
import UserMenu from './UserMenu';

const Header = ({ cartCount, searchQuery, setSearchQuery, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-red">NARS</span>STORE
        </Link>
        
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Products
          </Link>
          <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Cart
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="nav-link admin-link" onClick={() => setMobileMenuOpen(false)}>
              Admin
            </Link>
          )}
        </nav>
        
        <div className="header-actions">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
          
          <Link to="/cart" className="cart-icon">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
          
          {/* UserMenu menerima user dan onLogout */}
          <UserMenu user={user} onLogout={onLogout} />
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;