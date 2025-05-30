const express = require('express')
const router = express.Router()
const controller = require('../controllers/formatController')
const {isAdmin, isAuthorization} = require('../middlewares/authMiddleware')

router.get('/', isAuthorization, controller.getAll)
router.get('/admin', isAuthorization, isAdmin, controller.getAll)
router.post('/admin', isAuthorization, isAdmin, controller.createOne)
router.get('/admin/:id', isAuthorization, isAdmin, controller.getOne)
router.put('/admin/:id', isAuthorization, isAdmin, controller.updateOne)
router.delete('/admin/:id', isAuthorization, isAdmin, controller.deleteOne)
router.get('/:id', isAuthorization, controller.getOne)
router.get('/:id/products', controller.getProductByFormat)

// TODO: thêm chức năng lấy sách theo định dạng

module.exports = router