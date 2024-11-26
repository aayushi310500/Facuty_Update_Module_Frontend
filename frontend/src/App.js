import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginForm.jsx';
// import LandingPage from './components/LandingPage.jsx';
// import EmployeeDetails from './components/EmployeeDetails.jsx'
// import AddCourse from './components/AddCourse.jsx';
import UpdateEmployee from './components/UpdateEmployee.jsx';
// import CourseManagement from './components/CourseMangement.jsx';
// import { CourseProvider } from "./components/CourseContext";
// import ReceivedSwappingRequests from './Pages/ReceivedSwappingRequests.js';
// import RequestSwapping from './Pages/RequestSwapping.js';
// import MyRequests from './Pages/MyRequests.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AboutMe from './Pages/AboutMe.js';



const App = () => {
    return (
        // <CourseProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/employee" element={<UpdateEmployee />} />
               
            </Routes>
        </Router>
        // </CourseProvider>
    );
};

export default App;
