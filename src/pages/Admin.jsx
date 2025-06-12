import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ManageBlog from './admin/ManageBlog';
import ManageInventory from './admin/ManageInventory';
import './Admin.css';
import { useAuth } from '../hooks/useAuth';

const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <Link to="/admin/blog" className="admin-link">Gestionar Blog</Link>
        <Link to="/admin" className="admin-link">Admin Profile</Link>
        <Link to="/admin/inventory" className="admin-link">Gestionar Inventario</Link>
      </nav>
      <Routes>
        <Route path="blog" element={<ManageBlog />} />
        <Route path="inventory" element={<ManageInventory />} />
      </Routes>
    </div>
  );
};

export default Admin;
