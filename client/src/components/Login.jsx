import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Login() {

  axios.defaults.withCredentials = true

  const [login , setLogin] = useState('')
  const [password , setPassword] = useState('')

  const handleChangeLogin = (e)=>{ setLogin(e.target.value) }

  const handleChangePassword = (e)=>{ setPassword(e.target.value) }


  const handleClick = async (e)=>{

    e.preventDefault()

    try{

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/log`,{login, password},
        { withCredentials: true, headers: { 'Content-Type': 'application/json', } } );

      if (response.data.admin && response.data.success) {
        window.location.href = '/admin';
      } else {
        alert(response.data?.message || 'Nieprawidłowe dane logowania');
      } 
    }catch(error){
        const message =
    error.response?.data?.message ||
    error.message ||
    'Wystąpił błąd po stronie serwera';

    alert(message);

    }  
 
  }


  return (  
    <div className="containerAdmin">
      
      <h1 style={{color: '#2a9d8f'}}>Panel Logowania</h1>

      <img src="/logo/logo2.png" alt="logo" width={200} height={'auto'}  />

      <form className='formAdmin' action="post">
        
        
        <input placeholder='login' type="text" name="login" onChange={handleChangeLogin} />
        
        
        <input placeholder='password' type="password" name="password" onChange={handleChangePassword} />

        <input type="submit" onClick={handleClick} value="Zaloguj" />

      </form>

    </div>
  );
}

export default Login;
