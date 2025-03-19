import { createContext, useContext, useState } from "react"

const MessageContext = createContext({
  messages: [],
  addMessage: () => {}
})

export const MessageProvider = ({children}) => {
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => {
    console.log('add message')
    setMessages(messages => [...messages, message])
  }
  const value = {
    messages,
    addMessage
  }
  return(
    <MessageContext.Provider value={value} >{children}</MessageContext.Provider>
  )
}

export const useMessageContext = () => useContext(MessageContext);

