import { Link } from "react-router-dom";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import logoImage from "../../images/logo.svg";



const SidebarWrapper = styled.div`
  top: 0;
  width: 15%;
  height: auto;
  // background-color: blue;
  padding: 16px 0px;
`;



const Logo = styled.div`
  height: auto;
  // display: block;
  padding: 4px 4px 60px 4px;
  display: flex;
  justify-content: center;

  & img{
    margin: auto;
    height: 8rem;
    padding:4px
  }

  // & img{
  //   height:20px;
  // }
`;

function SidebarNavigation() {
  return (
    <SidebarWrapper>
      {/* <div>Sidebar</div> */}
      <Logo>
        <img src={logoImage} alt="My Happy SVG" />
      </Logo>

      <nav>
        <NavLinks/>
      </nav>
    </SidebarWrapper>
  );
}

export default SidebarNavigation;
