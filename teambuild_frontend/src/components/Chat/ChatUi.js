import Widget from "rasa-webchat";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Chat.css";
import "./ChatUi.css";
import "./Chat.css";
import styled from "styled-components";
const WidgetWrapper = styled.div`
  // width:80%
  height: 100%;
`;

const ChatUi = () => {
  const webchatRef = useRef(null);

  // triggered when something happens in your app
  function callback() {
    if (webchatRef.current && webchatRef.current.sendMessage) {
      webchatRef.current.sendMessage("/greet");
    }
  }
  useEffect(() => {
    callback();
  });

  // const embedded
  return (
    // <>
    <WidgetWrapper>
      <Widget
        ref={webchatRef}
        // fullScreenMode={true}
        embedded={true}
        // socketUrl={"http://34.125.213.190:5005"}
        socketUrl={"http://localhost:5005"}
        
         
        socketPath={"/socket.io/"}
        customData={{ language: "en", userId: "1" }} // arbitrary custom data. Stay minimal as this will be added to the socket
        title={"Title"}
      />
      <div className="chat-footer">
        <button className="button-chat">
          <Link to="/userdashboard" style={{color:"black"}}>End Chat</Link>
        </button>
      </div>
    </WidgetWrapper>
    // </>
  );
};

export default ChatUi;
