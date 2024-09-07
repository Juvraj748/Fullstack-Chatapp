import React, { useEffect, useState, useRef } from 'react'
import { allUsersRoute, host } from '../utils/APIRoutes';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ChatContainer from "../components/ChatContainer"
import Welcome from '../components/Welcome';
import { io } from "socket.io-client"

const Chat = () => {

  const [contacts, setContacts] = useState(null);
  const [user, setUser] = useState(null)
  const nav = useNavigate()
  const [currentChat, setCurrentChat] = useState(null)
  const socket = useRef()

  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  }

  useEffect(() => {
    const getUsers = async () => {
      let currentUser = localStorage.getItem("user")
      if(!currentUser){
        nav("/login")
      } else {
        currentUser = JSON.parse(currentUser)
        setUser(currentUser)
        if(currentUser.isAvatarImageSet){
          const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.users)
        } else {
          nav("/selectAvatar")
        }  
      } 
    }

    getUsers()
  }, []);

  useEffect(() => {
    console.log(user)
    if(user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user])

  return (
    <>
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={user} handleChatChange={handleChatChange} />
        {
          currentChat===null ? 
          <Welcome currentUser={user} /> 
          : 
          <ChatContainer currentChat={currentChat} currentUser={user} socket={socket} />
        }
      </div>
    </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  gap: 1rem;
  .container{
    height: 85vh;
    width: 90vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    /* gap: 1rem; */
    border-radius: 1.5rem;
    overflow: hidden;
    @media only screen and (max-width: 1044px)  {
      grid-template-columns: 40% 60%;
    }
  }
`

export default Chat
