import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const Products = ({ addToCart, searchQuery = '' }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchQuery);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('default');
  
  // Load products
  useEffect(() => {
    console.log('Loading products:', productsData.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  // Apply filters
  useEffect(() => {
    let result = [...productsData];
    
    // Use searchQuery prop if provided, otherwise local search
    const currentSearchTerm = searchQuery || localSearchTerm;
    
    // Filter by search term
    if (currentSearchTerm) {
      const term = currentSearchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        (product.brand && product.brand.toLowerCase().includes(term))
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'All') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    console.log('Filtered products:', result.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredProducts(result);
  }, [localSearchTerm, categoryFilter, priceRange, sortBy, searchQuery]);

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
      alert(`Added ${product.name} to cart!`);
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Electronics Collection</h1>
        <p>Find the latest technology and premium gadgets</p>
      </div>
      
      {/* Search Bar */}
      <div className="products-search" style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '0 1rem'
      }}>
        <input
          type="text"
          placeholder="Search laptops, smartphones, PCs..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid #e63946',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
      </div>
      
      <div className="products-container">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
          </div>
          
          {/* Category Filter */}
          <div className="filter-section">
            <h4>Category</h4>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-filter ${categoryFilter === category ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Price Filter */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-filter">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          
          {/* Sort Options */}
          <div className="filter-section">
            <h4>Sort By</h4>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
          
          {/* Reset Filters */}
          <button 
            onClick={() => {
              setLocalSearchTerm('');
              setCategoryFilter('All');
              setPriceRange([0, 5000]);
              setSortBy('default');
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#2d3047',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginTop: '1rem',
              cursor: 'pointer'
            }}
          >
            Reset Filters
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                addToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
              <button 
                onClick={() => {
                  setLocalSearchTerm('');
                  setCategoryFilter('All');
                  setPriceRange([0, 5000]);
                  setSortBy('default');
                }}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#e63946',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Count */}
      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        color: '#6c757d'
      }}>
        Showing {filteredProducts.length} of {productsData.length} products
      </div>
    </div>
  );
};

export default Products;