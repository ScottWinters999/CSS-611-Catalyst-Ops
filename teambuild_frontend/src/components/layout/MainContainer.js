import styled from "@emotion/styled";
import React from "react";
import SidebarNavigation from "./SidebarNavigation";

const Innerwrapper = styled.div`

`

function MainContainer(props) {
  return (
    <Innerwrapper>
      <div>{props.children}</div>
     <SidebarNavigation/>
    </Innerwrapper>
  );
}

export default MainContainer;
