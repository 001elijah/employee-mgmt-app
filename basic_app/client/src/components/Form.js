import React, { useState } from 'react';

import useAddData from '../hooks/useAddData';
import ItemList from './ItemList';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const { addData } = useAddData('http://127.0.0.1:5000/', {
    name,
    email,
    age,
  });

  return (
    <div className=' flex items-center place-content-center flex-col'>
      <form
        onSubmit={addData}
        className='flex place-content-center flex-col mb-8 bg-blue-100 w-1/3 p-3 gap-3 items-center shadow-xl rounded-xl m-4 '
      >
        <input
          required
          className=' input '
          type='text'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          className='input'
          type='text'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className='input'
          type='text'
          placeholder='age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className='btn' type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
