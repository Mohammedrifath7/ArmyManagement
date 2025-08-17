import React from 'react';
import "./SignIn.css";
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
const SignIn = () => {
  const [value,setValues] = useState({
    username  : '',
    password : ''
  })
  const [msg,setMsg] = useState(null);
  const navigate = useNavigate();

  const handleChanges = (e) =>{
    setValues({...value,[e.target.name] : e.target.value});
    
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setMsg(null);
    try{
      const response = await axios.post("http://localhost:3000/auth/login",value);
      if(response.status ===200){
        localStorage.setItem('token',response.data.token);
        navigate('/');
      }
    } catch(error){
      const status = error.response?.status;
      const text = error.response?.data?.message || 'Something Went Wrong';
      setMsg(text);
    }
  }

  return (
    <div className="signup-container">
        <div className="signup-form">
          <div className="form_header">
            <p>Login</p>
          </div>
          {msg && <div  className='msg-error' >{msg}</div>}
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <input type="text"  placeholder='Name'  name='username' onChange={handleChanges}  />
              <input type="password"  placeholder='Password'  name='password'onChange={handleChanges} />
              <div className="submition">
                <button>Submit</button>
                <p>Dont you Have a Account? <Link  className='link'  to="/register" >Register</Link></p>
              </div>
            </form>
          </div>

          


        </div>
    </div>
  );
}

export default SignIn;
