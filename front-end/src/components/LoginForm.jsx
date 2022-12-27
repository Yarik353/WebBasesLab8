import React, {useContext, useRef, useState} from "react";
import LabledInput from "./LabledInput";
import ModalBox from "./ModalBox";
import {Context} from "../index";
import userIcon from "../icons/user.svg"
import passwordIcon from "../icons/password.svg"
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import PasswordInput from "./PasswordInput";

const LoginForm = (props) =>{
    const notEmptyRegEx = /^(?!\s*$).+/;
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)
    const navigate = useNavigate()
    async function onSubmit(e){
        const fields = [usernameRef, passwordRef]
        e.preventDefault()
        let isAllValid = true
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].current.isValid()) {
                isAllValid = false
            }
        }
        if(isAllValid){
            await store.login(usernameRef.current.inputRef.current.value, passwordRef.current.inputRef.current.value)
            if(store.loginResponse !== null){
                passwordRef.current.setCustomMessage(store.loginResponse)
            }
            else{
                navigate("/")
            }
        }
    }
    const toRegister= () =>{
        navigate("/register")
    }
    return(
        <div className="container">
        <section id="task1-display" className="wrapper">
            <div className="heading">
                <h1 className="text text-large">Log in</h1>
            </div>
            <form name="login" className="form" onSubmit={(e)=>onSubmit(e)} noValidate>
                <LabledInput errorMsg={"Поле не має бути пустим"} labelText={"username"} name={"username"} placeholder={"username"} icon={userIcon} regEx={notEmptyRegEx} ref={usernameRef}/>
                <PasswordInput errorMsg={"Поле не має бути пустим"} labelText={"password"} name={"password"} placeholder={"password"} icon={passwordIcon} regEx={notEmptyRegEx} ref={passwordRef}/>
                <div className="input-control">
                    <input type="submit" id="submit_button" name="submit" className="input-submit" value="Submit" />
                </div>
            </form>
            <div className={"form-footer"}>
                Don`t have an account yet?
                <p>
                    <span onClick={toRegister} className={"user-info-link"} >Sign up</span>
                </p>

            </div>
        </section>
        </div>
    )
}

export default  observer(LoginForm)
