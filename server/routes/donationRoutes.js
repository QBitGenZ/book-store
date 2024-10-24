const express = require('express')
const router = express.Router()
const controller = require('../controllers/donationController')
const { isAuthorization } = require('../middlewares/authMiddleware')
const {uploadFields} = require('../middlewares/fileMiddleware')

router.post('', isAuthorization, uploadFields([
  {
    name: 'images',
    maxCount: 10
  }, 
  {
    name: 'file',
    maxCount: 1
  }
]), controller.donate)

router.get('', isAuthorization, controller.getProductsByOwner)

router.get('/:id', isAuthorization, controller.getProductByOwner)

router.delete('/:id', isAuthorization, controller.deleteProductByOwner)

module.exports = router