import React, { useEffect, useState } from "react";
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

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  useEffect(() => {
    const debouncedSize = debounce(function handleSize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);
    console.log(dimensions.width);
    window.addEventListener("resize", debouncedSize);

    // cleanup this component
    return () => {
      window.removeEventListener("resize", debouncedSize);
    };
  });


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

          // data-websocket-url="http://localhost:5005/"

  return (
    <>
      <div
        id="rasa-chat-widget"
        data-default-open
        data-root-element-id="hey"
        data-width={dimensions.width * 0.87}
        data-height={dimensions.height * 0.8}
        data-initial-payload={payload}
        data-websocket-url="http://34.162.181.95:5005/"
      ></div>
      <div id="hey"></div>

      {/* <script src="https://unpkg.com/@rasahq/rasa-chat" type="application/javascript"></script> */}
    </>
  );
};

export default DefaultChat;
