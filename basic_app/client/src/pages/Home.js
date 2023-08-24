import React from 'react';
import Form from '../components/Form';
import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';
import ItemList from '../components/ItemList';
import Navbar from '../components/Navbar';
const Home = () => {
  const [showitems, setShowitems] = React.useState(false);
  const { isLogin } = useSelector((state) => state.user);
  if (!isLogin) return <Navigate to='/login' />;
  return (
    <>
      <Navbar />
      <Form />
      <ItemList />
    </>
  );
};

export default Home;
