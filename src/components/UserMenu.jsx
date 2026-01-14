import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ShoppingBag, Mail, ChevronDown } from 'lucide-react';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    setIsOpen(false);
    navigate('/');
  };

  // Ambil inisial untuk avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format nama untuk ditampilkan
  const getDisplayName = () => {
    if (!user || !user.name) return 'User';
    
    // Jika admin, tampilkan "Admin"
    if (user.role === 'admin') return 'Admin';
    
    // Ambil nama pertama saja
    const firstName = user.name.split(' ')[0];
    return firstName.length > 12 ? `${firstName.substring(0, 12)}...` : firstName;
  };

  // Warna avatar berdasarkan role
  const getAvatarColor = () => {
    if (user?.role === 'admin') return 'bg-red-500';
    return 'bg-primary-red';
  };

  return (
    <div className="user-menu">
      {user ? (
        <div className="relative">
          <button 
            className="user-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`user-avatar ${getAvatarColor()}`}>
              {getInitials(user.name)}
            </span>
            <span className="user-name">{getDisplayName()}</span>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="dropdown-menu">
              {/* User Info Section */}
              <div className="user-info-section">
                <div className="user-avatar-large">
                  {getInitials(user.name)}
                </div>
                <div className="user-details">
                  <h4 className="user-fullname">{user.name || 'User'}</h4>
                  <div className="user-email">
                    <Mail size={14} />
                    <span>{user.email || 'No email'}</span>
                  </div>
                  {user.role === 'admin' && (
                    <span className="user-role-badge">Administrator</span>
                  )}
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              {/* Menu Items */}
              <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <User size={18} />
                <span>My Profile</span>
              </Link>
              
              <Link to="/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <ShoppingBag size={18} />
                <span>My Orders</span>
                <span className="badge">3</span>
              </Link>
              
              <Link to="/wishlist" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>Wishlist</span>
                <span className="badge">5</span>
              </Link>
              
              <Link to="/settings" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Settings size={18} />
                <span>Settings</span>
              </Link>
              
              {user.role === 'admin' && (
                <>
                  <div className="dropdown-divider"></div>
                  <Link to="/admin/dashboard" className="dropdown-item admin-item" onClick={() => setIsOpen(false)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>Admin Dashboard</span>
                  </Link>
                </>
              )}
              
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="btn-login">
          <User size={20} />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default UserMenu;