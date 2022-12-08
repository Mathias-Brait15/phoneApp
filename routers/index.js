const express = require('express') 
const router = express.Router(); 
const user = require('./routersUser');
const admin = require('./routerAdmin');
const Controller = require('../controllers/usercontroller');
const login = require('../helpers/sessionRule');


router.get('/register' , Controller.renderRegister)
router.post('/register' , Controller.handleRegister)
router.get('/login' , Controller.renderLogin)
router.post('/login', Controller.handleLogin)

router.use(login)

router.use('/users', user)
router.use('/admin', admin)



module.exports = router