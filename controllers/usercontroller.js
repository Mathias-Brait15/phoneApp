const {Item , User , Profile , Transaction, sequelize} = require('../models/index');
const { QueryTypes } = require('sequelize');
const formatPrice = require('../helper/formatCurrency')
const qrcode = require("qrcode")
const { Op } = require("sequelize");


class Controller{

    static homepage(request , response){

        const {search} = request.query

        let options = {}


            if(search){
            options.where = {
                name : {
                    [Op.iLike] : `%${search}%`
                }
            }

            if(sort==="Terbanyak") options.order=[['stock','DESC']]
            if(sort==="Terendah") options.order=[['stock','DESC']]
        }
        let dataProfile = null
        Profile.findOne({
            where : {
                id : request.session.UserId
            }
        })
        .then((result) => {
            dataProfile = result
            return Item.findAll(options)
        .then((items) => {
            response.render('homepage',{dataProfile , items , formatPrice})
        })
        }).catch((err) => {
            response.send(err)
        });
    }

    static editProfile(request , response){

        Profile.findOne({
            include : {model:User} , 
            where : {
                id : request.session.UserId
            }
        })
        .then((result) => {
            response.send(result)
        }).catch((err) => {
            response.send(err)
        });
       
    }

    static buyProduct(request , response){
        const {itemId} = request.params 
        const {UserId} = request.session 

        Transaction.create({ProfileId : UserId , ItemId : itemId})
        .then((result) => {
            response.redirect('/users')
        }).catch((err) => {
            response.send(err)
        });
    }

    static checkoutItem(request , response){
        const {UserId} = request.session 

        const query = `select t.id ,  p."fullName"  , p.address, i.name  , i.price , i.image 
        from "Profiles" p  
        join "Transactions" t 
        on p.id = t."ProfileId" 
        join "Items" i 
        on i.id  = t."ItemId";` 

        const query2 = `select sum(i.price)
        from "Profiles" p  
        join "Transactions" t 
        on p.id = t."ProfileId" 
        join "Items" i 
        on i.id  = t."ItemId"
        where p.id = 1;`

        const input = `${UserId}`
        qrcode.toDataURL(input,(err,src)=> {
            if(err){
                response.send(err)
            }else{
                let listItem = null
                sequelize.query(query , { type: QueryTypes.SELECT })
                .then((result) => {
                    listItem = result
                    return sequelize.query(query2 ,  { type: QueryTypes.SELECT })
                .then((totalTransaction) => {
                    response.render( 'checkout', {listItem , totalTransaction , formatPrice ,  qr_code: src})
                })
                }).catch((err) => {
                    response.send(err)
                });
            }
        })
    }

    static deleteItem(request , response){
        const {id} = request.params
        Transaction.destroy({where : {id}})
        .then((_) => {
            response.redirect('/users/checkoutItem')
        }).catch((err) => {
            response.send(err);
        });
    }

    static renderProfile(request , response){
    
    }

}

module.exports = Controller