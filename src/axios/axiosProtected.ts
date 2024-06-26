import axios from "axios";
import axiosClient from "./axiosClient";
import { RefreshTokenApi } from "../api";

export const axiosProtected = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials : true,
    headers: {
        "Content-Type": "application/json",
    },
})

// axiosProtected.interceptors.request.use(
//     config => {
//         console.log("before do smth")
//         config.headers["Authorization"] = "Bearer " + "blah blah"
//         return config;
//     }, (error) => Promise.reject(error) 
// )

// axiosProtected.interceptors.response.use(
//     (response) => {
//         console.log("response")
//         return response
//     }, async (error) => {
//             if(error.response.status === 403){
//                 console.log("invalid token")
//                 try{
//                     const res = await axiosClient.post(RefreshTokenApi());
//                     console.log(res)
//                 }catch(err : any){
//                     if(err.response.status === 403){
//                         throw new Error("go login")
//                     }else{
//                         throw new Error("something went wrong")
//                     }
//                 }
//             }
//     }
// )