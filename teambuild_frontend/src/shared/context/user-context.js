import React,{ createContext, useEffect, useState } from "react";

const UserContext = createContext({
  userName: null,
  email:null,
  isPremiumUser:null,
  location:null,
  phone:null,
  chatSession:null,
  onSetUserName: (name) => {},
  onSetPhone: (phone) => {},
  onSetPremiumUser: (isPremium) => {},
  onSetLocation: (location) => {},
  onSetEmail: (email) => {},
  onSetChat: (chatsessionMessage) => {}
  //   onSetGoalName: () => {},
});

export const UserContextProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isPremiumUser, setIsPremiumUser] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [goalId, setGoalId] = useState("");
  const [chatSession,setChatSession] = useState([])

  const setUserNameHandler = (name) => {
    setUserName(name);
  };

  const setEmailHandler = (email) => {
    setEmail(email);
  };
  const setPremiumUserHandler = (isPremium) => {
    setIsPremiumUser(isPremium);
  };
  const setLocationHandler = (location) => {
    setLocation(location);
  };
  const setPhoneHandler = (phone) => {
    setPhone(phone);
  };
  const setGoalIdHandler = (goal) => {
    setGoalId(goal);
  };

  const setChatSessionHandler = (chatsessionMessage) => {
    console.log('settt',chatsessionMessage)
    setChatSession(chatsessionMessage)
    console.log(chatSession)
  }


//   useEffect

  return (
    <UserContext.Provider
      value={{
        userName: userName,
        onSetEmail:setEmailHandler,
        onSetPhone:setPhoneHandler,
        onSetLocation:setLocationHandler,
        onSetPremiumUser:setPremiumUserHandler,
        onSetUserName: setUserNameHandler,
        onSetGoalId: setGoalIdHandler,
        onSetChat: setChatSessionHandler
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
