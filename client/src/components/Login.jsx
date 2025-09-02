import React, { useState } from 'react';
import axios from 'axios';


function Login() {

  axios.defaults.withCredentials = true

  const [login , setLogin] = useState('')
  const [password , setPassword] = useState('')

  const handleChangeLogin = (e)=>{ setLogin(e.target.value) }

  const handleChangePassword = (e)=>{ setPassword(e.target.value) }


  const handleClick = async (e)=>{

    e.preventDefault()

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/log/?login=${login}&password=${password}` ,null, { withCredentials: true })

     if(response.data.admin && response.data.success){
          window.location.href='/admin'
     }
  }


  return (  
    <div className="container">
      
      <h1>Panel Logowania</h1>

      <form action="post">
        
        <label htmlFor="">Login</label>
        <input type="text" name="login" onChange={handleChangeLogin} />
        
        <label htmlFor="">Password</label>
        <input type="password" name="password" onChange={handleChangePassword} />

        <input type="submit" onClick={handleClick} value="Zaloguj" />

      </form>

    </div>
  );
}

export default Login;
