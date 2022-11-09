import MainBg from "../components/layout/MainBg";
import SidebarNavigation from "../components/layout/SidebarNavigation";
import App from "../components/Chat/ChatMain";
// import Chat from "../components/Chat/ChatMain";
import ChatMain from "../components/Chat/ChatMain";
import ChatUi from "../components/Chat/ChatUi";

import styled from "styled-components";

const Outsidewrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 95vh;
  padding: 12px 4px;
  margin: 2px 2px;
`;

const ChatUiWrapper = styled.div`
  width: 84%;
`;

const CatyChatPage = () => {
  return (
    <Outsidewrapper>
      <SidebarNavigation />
      {/* <ChatUiWrapper> */}
        <ChatUi />
      {/* </ChatUiWrapper> */}
    </Outsidewrapper>
  );
};

export default CatyChatPage;
