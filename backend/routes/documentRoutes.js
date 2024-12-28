const express = require('express');
const { getDocuments, createDocument } = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getDocuments);
router.post('/', authMiddleware, createDocument);

module.exports = router;
