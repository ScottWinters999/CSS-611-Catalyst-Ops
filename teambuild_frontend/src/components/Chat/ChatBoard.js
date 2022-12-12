import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import UserContext from "../../shared/context/user-context";
import { TbRobot } from "react-icons/tb";

import { IoIosSend } from "react-icons/io";

function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const history = useNavigate();
  const userCtx = useContext(UserContext);

  let { action, id } = useParams();
  const userId = JSON.parse(localStorage.getItem("userId"));
  let payload = ``;
  // if action
  if (action == "greet") {
    payload = `/${action}`;
  } else {
    payload = `/${action}{"user_id": "${userId.toString()}" ,"edit_id": "${id.toString()}"}`;
  }
  useEffect(() => {
    // console.log('hi')
    console.log(localStorage.getItem("chatSession") ,'23')
    if (localStorage.getItem("chatSession") != null) {
      let t = localStorage.getItem("chatSession");
      console.log(Object.keys(t),'26')
      if (Object.keys(t).length > 0) {
        t = JSON.parse(t);
        console.log(t);
        if (t && action == "greet") {
          setMessageList(t);
          // sendMessageToRasa("/greet")
        }
      }
    } else {
      localStorage.setItem("chatSession", []);
      if(action =="greet"){
        sendMessageToRasa("/greet")

      }
    }
    if (userCtx.chatSession) {
      console.log(userCtx.chatSession);
    }
  }, []);
  // const initialMessage()
  useEffect(() => {
    let body = {
      sender: userId,
      message: payload,
    };

    const initSession = async () => {
      let initSessPayload = {
        sender: userId,
        message: "/reset_form",
        metadata: {"userId":userId},
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_CHAT_SERVER}`,
          {
            method: "POST",
            body: JSON.stringify(initSessPayload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if(data){
          console.log(data)
          initCon()
        }
      } catch (err) {
        console.log(err);
      }
    };

    const initCon = async () => {
      try {
        console.log(payload)
        const response = await fetch(
          `${process.env.REACT_APP_CHAT_SERVER}`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data) {
          console.log(data);
          data.forEach((singleMessage) => {
            if (singleMessage) {
              const hasButtons = singleMessage.hasOwnProperty("buttons");
              if (hasButtons) {
                console.log("yes");
                let newButtons = [];
                singleMessage["buttons"].forEach((sb) => {
                  // console.log(sb)
                  let buttonItem = {
                    ...sb,
                  };
                  // console.log(buttonItem)
                  // buttonItem
                  newButtons.push(buttonItem);
                });
                const messageData = {
                  type: "button",
                  buttonClicked: false,
                  button: newButtons,
                  author: "caty",
                  message: singleMessage["text"],
                  time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
                };

                setMessageList((list) => [...list, messageData]);
              } else {
                const messageData = {
                  type: "text",
                  author: "caty",
                  message: singleMessage["text"],
                  time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
                };

                setMessageList((list) => [...list, messageData]);
              }
            }

            // console.log(!("button" in singleMessage));
            // console.log(singleMessage["button"])
            // }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (action != "greet") {
      initSession();
      // initCon();
    }
  }, []);
  console.log(payload);

  useEffect(() => {
    if (messageList.length > 0) {
      console.log(messageList);
      userCtx.onSetChat(messageList);
      console.log(userCtx.chatSession);
      localStorage.setItem("chatSession", JSON.stringify(messageList));
    }
  }, [messageList]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: "username",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // await socket.emit("send_message", messageData)

      console.log(messageData);
      sendMessageToRasa(messageData.message);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const sendMessageToRasa = async (message) => {
    console.log(message);

    let body = {
      sender: userId,
      message: message,
      metadata:{"userId":userId}
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CHAT_SERVER}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        // console.log(data)
        data.forEach((singleMessage) => {
          if (singleMessage) {
            const hasButtons = singleMessage.hasOwnProperty("buttons");
            if (hasButtons) {
              console.log("yes");
              let newButtons = [];
              singleMessage["buttons"].forEach((sb) => {
                // console.log(sb)
                let buttonItem = {
                  ...sb,
                };
                // console.log(buttonItem)
                // buttonItem
                newButtons.push(buttonItem);
              });
              const messageData = {
                type: "button",
                buttonClicked: false,
                button: newButtons,
                author: "caty",
                message: singleMessage["text"],
                time:
                  new Date(Date.now()).getHours() +
                  ":" +
                  new Date(Date.now()).getMinutes(),
              };

              setMessageList((list) => [...list, messageData]);
            } else {
              const messageData = {
                type: "text",
                author: "caty",
                message: singleMessage["text"],
                time:
                  new Date(Date.now()).getHours() +
                  ":" +
                  new Date(Date.now()).getMinutes(),
              };

              setMessageList((list) => [...list, messageData]);
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   // console.log("messgae recieved")
  //   socket.on("receive_message", (data) => {
  //     if(data){
  //         setMessageList((list) => [...list, data]);
  //         console.log(data)
  //     }
  //   });
  // },[socket]);
  // let vx = true
  const [vx, setVx] = useState(true);
  const onClickButtonHandler = (buttonIdx, msgIdx, payload) => {
    console.log("hi", buttonIdx, payload, msgIdx);
    // setVx(false)
    console.log(messageList[msgIdx]["button"][buttonIdx]);
    let temp = [];
    temp = [...messageList];
    temp[msgIdx]["buttonClicked"] = true;
    console.log(messageList);
    setMessageList(temp);
    sendButtonMessage(payload);
  };

  const sendButtonMessage = (payload) => {
    console.log(payload);
    sendMessageToRasa(payload);
  };

  const endChatHandler = () => {
    console.log("hhi");
    localStorage.removeItem("chatSession");
    sendMessageToRasa("reset_formN");
    history("/userdashboard");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Catylst Ops</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={"caty" === messageContent.author ? "you" : "other"}
              >
                <div className="message-content-wrapper">
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  {messageContent.type == "button" && (
                    <div className="message-content-button">
                      {messageContent.button.map((val, idx) => (
                        <div
                          className="message-content-button-wrapper"
                          key={idx}
                        >
                          <button
                            disabled={
                              messageContent?.buttonClicked === true
                                ? true
                                : false
                            }
                            onClick={() =>
                              onClickButtonHandler(idx, index, val.payload)
                            }
                          >
                            {val.title}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    {/* <p id="author">{messageContent.author}</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type your message here"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <div className="send-message-wrapper">
          <button className="send-message" onClick={sendMessage}>
            <IoIosSend style={{"height": "24px","width":"24px","color": "white"}}/>
          </button>
          <button className="end-message" onClick={endChatHandler}>
            End Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
