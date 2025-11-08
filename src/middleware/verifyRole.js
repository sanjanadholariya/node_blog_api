const verifyRole = (...role) => {
    return (req , res , next) => {
        if(!role.includes(req.user.role)){
            return res.status(403).json({message : "Access denied. You don't have permission for this action."})
        }
        next();
    }
}

module.exports = verifyRole;