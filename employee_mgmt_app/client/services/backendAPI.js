import axios from "axios";

// axios.defaults.baseURL = "https://baseURL.com";

// axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.baseURL = "https://ee66-78-71-172-166.ngrok-free.app";  

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const registerUserApi = async (userData) => {
  const { data } = await axios.post("/auth/signup", userData);
  return { ...data.user };
};

export const loginUserApi = async (userData) => {

  console.log(userData);

  const { data } = await axios.post("/auth/login", userData);
  //const user = await currentUserApi(data.token);
  return { ...user, token: data.token };
};

export const currentUserApi = async (userToken) => {
  token.set(userToken);
  const { data } = await axios.get("/user/current");
  return data;
};

export const logoutUserApi = async (userToken) => {
  await axios.post("/user/logout", userToken);
  token.unset();
  return null;
};

export const updateUserApi = async (userData) => {
  const { data } = await axios.patch("/user/updateUserInfo", userData);
  return data.user;
};
