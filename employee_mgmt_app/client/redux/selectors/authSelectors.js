export const selectIsAuth = (state) => Boolean(state.auth.token);
export const selectToken = (state) => state.auth.token;
export const selectUserName = (state) => state.auth.username;
export const selectUserRole = (state) => state.auth.role;
export const selectAvatarURL = (state) => state.auth.avatarUrl;
export const selectEmail = (state) => state.auth.email;
export const selectUserID = (state) => state.auth.id;
