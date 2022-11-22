import React, { useEffect } from "react";
// import Widget from "rasa-webchat";
import { useParams } from "react-router-dom";

const DefaultChat = () => {
  // alert();
  let { action, id } = useParams();

  console.log(action);
  console.log(id);

  let payload = `/${action}{"edit_id": "${id.toString()}"}`;

  if (
    action == "add_new_goal" ||
    action == "new_user" ||
    action == "add_position"
  ) {
    payload = `/${action}{"user_id": "${id.toString()}" }`;
  } else if (action == "edit_position") {
    const userId = JSON.parse(localStorage.getItem("userId"));
    payload = `/${action}{"user_id": "${userId.toString()}" ,"edit_id": "${id.toString()}"}`;
  }
  // payload = `/${action}{"edit_id": "${id.toString()}"}`

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://unpkg.com/@rasahq/rasa-chat";
    script.async = true;

    const head = document.querySelector("head");
    // const script = document.createElement("script");

    head.appendChild(script);
    <script
      src="https://unpkg.com/@rasahq/rasa-chat"
      type="application/javascript"
    ></script>;
    return () => {
      head.removeChild(script);
    };
  }, []);
  return (
    <>
      <div
        id="rasa-chat-widget"
        data-default-open
        data-root-element-id="hey"
        data-width={1800}
        data-height={800}
        data-initial-payload={payload}
        // data-websocket-url="http://34.70.105.152:5005/"
        data-websocket-url="http://localhost:5005/"
      ></div>
      <div id="hey"></div>

      {/* <script src="https://unpkg.com/@rasahq/rasa-chat" type="application/javascript"></script> */}
    </>
  );
};

export default DefaultChat;
