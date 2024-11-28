import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginForm.jsx';
// import LandingPage from './components/LandingPage.jsx';
// import EmployeeDetails from './components/EmployeeDetails.jsx'
// import AddCourse from './components/AddCourse.jsx';
import UpdateEmployee from './components/UpdateEmployee.jsx';
import "./css/main.css";

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });


const App = () => {
    return (
        // <CourseProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/employee/:userId" element={<UpdateEmployee />} />
               
            </Routes>
        </Router>
        // </CourseProvider>
    );
};

export default App;
