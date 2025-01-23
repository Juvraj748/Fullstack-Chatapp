import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contacts = ({ contacts, currentUser, handleChatChange }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        handleChatChange(contact)
    }

  return (
    <>
      {
        currentUser && currentUserImage &&
        <Container>
        <h2>Contacts</h2>
        <div className="contacts">
          {contacts ? (
            contacts.length === 0 ? (
              <h3>You have no friends</h3>
            ) : (
              contacts.map((contact, index) => {
                const { username, avatarImage } = contact;
                return (
                    <div onClick={() => changeCurrentChat(index, contact)} key={username} className={`contact ${currentSelected===index ? "selected" : ""}`} >
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${avatarImage}`} alt={`avatar ${index}`} />
                        </div>
                        <div className="username">
                            <span>{username}</span>
                        </div>
                    </div>
                )
              })
            )
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div onClick={() => changeCurrentChat(null, null)} className="current-user">
            <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="userImage" />
            </div>
            <div className="username">
                <h3>
                    {currentUserName}
                </h3>
            </div>
        </div>
      </Container>
      }
    </>
  );
};

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 2.5rem;
  gap: 0.8rem;
  overflow: hidden;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  border-right: 1px solid #ffffff22;
  width: 100%;
  height: inherit;
  h2{
    color: orange;
    /* border-bottom: 1px solid; */
  }
  .contacts {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    overflow: auto;
    background-color: #0f2a5739;
    padding: 0.2rem;
    border-radius: 4px;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact {
        display: flex;
        gap: 1rem;
        min-height: 5rem;
        cursor: pointer;
        align-items: center;
        background-color: #ffffff05;
        border-radius: 10rem;
        /* border-bottom: 1px solid #ffffff19; */
        padding: 0.5rem;
        span{
            font-size: 0.8rem;
            color: aliceblue;
        }
        .avatar{
            max-height: 3rem;
            img{
                width: 3rem;
            }
        }
    }
    .selected{
        transition: 0.3s;
        background-color: #ff00f77c;
    }
  }
  .current-user{
    display: flex;
    gap: 1rem;
    background-color: #10509650;
    align-items: center;
    justify-content: center;
    border-radius: 0.2rem;
    cursor: pointer;
    .username{
        h3{
            color: aliceblue;
        }
    }
    .avatar{
        max-height: 3rem;
        img{
            height: 3rem;
        }
    }
  }
`;

export default Contacts;
