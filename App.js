import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div id="app-container">
        <NavBar />
        <div id="main-content"> {/* Add this wrapper */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


// import React from "react";

// function App() {
//   return <div>Hello, React!</div>;  // A simple static component
// }

// export default App;







// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
