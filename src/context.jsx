import { Children, createContext, useContext, useState } from "react"

const MessageContext = createContext({
  messages: [],
  addMessage: () => {}
})

export const MessageProvider = () => {
  const {messages, setMessages} = useState([]);
  const addMessage = (message) => 
    setMessages([...messages, message])
  return(
    <MessageContext.Provider value={{messages, addMessage}} >{Children}</MessageContext.Provider>
  )
}

export const useMessageContext = () => useContext(MessageContext);

