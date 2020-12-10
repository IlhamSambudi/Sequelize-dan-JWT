const jwt = require("jsonwebtoken")
const SECRET_KEY = "BismillahGakError"

auth = (req,res,next) => {
    let header = req.header.Authorization
    let token = header && header.spilt(" ")[1]
    let jwtHeader = {
        algorithm: "HS256"
    }
    if(token == null){
        res.json({ message: "Unauthorized"})
    }else{
        jwt.verify(token, SECRET_KEY, jwtHeader, (error,user) => {
            if (error) {
                res.json({
                    message: "Invalid token"
                })
            } else {
                console.log(user);
                next()
            }
        })
    } 
}

module.exports = auth