import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <h1>Student PG & Roommate Finder</h1>
      <nav>
        <Link to="/pgs">PG Listings</Link>
        {user?.role === 'student' && <Link to="/matches">Roommate Matches</Link>}
        {user?.role === 'owner' && <Link to="/owner">Owner Dashboard</Link>}
        {user?.role === 'student' && <Link to="/student">Student Dashboard</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button type="button" onClick={logout} className="secondary-btn">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
