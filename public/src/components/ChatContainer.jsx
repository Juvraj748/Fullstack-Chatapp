import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import Chatinput from './Chatinput'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState()
    const scrollRef = useRef()

    const handleSendMessage = async (message) => {
        await axios.post(sendMessageRoute,{
            from: currentUser._id, 
            to: currentChat._id,
            message: message
        })
        socket.current.emit("send-message", {
            to: currentChat._id,
            from: currentUser._id,
            message: message
        })

        const msgs = [...messages];
        msgs.push({fromSelf:true, message:message})
        setMessages(msgs);
    }
    useEffect(() => {
        const getAllMessages = async () => {
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id
            });
            setMessages(response.data)
        }

        if(currentChat) getAllMessages();
    }, [currentChat])

    useEffect(() => {
        if(socket.current){
            socket.current.on("message-receive", (message) =>{
                console.log(message)
                setArrivalMessage({fromSelf: false, message:message})
            })
        }
    },[])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage]);

    useEffect(() => {
        if(!scrollRef.current){
            scrollRef.current = document.querySelector(".chat-messages");
            // scrollRef.current.scrollTop(500)
        }
        const height = scrollRef.current.scrollHeight;
        scrollRef.current.scrollTo({top: height, behavior:"smooth"});
        // scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }, [messages])

  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                </div>
                <div className="username">
                    <h3>
                        {currentChat?.username}
                    </h3>
                </div>
            </div>
            <Logout />
        </div>
        {/* <Messages /> */}
        <div className="chat-messages">
            {
                messages.map((message) => {
                    return(
                        <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                            <div className="content">
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="chat-input">
            <Chatinput handleSendMessage={handleSendMessage} />
        </div>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 12vh 64vh;
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #2600ff17;
        .user-details{
            width: 100%;
            gap: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .avatar{
                img{
                    width: 2.5rem;
                }
            }
            .username{
                h3{
                    color: #a5aeff;
                }
            }
        }
    }
    .chat-input{
        align-content: center;
        text-align: center;
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.2); 
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.7rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.2rem;
                border-radius: 1rem;
                &:hover{
                    background-color: #ffffff50;
                }
            }
        }
        .message{
            display: flex;
            align-items: center;
            .content {
                max-width: 70%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sended {
            justify-content: flex-end;
            .content{
                background-color: #4f04ff21;
            }
        }
        .received {
            justify-content: flex-start;
            .content{
                background-color: #a5aeff;
                color: #000000;
            }
        }
    }
`

export default ChatContainer
