import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Rick & Morty</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/busqueda">Búsqueda</Link>
        </li>
        <li>
          <Link to="/estatica">Página Estática</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
