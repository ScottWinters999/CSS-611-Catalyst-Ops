import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";

// import classes from "./AuthForm.module.css";
import styled from "styled-components";
import logoImage from "../../images/logo.svg";
import { useState } from "react";

const Auth = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;

  h1 {
    text-align: center;
    color: white;
  }
`;

const FormControl = styled.form`
  margin: auto;
  width: 30%;
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

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Control = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 74%;
  padding: 2px 4px 6px 2px;
  label {
    font-size: 16px;
    display: block;
    color: white;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-family: "Montserrat", sans-serif;
  }

  input {
    font: inherit;
    border-radius: 4px;
    border: 1px solid white;
    width: 100%;
    height: 30px;
    text-align: left;
    padding: 0.25rem;
  }

  @media (max-width: 540px) {
    width: 100%;
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
  width: 74%;
  height: 30px;
  &:hover {
    background-color: #5ebb62;
    border-color: #873abb;
  }
`;

const Errortext = styled.p`
  font-family: "Montserrat", sans-serif;
  color: #d8c1c1;
  font-size: 14px;
  font-weight: bold;
`;

const Logo = styled.div`
  height: auto;
  display: block;
  padding: 4px 4px 4px 4px;
  display: flex;
  justify-content: center;
`;

const AuthForm = () => {
  const [confirmPassState, setConfirmPassState] = useState(true);

  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const isPassword = (value) => value.trim().length >= 8;
  const history = useNavigate();
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
  const {
    value: userNameValue,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserName,
  } = useInput(isNotEmpty);
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

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetconfirmPassword,
  } = useInput(isPassword);

  let formIsValid = false;
  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    userNameIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid
  ) {
    formIsValid = true;
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    if (passwordValue !== confirmPasswordValue) {
      setConfirmPassState(false);
      return;
    }
    console.log("Submitted!");
    // console.log(firstNameValue, lastNameValue, emailValue);
    const body = JSON.stringify({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      userName: userNameValue,
      password: passwordValue,
      role: "Customer",
    });
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPassword();
    resetUserName();
    resetconfirmPassword();
    setConfirmPassState(true);

    // const test = {
    //   firstName: "asheeque",
    //   lastName: "cm",
    //   email: "test1@test",
    //   userName: "test",
    //   password: "test",
    //   role: "Customer",
    // };
    // const body = JSON.stringify(test);

    console.log(body);
    // history("/userchat");
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.Status == "user already exist") {
        setEmailAlreadyExist(true);
      } else {
        history("/userchat");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Auth>
      <Logo>
        <img src={logoImage} alt="My Happy SVG" />
      </Logo>

      <FormControl onSubmit={submitHandler}>
        <Control>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <Errortext>Please enter a first name.</Errortext>
          )}
        </Control>
        <Control>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <Errortext>Please enter a Last name.</Errortext>}
        </Control>
        <Control>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <Errortext>E-Mail is not valid.</Errortext>}
        </Control>
        <Control>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            value={userNameValue}
            onChange={userNameChangeHandler}
            onBlur={userNameBlurHandler}
          />
          {userNameHasError && <Errortext>Please enter a user name.</Errortext>}
        </Control>
        <Control>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <Errortext>
              Please enter a password with length 8 or greater{" "}
            </Errortext>
          )}
        </Control>

        <Control>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            value={confirmPasswordValue}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          {confirmPasswordHasError && (
            <Errortext>
              Please enter a password with length 8 or greater{" "}
            </Errortext>
          )}
          {!confirmPassState && <Errortext>Please the same password</Errortext>}
          {emailAlreadyExist && <Errortext>E-Mail already exist</Errortext>}
        </Control>
        <Actions>
          <Button>REGISTER</Button>
        </Actions>
      </FormControl>
    </Auth>
  );
};

export default AuthForm;
