import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/VetCare.png'
import Dog from '../assets/dog.jpg'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after login

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4000/login', { Email: email, Password: password })
      .then((response) => {
        // If login is successful, redirect to the users page
        navigate('/users');
      })
      .catch((error) => {
        // Display an error message if login fails
        setError(error.response.data.message || 'An error occurred');
      });
  };

  return (
    <div className='bg-white py-10'>
        <div className='bg-orange-200 mx-14 h-[770px] rounded-2xl flex '>
            <div className='flex-1'>
      <h1 className='text-6xl text-center mt-48'>Hi there !</h1>
      <div className="text-center mt-11">Welcome to VetCare, Community Dashboard</div>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className=' items-center flex justify-center flex-col gap-9' >
          
          <input
            type="email" className=' placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 mt-16 text-1xl bg-orange-200 border-4 border-white'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required placeholder='Your Email'
           />
        
        <div>
          
          <input
            type="password" className='placeholder:text-gray-500 rounded-lg px-4 w-96 py-2  text-1xl bg-orange-200 border-4 border-white'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required placeholder='Password'
          />
        </div>
        <button type="submit" className=' rounded-full bg-black text-white px-5 w-80 py-2'>Login</button></div>
        <div className='text-center mt-10'>Don't have an account? <a href='/create' className='text-blue-500'>Register</a></div>
      </form>
      </div>
      <div className=' '>
        <img src={Dog} alt='logo' className=' rounded-2xl h-full'/>
      </div>
        </div>
    </div>
  );
}

export default Login;
