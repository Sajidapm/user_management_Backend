const authorize = (role)=>{
    return (req,res,next)=>{
        if(req.user.payload !== role){
            return res.status(403).json({message:"Access denied"})
        }
        next()
    }

} 
module.exports = authorize