import { Link } from "react-router-dom";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import logoImage from "../../images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import { AiOutlineLogout } from "react-icons/ai";

const SidebarWrapper = styled.div`
  top: 0;
  width: 13%;
  height: auto;
  // background-color: blue;
  padding: 16px 0px;
`;

const Button = styled.div`
  cursor: pointer;
  border: none;
  color: #ffffff;
  background: #3c00c200;
  padding: 0.5rem;
  font: inherit;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 600;
  border-radius: 4px;
  padding-right: 46px;
  &:hover {
    background: #ffffff;
    color: #3c00c2;
    border-top-left-radius: 41px 80px;
    border-bottom-left-radius: 60px 80px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Logo = styled.div`
  height: auto;
  // display: block;
  padding: 4px 4px 60px 4px;
  display: flex;
  justify-content: center;

  & img {
    margin: auto;
    height: 8rem;
    padding: 4px;
  }

  // & img{
  //   height:20px;
  // }
`;

const LogoutWrapper = styled.div`
  padding: 2px 12px;
`;

function SidebarNavigation() {
  const auth = useContext(AuthContext);
  return (
    <SidebarWrapper>
      {/* <div>Sidebar</div> */}
      <Logo>
        <img src={logoImage} alt="My Happy SVG" />
      </Logo>

      <nav style={{ height: "68%", justifyContent: "flex-start" }}>
        <NavLinks />
      </nav>
      {auth.isLoggedIn && (
        <ButtonWrapper>
          <Button onClick={auth.logout}>
            <div style={{"display": "flex"}}>
              <LogoutWrapper>
                <AiOutlineLogout />
              </LogoutWrapper>
              <div>Logout</div>
            </div>
          </Button>
        </ButtonWrapper>
      )}
    </SidebarWrapper>
  );
}

export default SidebarNavigation;
