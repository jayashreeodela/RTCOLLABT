const express = require('express');
const { getDocuments, createDocument } = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all documents for the authenticated user
router.get('/', authMiddleware, getDocuments);

// Create a new document
router.post('/', authMiddleware, createDocument);

module.exports = router;
