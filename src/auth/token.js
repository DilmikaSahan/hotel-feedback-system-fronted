export const saveToken = (access, refresh) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const getToken = () => localStorage.getItem("accessToken");

export const logout = () => localStorage.clear();
