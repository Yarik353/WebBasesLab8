import React, {Component} from "react";
import {useEffect} from 'react';
import visibleEye from '../icons/visibleEye.svg'
import eyeCrossed from '../icons/eyeCrossed.svg'
class PasswordInput extends Component{
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.errorRef = React.createRef()
        this.iconRef = React.createRef()
        this.labelRef = React.createRef()
        this.showPassword = false
    }
    isValid(){
        if(this.props.regEx.test(this.inputRef.current.value)){
            this.errorRef.current.innerHTML = ''
            return true;
        }
        else{
            this.errorRef.current.innerHTML = this.props.errorMsg;
            return false;
        }
    }
    setCustomMessage(msg){
        this.errorRef.current.innerHTML = msg
    }
    changeShowMode(e){
        if(this.showPassword){
            this.iconRef.current.src = visibleEye
            this.inputRef.current.setAttribute('type', 'password');
        }
        else {
            this.iconRef.current.src = eyeCrossed
            this.inputRef.current.setAttribute('type', 'text');
        }
        this.showPassword = !this.showPassword
    }
    changeLabelStyle(e){
        this.labelRef.current.className = "focused-label"
    }
    removeLabelStyle(e){
        this.labelRef.current.className = ""
    }

    render() {
        return(
        <div className={"input-area"}>
            <div className={"input-control"}>
                <label ref={this.labelRef}><img src={this.props.icon} className={"icon"} /></label>
                <img src={visibleEye} className={"far icon"}  ref={this.iconRef} onClick={(e)=>this.changeShowMode(e)}/>
                <input onBlur={(e)=>this.removeLabelStyle(e)} onFocus={(e)=>this.changeLabelStyle(e)} type={"password"} name={this.props.name} ref={this.inputRef} className={"input-field"} placeholder={this.props.placeholder}/>
            </div>
            <div className={"error_msg"} ref={this.errorRef}></div>
        </div>
    )
}}
export default PasswordInput

