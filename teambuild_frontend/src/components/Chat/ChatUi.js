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

let flag = false
const ChatUi = () => {
  const webchatRef = useRef(null);
  const userId = JSON.parse(localStorage.getItem('userId'))
  // console.log(userId)
  // triggered when something happens in your app
  function callback() {
    if (webchatRef.current && webchatRef.current.sendMessage && !flag) {
      // webchatRef.current.sendMessage("/greet");
      flag = true
    }
  }
  useEffect(() => {
    callback();
    console.log('a')
  },[]);

  // const embedded
  return (
    // <>
    <WidgetWrapper>
      <Widget
        ref={webchatRef}
        // fullScreenMode={true}
        embedded={true}
        socketUrl={"http://104.197.153.163:5005"}
        // socketUrl={"http://localhost:5005"}
        
         
        socketPath={"/socket.io/"}
        customData={{ language: "en", userId: userId }} // arbitrary custom data. Stay minimal as this will be added to the socket
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
