const userService = require('../services/user.service')
const cookieParser = require('cookie-parser');

class UserController{
    async login(req, res, next){
        try{
            const {username, password} = req.body
            const userData = await userService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, httpOnly: true}).send(userData)
            console.log('ok')
        }catch(e){
            next(e)
        }
    }
    async register(req, res, next){
        try{
            const {username, password, firstName, lastName, group, variant} = req.body
            console.log(username, password, firstName, lastName, group, variant)
            const userData = await userService.register(username, password, firstName, lastName, group, variant)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, httpOnly: true }).send(userData) //maxAge: 30d
            console.log('ok')
        }catch(e){
            next(e)
        }
    }
    async logout(req, res, next){
        try{
            const refreshToken = req.cookies.refreshToken
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)

        }catch(e){
            next(e)
        }
    }
    async refresh(req, res, next){
        try{
            const refreshToken = req.cookies.refreshToken
            console.log("cooks------",req.cookies)
            const newToken = await userService.refresh(refreshToken)
            res.cookie('refreshToken', newToken.refreshToken, {maxAge: 2592000000, httpOnly: true }).send(newToken) //maxAge: 30d
        }catch(e){
            next(e)
        }
    }
    async getUserInfo(req, res, next){
        try{
            const userId = req.user
            const user = await userService.getUserInfo(userId)
            res.json(user)
        }catch(e){
            next(e)
        }
    }
    async getAllUsers(req, res, next){
        try{
            const user = await userService.getAllUsers()
            res.json(user)
        }catch(e){
            next(e)
        }
    }
    async deleteUser(req, res, next){
        try{
            const user = req.body.userId
            console.log(user)
            const deletedUser = await userService.deleteUser(user)
            res.send(deletedUser)
        }catch(e){
            next(e)
        }
    }
    async makeAdmin(req, res, next){
        try{
            const user = req.body.userId
            console.log(user)
            const candidate = await userService.makeAdmin(user)
            res.send(candidate)
        }catch(e){
            next(e)
        }
    }
    async updateInfo(req, res, next){
        try{
            const {userId, infoIndex, data } = req.body
            console.log(userId)
            const candidate = await userService.updateInfo(userId, infoIndex, data )
            res.send(candidate)
        }catch(e){
            next(e)
        }
    }
}
module.exports = new UserController()