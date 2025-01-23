import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from "../assets/loader.gif"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

const SetAvatar = () => {
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(-1)

    useEffect(()=>{
        if(!localStorage.getItem("user")){
            nav("/login")
        }
    }, [])
    
    useEffect(()=>{
        const getImages = async() => {
            const data = [];
            for(let i = 0; i<4 ; i++){
                const image = await axios(`${api}/${Math.round(Math.random() * 100000)}?apikey=${process.env.REACT_APP_AVATAR_API_KEY}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"))
            }
            setAvatars(data)
            setIsloading(false)
        }
        getImages();
    },[]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const api = `https://api.multiavatar.com`
  const nav = useNavigate();

  const selectAvatar = (index) =>{
    setSelectedAvatar(index)
  }

  const setProfilePicture = async () =>{
    if(selectedAvatar === -1){
        toast.warn("Select an Avatar for your profile picture")
    } else {
        let user = JSON.parse(localStorage.getItem("user"))
        user.avatarImage = avatars[selectedAvatar] 
        await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar]
        }).then((res)=>{
            setIsloading(true);
            const data = res.data;
            user = { ...user, ...data } 
            localStorage.setItem("user", JSON.stringify(user))
            nav("/");
        }).catch((err)=>{
            console.log(err);
            toast.warn("Something went wrong");
        }).finally(() => {
            setIsloading(false)
            setAvatars([])
        })
    }
  }

  return (
    <>
    <Container>
        {isLoading ?
        <>
        <img src={loader} alt="Loading..." />
        </>
        :
        <>
        <div className="avatar-title">
            <h1>Pick an Avatar for you profile picture</h1>
        </div>
        <div className="avatars">
            {
                avatars.map((image, index)=>{
                    return(
                        <div key={index} onClick={() => selectAvatar(index)} className={`avatar ${index === selectedAvatar ? "selected" : ""}`}>
                            <img src={`data:image/svg+xml;base64,${image}`} width={150} alt={`avatar ${index}`} />
                        </div>
                    )
                })
            }
        </div>
        <div className="submit-btn">
            <button onClick={setProfilePicture} >
                Set as Profile Picture
            </button>
        </div>
        </>
        }
    </Container>
    <ToastContainer {...toastOptions} />
    </>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    background-color: #131324;
    h1, h3{
        color: aliceblue;
    }
    .submit-btn{
        button{
            padding: 0.3rem 1.5rem;
            color: #0d0d28;
            background-color: #6a9de8;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            font-weight: 500;
            color: aliceblue;
            &:hover{
                transform: scale(1.1);
                background-color: #6b95d5;
            }
        }
    }
    .avatars{
        display: flex;
        flex-direction: row;
        gap: 3rem;
        .avatar{
            cursor: pointer;
            transition: 0.2s;
            img{            
                border-radius: 5rem;
                border: 0.3rem solid transparent;
            }
            &:hover{
                transform: scale(1.1);
            }
            &.selected {
                img{
                    transform: scale(1.1);
                    border: 0.3rem solid aliceblue;
                }
            }
        }
    }
`

export default SetAvatar;