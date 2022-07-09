module.exports = {
    isAuth : function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg','Faça login para acessar esta página')
        res.redirect('/')
    }
}