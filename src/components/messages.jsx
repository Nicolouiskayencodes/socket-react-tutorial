import { useMessageContext } from "../context"
export function Messages() {
  const messages = useMessageContext().messages
  return(
    <ul>
      {messages.map(message => <li>{message.content}</li>)}
    </ul>
  )
}