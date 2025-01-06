const Document = require('../models/Document');

// Get all documents for the authenticated user
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user.id });
    res.status(200).json(documents); // Respond with the array of documents
  } catch (error) {
    console.error('Error fetching documents:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Create a new document
const createDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate that both title and content are provided
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Create a new document instance
    const document = new Document({
      title,
      content,
      owner: req.user.id, // Set the owner to the authenticated user
    });

    // Save the document to the database
    await document.save();

    // Respond with the newly created document
    res.status(201).json(document);
  } catch (error) {
    console.error('Error creating document:', error.message);
    res.status(500).json({ error: error.message || 'Failed to create document.' });
  }
};

module.exports = { getDocuments, createDocument };




// const Document = require('../models/Document');

// const getDocuments = async (req, res) => {
//   try {
//     const documents = await Document.find({ owner: req.user.id });
//     res.status(200).json(documents);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const createDocument = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const document = new Document({ title, content, owner: req.user.id });
//     await document.save();
//     res.status(201).json(document);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { getDocuments, createDocument };
