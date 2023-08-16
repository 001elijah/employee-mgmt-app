import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      setUsers(res.data);
    };
    fetchData();
  }, []);

  return { users };
};

export default useFetch;
