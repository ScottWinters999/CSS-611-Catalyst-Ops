import styled from "@emotion/styled";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { BsSearch } from "react-icons/bs";
import { MdOutlineDashboardCustomize ,MdPortrait,MdPeopleAlt} from "react-icons/md";
// import { MdPeopleAlt }

import { AiOutlineEye } from "react-icons/ai";

import { TbRobot } from "react-icons/tb";

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
    display: flex;
    // justify-content: flex-end;
    // padding-right:20px;
    width: 100%;
    
  }

  & a {
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: 600;
    width: 100%;
    padding: 4px 6px 6px 28px;
  }

  & a:hover,
  & a:active,
  & a.active {
    background: #ffffff;
    border-color: #292929;
    color: #264fc0;
    border-left-radius: 33px;
    border-top-left-radius: 60px 80px;
    border-bottom-left-radius: 60px 80px;
}
  }



  
`;

const LinkName = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const LinkNameInner = styled.div`
  padding-left: 18px;
  padding-top: 4px;
`;
const NavLinkWrapper = styled.div`
  width: 100%;
`;

const NavLinks = () => {
  const auth = useContext(AuthContext);
  return (
    <NavBar>
      {!auth.isLoggedIn && (
        <NavLinkWrapper>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </NavLinkWrapper>
      )}
      {/* {auth.isLoggedIn && (
        <NavLinkWrapper>
          <li>
            <NavLink to="/search">
              <LinkName>
                <div>
                  <BsSearch   style={{"height": "24px","width": "24px"}}/>
                </div>
                <LinkNameInner>Searches</LinkNameInner>
              </LinkName>
            </NavLink>
          </li>
        </NavLinkWrapper>
      )} */}
      {auth.isLoggedIn && (
        <NavLinkWrapper>
          <li>
            <NavLink to="/userdashboard">
              <LinkName>
                <div>
                  <MdOutlineDashboardCustomize  style={{"height": "24px","width": "24px"}} />
                </div>
                <LinkNameInner>Dashboard</LinkNameInner>
              </LinkName>
            </NavLink>
          </li>
        </NavLinkWrapper>
      )}
      {auth.isLoggedIn && (
        <NavLinkWrapper>
          <li>
            <NavLink to="/profilesearch">
              <LinkName>
                <div>
                  <MdPortrait   style={{"height": "24px","width": "24px"}}/>
                </div>
                <LinkNameInner>Profile Matches</LinkNameInner>
              </LinkName>
            </NavLink>
          </li>
        </NavLinkWrapper>
      )}
      {auth.isLoggedIn && (
        <NavLinkWrapper>
          <li>
            <NavLink to="/profileviews">
              <LinkName>
                <div>
                <MdPeopleAlt   style={{"height": "24px","width": "24px"}}/>
                </div>
                <LinkNameInner>Profile Views</LinkNameInner>
              </LinkName>
            </NavLink>
          </li>
        </NavLinkWrapper>
      )}
      {auth.isLoggedIn && (
        <NavLinkWrapper>
          <li>
            <NavLink to="/userchat">
              <LinkName>
                <div>
                  <TbRobot style={{"height": "24px","width": "24px"}} />
                </div>
                <LinkNameInner>Caty</LinkNameInner>
              </LinkName>
            </NavLink>
          </li>
        </NavLinkWrapper>
      )}
    </NavBar>
  );
};

export default NavLinks;
