import { Link } from "react-router-dom";

function SidebarNavigation() {
  return (
    <header>
      <div>Sidebar</div>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default SidebarNavigation;
