import axios from "axios";

axios.defaults.baseURL = "https://1632-78-71-172-166.ngrok-free.app";

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
  const { data } = await axios.post("/auth/login", userData);
  return data;
};

export const currentUserApi = async (userToken) => {
  token.set(userToken);
  const { data } = await axios.get("/auth/current");
  return data;
};

// export const logoutUserApi = async (userToken) => {
//   await axios.post("/auth/logout", userToken);
//   token.unset();
//   return null;
// };

export const updateUserApi = async (userData) => {
  const { data } = await axios.patch("/auth/updateUserInfo", userData);
  return data.user;
};
