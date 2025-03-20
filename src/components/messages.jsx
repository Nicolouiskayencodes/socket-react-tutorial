import { useEffect } from "react"
import { useMessageContext } from "../context"
import { socket } from "../socket"
export function Messages() {
  const {messages, addMessage} = useMessageContext()
  console.log(messages)
  useEffect(() => {
  function onMessage(msg, serverOffset) {
    console.log(msg)
    addMessage(msg)
    socket.auth.serverOffset = serverOffset;
  }
  socket.on('chat message',onMessage)
  return() => {
    socket.off('chat message', onMessage);
  }
}, [addMessage])
  return(
    <ul>
      {messages.map((message, index) => <li key={index}>{message}</li>)}
    </ul>
  )
}