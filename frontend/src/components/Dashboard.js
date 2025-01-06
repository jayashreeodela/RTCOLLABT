
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [documents, setDocuments] = useState([]); // State to store documents
  const [newDocTitle, setNewDocTitle] = useState(''); // State for new document title
  const [newDocContent, setNewDocContent] = useState(''); // State for new document content
  const [editingDoc, setEditingDoc] = useState(null); // State for editing a document
  const [editingContent, setEditingContent] = useState(''); // State for editing content
  const [updateLock, setUpdateLock] = useState(null); // State to lock a document for editing

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Check for auth token
      if (!token) {
        console.error('Auth token not found.');
        return;
      }

      const response = await fetch('http://localhost:5001/api/documents', {
        headers: { Authorization: token },
      });

      const data = await response.json();

      console.log('API Response:', data); // Debugging API response
      if (Array.isArray(data)) {
        setDocuments(data); // Update state if data is valid
      } else {
        console.error('Fetched data is not an array:', data);
        setDocuments([]); // Fallback to empty state
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  // const createDocument = async (title, content) => {
  //   if (!title || !content) {
  //     alert('Title and content cannot be empty.'); // Ensure valid input
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //       console.error('Auth token not found.');
  //       return;
  //     }

  //     const response = await fetch('http://localhost:5000/api/documents', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //       body: JSON.stringify({ title, content }),
  //     });

  //     const newDocument = await response.json();
  //     console.log('Created document:', newDocument); // Debugging

  //     if (response.ok) {
  //       setDocuments((prev) => [...prev, newDocument]); // Update state with new document
  //       setNewDocTitle(''); // Clear inputs
  //       setNewDocContent('');
  //     } else {
  //       console.error('Error creating document:', newDocument);
  //       alert('Failed to create the document.');
  //     }
  //   } catch (error) {
  //     console.error('Error during document creation:', error);
  //   }
  // };


  // const createDocument = async (title, content) => {
  //   if (!title || !content) {
  //     alert('Title and content cannot be empty.');
  //     return;
  //   }
  
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //       console.error('Auth token not found. Please log in again.');
  //       alert('Authentication failed. Please log in.');
  //       return;
  //     }
  
  //     const response = await fetch('http://localhost:5000/api/documents', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //       body: JSON.stringify({ title, content }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Error creating document:', errorData.message || 'Unknown error');
  //       alert(`Failed to create the document: ${errorData.message || 'Unknown error'}`);
  //       return;
  //     }
  
  //     const newDocument = await response.json();
  //     console.log('Document created successfully:', newDocument);
  
  //     setDocuments((prev) => [...prev, newDocument]);
  //     setNewDocTitle('');
  //     setNewDocContent('');
  //   } catch (error) {
  //     console.error('Error during document creation:', error);
  //     alert('An unexpected error occurred. Please try again.');
  //   }
  // };
  


  // const createDocument = async (title, content) => {
  //   if (!title || !content) {
  //     alert('Title and content cannot be empty.');
  //     return;
  //   }
  
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //       alert('Authentication token not found. Please log in again.');
  //       return;
  //     }
  
  //     const response = await fetch('http://localhost:5000/api/documents', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //       body: JSON.stringify({ title, content }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => null); // Handle non-JSON errors
  //       const errorMessage = errorData?.message || response.statusText || 'Unknown error';
  //       console.error(`Error creating document: ${errorMessage}`);
  //       alert(`Failed to create the document: ${errorMessage}`);
  //       return;
  //     }
  
  //     const newDocument = await response.json();
  //     setDocuments((prev) => [...prev, newDocument]);
  //     setNewDocTitle('');
  //     setNewDocContent('');
  //     console.log('Document created successfully:', newDocument);
  //   } catch (error) {
  //     console.error('Unexpected error during document creation:', error);
  //     alert('An unexpected error occurred. Please check the console for details.');
  //   }
  // };


  const createDocument = async (title, content) => {
    if (!title || !content) {
      alert('Title and content cannot be empty.');
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Authentication token not found. Please log in again.');
        return;
      }
  
      // Log the data to verify it's correct
      console.log('Creating document with data:', { title, content });
  
      const response = await fetch('http://localhost:5000/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null); // Handle non-JSON errors
        const errorMessage = errorData?.message || response.statusText || 'Unknown error';
        console.error(`Error creating document: ${errorMessage}`);
        alert(`Failed to create the document: ${errorMessage}`);
        return;
      }
  
      const newDocument = await response.json();
      setDocuments((prev) => [...prev, newDocument]);
      setNewDocTitle('');
      setNewDocContent('');
      console.log('Document created successfully:', newDocument);
    } catch (error) {
      console.error('Unexpected error during document creation:', error);
      alert('An unexpected error occurred. Please check the console for details.');
    }
  };
  
  


  const startEditing = (doc) => {
    if (!updateLock || updateLock === doc._id) {
      setUpdateLock(doc._id);
      setEditingDoc(doc);
      setEditingContent(doc.content);
    } else {
      alert('Another user is editing this document. Try again later.');
    }
  };

  const saveEdit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Auth token not found.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/documents/${editingDoc._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ content: editingContent }),
      });

      if (response.ok) {
        console.log('Document updated successfully');
        fetchDocuments(); // Refresh documents after update
        cancelEdit();
      } else {
        console.error('Failed to update document');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const cancelEdit = () => {
    setEditingDoc(null);
    setEditingContent('');
    setUpdateLock(null);
  };

  return (
    <div className="dashboard">
      <h2>Your Documents</h2>
      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc._id} className="document-item">
            <h3>{doc.title}</h3>
            {editingDoc && editingDoc._id === doc._id ? (
              <div>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                ></textarea>
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{doc.content}</p>
                <button onClick={() => startEditing(doc)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="new-document">
        <h2>Create a New Document</h2>
        <input
          type="text"
          placeholder="Title"
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newDocContent}
          onChange={(e) => setNewDocContent(e.target.value)}
        ></textarea>
        <button onClick={() => createDocument(newDocTitle, newDocContent)}>Create</button>
      </div>
    </div>
  );
}

export default Dashboard;
