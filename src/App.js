import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [form, setForm] = useState({
    name: "",
    id: "",
  });
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e, name) => {
    setForm({
      ...form,
      [name]: e.target.value,
    });
  };
  const handleValidationButton = () => {
    if (form.name === "" || form.id === "") {
      return true;
    }
    return false;
  };

  const hanleJoinRoom = () => {
    console.log("masuk..");
    console.log("form:", form);
    socket.emit("join_room", form.id);
    setShowChat(true);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="jhonn.."
            onChange={(e) => handleChange(e, "name")}
          />
          <input
            type="text"
            name="id"
            value={form.id}
            placeholder="Room ID"
            onChange={(e) => handleChange(e, "id")}
          />
          <button onClick={hanleJoinRoom} disabled={handleValidationButton()}>
            Join Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={form.name} room={form.id} />
      )}
    </div>
  );
}

export default App;
