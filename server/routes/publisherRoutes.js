const express = require('express')
const router = express.Router()
const controller = require('../controllers/publisherController')
const {isAdmin, isAuthorization} = require('../middlewares/authMiddleware')
const {uploadFields} = require('../middlewares/fileMiddleware')

router.get('/', isAuthorization, controller.getAll)
router.get('/admin', isAuthorization, isAdmin, controller.getAll)
router.post('/admin', isAuthorization, isAdmin, uploadFields([
  {
    name: 'logo',
    maxCount: 1
  }
]), controller.createOne)
router.get('/admin/:id', isAuthorization, isAdmin, controller.getOne)
router.put('/admin/:id', isAuthorization, isAdmin,uploadFields([
  {
    name: 'logo',
    maxCount: 1
  }
]), controller.updateOne)
router.delete('/admin/:id', isAuthorization, isAdmin, controller.deleteOne)
router.get('/:id', isAuthorization, controller.getOne)
router.get('/:id/products', controller.getProductByPublisher)

// TODO: Thêm chức năng lấy sách theo nhà xuất bản

module.exports = router