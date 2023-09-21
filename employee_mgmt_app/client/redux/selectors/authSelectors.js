export const selectIsAuth = (state) => Boolean(state.auth.token);
export const selectToken = (state) => state.auth.token;
export const selectUserName = (state) => state.auth.userName;
export const selectAvatarURL = (state) => state.auth.avatarUrl;
export const selectEmail = (state) => state.auth.email;
