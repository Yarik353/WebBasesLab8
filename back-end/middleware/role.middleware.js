const ApiError = require("../exceptions/api.error");
const UserModel = require("../models/user.model")
module.exports = async function (req, res, next){
    try{
        const user = await UserModel.findById(req.user)
        console.log(user)

        if(user.role !== 'admin'){
            return next(ApiError.AccessDeniedError())
        }
        next()
    }catch (e){
        return next(ApiError.AccessDeniedError())
    }

}