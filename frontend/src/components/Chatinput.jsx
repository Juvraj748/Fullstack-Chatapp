import React, { useState } from 'react'
import Picker from "emoji-picker-react"
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import styled from 'styled-components';

const Chatinput = ({ handleSendMessage }) => {
    const [showEmmojiPicker, setShowEmojiPPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPPicker(!showEmmojiPicker)
    }

    const handleEmojiClick = (event, emoji) =>{
        let message = msg;
        message += event.emoji
        setMsg(message)
    }

    const handleInput = (event) =>{
        setMsg(event.target.value)
    }

    const sendChat = (event) =>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMessage(msg)
            setMsg("")
        }
    }

  return (
    <Container>
        <div className='button-container'>
            <div className="emoji">
                <MdOutlineEmojiEmotions onClick={handleEmojiPickerHideShow} />
                {
                    showEmmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input onChange={handleInput} value={msg} type='text' placeholder='type your message here' />
            <button className='submit'>
                <IoSend/>
            </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    background-color: transparent;
    gap: 1rem;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container{
        display: flex;
        align-items: center;
        color: aliceblue;
        .emoji{
            height: 100%;
            position: relative;
            svg{
                height: inherit;
                font-size: 1.5rem;
                color: aliceblue;
                cursor: pointer;
            }
            aside{
                position: absolute;
                top: -460px;
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        background-color: #ffffff34;
        overflow: hidden;
        input{
            width: 90%;
            height: 100%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1rem;
            &::selection{
                background-color: #9186f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            /* padding: 0.3rem 1rem; */
            padding: 18px;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            cursor: pointer;
            svg{
                font-size: 1.2rem;
                color: aliceblue;
            }
        }
    }
`

export default Chatinput
