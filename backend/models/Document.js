const mongoose = require('mongoose');

// Define the schema for documents
const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the document
  content: { type: String, required: true }, // Content of the document
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the document (user who created it)
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users who can collaborate on the document
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Export the model to be used in routes or controllers
module.exports = mongoose.model('Document', DocumentSchema);
