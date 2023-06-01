import React from "react";
import "./Header.css";
import Profil from "../../../assets/Profil";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {userActions} from '../../../redux/userAuthentification'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {userName} = useSelector((state)=> state.user)
  const handleLogOut = ()=>{
    dispatch(userActions.userLogout())
    navigate('/login')
  }
  return (
    <div className="outer">
      <div id="header">
        <div className="left">
          <h3>{userName}</h3>
          
        </div>
        <div className="right">
          <div>
            <span onClick={handleLogOut} >Logout</span>
          </div>
          <div onClick={() => navigate("/profile")}>
            <Profil />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
