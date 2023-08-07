
import { useDispatch } from "react-redux";
import { logout } from "./redux/LoginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Logout() {
    const dispath = useDispatch();
    const nevigate = useNavigate();
    useEffect(()=>{
        dispath(logout());
        localStorage.setItem('login', "");
        nevigate("/");
    },[])
  return (
    <div>Loading ...</div>
  )
}
