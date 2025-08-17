import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  
  const fetch = async() =>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:3000/auth/home",{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      });
      
    } catch(error){
      navigate('/login');
    }
    
  }


  useEffect(()=>{
    fetch();
  },[])


  return (
    <h1>Hey</h1>
  )
}

export default Home