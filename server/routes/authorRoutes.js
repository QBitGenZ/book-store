const express = require('express')
const router = express.Router()
const controller = require('../controllers/authorController')
const {isAdmin, isAuthorization} = require('../middlewares/authMiddleware')
const {uploadFields} = require('../middlewares/fileMiddleware')

router.get('/', isAuthorization, controller.getAll)
router.get('/admin', isAuthorization, isAdmin, controller.getAll)
router.post('/admin', isAuthorization, isAdmin, uploadFields([
  {
    name: 'avatar',
    maxCount: 1
  }
]), controller.createOne)
router.get('/admin/:id', isAuthorization, isAdmin, controller.getOne)
router.put('/admin/:id', isAuthorization, isAdmin,uploadFields([
  {
    name: 'avatar',
    maxCount: 1
  }
]), controller.updateOne)
router.delete('/admin/:id', isAuthorization, isAdmin, controller.deleteOne)
router.get('/:id', isAuthorization, controller.getOne)
router.get('/:id/products', controller.getProductByAuthor)

// TODO: thêm chức năng lấy sách theo tác giả

module.exports = router