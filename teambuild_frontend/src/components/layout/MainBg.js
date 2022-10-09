import styled from "@emotion/styled";
import React from "react";
import classes from "./MainBg.module.css";
import Vector from "../../images/Vector.svg";




const MainBgWrapper = styled.div`
  background-image: url(${Vector});
  background-repeat: no-repeat;
  position: absolute;
  transform: translateX(400px);
  width: 864px;
  height: 100vh;
  top: 0;
  right: 410px;
  z-index: -1;
`;

function MainBg(props) {
  return (
    <React.Fragment>
      <MainBgWrapper/>
      <div>{props.children}</div>
     
    </React.Fragment>
  );
}

export default MainBg;
