import { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import socketIOClient from "socket.io-client";
import Message from "./Message"; 
import styles from "./MessageList.module.css";

const ENDPOINT = "ws://localhost:5000";


const MessageList = (props) => {
  const socket = props.socket;

  const listRef = useRef();

  const [messages, setMessages] = useState([]);
  
  const addMessage = (message) => {
    const oldBottom =
      listRef.current.scrollHeight -
      listRef.current.clientHeight;

    setMessages((prevMessages)=> prevMessages.length <= 50 ? [...prevMessages, message] : [...prevMessages.shift(), message])
    
    const bottom =
      listRef.current.scrollHeight -
      listRef.current.clientHeight;

    if (listRef.current.scrollTop >= oldBottom-150)
      listRef.current.scrollTo(0, bottom);
  };

  // Get messages from server
  // const getMessages = () => {
  //   fetch(MESSAGE_SERVER, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((messages) => {
  //       messages.forEach(addMessage);
  //     });
  // };

  // Listen to server for new messages
  useEffect(() => {
    socket.on("message", addMessage);

    // To avoid memory leak
    return () => socket.off("message", addMessage);
  }, []);

  return (
    <div>
      <div className={styles.messageListHeader}>
        <img className={styles.picture} src={"/" + sessionStorage.getItem("avatar") + ".png"} />
        <div className={styles.name}>{sessionStorage.getItem("name")}</div>
      </div>
      <div className={styles.frame}>
      <div className={styles.list} ref={listRef}>
      {messages.map((message, i) => <Message key={i} message={message} />)}
        {/* 
        Dev 
        <button onClick={testAddMessage}>hnn</button>
      */}
      </div>

      </div>
    </div>

  );
}
export default MessageList;
