import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.svg"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const nav = useNavigate();

  const handleValidation = () =>{
    const {email, password} = value;
    if(email.length < 1){
      toast.error("Email should not be empty")
      return false
    }
    if(password.length < 1){
      toast.error("Password should not be empty")
      return false
    }
    return true
  }

  useEffect(()=>{
    if(localStorage.getItem("user")){
      let user = localStorage.getItem("user")
      user = JSON.parse(user)
      if(user.isAvatarImageSet) nav("/") 
      else nav("/selectAvatar")
    }
  }, [])

  const [value, setValue] = useState({
    email: "",
    password: ""
  }) 

  const handleChange = (e) =>{
    setValue({...value, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(handleValidation()){
      const {email, password} = value;
      const {data} = await axios.post(loginRoute, {
        password, email
      })

      if(data.status === false){
        toast.error(data.msg)
      } else if(data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user))
        nav(data.user.isAvatarImageSet ? "/" : "/selectAvatar")
      }
    }
  }

  return (
    <>
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='brand'>
          <img src={logo} alt="logo" />
          <h1>Juvy Chat</h1>
        </div>
        <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)} />
        <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
        <button type='submit'>Login</button>
        <span>Don't have an account? <Link to="/register" >Sign up</Link> </span>
      </form>
    </FormContainer>
    <ToastContainer {...toastOptions} />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #131324;
  gap: 1rem;
  /* overflow: auto; */
  color: aliceblue;
  .brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    img{
      height: 5rem;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #10101080;
    padding: 48px;
    border-radius: 20px;
    input{
      background-color: transparent !important;
      padding: 8px 12px;
      border: 1px solid #4d6a92;
      border-radius: 6px;
      color: #ccd7e1;
      &:focus{
        border: 1px solid #9cbce8;
        box-shadow: 0px 0px 2px 2px #488ff3;
        outline: none;
      }
    }
    button{
      background-color: #0051ffba;
      color: #ccd7e1;
      padding: 0.5rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      cursor: pointer;
      transition: 0.5s;
      &:hover{
        background-color: #0051ff92;
      }
    }
    span{
      color: #d2eaff;
    }
    a{
      color: #ff0084;
    }
  }
`;

export default Login;