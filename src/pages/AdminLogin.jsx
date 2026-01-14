import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, AlertCircle } from 'lucide-react';

const AdminLogin = ({ onAdminLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'narsadmin2024'
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        }
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        // Do nothing
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.username === ADMIN_CREDENTIALS.username && 
          formData.password === ADMIN_CREDENTIALS.password) {
        
        const adminUser = {
          id: 999,
          name: 'Administrator',
          email: 'admin@narsstore.com',
          role: 'admin',
          permissions: ['manage_products', 'manage_orders', 'manage_users', 'view_analytics'],
          lastLogin: new Date().toISOString()
        };
        
        if (onAdminLogin) onAdminLogin(adminUser);
        navigate('/admin/dashboard');
        
      } else {
        setError('Invalid credentials. Access denied.');
      }
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-secret">
      <div className="admin-login-wrapper">
        <div className="admin-login-modal">
          <div className="admin-login-icon">
            <Shield size={52} /> {/* Diperbesar */}
          </div>
          
          <h1 className="admin-login-title">Admin Authentication Portal</h1>
          <p className="admin-login-subtitle">
            Restricted Access Area • Authorized Personnel Only<br />
            All activities are monitored and logged
          </p>
          
          {error && (
            <div className="admin-error">
              <AlertCircle size={22} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label>Administrator Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                autoComplete="off"
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label>Security Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter security password"
                autoComplete="off"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-admin-auth"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Authenticating...
                </>
              ) : (
                'Authenticate & Access Dashboard'
              )}
            </button>
            
            <div className="security-info">
              <Lock size={16} />
              <span>• Secure SSL Encryption • All Access Attempts Logged •</span>
            </div>
          </form>
          
          <div className="back-to-store">
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="btn-back"
            >
              ← Return to Public Store
            </button>
          </div>
        </div>
      </div>
      
      <div className="hidden-admin-note" style={{display: 'none'}}>
        NARSSTORE ADMIN PORTAL v2.4
      </div>
    </div>
  );
};

export default AdminLogin;