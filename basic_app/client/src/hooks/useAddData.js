import axios from 'axios';

const useAddData = (url, data) => {
  const addData = async (e) => {
    e.preventDefault();
    await axios.post(url, data);
  };

  return { addData };
};

export default useAddData;
