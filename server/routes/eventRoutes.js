const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');
const { isAuthorization, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', controller.getAll);
router.get('/admin', isAuthorization, isAdmin, controller.getAll);
router.get('/admin/:id', isAuthorization, isAdmin, controller.getOneById);
router.post('/admin', isAuthorization, isAdmin, controller.createEvent);
router.put('/admin/:id', isAuthorization, isAdmin, controller.updateEvent);
router.delete('/admin/:id', isAuthorization, isAdmin, controller.deleteOne);
router.put('/admin/:eventId/donations/:donationId/status', isAuthorization, isAdmin, controller.updateDonationStatus);
router.get('/:id', controller.getOneById);
router.post('/:eventId/donate', isAuthorization, controller.donateBook);
router.get('/:id/statistics', isAuthorization, controller.getEventStatistics);

module.exports = router;
