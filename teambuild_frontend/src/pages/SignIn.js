import { Container } from "@mui/material";
import MainBg from "../components/layout/MainBg";
import SidebarNavigation from "../components/layout/SidebarNavigation";
import SignInComponent from "../components/signIn/SignInComponent";


function SignIn() {
  return (
    <MainBg>
      <div>
      {/* <SidebarNavigation /> */}

        <SignInComponent/>
      </div>
    </MainBg>
  );
}

export default SignIn;
