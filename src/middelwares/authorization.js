exports.rolebaseaccess = (...role) => {
    return (req,res,next) => {
        const userrole = req.user.role;
        if (!role.includes(userrole)) {
            return res.status(403).json({
                status:"fail",
                error: "Your Role not authorized to access this"
            });
        }
        next();
    };
};