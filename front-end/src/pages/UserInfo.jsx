import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../index";
import {Outlet, useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import tableIcon from "../icons/rows.svg";
import gridIcon from "../icons/cols.svg";
import LoginForm from "../components/LoginForm";
import Loader from "../components/Loader";

const UserInfo = (props) => {
    const {store} = useContext(Context)
    const navigate = useNavigate()
    let accountContent = null
    let personalContent = null
    let initialDisplayTable = localStorage.getItem('displayTableUser');
    const [displayTable, setDisplayTable] = useState(initialDisplayTable)
    const personalBlockRef = useRef(null)
    const accountBlockRef = useRef(null)
    let accountBlockClassName = "user-info-display thin"
    let personalBlockClassName = "user-info-display thin"
    let content = null

    useEffect(() => {

        async function getUserData() {
            await store.getUserInfo()
            console.log("get")

        }

        getUserData()

    }, [])


    if (initialDisplayTable === null || initialDisplayTable === "true") {
        console.log("----------------------")
        console.log(initialDisplayTable)
        localStorage.setItem('displayTableUser', "true")
        initialDisplayTable = true;
        accountBlockClassName = "user-info-display wide"
        personalBlockClassName = "user-info-display wide"


    } else {
        accountBlockClassName = "user-info-display thin"
        personalBlockClassName = "user-info-display thin"
        initialDisplayTable = false;
    }
    const toLogin = () => {
        navigate("/login")
    }
    const toRegister = () => {
        navigate("/register")
    }
    const toHome = () => {
        navigate("/")
    }
    const toChangePassword = () => {
        navigate("/user-info/change-password")
    }
    const toChangeFirstName = () => {
        navigate("/user-info/change-first-name")
    }
    const toChangeLastName = () => {
        navigate("/user-info/change-last-name")
    }
    const toChangeDateOfBirth = () => {
        navigate("/user-info/change-date-of-birth")
    }
    const toChangePlaceOfBirth = () => {
        navigate("/user-info/change-place-of-birth")
    }
    const toChangeEducation = () => {
        navigate("/user-info/change-education")
    }
    const toChangeHobby1 = () => {
        navigate("/user-info/change-hobby1")
    }
    const toChangeHobby2 = () => {
        navigate("/user-info/change-hobby2")
    }
    const toChangeHobby3 = () => {
        navigate("/user-info/change-hobby3")
    }
    async function deleteAccount(){
        const userId = store.user.id
        const res = await UserService.deleteUser(userId)
        await store.logout()

        navigate("/")
    }

    function changeDisplay(e) {
        setDisplayTable(!displayTable)
        localStorage.setItem('displayTableUser', (!displayTable).toString())

    }

    function getHobbyBlock(hobbyNumber, hobbyData, clickFunction) {
        if (hobbyData === null) {
            return <div className={"data-block add-button"} onClick={clickFunction}>
                + Add hobby
            </div>
        } else {
            return <div className={"data-block"}>
                {hobbyNumber}: {hobbyData}
            </div>
        }
    }

    if (!store.isAuth) {
        // navigate("/")
        content =
            <div className={"sticky-body access-denied"}>
                <h1>Доступ Заборонено!</h1>
                <div className={"text"}>
                    На даний момент ви не авторизовані в системі.
                    <p>
                        Для отримання доступу до особистої інформації <span onClick={toLogin}
                                                                            className={"user-info-link"}>увійдіть</span> до
                        свого акаунту або <span onClick={toRegister}
                                                className={"user-info-link"}>зареєструйтеся</span> в системі.
                    </p>
                    <span onClick={toHome} className={"user-info-link"}>На головну</span>
                </div>
            </div>
    } else if (JSON.stringify(store.userData) !== JSON.stringify({})) {
        accountContent =
            <div>
                <div className={"data-blocks-container"}>
                    <div className={"data-block"}>
                        first name: {store.userData.firstName}
                    </div>
                    <div className={"data-block"}>
                        last name: {store.userData.lastName}
                    </div>
                    <div className={"data-block"}>
                        group: {store.userData.group}
                    </div>
                    <div className={"data-block"}>
                        variant: {store.userData.variant}
                    </div>
                    <div className={"data-block"}>
                        role: {store.userData.role}
                    </div>
                </div>
            </div>
        personalContent = <div className={"data-blocks-container"}>
            <div className={"data-block"}>
                Date of
                birth: {store.userData.dateOfBirth !== null ? store.userData.dateOfBirth : "(no data)"}
            </div>
            <div className={"data-block"}>
                PlaceOfBirth: {store.userData.placeOfBirth !== null ? store.userData.placeOfBirth : "(no data)"}
            </div>
            <div className={"data-block"}>
                Education: {store.userData.education !== null ? store.userData.education : "(no data)"}
            </div>
            <div className={"data-block"}>
                Hobbies:
            </div>
            {getHobbyBlock("1", store.userData.hobby1, toChangeHobby1)}
            {getHobbyBlock("2", store.userData.hobby2, toChangeHobby2)}
            {getHobbyBlock("3", store.userData.hobby3, toChangeHobby3)}
        </div>
        content = <div>
            <div className={"sticky-body"}>
                <div className={"info-card"}>

                    <h1 className={"sticky-text"}>
                        <img src={initialDisplayTable ? tableIcon : gridIcon} className={"display-icon"}
                             onClick={(e) => changeDisplay(e)}/>
                        Особиста сторінка користувача
                    </h1>
                    <p>На даній строінці ви можете переглянути свої особисті дані, а також дані облікового запису.</p>
                </div>
            </div>
            <div className="user-info-container">
                <section className={accountBlockClassName}>
                    <div className={"info-card"}>
                        <h1 className={"sticky-text"}>
                            Дані облікового запису користувача
                        </h1>
                        <p>У даному розділі можна переглянути дані свого аккаунту, а також за необхідності, змінити
                            пароль, прізвище та ім'я</p>
                    </div>
                    {accountContent}
                    <div className={"user-buttons-container"}>
                        <button onClick={(e)=>deleteAccount()} className="delete crud-button">Delete account</button>
                        <button onClick={toChangePassword} className="reg update-button">Change password</button>
                        <button onClick={toChangeFirstName} className="reg update-button">Change first name</button>
                        <button onClick={toChangeLastName} className="reg update-button">Change last name</button>
                    </div>
                </section>

                <section className={personalBlockClassName}>
                    <div className={"info-card"}>
                        <h1 className={"sticky-text"}>
                            Особисті дані користувача
                        </h1>
                        <p>Тут можна додати та редагувати інформацію про своє місце народження, та про свою освіту.
                            Також є можливість додати три своїх хоббі.</p>
                    </div>
                    {personalContent}
                    <div className={"user-buttons-container"}>
                        <button onClick={toChangeDateOfBirth} className="reg update-button">
                            {store.userData.dateOfBirth === null ? "Add" : "Change"} date of birth
                        </button>
                        <button onClick={toChangePlaceOfBirth} className="reg update-button">
                            {store.userData.placeOfBirth === null ? "Add" : "Change"} place of birth
                        </button>
                        <button onClick={toChangeEducation} className="reg update-button">
                            {store.userData.education === null ? "Add" : "Change"} education
                        </button>
                    </div>
                </section>
            </div>
            <Outlet/>
        </div>

    }

    return (
        <div>
            {store.isLoading ? <Loader/>:content}
        </div>
    )
}

export default observer(UserInfo)