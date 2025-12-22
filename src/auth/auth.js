export const saveToken = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
}
export const logout = () => {
  localStorage.clear();
}

