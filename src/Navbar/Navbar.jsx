import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="nav">
     
        
      
          <ul >
          <CustomLink to="/landing"><img className="logo" src="./logo.png" alt="logo"></img></CustomLink> {/* Match the route path */}
        <CustomLink to="/login">Diary</CustomLink>
        <CustomLink to="/todo">To-Do List</CustomLink>     
        <CustomLink to="/pomodoro">Pomodoro App</CustomLink>  
        
          </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
      <div className="list">
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
            </li>
            </div>
  );
}