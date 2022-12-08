const {User} = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

class Controller{

    static homepage(request , response){
        response.render('homepage')
    }

    static coba(request , response){
        response.send('sad')
    }

    static renderRegister(request , response){
       const error = request.query.error
       response.render('formRegister' , {error})
    }

    static handleRegister(request , response){
       const {email , password , role} = request.body 
       User.create({email , password , role})
       .then((newUser) => {
        response.redirect('/login')
       }).catch((err) => {
        let errorMassage = []
        if(err.name === 'SequelizeValidationError'){
            err.errors.forEach((el) => {
                errorMassage.push(el.message)
            })
            response.redirect(`/register?error=${errorMassage}`)
        }else{
            response.send(err)
        }
       });
    }

    static renderLogin(request , response){
        const errorMessage = request.query.error
        response.render('loginForm' , {errorMessage} )
    }

    static handleLogin(request , response){
        const {email , password} = request.body
        
        User.findOne({where : {
            email : {
                [Op.iLike] : `%${email}%` 
            }
        }})
        .then((user) => {
            if(user){
                const isValidate = bcrypt.compareSync(password , user.password)
                if(isValidate){
                    request.session.UserId = user.id
                    if(user.role === "Admin"){
                        response.redirect('/admin')
                    }else if(user.role === "User"){
                        response.redirect('/users')
                    }
                }else{
                    const errorMessage = 'Invalid Username / Password' 
                    response.redirect(`/login?error=${errorMessage}`)
                }
            }else{
                const errorMessage = "Username / Password not registered yet"
                return response.redirect(`/login?error=${errorMessage}`)
            }
        }).catch((err) => {
           response.send(err)
        });
    }
}

module.exports = Controller