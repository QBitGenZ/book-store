const express = require('express');
const {
  getStatistics,
  getProductStatistics,
  getTypeStatistics,
  getAuthorStatistics,
  getPublisherStatistics
} = require('../controllers/statisticsController');

const router = express.Router();

router.get('/', getStatistics);

router.get('/products', async (req, res) => {
  try {
    const productStatistics = await getProductStatistics();
    res.status(200).json(productStatistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/types', async (req, res) => {
  try {
    const typeStatistics = await getTypeStatistics();
    res.status(200).json(typeStatistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/authors', async (req, res) => {
  try {
    const authorStatistics = await getAuthorStatistics();
    res.status(200).json(authorStatistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/publishers', async (req, res) => {
  try {
    const publisherStatistics = await getPublisherStatistics();
    res.status(200).json(publisherStatistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
