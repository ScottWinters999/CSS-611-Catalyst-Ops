import styled from "@emotion/styled";
import React from "react";
import SidebarNavigation from "./SidebarNavigation";


const Innerwrapper = styled.div`
  height: max-content;

  min-height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 18px 16px;
  // margin-left: 4px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    height: fit-content;
    min-height: 100%;
  }

  @media (max-height: 1100px) {
    height: "90%";
  }
`;

function MainContainer(props) {
  return (
    <Innerwrapper>
      {props.children}
    </Innerwrapper>
  );
}

export default MainContainer;
