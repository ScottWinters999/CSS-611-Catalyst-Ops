import useInput from '../../hooks/use-input';
import { useNavigate } from "react-router-dom";
import a from '../signIn/Signin.module.css'

// import classes from "./AuthForm.module.css";
import styled from "styled-components";
import logoImage from "../../images/logo.svg";
import { useState } from "react";

const SignIn = styled.section`
  margin: 100px auto 0px;
  width: 95%;
  max-width: 25rem;
  border-radius: 6px;
  // background-color: #38015c;
  // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;

  h1 {
    text-align: center;
    color: white;
  }
`;


const Formcontrol = styled.div`
width: 100%;
border: 1px solid;
background: #4471d8;
padding: 16px 14px;
border-radius: 4px;
/* filter: drop-shadow(4px 4px 2px ); */
backdrop-filter: blur(5px);
background: rgb(42 84 202);
border-radius: 16px;
box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
backdrop-filter: blur(8.9px);
-webkit-backdrop-filter: blur(8.9px);
border: 1px solid rgba(90, 81, 248, 0.22);
display: flex;
flex-direction: column;

`

const Errortext = styled.p`
  font-family: "Montserrat", sans-serif;
  color: #c3b2b9;
  font-size: smaller;
  font-weight: 600;
`;


const Control = styled.div`
  margin-bottom: 0.5rem;

  label {
    display: block;
    color: white;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    font: inherit;
    // background-color: #f1e1fc;
    // color: #38015c;
    border-radius: 4px;
    border: 1px solid white;
    width: 300px;
    height: 45px;
    text-align: left;
    padding: 0.25rem;
  }
`;

const Actions = styled.div`
   {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;


const ActionsTwo = styled.div`
   {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
`;
const Text = styled.div`
   {
    // position: absolute;
    // width: 200px;
    // height: 20px;
    // left: 700px;
    // top: 539px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #FFFFFF;
  }
`;
const Text2 = styled.div`
   {
    // position: absolute;
    // width: 200px;
    // height: 20px;
    // left: 500px;
    // top: 539px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #FFFFFF;
  }
`;

const Button = styled.button`
  cursor: pointer;
  filter: drop-shadow(4px 4px 2px #562929);
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #90BC92;
  border: 1px solid #9f5ccc;
  border-radius: 4px;
  padding: 6px ​4px 5px 4p;
  width: 300px;
  height: 45px;
  &:hover {
    background-color: #5ebb62;
    border-color: #873abb;
  }
`;

const Logo = styled.div`
  background-image: url(${logoImage});
  height: 181px;
  width: 50%;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  margin: auto;
  display: block;
`;

const SignInComponent = () => {
  const [confirmPassState, setConfirmPassState] = useState(true);

  // const switchAuthModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };

  const isEmail = (value) => value.includes("@");
  const isPassword = (value) => value.trim().length >= 8;
  const history = useNavigate()


   const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);


  let formIsValid = false;
  if (
    emailIsValid &&
    passwordIsValid
     ) {
    formIsValid = true;
  }
  const submitHandler = async(event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("Loggin In!");
    console.log(emailValue,passwordValue);

    resetEmail();
    resetPassword();
    setConfirmPassState(true)
    const body = JSON.stringify({
      email: emailValue,
      password: passwordValue,
    });

    console.log(body);
    history("/userchat")
  //   fetch("API", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: enteredEmail,
  //       password: enteredpassword,
  //       role: "Customer",
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.Status == "200") {
      console.log("success")
    } else {
      history("/userchat");
    }
  } catch (err) {
    console.log(err);
  }
  };

  return (
    <SignIn>
      <Logo />
      
      <Formcontrol onSubmit={submitHandler}>
        <Control>
        <label htmlFor="email">First Name</label>
          <input
            type="text"
            id="email"
            required
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <Errortext>Enter a Valid Email</Errortext>
          )}
        </Control>
        <Control>
        <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <Errortext>Password Incorrect </Errortext>
          )}
        </Control>  
        <Actions>
          <Button>Login</Button>
        </Actions>
        <ActionsTwo>
            <Text>
            {'Forgot Password?'}
            </Text>
            <Text2>
            <a href="http://localhost:3000/signup">Sign Up</a>
            </Text2>
            </ActionsTwo>
            
        {/* <Actions>
            
        </Actions> */}
      </Formcontrol>
    </SignIn>
  );
};

export default SignInComponent;


// const SignInComponent = () => {
//   // const [isLogin, setIsLogin] = useState(true);

//   // const switchAuthModeHandler = () => {
//   //   setIsLogin((prevState) => !prevState);
//   // };
//   const fullNameInputRef = useRef();
//   const emailInputRef = useRef();
//   const userNameInputRef = useRef();
//   const passwordInputRef = useRef();
//   const confirmPasswordInputRef = useRef();

//   const submitHandler = (event) => {
//     event.preventDefault();
//     const enteredFullName = fullNameInputRef.current.value;
//     const enteredEmail = emailInputRef.current.value;
//     const enteredUserName = userNameInputRef.current.value;
//     const enteredpassword = passwordInputRef.current.value;
//     const confirmPassword = confirmPasswordInputRef.value;
//     const body = JSON.stringify({
//       fullName: enteredFullName,
//       email: enteredEmail,
//       userName: enteredUserName,
//       password: enteredpassword,
//       role: "Customer",
//     });