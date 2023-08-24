import React from 'react';
import useFetch from '../hooks/useFetch';

const ItemList = () => {
  const { users } = useFetch('http://127.0.0.1:5000/get');

  console.log(users);
  return (
    <div className=' flex items-center place-content-center flex-col'>
      {users &&
        users.map((item, i) => (
          <div
            key={i}
            className='bg-gray-200 w-1/3 justify-center flex gap-4 p-3 shadow-xl rounded-xl m-4'
          >
            <h1>name: {item.name}</h1>
            <h1>email: {item.email}</h1>
            <h1>age: {item.age}</h1>
          </div>
        ))}
    </div>
  );
};

export default ItemList;
