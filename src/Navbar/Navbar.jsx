import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="nav">
     
        
      
          <ul className="container">
          <CustomLink to="/landing"><img src="./logo.png" alt="logo"></img></CustomLink> {/* Match the route path */}
        <CustomLink to="/">Login</CustomLink>
        <CustomLink to="/tasks">Tasks</CustomLink>     
          </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
