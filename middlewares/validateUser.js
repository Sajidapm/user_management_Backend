const validateUser =(req,res,next)=>{

    const {name,email,gender} = req.body
    if(!name ||!email ||!gender) {
        return res.status(400).json({
            success:false,
            message:"name,gender,email are required"
        })
    }
    next()

}

module.exports = validateUser