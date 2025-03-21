import { useState, useEffect, useRef } from 'react'
import { socket } from './socket.js';
import { ConnectionManager } from './components/connectionManage.jsx';
import { MessageProvider } from './context.jsx';
import { Messages } from './components/messages.jsx';
import './App.css'

let counter = 0;

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
      const clientOffset = `${socket.id}-${counter++}`;
      socket.emit('chat message', input.current.value, clientOffset);
      input.current.value = '';
    }
  }

  return (
    <>
    <MessageProvider>
      {(isConnected) ? (<h1>Connected</h1>) : (<h1>Disconnected</h1>)}
      <ConnectionManager />
      <Messages />
      <form id="form" action="">
        <input id="input" ref={input}/><button onClick={sendMessage}>Send</button>
      </form>
    </MessageProvider>
    </>
  )
}

export default App
