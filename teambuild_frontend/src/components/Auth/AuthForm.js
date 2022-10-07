import { useRef, useState } from "react";

// import classes from "./AuthForm.module.css";
import styled from "styled-components";
import logoImage from "../../images/logo.svg";

const Auth = styled.section`
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
    width: 240px;
    height: 24px;
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

const Button = styled.button`
  cursor: pointer;
  filter: drop-shadow(4px 4px 2px #562929);
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #90bc92;
  border: 1px solid #9f5ccc;
  border-radius: 4px;
  padding: 6px ​4px 5px 4p;
  width: 240px;
  height: 30px;
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

const AuthForm = () => {
  // const [isLogin, setIsLogin] = useState(true);

  // const switchAuthModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredFullName = fullNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredUserName = userNameInputRef.current.value;
    const enteredpassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.value;
    const body = JSON.stringify({
      fullName: enteredFullName,
      email: enteredEmail,
      userName: enteredUserName,
      password: enteredpassword,
      role: "Customer",
    });

    console.log(body);
    // fetch("API", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     fullName: enteredFullName,
    //     email: enteredEmail,
    //     userName: enteredUserName,
    //     password: enteredpassword,
    //     role: "Customer",
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  return (
    <Auth>
      <Logo />
      <form onSubmit={submitHandler}>
        <Control>
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" required ref={fullNameInputRef} />
        </Control>
        <Control>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </Control>
        <Control>
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" required ref={userNameInputRef} />
        </Control>
        <Control>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </Control>

        <Control>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            required
            ref={confirmPasswordInputRef}
          />
        </Control>
        <Actions>
          <Button>REGISTER</Button>
        </Actions>
      </form>
    </Auth>
  );
};

export default AuthForm;
