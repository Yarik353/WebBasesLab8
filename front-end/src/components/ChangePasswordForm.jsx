import React, {useContext, useRef} from "react";
import {Context} from "../index";
import passwordIcon from "../icons/password.svg"
import PasswordInput from "./PasswordInput";
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";

const ChangePasswordForm = (props) =>{
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigate = useNavigate();
    const {store} = useContext(Context)

    async function onSubmit(e) {
        const fields = [passwordRef, confirmPasswordRef]
        e.preventDefault()
        let isAllValid = true
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].current.isValid()) {
                isAllValid = false
            }
        }
        if(passwordRef.current.inputRef.current.value !== confirmPasswordRef.current.inputRef.current.value){
            confirmPasswordRef.current.setCustomMessage("Паролі не співпадають")
            isAllValid = false
        }
        if(isAllValid){
            console.log(store.user.id)
            console.log('res')
            const res = await UserService.updateInfo(store.user.id, 6,
                passwordRef.current.inputRef.current.value
                )
            console.log(res.data)
            store.getUserInfo()
            navigate("/user-info")
        }
    }
    function closeModal(e){
        if (e.target.id === "modal") {
            navigate("/user-info")
        }
    }
    return(
        <div id={"modal"} onClick={(e) => closeModal(e)} className="modal">
        <div className="container">
            <section id="task1-display" className="wrapper">
                <div className="heading">
                    <h1 className="text text-large">Change Password</h1>
                </div>
                <form name="login" className="form" onSubmit={(e)=> onSubmit(e)} noValidate>
                    <PasswordInput  name={"password"} errorMsg={"Поле не має бути пустим"} placeholder={"password"} regEx={passwordRegEx} ref={passwordRef} icon={passwordIcon}/>
                    <PasswordInput name={"confirmPassword"} errorMsg={"Поле не має бути пустим"} placeholder={"confirm password"} regEx={passwordRegEx} ref={confirmPasswordRef} icon={passwordIcon}/>
                    <div className="input-control">
                        <input type="submit" id="submit_button" name="submit" className="input-submit" value="Confirm Changes" />
                    </div>
                </form>
            </section>
        </div>
        </div>
    )
}

export default ChangePasswordForm
