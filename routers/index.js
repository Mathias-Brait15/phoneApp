const express = require('express') 
const router = express.Router(); 
const user = require('./routersUser');
const admin = require('./routerAdmin');
const Controller = require('../controllers/usercontroller');


router.get('/register' , Controller.renderRegister)
router.post('/register' , Controller.handleRegister)
router.get('/login' , Controller.renderLogin)
router.post('/login', Controller.handleLogin)

router.use('/users', user)
router.use('/admin', admin)

module.exports = router