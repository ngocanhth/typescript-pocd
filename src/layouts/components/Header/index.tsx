import { Link } from "react-router-dom";

export interface HeaderProps {
}

export function Header (props: HeaderProps) {
  return (
          <header className="header">
                <div className="container">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/styleguides">Styleguides</Link>
                <Link to="/register">Register</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/404-page-test">page not found</Link>
                </div>
            </header>
  );
}
