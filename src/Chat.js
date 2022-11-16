import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, username, room }) => {
  const [currentChat, setCurrentChat] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentChat !== "") {
      const payload = {
        room,
        author: username,
        message: currentChat,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      await socket.emit("send_message", payload);
      setMessageList((msg) => setMessageList([...msg, payload]));
      setCurrentChat("");
    }
  };

  useEffect(() => {
    socket.on("recived_message", (data) => {
      console.log("data:", data);
      setMessageList((message) => [...message, data]);
    });
  }, [socket]);

  console.log(messageList, "<--messageList");
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom>
          {messageList?.map((item) => {
            return (
              <div
                className="message"
                id={username === item.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{item.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{item.time}</p>
                    <p id="author">{item.author}</p>
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
          name="chat"
          value={currentChat}
          onChange={(e) => setCurrentChat(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
