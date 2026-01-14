import { useState, useEffect } from 'react'; // TAMBAH useEffect DI SINI
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Header = ({ cartCount, searchQuery, setSearchQuery, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.nav') && !event.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

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
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        
        {/* Desktop Nav */}
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Products
          </Link>
          <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Cart {cartCount > 0 && <span className="cart-count-mobile">({cartCount})</span>}
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="nav-link admin-link" onClick={() => setMobileMenuOpen(false)}>
              Admin
            </Link>
          )}
        </nav>
        
        <div className="header-actions">
          {/* Desktop Search - Hidden on Mobile */}
          <form onSubmit={handleSearch} className="search-form desktop-search">
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
          
          <UserMenu user={user} onLogout={onLogout} />
        </div>
        
        {/* Mobile Search Form */}
        <form onSubmit={handleSearch} className="search-form mobile-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
          <button 
            type="button" 
            className="close-search"
            onClick={() => {
              const searchInput = document.querySelector('.search-form.mobile-search');
              if (searchInput) searchInput.style.display = 'none';
            }}
          >
            ✕
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;