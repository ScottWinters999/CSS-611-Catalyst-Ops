import styled from "@emotion/styled";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

const NavBar = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: white;

  & li {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  & a {
    font-size: 20px;
    font-family: 'Roboto';
    font-weight: 600;

    padding: 0.5rem 3.5rem 0.5rem 1.5rem;
  }

  & a:hover,
  & a:active,
  & a.active {
    background: #ffffff;
    border-color: #292929;
    color: #264fc0;
    border-left-radius: 33px;
    border-top-left-radius: 41px 80px;
    border-bottom-left-radius: 60px 80px;
}
  }

  
`;

const NavLinks = () => {
  const auth = useContext(AuthContext);
  return (
    <NavBar>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/">HomePage</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/profilesearch">Profilesearch</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/userdashboard">Dashboard</NavLink>
        </li>
      )}
      
    </NavBar>
  );
};

export default NavLinks;
