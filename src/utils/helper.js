import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login,logout } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const serverUri = import.meta.env.VITE_APP_SERVER_URI;

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    if (!user) return false;
    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;
    return true;
  } catch (error) {
    console.log(error);
    return redirect({ to: "/auth" });
  }
};

export const logoutUser =  () => {

  const dispatch = useDispatch();
  return async function(){
    try {
    const { data } = await axios.post(`${serverUri}/api/auth/logout`, {
     
    },{
        withCredentials:true
    });

    dispatch(logout());
    return { success: true, message: data.message };
    
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message ,error};
  }
  }
};