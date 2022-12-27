import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import UserCard from "../components/UserCard";
import UserCell from "../components/UserCell";
import tableIcon from "../icons/table.svg";
import gridIcon from "../icons/grid.svg";
import Loader from "../components/Loader";
import AccessDeniedMessage from "../components/AccessDeniedMessage";

const AllUsersPage = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate()
    let pageContent = null
    let initialDisplayTable = localStorage.getItem('displayTable');
    if (initialDisplayTable === null || initialDisplayTable === "true") {
        console.log("----------------------")
        console.log(initialDisplayTable)
        localStorage.setItem('displayTable', "true")
        initialDisplayTable = true;
    } else {
        initialDisplayTable = false;
    }

    const adminPageInfo =
        <div className={"info-card"}>
            <h1 className={"sticky-text"}>
                <img src={initialDisplayTable ? tableIcon : gridIcon} className={"display-icon"}
                     onClick={(e) => changeDisplay(e)}/>
                Панель адміністратора
            </h1>

            <p>Тут ви можете наділяти користувачів правами адміністратора або видаляти їх аккаунти. Проте ви не маєте
                права це застосовувати до інших користувачів із првами адміністратора.</p>
        </div>

    const [displayTable, setDisplayTable] = useState(initialDisplayTable)
    useEffect(() => {
        async function getAllUsers() {
            await store.getAllUsers()
            console.log("get")

        }
        getAllUsers()
    }, [])
    function changeDisplay(e) {
        setDisplayTable(!displayTable)
        localStorage.setItem('displayTable', (!displayTable).toString())
    }
    if (store.isAuth) {
        if (JSON.stringify(store.allUsers) !== JSON.stringify({}) && store.user.role === "admin") {
            if (displayTable) {
                pageContent =
                    <div>
                        <div className={"sticky-body"}>
                            {adminPageInfo}
                        </div>
                        <div className={"sticky-head"}>
                            <div className={"table-header"}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Group</th>
                                        <th>Variant</th>
                                        <th>Role</th>
                                        <th>Options</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        {store.allUsers.map((user, index) => (
                            <UserCell id={user._id} username={user.username} group={user.group} role={user.role}
                                      variant={user.variant} firstName={user.firstName} lastName={user.lastName}
                                      key={index}/>
                        ))}
                    </div>
            } else {
                pageContent =
                    <div>
                        <div className={"sticky-body"}>
                            {adminPageInfo}
                        </div>
                        <div className={"user-cards-container"}>
                            <div className={"user-card-wrapper"}>
                                {store.allUsers ? store.allUsers.map((user, index) => (
                                    <UserCard id={user._id} username={user.username} group={user.group} role={user.role}
                                              variant={user.variant} firstName={user.firstName} lastName={user.lastName}
                                              key={index}/>
                                )) : null}
                            </div>
                        </div>
                    </div>
            }
        } else {
            pageContent = <AccessDeniedMessage
                msg1={"У вас не має прав на доступ до даної сторінки."}
                msg2={"Для отримання доступу ви маєте володіти правами адміністратора."}/>

        }
    } else {
        pageContent =
            <AccessDeniedMessage
                msg1={"На даний момент ви не авторизовані в системі"}
                msg2={"Для отримання доступу ви маєте бути авторизовані та володіти правами адміністратора."}/>
    }
    return (
        <div>
            {pageContent}
        </div>
    )
}

export default observer(AllUsersPage)