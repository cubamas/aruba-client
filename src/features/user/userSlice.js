import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  dracula: "dracula",
  light: "light",
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.light;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const getUserRolesFromLocalStore = () => {
  return JSON.parse(localStorage.getItem("roles")) || [];
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
  roles: getUserRolesFromLocalStore(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.roles = [];
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      toast.success("Logged out successfully");
    },
    loginUser: (state, action) => {
      console.log("login", action.payload);
      const { roles, ...user } = action.payload.user;
      const data = {
        ...user,
        token: action.payload.token,
      };
      state.user = data;
      state.roles = roles;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("roles", JSON.stringify(roles));
    },
    toggleTheme: (state) => {
      const { dracula, light } = themes;
      state.theme = state.theme === dracula ? light : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, toggleTheme, logoutUser } = userSlice.actions;

export default userSlice.reducer;
