import axios from "axios";

// axios.defaults.baseURL = "https://baseURL.com";

axios.defaults.baseURL = "http://localhost:3000";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const registerUserApi = async (userData) => {
  const { data } = await axios.post("/user/register", userData);
  token.set(data.token);
  return { ...data.user, token: data.token };
};

export const loginUserApi = async (userData) => {
  const { data } = await axios.post("/user/login", userData);
  const user = await currentUserApi(data.token);
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
