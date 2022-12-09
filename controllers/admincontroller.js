const {Item, Profile, Transaction, User} = require('../models/index')
const {Op} = require('sequelize')
const formatPrice = require('../helper/formatCurrency')

class Controller{
    static list(req, res){
        const {search} = req.query
        let option = {}

        if(search){
            option.where = {name: {[Op.iLike] : `%${search}%`}}
        }

        option.order = [['id' , 'ASC']]
        Item.findAll(option)
        .then((data) => {
            res.render('adminList', {data, formatPrice})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addForm(req, res){
        res.render('addItem')
    }

    static addItem(req, res){
        const {name, price, stock, image} = req.body
        Item.create({name, price, stock, image})
        .then((data) => {
            res.redirect('/admin')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static editForm(req, res){
        const {id} = req.params
        Item.findOne({
            where: {id}
        })
        .then((data) => {
            res.render('editItem', {data})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    static editItem(req, res){
        const {id} = req.params
        const {name, price, stock, image} = req.body
        Item.update({name, price, stock, image},
            {where: {id}}
        )
        .then((data) => {
            res.redirect('/admin')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static editProfileForm(req, res){
        Profile.findOne({
            include :  {model: User},
            where: {id : req.session.UserId}
        })
        .then((data) => {
            res.render('editProfile', {data})
        }).catch((err) => {
            res.send(err)
        });
    }

    static editProfile(req, res){
        const {fullName, address, phone, gender,amount} = req.body
        Profile.update({fullName, address, phone, gender,amount},
            {where: {id : req.session.UserId}}
        )
        .then((data) => {
            res.redirect('/admin')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static deleteItem(req, res){
        const {id} = req.params
        Item.destroy({
            where: {id}
        })
        .then((data) => {
            res.redirect('/admin')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller