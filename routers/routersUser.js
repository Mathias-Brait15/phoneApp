const express = require('express'); 
const Controller = require('../controllers/usercontroller');
const router = express.Router(); 


router.get('/', Controller.homepage)
router.get('/edit', Controller.editProfile)
// router.get('/purchase', Controller.purchaseTransaction)
router.get('/profile' , Controller.renderProfile)
router.get('/checkoutItem', Controller.checkoutItem)
router.get('/item/:itemId/buy' , Controller.buyProduct)
router.get('/checkoutItem/:id/delete', Controller.deleteItem)

module.exports = router