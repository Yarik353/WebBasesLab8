import React, {useContext, useRef} from "react";
import {Context} from "../index";
import logoutIcon from "../icons/logout.svg";
import adminIcon from "../icons/admin.svg";
import greenUserIcon from "../icons/greenUser.svg";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

async function logout(e, store, navigate){
    await store.logout()
    navigate("/")
}
async function toUserInfo(e, navigate){
    navigate("/user-info")

}
function navigateToHome(e, navigate){
    navigate("/")
}
function toAdminPanel(e, navigate){
    navigate("/all-users")
}
function navigateToLoginPage(e, navigate){
    navigate("/login")
    console.log("navigating")
}
function navigateToRegisterPage(e, navigate){
    navigate("/register")
}

const Header = props=>{
    const {store} = useContext(Context)
    const navigate = useNavigate()
    console.log(store.isAuth)
    if(store.isAuth){
        return(
            <header>
                <h1 className={"logo_btn"} onClick={(e)=>navigateToHome(e, navigate)}>{props.text}</h1>
                {store.user.role ==="admin" ?
                    <img src={adminIcon} className={"far4 big-icon"}   onClick={(e)=>toAdminPanel(e, navigate)}/>
                : null}
                <img src={logoutIcon} className={"far2 big-icon"}   onClick={(e)=>logout(e, store, navigate)}/>
                <img src={greenUserIcon} className={"far3 big-icon"}   onClick={(e)=>toUserInfo(e, navigate)}/>
            </header>
        )
    }
    else{
        return(
            <header>
                <h1 className={"logo_btn"} onClick={(e)=>navigateToHome(e, navigate)}>{props.text}</h1>
                <div className={"far2"}>
                    <button onClick={(e)=>navigateToLoginPage(e, navigate)} className="log auth-button">Login</button>
                    <button onClick={(e)=>navigateToRegisterPage(e, navigate)} className="reg auth-button">Sign up</button>
                </div>
            </header>
        )
    }

}

export default observer(Header)