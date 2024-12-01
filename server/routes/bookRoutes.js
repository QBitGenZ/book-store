const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookController')
const {isAdmin, isAuthorization} = require('../middlewares/authMiddleware')
const {uploadFields} = require('../middlewares/fileMiddleware')

router.get('/', controller.getAll)
router.get('/admin', isAuthorization, isAdmin, controller.getAll)
router.post('/admin/pbook', isAuthorization, isAdmin, uploadFields([
    {
        name: 'images',
        maxCount: 10
    },
    {
        name: 'file',
        maxCount: 1
    }
]), controller.createPBook)
router.get('/admin/:id', isAuthorization, isAdmin, controller.getOne)
router.put('/admin/:id', isAuthorization, isAdmin, uploadFields([
    {
        name: 'images',
        maxCount: 10
    },
    {
        name: 'file',
        maxCount: 1
    }
]), controller.updatePBook)

router.delete('/admin/:id', isAuthorization, isAdmin, controller.deleteOne)
router.delete('/admin/:id/images/:image', isAuthorization, isAdmin, controller.deleteImage)
router.get('/top', controller.getTop)
router.get('/:id', controller.getOne)


module.exports = router