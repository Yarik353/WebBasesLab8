const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')

const ApiError = require("../exceptions/api.error");

class TokenService{
    async generateTokens(payload){
        const accessToken = await this.token(payload, process.env.JWT_ACCESS, {expiresIn: '15m'});
        const refreshToken = await this.token(payload, process.env.JWT_REFRESH, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }
    async token(payload, key, options) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, key, options, function(err, token) {
                if (err) reject(err);
                else resolve(token)
            });
        })
    }

    async removeToken(refreshToken){
        if(!refreshToken){
            throw ApiError.BadRequest('User don`t have refresh token')
        }
        const tokenData = await tokenModel.deleteOne({refreshToken: refreshToken})
        console.log(tokenData)
        console.log(refreshToken)
        return tokenData
    }
    async findToken(token){
        const tokenData = await tokenModel.findOne({refreshToken: token})

        return tokenData

    }
}
module.exports = new TokenService()