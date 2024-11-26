import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseManager = () => {
  const [courses, setCourses] = useState([]); // List of courses
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course
  const [employee, setEmployee] = useState(null); // Employee details
  const [employeeForm, setEmployeeForm] = useState({}); // Employee form details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const navigate = useNavigate(); // Navigation hook

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch courses
      const coursesResponse = await fetch("http://localhost:8081/api/v1/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!coursesResponse.ok) throw new Error("Failed to fetch courses.");
      const coursesData = await coursesResponse.json();

      // Fetch employee details
      const employeeResponse = await fetch("http://localhost:8081/api/v1/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!employeeResponse.ok) throw new Error("Failed to fetch employee details.");
      const employeeData = await employeeResponse.json();

      setCourses(coursesData);
      setEmployee(employeeData);
      setEmployeeForm({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        department: employeeData.department,
      });
      setError(null); // Clear errors if all fetches succeed
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data for courses and employee details
  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect if not authenticated
      return;
    }

    fetchData();
  }, [navigate]);

  // Handle course selection
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Add course functionality
  const handleAddCourse = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/assign", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseName: selectedCourse }),
      });

      if (!response.ok) throw new Error("Failed to assign course.");
      setSuccessMessage("Course assigned successfully!");
      setError(null);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete course functionality
  const handleDeleteCourse = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/delete_course", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseName: selectedCourse }),
      });

      if (!response.ok) throw new Error("Failed to delete course.");
      setSuccessMessage("Course deleted successfully!");
      setError(null);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle employee form input change
  const handleEmployeeFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Update employee details functionality
  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/update_employee", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeForm),
      });

      if (!response.ok) throw new Error("Failed to update employee details.");
      setSuccessMessage("Employee details updated successfully!");
      setError(null);
      fetchData(); // Refresh data after update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Course Management</h2>
      {successMessage && <div style={styles.success}>{successMessage}</div>}
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="course">Select a Course</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            style={styles.input}
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleAddCourse}
            style={styles.button}
            disabled={!selectedCourse}
          >
            Add Course
          </button>
          <button
            type="button"
            onClick={handleDeleteCourse}
            style={{ ...styles.button, backgroundColor: "#dc3545" }}
            disabled={!selectedCourse}
          >
            Delete Course
          </button>
        </div>
      </form>

      <div>
        <h3>Employee Details</h3>
        {employee ? (
          <div style={styles.details}>
            <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Assigned Courses:</strong></p>
            <ul>
              {employee.courseNames && employee.courseNames.length > 0 ? (
                employee.courseNames.map((course, index) => <li key={index}>{course}</li>)
              ) : (
                <li>No courses assigned</li>
              )}
            </ul>
          </div>
        ) : (
          <p>No employee details available.</p>
        )}

        <h3>Update Employee Details</h3>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={employeeForm.firstName}
              onChange={handleEmployeeFormChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={employeeForm.lastName}
              onChange={handleEmployeeFormChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={employeeForm.department}
              onChange={handleEmployeeFormChange}
              style={styles.input}
            />
          </div>
          <button
            type="button"
            onClick={handleUpdateEmployee}
            style={styles.button}
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginBottom: "15px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  details: {
    marginTop: "20px",
  },
};

export default CourseManager;
