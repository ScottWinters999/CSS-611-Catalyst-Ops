import Widget from "rasa-webchat";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Chat.css";
import "./ChatUi.css";
import "./Chat.css";
import styled from "styled-components";
import MainContainer from "../layout/MainContainer";
const WidgetWrapper = styled.div`
  // width:80%
  height: 100%;
`;

const ChatUi = (props) => {
  console.log(Widget);
  const location = useLocation();
  console.log(location);
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  if (!(location.state === null)) {
    if (Object.keys(location.state).length > 0) {
      if ("addGoal" in location.state) {
        console.log("came here22");
      }
      if ("editSkill" in location.state) {
        console.log("came here22");
      }
    }
  }

  const [embed, setEmbed] = useState(false);

  const webchatRef = useRef(null);

  useEffect(() => {
    function callback() {
      if (webchatRef.current && webchatRef.current.sendMessage) {
        console.log("yessss");
        webchatRef.current.sendMessage("/greet");
      }
    }

    // return () => {
    if (connectionEstablished) {
      callback();
    }
    // };
  }, [connectionEstablished]);

  const userId = JSON.parse(localStorage.getItem("userId"));
  console.log(userId);
  // triggered when something happens in your app

  const onSocketEvent = {
    connect: () => {
      if (!connectionEstablished) {
        setConnectionEstablished(true);
      }
      if (!embed) {
        setEmbed(true);
      }
      console.log("connection established", "aaaaaaaaaaaaaaaaaaaaaaaaasdddddd");
    },
    disconnect: () => console.log("connection disconnect"),
  };

  const calMe = () => {
    console.log("shiashdisadi");
    webchatRef.current.sendMessage();
  };

  useEffect(() => {
    return () => {
      console.log("final");
      localStorage.removeItem("chat_session");
    };
  }, []);

  // const embedded
  return (
    // <>
    <React.Fragment>
      <MainContainer>
        {embed && (
          <WidgetWrapper>
            <Widget
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  calMe();
                }
              }}
              ref={webchatRef}
              // fullScreenMode={true}
              embedded={true}
              socketUrl={"http://0.0.0.0:5005"}
              onSocketEvent={onSocketEvent}
              socketPath={"/socket.io/"}
              customData={{ language: "en", userId: userId }} // arbitrary custom data. Stay minimal as this will be added to the socket
              title={"Title"}
              // initPayload={"hi"}
              // hideWhenNotConnected={true}
              // showCloseButton={true}
              // onWidgetEvent = {(onChatOpen) => {
              //   console.log('hihihiih')
              // }
              //  }
            />
            <div className="chat-footer">
              <button className="button-chat">
                <Link to="/userdashboard" style={{ color: "black" }}>
                  End Chat
                </Link>
              </button>
            </div>
          </WidgetWrapper>
        )}
        {!embed && <div>Please wait for caty to connect...</div>}
      </MainContainer>
    </React.Fragment>
  );
};

export default ChatUi;
