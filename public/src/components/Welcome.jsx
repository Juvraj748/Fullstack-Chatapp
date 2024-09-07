import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"

const Welcome = ({ currentUser }) => {
  return (
    <Container>
        <img src={Robot} alt="robot" />
        <h1>
            Welcome <span>{currentUser?.username}</span>
        </h1>
        <h3>
            Select a chat to start messaging
        </h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
    h1, h3{
        color: aliceblue;
        span{
            color: #6070de;
        }
    }
    img{
        height: 50vh;
    }
`

export default Welcome
