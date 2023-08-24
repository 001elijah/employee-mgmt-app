import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../providers/userSlice';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  //console.log(user);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login(name));
  };
  if (isLogin) {
    return <Navigate to='/' />;
  }
  return (
    <div className='flex place-content-center items-center h-screen'>
      <div className='flex flex-col w-1/2 bg-blue-100 place-content-center items-center gap-4 p-8 shadow-xl rounded-xl '>
        <h1 className='font-bold font-serif text-4xl'>Login</h1>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          className='input'
        />
        <button onClick={handleClick} className='btn'>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
