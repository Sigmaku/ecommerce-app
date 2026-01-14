import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, Package, DollarSign, 
  TrendingUp, ShoppingBag, AlertCircle, 
  LogOut, Settings, RefreshCw, Eye,
  ChevronRight, Filter, Download, Search,
  Home, CreditCard, MessageSquare, FileText
} from 'lucide-react';

const AdminDashboard = ({ adminUser, onLogout }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStock: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Tambahkan useRef untuk timer
  const lastActivity = useRef(null);

  useEffect(() => {
    if (!adminUser || adminUser.role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    
    loadDashboardData();
    
    // Auto logout setelah 30 menit tidak aktif
    const handleActivity = () => {
      // Reset inactivity timer
      if (lastActivity.current) {
        clearTimeout(lastActivity.current);
      }
      
      lastActivity.current = setTimeout(() => {
        if (onLogout) {
          alert('Session expired due to inactivity');
          onLogout();
          navigate('/');
        }
      }, 30 * 60 * 1000); // 30 minutes inactivity
    };

    // Listen for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Initial timer
    handleActivity();

    return () => {
      if (lastActivity.current) {
        clearTimeout(lastActivity.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [adminUser, navigate, onLogout]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setStats({
        totalRevenue: 45289.99,
        totalOrders: 124,
        totalProducts: 45,
        totalUsers: 89,
        pendingOrders: 12,
        lowStock: 8
      });
      
      setRecentOrders([
        { id: 'ORD-001', customer: 'John Doe', amount: 1299.99, status: 'completed', date: '2024-01-15' },
        { id: 'ORD-002', customer: 'Jane Smith', amount: 2499.99, status: 'processing', date: '2024-01-15' },
        { id: 'ORD-003', customer: 'Bob Johnson', amount: 899.99, status: 'pending', date: '2024-01-14' },
        { id: 'ORD-004', customer: 'Alice Brown', amount: 1899.99, status: 'completed', date: '2024-01-14' },
        { id: 'ORD-005', customer: 'Charlie Wilson', amount: 3499.99, status: 'shipped', date: '2024-01-13' }
      ]);
      
      setRecentProducts([
        { id: 1, name: 'MacBook Pro M3', stock: 8, sales: 42, price: 2499.99 },
        { id: 2, name: 'iPhone 15 Pro', stock: 15, sales: 38, price: 1299.99 },
        { id: 3, name: 'Gaming PC RTX 4090', stock: 3, sales: 24, price: 3499.99 },
        { id: 4, name: 'Samsung S24 Ultra', stock: 12, sales: 31, price: 1199.99 },
        { id: 5, name: 'iPad Pro M2', stock: 20, sales: 28, price: 1099.99 }
      ]);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'pending': return 'warning';
      case 'shipped': return 'primary';
      default: return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, <span className="admin-name">{adminUser?.name}</span></p>
        </div>
        
        <div className="admin-header-right">
          <button className="btn-refresh" onClick={loadDashboardData}>
            <RefreshCw size={20} /> Refresh
          </button>
          
          <button className="btn-settings">
            <Settings size={20} />
          </button>
          
          <div className="admin-user-menu">
            <span className="admin-role">Administrator</span>
            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <div className="nav-section">
              <h3>MAIN</h3>
              <a href="/admin/dashboard" className="nav-link active">
                <BarChart3 size={20} /> Dashboard
              </a>
              <button className="nav-link" onClick={() => navigate('/admin/products')}>
                <Package size={20} /> Products
              </button>
            </div>
            
            <div className="nav-section">
              <h3>QUICK ACTIONS</h3>
              <button className="nav-link" onClick={() => navigate('/')}>
                <Home size={20} /> View Store
              </button>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="admin-main">
          {/* Stats Overview */}
          <div className="stats-grid">
            <div className="stat-card revenue">
              <div className="stat-icon">
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <h3>${stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
                <span className="stat-trend positive">+12.5%</span>
              </div>
            </div>
            
            <div className="stat-card orders">
              <div className="stat-icon">
                <ShoppingBag size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalOrders}</h3>
                <p>Total Orders</p>
                <span className="stat-trend positive">+8.3%</span>
              </div>
            </div>
            
            <div className="stat-card products">
              <div className="stat-icon">
                <Package size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalProducts}</h3>
                <p>Total Products</p>
                <span className="stat-trend">+2</span>
              </div>
            </div>
            
            <div className="stat-card users">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
                <span className="stat-trend positive">+15.7%</span>
              </div>
            </div>
            
            <div className="stat-card warning">
              <div className="stat-icon">
                <AlertCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.pendingOrders}</h3>
                <p>Pending Orders</p>
                <span className="stat-trend negative">Requires Action</span>
              </div>
            </div>
            
            <div className="stat-card warning">
              <div className="stat-icon">
                <AlertCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.lowStock}</h3>
                <p>Low Stock Items</p>
                <span className="stat-trend negative">Need Restock</span>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <div className="section-actions">
                <button className="btn-action">
                  <Filter size={18} /> Filter
                </button>
                <a href="/admin/orders" className="btn-view-all">
                  View All <ChevronRight size={18} />
                </a>
              </div>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <span className="order-id">
                          {order.id}
                        </span>
                      </td>
                      <td>{order.customer}</td>
                      <td>${order.amount.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <button className="btn-action-small" onClick={() => alert(`Viewing order ${order.id}`)}>
                          <Eye size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Product Performance */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Top Selling Products</h2>
              <button className="btn-view-all" onClick={() => alert('Product management coming soon!')}>
                Manage Products <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="products-grid">
              {recentProducts.map(product => (
                <div key={product.id} className="product-card-admin">
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>ID: {product.id}</p>
                    <div className="product-stats">
                      <span className="stat">
                        <DollarSign size={14} /> ${product.price.toFixed(2)}
                      </span>
                      <span className="stat">
                        <ShoppingBag size={14} /> {product.sales} sold
                      </span>
                      <span className={`stock ${product.stock < 5 ? 'low' : 'good'}`}>
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-action-small" onClick={() => alert(`Viewing product ${product.id}`)}>
                      <Eye size={16} />
                    </button>
                    <button className="btn-action-small" onClick={() => alert(`Editing product ${product.id}`)}>
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Quick Statistics</h2>
            </div>
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="stat-label">Avg. Order Value</span>
                <span className="stat-value">$365.24</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Conversion Rate</span>
                <span className="stat-value">3.2%</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Returning Customers</span>
                <span className="stat-value">42%</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Inventory Value</span>
                <span className="stat-value">$189,450</span>
              </div>
            </div>
          </div>
          
          {/* System Status */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>System Status</h2>
            </div>
            <div className="system-status">
              <div className="status-item online">
                <span className="status-dot"></span>
                <span>Database</span>
                <span className="status-text">Online</span>
              </div>
              <div className="status-item online">
                <span className="status-dot"></span>
                <span>API Server</span>
                <span className="status-text">Online</span>
              </div>
              <div className="status-item online">
                <span className="status-dot"></span>
                <span>Payment Gateway</span>
                <span className="status-text">Online</span>
              </div>
              <div className="status-item warning">
                <span className="status-dot"></span>
                <span>Backup System</span>
                <span className="status-text">Pending</span>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Session Timer */}
      <div className="session-timer">
        <span>Session expires in: <strong>30:00</strong></span>
      </div>
    </div>
  );
};

export default AdminDashboard;