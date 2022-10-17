import MainBg from "../components/layout/MainBg";
import SidebarNavigation from "../components/layout/SidebarNavigation";
import App from "../components/Chat/ChatMain"
// import Chat from "../components/Chat/ChatMain";
import ChatMain from "../components/Chat/ChatMain";


const CatyChatPage = () => {
    return (
        <MainBg>
            {/* <SidebarNavigation /> */}
            <div><ChatMain/></div>
        </MainBg>
      );
  };
  
  export default CatyChatPage;
  