const {User , Profile} = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

class Controller{

    static renderRegister(request , response){
       const error = request.query.error
       response.render('formRegister' , {error})
    }

    static handleRegister(request , response){
       const {email , password , role} = request.body 

       User.findAll()
       .then((result) => {
        result.forEach(element => {
            if(element.email == email && element.role == role){
                const errorMessage = `Email is already exist`
               return response.redirect(`/register?error=${errorMessage}`)
            }else{
                User.create({email , password , role})
                .then((_) => {
                    response.redirect('/login')
                })
            }
        });
       }).catch((err) => {
            response.send(err)
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

    static handleLogout(request , response){
        request.session.destroy((err) => {
            if (err) {
                response.send(err)
            } else {
                response.redirect('/login')
            }
        })
    }
}

module.exports = Controller