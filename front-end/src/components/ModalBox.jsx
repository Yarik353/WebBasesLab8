import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../index";
import UserService from "../services/UserService";
import LabledInput from "./LabledInput";

const ModalBox = (props) =>{
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const ref = useRef(null)
    const [innerElement, setInnerElement] = useState(null)
    useEffect(() => {
        setInnerElement(<LabledInput name={props.name} placeholder={props.placeholder} regEx={props.regEx} ref={ref} errorMsg={props.errorMsg} icon={props.icon}/>)
        console.log(props.regEx)

    }, [])
    async function onSubmit(e) {
        e.preventDefault()
        if(innerElement !== null){
            if(ref.current.isValid()){
                console.log(store.user.id)
                console.log('res')
                const res = await UserService.updateInfo(store.user.id, props.infoIndex,
                    ref.current.inputRef.current.value
                )
                await store.getUserInfo()
                navigate("/user-info")
            }
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
                        <h1 className="text text-large">{props.title}</h1>
                    </div>
                    <form name="change" className="form" onSubmit={(e)=> onSubmit(e)} noValidate>
                        {(innerElement !== null )? innerElement : "Loading..."}
                        <div className="input-control">
                            <input type="submit" id="submit_button" name="submit" className="input-submit" value="Confirm Changes" />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ModalBox
