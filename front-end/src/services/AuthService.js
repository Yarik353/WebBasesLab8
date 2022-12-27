import api from "../http";

export default class AuthService{
    static async login(username, password){
        return api.post('/login', {username, password})
    }
    static async register(username, password, firstName, lastName, group, variant){
        return api.post('/register', {username, password, firstName, lastName, group, variant})
    }
    static async logout(){
        return api.post('/logout')
    }
}