import { Container } from "@mui/material";
import MainBg from "../components/layout/MainBg";
import SignInComponent from "../components/signIn/SignInComponent";


function SignIn() {
  return (
    <MainBg>
      <div>
        <SignInComponent/>
      </div>
    </MainBg>
  );
}

export default SignIn;
