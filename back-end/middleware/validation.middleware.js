const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')

class ValidationMiddleware{
    async validateAccessToken(token){
        try{
            const userData = await this.verifyJWT(token, process.env.JWT_ACCESS)
            return userData
        }catch (e){
            return null;
        }
    }

    async validateRefreshToken(token){
        try{
            const userData = await this.verifyJWT(token, process.env.JWT_REFRESH)
            return userData
        }catch (e){
            return null;
        }
    }
    async verifyJWT(token, key, options = {}) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, key, options, function(err, token) {
                if (err) reject(err);
                else resolve(token)
            });
        })
    }
}
module.exports = new ValidationMiddleware()