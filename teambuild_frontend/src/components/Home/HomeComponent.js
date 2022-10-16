import styled from "@emotion/styled";
import Card from "../UI/Card";
import logoImage from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
const OuterContainerWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
`;

const InnerContainerWrapper = styled.div`
  // height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.div`
  height: auto;
  display: block;
  padding: 4px 4px 4px 4px;
  display: flex;
  justify-content: center;
`;

const WelcomeWrapper = styled.div`
  padding: 2px 4px 24px 4px;
  font-family: "Roboto", sans-serif;
  color: white;
  font-weight: 700;
  font-size: 58px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: auto;
`;

const Button = styled.button`
  background: linear-gradient(#f7f7faa3, #244bc5);
  width: 30%;
  height: 48px;
  border: 1px solid #244bc5;
  border-radius: 40px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: linear-gradient(#ccccf5a3, #153086);
  }
`;

const HomeComponent = () => {
  const authCtx = useContext(AuthContext);
  let nextroute;
  console.log(authCtx.isLoggedIn)
  if(authCtx.isLoggedIn){
    nextroute = "userdashboard"
  }
  else{
    nextroute = "login"
  } 
  return (
    <OuterContainerWrapper>
      <InnerContainerWrapper>
        <Logo>
          <img src={logoImage} alt="My Happy SVG" />
        </Logo>
        <WelcomeWrapper> Welcome to catalyst ops</WelcomeWrapper>
        <Link to={`/${nextroute}`} style={{ textDecoration:'none' }}>
          <ButtonWrapper>
            <Button>GET STARTED</Button>
          </ButtonWrapper>
        </Link>
      </InnerContainerWrapper>
    </OuterContainerWrapper>
  );
};

export default HomeComponent;
