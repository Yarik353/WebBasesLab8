const ApiError = require("../exceptions/api.error");
const ValidationMiddleware = require('./validation.middleware')
module.exports = async function (req, res, next){
    try{
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }
        console.log('header', authorizationHeader)
        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken){
            return next(ApiError.UnauthorizedError())
        }
        console.log('token', accessToken)
        const userData = await ValidationMiddleware.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData.id
        next()
    }catch (e){
        return next(ApiError.UnauthorizedError())
    }



}