import React from "react";
import EmployeeDetails from "./EmployeeDetails"; // Adjust the path based on your file structure
import AddCourse from "./AddCourse"; // Adjust the path based on your file structure
import DeleteCourse from "./DeleteCourse"; // Adjust the path based on your file structure
import "../css/UpdateEmployee.css"; // Import the CSS file

const UpdateEmployee = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">UPDATE DETAILS</h1>
      <div className="dashboard-content">
        {/* Employee Details Component */}
        <div className="dashboard-card">
          <EmployeeDetails />
        </div>

        {/* Add Courses Component */}
        <div className="dashboard-card">
          <AddCourse />
        </div>

        {/* Delete Courses Component */}
        <div className="dashboard-card">
          <DeleteCourse />
        </div>
      </div>
      <script src="app.js"></script>
    </div>

    
  );
};

export default UpdateEmployee;
