import React, {Component} from "react";
class LabledInput extends Component{
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.errorRef = React.createRef()
        this.labelRef = React.createRef()
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
                <input onBlur={(e)=>this.removeLabelStyle(e)} onFocus={(e)=>this.changeLabelStyle(e)} type={"text"} name={this.props.name} ref={this.inputRef} className={"input-field"} placeholder={this.props.placeholder}/>
            </div>
            <div className={"error_msg"} ref={this.errorRef}></div>
        </div>
    )
}}
export default LabledInput

