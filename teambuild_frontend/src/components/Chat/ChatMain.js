import "./Chat.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import ChatBoard from "./ChatBoard";

const socket = io.connect("http://localhost:5000");

function ChatMain() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // useEffect
  const joinRoom = () => {
    // if (username !== "" && room !== "") {
      console.log("joinroom")
      socket.emit("join_room", '123');
      setShowChat(true);
    }
  
  useEffect(()=>{
    joinRoom();

  })
  
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Caty Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatBoard socket={socket} username={"user"} room={"123"} />
      )}
    </div>
  );
}

export default ChatMain;
