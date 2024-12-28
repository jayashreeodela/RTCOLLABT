import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirect
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');  // State to handle error messages
  const navigate = useNavigate();  // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the login request body
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Make API request for login
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, save the JWT token (optional)
        localStorage.setItem('authToken', data.token);
        
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        // Display error message if login fails
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}  {/* Display error if any */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;



// import React, { useState } from 'react';
// import './Login.css';

// function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('User Logged In: ', formData);
//   };

//   return (
//     <div className="login">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
