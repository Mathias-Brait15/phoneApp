const login = function(req, res, next){
    if(!req.session.UserId){
        const error = 'Please login first!'
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }

}

module.exports = login
   