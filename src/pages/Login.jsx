import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Home } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  // Di bagian handleSubmit Login.jsx - update:
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simpan nama dari input atau default
      const userName = document.querySelector('input[name="name"]')?.value || 'John Doe';
      
      const mockUser = {
        id: 1,
        name: userName,
        email: formData.email,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      if (onLogin) onLogin(mockUser);
      navigate('/');
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

// Tambahkan hidden input untuk nama di dalam form Login.jsx:
<form onSubmit={handleSubmit} className="login-form">
  {/* Hidden input untuk nama */}
  <input type="hidden" name="name" value="John Doe" />
  
  {/* ... rest of the form ... */}
</form>

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Back Button yang lebih baik */}
        <div className="login-header-actions">
          <Link to="/" className="back-home">
            <ArrowLeft size={20} /> 
            <span>Back to Store</span>
          </Link>
        </div>
        
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <span className="logo-red">NARS</span>STORE
            </div>
            <h1>Welcome Back!</h1>
            <p>Sign in to your account to continue shopping</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {errors.submit && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{errors.submit}</span>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">
                <Mail size={20} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                <Lock size={20} />
                <span>Password</span>
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-options">
              <label className="checkbox">
                <input type="checkbox" name="remember" />
                <span>Remember me for 30 days</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="btn-login-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In to Account'
              )}
            </button>
            
            <div className="divider">
              <span>or continue with</span>
            </div>
            
            <div className="login-options">
              <button type="button" className="btn-social btn-google">
                <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20" />
                Sign in with Google
              </button>
              <button type="button" className="btn-social btn-facebook">
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" width="20" height="20" />
                Sign in with Facebook
              </button>
            </div>
            
            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="register-link">
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;