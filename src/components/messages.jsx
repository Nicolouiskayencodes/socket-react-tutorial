import { useEffect } from "react"
import { useMessageContext } from "../context"
import { socket } from "../socket"
export function Messages() {
  const {messages, addMessage} = useMessageContext()
  console.log(messages)
  useEffect(() => {
  function onMessage(msg) {
    console.log(msg)
    addMessage(msg)
  }
  socket.on('chat message',onMessage)
  return() => {
    socket.off('chat message', onMessage);
  }
}, [addMessage])
  return(
    <ul>
      {/* {messages.messages.map(message => <li key={messages.indexOf(message)}>{message.content}</li>)} */}
    </ul>
  )
}