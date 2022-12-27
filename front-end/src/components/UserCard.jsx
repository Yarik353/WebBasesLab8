import React, {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import UserService from "../services/UserService";

const UserCard = (props) =>{
    const {store} = useContext(Context)
    let userButtons = null;
    async function deleteUser(e){
        const res = await UserService.deleteUser(props.id)
        await store.getAllUsers()
    }
    async function makeAdmin(e){
        const res = await UserService.makeAdmin(props.id)
        await store.getAllUsers()
    }
    if(props.role==="user"){
        userButtons =
            <div className={"user-buttons-container"}>
                <button onClick={(e)=>deleteUser(e)} className="delete crud-button">Delete</button>
                <button onClick={(e)=>makeAdmin(e)}  className="make-admin crud-button">Make admin</button>
            </div>
    }
    return(
        <div className="user-card">
            <div className={"user-card-title"}>{props.username}</div>
            <div className={"user-info-bar"}>
                <ul>
                    <li>
                        role: {props.role}
                    </li>
                    <li>
                        first name: {props.firstName}
                    </li>
                    <li>
                        last name: {props.lastName}
                    </li>
                    <li>
                        group: {props.group}
                    </li>
                    <li>
                        variant: {props.variant}
                    </li>
                </ul>

            </div>
            {userButtons}
        </div>
    )
}

export default observer(UserCard)
