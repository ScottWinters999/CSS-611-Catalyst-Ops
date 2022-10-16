import React from "react";
import styled from "styled-components";
import MainContainer from "../components/layout/MainContainer";
import SidebarNavigation from "../components/layout/SidebarNavigation";
import UserDashboardComponent from "../components/UserDashboard/UserDashboardComponent";

const Outsidewrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 95vh;
  padding: 12px 4px;
  margin: 2px 2px;
`;

const UserDashboardPage = () => {
  return (
    <Outsidewrapper>
      <SidebarNavigation />
      <UserDashboardComponent />
    </Outsidewrapper>
  );
};

export default UserDashboardPage;
