import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hooks/use-input";
import logoImage from "../../images/logo.svg";

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

const Reset = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  padding-top: 6rem;
  h1 {
    text-align: center;
    color: white;
  }
`;

const Errortext = styled.p`
  font-family: "Montserrat", sans-serif;
  color: #d8c1c1;
  font-size: 14px;
  font-weight: bold;
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

const Actions = styled.div`
   {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Logo = styled.div`
  height: auto;
  display: block;
  padding: 4px 4px 4px 4px;
  display: flex;
  justify-content: center;
`;

const Home = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 6px 2px 2px;
`;

const ForgetPasswordForm = () => {
  // styled
  const isEmail = (value) => value.includes("@");
  const [emailSend, setEmailSend] = useState(false);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(emailValue);

    if (!emailIsValid) {
      return;
    } else {
      try {
        const response = await fetch(
          "http://localhost:5000/api/forgetpassword",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailValue,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status == "Link send") {
          setEmailSend(true);
        }
        // }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Reset>
      <Logo>
        <img src={logoImage} alt="My Happy SVG" />
      </Logo>
      <FormControl onSubmit={submitHandler}>
        <Control>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <Errortext>E-Mail is not valid.</Errortext>}
          {emailSend && (
            <Errortext>Password reset link send to email.</Errortext>
          )}
        </Control>
        <Actions>
          <Button>Reset password</Button>
        </Actions>
        <Home>
          <Link to="/">Home</Link>
        </Home>
      </FormControl>
    </Reset>
  );
};

export default ForgetPasswordForm;
