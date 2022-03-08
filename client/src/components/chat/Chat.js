import React, { useState, useEffect } from "react"
import "./Chat.css"
import io from "socket.io-client"

let socket

const Chat = () => {

  console.log("set variables")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [time, setTime] = useState(Date.now())
  
  const ENDPOINT = "http://localhost:5000"

  socket = io(ENDPOINT)

  useEffect(() => {
    socket.on('message', (messageObject) => {
      setMessages(messages => [...messages, messageObject])
    })
  })

  const handleSend = (e) => {
    e.preventDefault()
    setTime(new Date())
    if (message) {
      socket.emit("sendMessage", {name, time, message})
      setMessage("")
    }
    else {
      alert("Empty input")
    }
  }

  return (
    <div className="chat-container row justify-content-md-center justify-content-lg-center">
      <div className="
      ChatWindow
      col-md-10
      col-lg-10
      col-sm-12">
        {console.log(messages)}
        {messages.map((val, i) => {
        return (
          <div key={i}>
            <p>{val.name} [{val.time}]: {val.message}</p>
          </div>
        )
      })}
    </div>
    <div className="
    Chatbox
    col-sm-12
    col-md-10
    col-lg-10
    col-xl-10
    mt-4">
      <form onSubmit={handleSend}>
        <div className="form-group row">
          <label htmlFor="name" className="col-2 col-form-label">
            Name
          </label>
          <div className="col-10">
            <input 
              type="name" 
              className="form-control" 
              placeholder="Anonymous" 
              onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-2 col-form-label">
            Message
          </label>
          <div className="col-9">
            <input 
              type="text" 
              className="form-control" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="col-1">
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>

    </div>
      )
}

export default Chat