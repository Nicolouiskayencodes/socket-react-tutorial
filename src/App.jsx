import { useState, useEffect, useRef } from 'react'
import { socket } from './socket.js';
import { ConnectionManager } from './components/connectionManage.jsx';
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const input = useRef(null)
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }


    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  function sendMessage(event) {
    event.preventDefault();
    if (input.current.value) {
      socket.emit('chat message', input.current.value);
      input.current.value = '';
    }
  }

  return (
    <>
      <ConnectionManager />
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autocomplete="off" ref={input}/><button onClick={sendMessage}>Send</button>
      </form>
    </>
  )
}

export default App
