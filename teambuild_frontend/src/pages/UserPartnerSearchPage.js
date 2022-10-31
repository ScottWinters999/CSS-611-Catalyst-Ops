import React from "react";
import styled from "styled-components";
import MainContainer from "../components/layout/MainContainer";
import SidebarNavigation from "../components/layout/SidebarNavigation";
import SearchComponent from "../components/Search/SearchComponent";

const Outsidewrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 95vh;
  padding: 12px 4px;
  margin: 2px 2px;
`;

const UserPartnerSearchPage = () => {
  return (
    <Outsidewrapper>
      <SidebarNavigation />
      <SearchComponent/>
    </Outsidewrapper>
  );
};

export default UserPartnerSearchPage;
