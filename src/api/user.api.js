import axiosInstance from "../utils/axiosInstance"
import axios from "axios"
export const loginUser = async (password,email) =>{
    const {data} = await axiosInstance.post("/api/auth/login",{email,password})
    return data
}

export const registerUser = async (name,password,email) =>{
    const {data} = await axiosInstance.post("/api/auth/register",{name,email,password})
    return data
}

export const verify_otp_register_user = async (otp) =>{
    const data = await axios.post("http://localhost:7000/api/auth/verify_otp_registerUser",{
        otp
    },{withCredentials:true});
    
    return data
}

export const logoutUser = async () =>{
    const {data} = await axiosInstance.get("/api/auth/logout")
    return data
}

export const getCurrentUser = async () =>{
    const {data} = await axiosInstance.get("/api/auth/me")
    return data
}

export const getAllUserUrls = async () =>{
    const {data} = await axiosInstance.post("/api/user/urls")
    return data
}