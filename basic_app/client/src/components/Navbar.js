import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../providers/userSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className='flex justify-around gap-9 items-center bg-blue-100 h-14  w-full'>
      <h1 className='font-bold font-serif text-2xl'>{user}</h1>
      <button className='btn w-1/12' onClick={() => dispatch(logout())}>
        Log out
      </button>
    </div>
  );
};

export default Navbar;
