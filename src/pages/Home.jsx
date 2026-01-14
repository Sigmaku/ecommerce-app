import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, Tag, CreditCard, RefreshCw, Laptop, Smartphone, Cpu, Wind } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

// Pilih beberapa produk unggulan untuk ditampilkan di halaman utama
const featuredProducts = productsData.filter(product => 
  ['Laptop', 'Smartphone', 'PC Desktop'].includes(product.category)
).slice(0, 6);

// Di Home.jsx - Update hero section:
const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Premium
            <span className="hero-highlight">Electronics</span>
            Store
          </h1>
          <p className="hero-subtitle">
            Temukan teknologi terbaru dengan performa maksimal. 
            Laptop, smartphone, PC, dan perangkat elektronik premium.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              Shop Electronics <ArrowRight size={20} />
            </Link>
            <Link to="/products?category=Laptop" className="btn-secondary">
              View Laptops
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661" 
            alt="Premium Electronics"
          />
        </div>
      </section>

      {/* Features Section - Update dengan tema elektronik */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>2-Year Warranty</h3>
            <p>Garansi resmi 2 tahun</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Truck size={32} />
            </div>
            <h3>Free Installation</h3>
            <p>Gratis instalasi AC & mesin cuci</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <CreditCard size={32} />
            </div>
            <h3>0% Installment</h3>
            <p>Cicilan 0% hingga 24 bulan</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <RefreshCw size={32} />
            </div>
            <h3>14-Day Returns</h3>
            <p>Garansi tukar 14 hari</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">
            View All Products <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Electronics Categories */}
      <section className="electronics-categories">
        <div className="section-header">
          <h2>Shop by Category</h2>
        </div>
        
        <div className="categories-grid">
          <Link to="/products?category=Laptop" className="category-card">
            <div className="category-icon">
              <Laptop size={40} />
            </div>
            <h3>Laptops</h3>
            <p>Premium & Gaming</p>
          </Link>
          
          <Link to="/products?category=Smartphone" className="category-card">
            <div className="category-icon">
              <Smartphone size={40} />
            </div>
            <h3>Smartphones</h3>
            <p>Flagship & Mid-range</p>
          </Link>
          
          <Link to="/products?category=PC+Desktop" className="category-card">
            <div className="category-icon">
              <Cpu size={40} />
            </div>
            <h3>PC Desktop</h3>
            <p>Gaming & Workstation</p>
          </Link>
          
          <Link to="/products?category=Air+Conditioner" className="category-card">
            <div className="category-icon">
              <Wind size={40} />
            </div>
            <h3>AC & Cooling</h3>
            <p>Inverter Technology</p>
          </Link>
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Summer Sale</h2>
          <p>Up to 50% off on selected items</p>
          <Link to="/products" className="btn-promo">
            Shop Sale
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;