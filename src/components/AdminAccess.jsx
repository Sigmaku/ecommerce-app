import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Secret redirect mechanism
    const checkSecretCode = () => {
      // Bisa ditambahkan mechanism khusus
      // Misal: cek localStorage atau URL params
      
      const secret = localStorage.getItem('admin_secret');
      if (secret === 'nars-admin-2024') {
        navigate('/admin');
      } else {
        navigate('/');  
      } 
    };

    checkSecretCode();
  }, [navigate]);

  return (
    <div style={{ display: 'none' }}>
      {/* Hidden component */}
    </div>
  );
};

export default AdminAccess;