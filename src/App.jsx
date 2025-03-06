import { useState, useEffect, useRef,createContext } from 'react'
import { socket } from './socket.js';
import { ConnectionManager } from './components/connectionManage.jsx';
import './App.css'

const MessageContext = createContext({
  messages: [],
  addMessage: () => {}
})

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([])
  const input = useRef(null)
  const addMessage = (message) => {
    setMessages([...messages, message])
  }

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
    <MessageContext.Provider value={{messages, addMessage}}>
      <ConnectionManager />
      <Messages />
      <form id="form" action="">
        <input id="input" autocomplete="off" ref={input}/><button onClick={sendMessage}>Send</button>
      </form>
    </MessageContext.Provider>
    </>
  )
}

export default App
