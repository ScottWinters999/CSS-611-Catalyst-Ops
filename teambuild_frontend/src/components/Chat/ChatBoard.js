import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  let { action, id } = useParams();
  const userId = JSON.parse(localStorage.getItem("userId"));

  // if action
  let payload = `/${action}{"user_id": "${userId.toString()}" ,"edit_id": "${id.toString()}"}`;
  // const initialMessage()
  useEffect(() =>{
    let body = {
      "sender": userId,
      "message":  payload,
    }

    const initCon = async() =>{
      try {
        const response = await fetch(
          `http://0.0.0.0:5005/webhooks/restcustom/webhook`,
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
          console.log(data)
          data.forEach((singleMessage) => {
            if (singleMessage) {
              const hasButtons = singleMessage.hasOwnProperty('buttons');
              if (hasButtons) {
                console.log('yes')
                let newButtons = []
                singleMessage['buttons'].forEach((sb) => {
                  // console.log(sb)
                  let buttonItem = {
                    ...sb
                  }
                  // console.log(buttonItem)
                  // buttonItem
                  newButtons.push(buttonItem)
                })
                const messageData = {
                  type: "button",
                  buttonClicked: false,
                  button: newButtons,
                  author: "caty",
                  message: singleMessage['text'],
                  time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
                };
  
                setMessageList((list) => [...list, messageData]);
              }
              else {
                const messageData = {
                  type: "text",
                  author: "caty",
                  message: singleMessage['text'],
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
          })
        }
      }
      catch(err){
        console.log(err)
      }

    }

    initCon()
    
    

  },[])
  console.log(payload)

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

      console.log(messageData)
      sendMessageToRasa(messageData.message)
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };


  const sendMessageToRasa = async (message) => {
    console.log(message)
    
    let body = {
      "sender": userId,
      "message":  message,
    }
    try {
      const response = await fetch(
        `http://0.0.0.0:5005/webhooks/restcustom/webhook`,
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
            const hasButtons = singleMessage.hasOwnProperty('buttons');
            if (hasButtons) {
              console.log('yes')
              let newButtons = []
              singleMessage['buttons'].forEach((sb) => {
                // console.log(sb)
                let buttonItem = {
                  ...sb
                }
                // console.log(buttonItem)
                // buttonItem
                newButtons.push(buttonItem)
              })
              const messageData = {
                type: "button",
                buttonClicked: false,
                button: newButtons,
                author: "caty",
                message: singleMessage['text'],
                time:
                  new Date(Date.now()).getHours() +
                  ":" +
                  new Date(Date.now()).getMinutes(),
              };

              setMessageList((list) => [...list, messageData]);
            }
            else {
              const messageData = {
                type: "text",
                author: "caty",
                message: singleMessage['text'],
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
        })

        // if "buttons" in data[0]
        // buttons = butt
        // const messageData = {
        //   room: "123",
        //   author: "caty",
        //   message: data[0]['text'],
        //   time:
        //     new Date(Date.now()).getHours() +
        //     ":" +
        //     new Date(Date.now()).getMinutes(),
        // };
        // setMessageList((list) => [...list, messageData]);
      }


    }
    catch (err) {
      console.log(err)
    }

  }


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
  const [vx,setVx] = useState(true)
  const onClickButtonHandler = (buttonIdx,msgIdx,payload) =>{
    console.log('hi',buttonIdx,payload,msgIdx)
    // setVx(false)
    console.log(messageList[msgIdx]['button'][buttonIdx])
    let temp = []
    temp = [...messageList]
    temp[msgIdx]['buttonClicked'] = true
    console.log(messageList)
    setMessageList(temp)
    sendButtonMessage(payload)
  }

  const sendButtonMessage = (payload) =>{
    console.log(payload)
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
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
                  {(messageContent.type == "button" &&

                    <div className="message-content">

                      {messageContent.button.map((val, idx) => (
                        <div className="message-content-button-wrapper"  key={idx}>

                          <button disabled={messageContent?.buttonClicked === true ?true:false} onClick={() => onClickButtonHandler(idx,index,val.payload)}>{val.title}</button>
                        </div>
                      ))}



                    </div>)}
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
        <button onClick={sendMessage}>&#9658;</button>
        {/* <button2 onClick={sendMessage}>End Chat</button2> */}
      </div>
    </div>
  );
}

export default Chat;
