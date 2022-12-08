const express = require('express'); 
const Controller = require('../controllers/usercontroller');
const router = express.Router(); 


router.get('/', Controller.homepage)
router.get('/coba' , Controller.coba)

module.exports = router