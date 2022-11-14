import React, { useEffect } from 'react';
import Widget from 'rasa-webchat';
import {  useParams } from 'react-router-dom';

const DefaultChat = () => {
    // alert();
    let { action,id } = useParams();

    console.log(action)
    console.log(id)
    useEffect(()=>{

        const script = document.createElement("script");

    script.src = "https://unpkg.com/@rasahq/rasa-chat";
    script.async = true;

    const head = document.querySelector("head");
    // const script = document.createElement("script");

    head.appendChild(script);
        // <script src="https://unpkg.com/@rasahq/rasa-chat" type="application/javascript"></script>
        return () => {
            head.removeChild(script);
          };

    },[])
    return (<>
        <div id="rasa-chat-widget" 
        data-default-open 
        data-root-element-id="hey"
        data-width={1200}
        data-initial-payload={`/${action}{"edit_id": "${id.toString()}" }`}
        data-websocket-url="http://localhost:5005"></div>
        <div id='hey'></div>

        {/* <script src="https://unpkg.com/@rasahq/rasa-chat" type="application/javascript"></script> */}
    
    </>  );
}
 
export default DefaultChat;