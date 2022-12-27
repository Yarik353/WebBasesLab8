import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios"
import {API_URL} from "../http";
import UserService from "../services/UserService";

export default class Store{
    user = {};
    isAuth = false;
    loginResponse = null;
    registerResponse = null;
    userData = {};
    allUsers = {};
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
    }

    setUser(user){
        this.user = user
    }

    setAuth(isAuth){
        this.isAuth = isAuth
    }
    setUserData(userData){
        this.userData = userData
    }
    setAllUsers(users){
        this.allUsers = users
    }

    async login(username, password){
        try {
            const response = await AuthService.login(username, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.userDto)
            console.log(response)
            this.loginResponse = null
        }catch (e){
            console.log(e.response?.data?.message)
            this.loginResponse = e.response?.data?.message
        }
    }
    async register(username, password, firstName, lastName, group, variant){
        try {
            const response = await AuthService.register(username, password, firstName, lastName, group, variant)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.userDto)
            this.registerResponse = null
        }catch (e){
            console.log(e.response?.data?.message)
            this.registerResponse = e.response?.data?.message
        }
    }

    async logout(){
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
            this.setUserData({})
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }
    async checkAuth(){
        this.isLoading = true;
        try {
            const response = await axios.get(`${API_URL}refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.userDto)
            console.log(response)
        }catch (e){
            console.log(e.response?.data?.message)
        }finally {
            this.isLoading = false;
        }
    }
    async getUserInfo(){
        this.isLoading = true;
        try {
            const response = await UserService.getUserInfo()
            this.setUserData(response.data)
            console.log(response.data)
        }catch (e){
            console.log(e.response?.data?.message)
        }finally {
            this.isLoading = false;
        }
    }
    async getAllUsers(){
        this.isLoading = true;
        try {
            const response = await UserService.getAllUsers()
            this.setAllUsers(response.data)
            console.log(response.data)
        }catch (e){
            console.log(e.response?.data?.message)
        }finally {
            this.isLoading = false;
        }
    }

}