import React, {useContext, useRef, useState} from "react";
import LabledInput from "./LabledInput";
import {Context} from "../index";
import userIcon from "../icons/user.svg"
import passwordIcon from "../icons/password.svg"
import groupIcon from "../icons/group.svg"
import variantIcon from "../icons/variant.svg"
import PasswordInput from "./PasswordInput";
import {useNavigate} from "react-router-dom";
const RegisterForm = (props) =>{
    //username, password, firstName, lastName, group, variant
    const usernameRegEx = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const firstNameRegEx = /^[a-zA-z]+$/;
    const lastNameRegEx = /^[a-zA-z]+$/;
    const groupRegEx = /^[a-zA-Z]{2}-[0-9]{2}$/;
    const variantRegEx = /^[0-9]{1,2}$/;
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const groupRef = useRef(null);
    const variantRef = useRef(null);
    const navigate = useNavigate()
    const {store} = useContext(Context)

    async function onSubmit(e) {
        const fields = [usernameRef, passwordRef, confirmPasswordRef, firstNameRef, lastNameRef, groupRef, variantRef]
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
                await store.register(usernameRef.current.inputRef.current.value,
                    passwordRef.current.inputRef.current.value,
                    firstNameRef.current.inputRef.current.value,
                    lastNameRef.current.inputRef.current.value,
                    groupRef.current.inputRef.current.value,
                    variantRef.current.inputRef.current.value)
            if(store.registerResponse !== null){
                usernameRef.current.setCustomMessage(store.registerResponse)
            }
            else{
                navigate("/")
            }
        }

    }
    const toLogin= () =>{
        navigate("/login")
    }
    return(
        <div className="container">
            <section id="task1-display" className="wrapper">
                <div className="heading">
                    <h1 className="text text-large">Register</h1>
                </div>
                <form name="login" className="form" onSubmit={(e)=>onSubmit(e)} noValidate>
                    <LabledInput name={"username"} errorMsg={"ім'я користувача має містити літери та числа"} placeholder={"username"} regEx={usernameRegEx} ref={usernameRef} icon={userIcon}/>
                    <PasswordInput name={"password"} errorMsg={"Пароль має містити мінімум 8 символів, хочаб одну літару та цифру"} placeholder={"password"} regEx={passwordRegEx} ref={passwordRef} icon={passwordIcon}/>
                    <PasswordInput name={"confirmPassword"} errorMsg={"Поле немає бути пустим та містити числа"} placeholder={"confirm password"} regEx={passwordRegEx} ref={confirmPasswordRef} icon={passwordIcon}/>
                    <LabledInput name={"fName"} errorMsg={"Поле немає бути пустим та містити зайві знаки"} placeholder={"first name"} regEx={firstNameRegEx} ref={firstNameRef} icon={userIcon}/>
                    <LabledInput name={"lName"} errorMsg={"Поле немає бути пустим та містити зайві знаки"} placeholder={"last name"} regEx={lastNameRegEx} ref={lastNameRef} icon={userIcon}/>
                    <LabledInput name={"group"} errorMsg={"Поле немає бути у вигляді: ЛЛ-ЧЧ"} placeholder={"group"} regEx={groupRegEx} ref={groupRef} icon={groupIcon}/>
                    <LabledInput name={"variant"} errorMsg={"варіант не має бути пустим або містити більше двох чисел"} placeholder={"variant"} regEx={variantRegEx} ref={variantRef} icon={variantIcon}/>
                    <div className="input-control">
                        <input type="submit" id="submit_button" name="submit" className="input-submit" value="Submit" />
                    </div>
                </form>
                <div className={"form-footer"}>
                    Already have an account?
                    <p>
                        <span onClick={toLogin} className={"user-info-link"} >Log in</span>
                    </p>

                </div>
            </section>
        </div>
    )
}

export default RegisterForm
