import api from "../http";

export default class UserService{
    static async getUserInfo(){
        return api.get('/user-info' )
    }
    static async getAllUsers(){
        return api.get('/all-users' )
    }
    static async deleteUser(userId){
        return api.post('/delete-user', {userId} )
    }
    static async makeAdmin(userId){
        return api.post('/make-admin', {userId} )
    }
    static async updateInfo(userId, infoIndex, data){
        return api.post('/update-info', {userId, infoIndex, data} )
    }

}