import React from 'react';
import EmployeeDetails from './EmployeeDetails'; // Adjust the path based on your file structure
import AddCourse from './AddCourse'; // Adjust the path based on your file structure

const UpdateEmployee = () => {
  return (
    <div style={{ margin: '20px', padding: '10px' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Employee Details Component */}
        <div style={{ flex: 1, border: '1px solid gray', padding: '10px' }}>
          <h2>Employee Details</h2>
          <EmployeeDetails />
        </div>

        {/* Add Courses Component */}
        <div style={{ flex: 1, border: '1px solid gray', padding: '10px' }}>
          <h2>Add Courses</h2>
          <AddCourse />
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
