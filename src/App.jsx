import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  // Tentukan apakah header harus ditampilkan
  const showHeader = !['/login', '/register', '/admin', '/admin-login', '/admin/login', '/admin/dashboard'].includes(location.pathname);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    
    if (savedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Login handler
  const handleLogin = (userData) => {
    const mockUser = {
      id: 1,
      name: userData.name || 'John Doe',
      email: userData.email,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
  };

  // Admin login handler
  const handleAdminLogin = () => {
    const mockAdmin = {
      id: 999,
      name: 'Administrator',
      email: 'admin@narsstore.com',
      role: 'admin',
      permissions: ['manage_products', 'manage_orders', 'manage_users', 'view_analytics'],
      lastLogin: new Date().toISOString()
    };
    
    setUser(mockAdmin);
  };

  // Register handler
  const handleRegister = (userData) => {
    const mockUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    console.log('Registered:', mockUser);
  };``

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  // Add to cart function
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity >= (product.stock || 10)) {
          alert(`Maximum stock reached for ${product.name}`);
          return prevCart;
        }
        
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          quantity: 1,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock || 10) }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="app">
      {showHeader && (
        <Header 
          cartCount={cartCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      <main className={`main-content ${!showHeader ? 'no-header' : ''}`}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route 
            path="/products" 
            element={
              <Products 
                addToCart={addToCart}
                searchQuery={searchQuery}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetail addToCart={addToCart} />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
                cartTotal={cartTotal}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              user ? (
                <Checkout 
                  cart={cart}
                  cartTotal={cartTotal}
                  clearCart={clearCart}
                />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Register onRegister={handleRegister} />
              )
            } 
          />
          <Route 
            path="/admin" 
            element={
              user?.role === 'admin' ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <AdminLogin onAdminLogin={handleAdminLogin} />
              )
            } 
          />
          <Route 
            path="/admin-login" 
            element={
              user?.role === 'admin' ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <AdminLogin onAdminLogin={handleAdminLogin} />
              )
            } 
          />
          <Route 
            path="/admin/login" 
            element={
              user?.role === 'admin' ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <AdminLogin onAdminLogin={handleAdminLogin} />
              )
            } 
          />
          <Route 
            path="/admin/products" 
            element={
              user?.role === 'admin' ? (
                <ProductManagement adminUser={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />
          <Route 
            path="/admin/dashboard" 
            element={
              user?.role === 'admin' ? (
                <AdminDashboard 
                  adminUser={user} 
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/admin" />
              )
            } 
          />
          <Route path="/admin/*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {showHeader && <Footer />}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AppContent />
      )}
    </Router>
  );
}

export default App;