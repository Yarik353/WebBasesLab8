import React from "react";
import {useNavigate} from "react-router-dom";

const AccessDeniedMessage = props => {
    const navigate = useNavigate()
    const toHome = () => {
        navigate("/")
    }
    return (
        <div className={"sticky-body access-denied"}>
            <h1>Доступ Заборонено!</h1>
            <div className={"text"}>
                {props.msg1}
                <p>
                    {props.msg2}
                </p>
                <span onClick={toHome} className={"user-info-link"}>На головну</span>
            </div>
        </div>
    )
}

export default AccessDeniedMessage