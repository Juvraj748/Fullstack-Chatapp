import React from 'react'
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async () =>{
        localStorage.clear()
        navigate("/login")
    }
  return (
    <Button onClick={handleClick}>
        <FaPowerOff />
    </Button>
  )
}

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    aspect-ratio: 1/1;
    border-radius: 5rem;
    height: 2rem;
    border: none;
    transition: 0.3s;
    &:hover{
        transform: scale(1.1);
        background-color: aliceblue;
    }
`

export default Logout;
