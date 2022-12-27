import React, {useContext, useRef} from "react";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Loader from "../components/Loader";
const Home = () =>{
    const {store} = useContext(Context)
    const userInfoRef = useRef(null)
    const navigate = useNavigate()
    let userGreeting = null

    const toUserInfo= () =>{
        navigate("/user-info")
    }
    const toLogin= () =>{
        navigate("/login")
    }
    const toRegister= () =>{
        navigate("/register")
    }
    if(store.isAuth){
        userGreeting =
            <div className={"text"}>
                <h4>Вітаємо, {store.user.username} <span>; )</span></h4>
                <p>
                    Ви успішно авторизовані в системі і можете переглянути свою <span onClick={toUserInfo} className={"user-info-link"} >особисту інформацію </span>, скориставшись даним посиланням або натиснувши відповідну іконку у правому верхньому куті сторінки.
                </p>
            </div>

    }else{
        userGreeting =
            <div className={"text"}>
            На даний момент ви не авторизовані в системі.
            <p>
                Для отримання доступу до особистої інформації <span onClick={toLogin} className={"user-info-link"} >увійдіть</span> до свого акаунту або <span onClick={toRegister} className={"user-info-link"} >зареєструйтеся</span> в системі.
            </p>
        </div>
    }
    const content = <section  className="home-display">
        <h1 className={"heading-text"}>Лабораторна робота з предмету
            <span> Основи </span>
            <span>Web-</span>
            <span>технологій</span></h1>
        {userGreeting}
        <div className="text">
            <h3>Завдання до лабораторної роботи:</h3>
            <p>
                Створити клієнт-серверну систему авторизації сайту, що складається з двох частин: Front-end частина – User-interface(JS/React): забезпечує введення логіну та паролю. Back-end частина (PHP/NodeJS): забезпечує введення, редагування та видалення логінів, паролів та статусу користувача (admin/user) та зберігає інформацію на сервері. Якщо введені дані збігаються, то видача інформації про користувача та його сторінки (дані з лаб. роб. №1), інакше – виведення повідомлення "Доступ заборонено".
            </p>
            <h3>Використані технології:</h3>
            <p>1: Back-end частина: NodeJS, Express, JSON Web Token</p>
            <p>2: База даних: MongoDb</p>
            <p>3: Front-end частина: React</p>
        <div className={"footer"}>
            Виконав: студент групи ІВ-91, Мусійчук Ярослав.
        </div>
        </div>
    </section>
    return(
        <div className="home-container">
            {store.isLoading ? <Loader/>:content}
        </div>

    )
}

export default observer(Home)