const authenticationMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if (!authHeader){
        res.status(401).json({error:"Unauthorized"})
    }
}

module.exports = authenticationMiddleware