import React, {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import UserService from "../services/UserService";

const UserCell = (props) =>{
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
            <div className={"user-buttons-cell"}>
                <button onClick={(e)=>deleteUser(e)} className="delete crud-button">Delete</button>
                <button onClick={(e)=>makeAdmin(e)}  className="make-admin crud-button">Make admin</button>
            </div>
    }
    return(
        <div className={"user-cells-wrapper"}>
        <div className="user-cell">
            <table>
                <thead>
                <tr>
                    <th>{props.username}</th>
                    <th>{props.firstName}</th>
                    <th>{props.lastName}</th>
                    <th>{props.group}</th>
                    <th>{props.variant}</th>
                    <th>{props.role}</th>
                    <th>{userButtons}</th>
                </tr>
                </thead>
            </table>

        </div>
        </div>

    )
}

export default observer(UserCell)
