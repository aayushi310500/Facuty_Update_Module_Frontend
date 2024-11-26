import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginForm.jsx';
// import LandingPage from './components/LandingPage.jsx';
// import EmployeeDetails from './components/EmployeeDetails.jsx'
// import AddCourse from './components/AddCourse.jsx';
import UpdateEmployee from './components/UpdateEmployee.jsx';

// import ReceivedSwappingRequests from './Pages/ReceivedSwappingRequests.js';
// import RequestSwapping from './Pages/RequestSwapping.js';
// import MyRequests from './Pages/MyRequests.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AboutMe from './Pages/AboutMe.js';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {/* <Route path="/landing" element={<LandingPage />} /> */}
                <Route path="/employee" element={<UpdateEmployee />} />
                {/* <Route path="/employee" element={<EmployeeDetails />} />
                <Route path="/courses" element={<AddCourse />} /> */}

                {/* <Route path="/request-swapping" element={<RequestSwapping />} />
                 <Route path="/received-swapping-requests" element={<ReceivedSwappingRequests />} />   
                 <Route path='/my-requests' element = {<MyRequests/>}/>
                 <Route path="/about-me" element={<AboutMe />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
