const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const TokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api.error')
const ValidationMiddleware = require('../middleware/validation.middleware')
const {ObjectId, ObjectID} = require("mongodb");
class UserService{
    async login(username, password){
        const user = await UserModel.findOne({username})
        if(!user){

            throw ApiError.BadRequest('There is no such user with this username')
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if(!isCorrectPassword){
            throw ApiError.BadRequest('Incorrect password')
        }
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, userDto}

    }
    async register(username, password, firstName, lastName, group, variant){
        const candidate = await UserModel.findOne({username})
        if(candidate){
            throw ApiError.BadRequest('A user with this username already exists')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({username, password: hashPassword, firstName, lastName, group, variant, role:"user"})
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, userDto}
    }
    async logout(refreshToken){
        const token = await TokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = await ValidationMiddleware.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        console.log("Token:---", refreshToken)
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, userDto}

    }
    async getUserInfo(userID){
        const user = await UserModel.findById(userID)
        return user
    }
    async getAllUsers(){
        const users = await UserModel.find()
        return users
    }
    async deleteUser(user){
        console.log(user)
        const deletedUser = await UserModel.findByIdAndDelete({_id:ObjectID(user)})
        console.log(deletedUser)
        return deletedUser
    }
    async makeAdmin(user){
        console.log(user)
        const candidate = await UserModel.findById({_id:ObjectID(user)})
        candidate.role = "admin"
        return candidate.save()
    }

    /*
    * infoIndex
    * 1 = dateOfBirth
    * 2 = education
    * 3 = hobby1
    * 4 = hobby2
    * 5 = hobby3
    * 6 = password
    * 7 = firstName
    * 8 = lastName
    * 9 = placeOfBirth
    *
    * */
    async updateInfo(user, infoIndex, data){
        console.log(user)
        const candidate = await UserModel.findById({_id:ObjectID(user)})
        if(infoIndex ===1){
            candidate.dateOfBirth = data
        } else if(infoIndex ===2){
            candidate.education = data
        } else if(infoIndex ===3){
            candidate.hobby1 = data
        } else if(infoIndex ===4){
            candidate.hobby2 = data
        } else if(infoIndex ===5){
            candidate.hobby3 = data
        } else if(infoIndex ===6){
            const hashPassword = await bcrypt.hash(data, 3)
            candidate.password = hashPassword
        } else if(infoIndex ===7){
            candidate.firstName = data
        }else if(infoIndex ===8){
            candidate.lastName = data
        }else{
            candidate.placeOfBirth = data
        }
        return candidate.save()
    }

}
module.exports = new UserService()
