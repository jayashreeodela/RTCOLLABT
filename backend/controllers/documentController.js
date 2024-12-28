const Document = require('../models/Document');

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user.id });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = new Document({ title, content, owner: req.user.id });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDocuments, createDocument };
