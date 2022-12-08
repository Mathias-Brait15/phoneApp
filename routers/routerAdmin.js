const express = require('express') 
const router = express.Router(); 
const Controller = require('../controllers/admincontroller')

//Homepage setelah Log In
router.get('/', Controller.list)

//Button untuk GET AddItem form
router.get('/addItem', Controller.addForm)

//Button untuk POST AddItem
router.post('/addItem', Controller.addItem)

//Button untuk GET EditItem form
router.get('/:id/editItem', Controller.editForm)

//Button untuk POST EditItem
router.post('/:id/editItem', Controller.editItem)

//Button untuk DELETE Item
router.get('/:id/deleteItem', Controller.deleteItem)

module.exports = router