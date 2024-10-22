const express = require('express');
const router = express.Router();
const controller = require('../controllers/addressController');
const {isAuthorization} = require('../middlewares/authMiddleware');

router.get('/', isAuthorization, controller.getAllAddress);
router.get('/:id', isAuthorization, controller.getOne);
router.post('/', isAuthorization, controller.createAddress);
router.put('/:id', isAuthorization, controller.updateAddress);
router.delete('/:id', isAuthorization, controller.deleteAddress);

module.exports = router