import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>StoreFront</div>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart ({items.length})</NavLink>
        {user ? (
          <>
            <NavLink to="/orders">Orders</NavLink>
            {user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
            <button className="button-secondary" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
