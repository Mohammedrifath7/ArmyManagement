import React, { useState } from 'react';
import "./SignUp.css";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const SignUp = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username : '',
    role : '',
    password : ''
  })
  const handleChanges = (e) =>{
    setValues({...values,[e.target.name] : e.target.value})
    
  }
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/auth/register",values);
    if(response.status===200) navigate('/login')
  }

  return (
    <div className="register-container">
        <div className="register-form">
          <div className="form_header">
            <p>Register</p>
          </div>
          <div className="login-form" >
            <form onSubmit={handleSubmit}>
              <input type="text"  placeholder='Name' name='username'  onChange={handleChanges}  />
              <input type="text"  placeholder='Role'  name='role'  onChange={handleChanges} />
              <input type="password"  placeholder='Password'  name='password'  onChange={handleChanges}/>
              <div className="submition">
                <button>Submit</button>
                <p>Already Have a Account? <Link  className='link'   to="/login" >Login</Link></p>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}

export default SignUp;
