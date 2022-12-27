import './App.css';
import { Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import React, {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserInfo from "./pages/UserInfo";
import AllUsersPage from "./pages/AllUsersPage";
import ChangePasswordForm from "./components/ChangePasswordForm";
import ModalBox from "./components/ModalBox";
import userIcon from "./icons/user.svg";
import educationIcon from "./icons/education.svg";
import locationIcon from "./icons/location.svg";
import dateIcon from "./icons/date.svg";
import hobbyIcon from "./icons/hobby.svg";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
const NameRegEx = /^[a-zA-z]+$/;
const notEmptyRegEx = /^(?!\s*$).+/;

function App() {
    const {store} = useContext(Context)
    useEffect(()=>{
        if(localStorage.getItem('token')){
            store.checkAuth()
            console.log('checked')
        }
    }, [])
  return (
    <div className="App">
        <Header text={"Laboratory Work №8"}/>
        <div className={"content-block"}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/register'} element={<RegisterForm/>}/>
                <Route path={'/user-info'} element={<UserInfo/>}>
                    <Route path={'change-password'} element={<ChangePasswordForm/>}/>
                    <Route path={'change-first-name'} element={<ModalBox title={"Change First Name"} errorMsg={"Поле не має бути пустим або містити числа"} infoIndex={7} name={"fName"} placeholder={"first name"} regEx={NameRegEx} icon={userIcon} />}/>
                    <Route path={'change-last-name'} element={<ModalBox title={"Change Last Name"} errorMsg={"Поле не має бути пустим або містити числа"} infoIndex={8} name={"lName"} placeholder={"last name"} regEx={NameRegEx} icon={userIcon} />}/>
                    <Route path={'change-date-of-birth'} element={<ModalBox title={"Date Of Birth"} errorMsg={"Поле не має бути пустим"} infoIndex={1} name={"d-o-b"} placeholder={"date of birth"} regEx={notEmptyRegEx} icon={dateIcon} />}/>
                    <Route path={'change-education'} element={<ModalBox title={"Education"} errorMsg={"Поле не має бути пустим"} infoIndex={2} name={"education"} placeholder={"education"} regEx={notEmptyRegEx} icon={educationIcon} />}/>
                    <Route path={'change-hobby1'} element={<ModalBox title={"Hobby"} errorMsg={"Поле не має бути пустим"} infoIndex={3} name={"hobby1"} placeholder={"hobby"} regEx={notEmptyRegEx} icon={hobbyIcon} />}/>
                    <Route path={'change-hobby2'} element={<ModalBox title={"Hobby"} errorMsg={"Поле не має бути пустим"} infoIndex={4} name={"hobby2"} placeholder={"hobby"} regEx={notEmptyRegEx} icon={hobbyIcon} />}/>
                    <Route path={'change-hobby3'} element={<ModalBox title={"Hobby"} errorMsg={"Поле не має бути пустим"} infoIndex={5} name={"hobby3"} placeholder={"hobby"} regEx={notEmptyRegEx} icon={hobbyIcon} />}/>
                    <Route path={'change-place-of-birth'} element={<ModalBox title={"Place Of Birth"} errorMsg={"Поле не має бути пустим"} infoIndex={9} name={"p-o-b"} placeholder={"place of birth"} regEx={notEmptyRegEx} icon={locationIcon} />}/>
                </Route>
                <Route path={'/all-users'} element={<AllUsersPage/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default observer(App);
