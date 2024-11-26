import React, { useState, useEffect } from "react";

const DeleteCourse = () => {
  const [courses, setCourses] = useState([]); // List of courses
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course
  const [error, setError] = useState(null); // Error message
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please log in to continue.");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("http://localhost:8081/api/v1/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }

        const data = await response.json();
        setCourses(data);
        setError(null); // Clear previous errors
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course selection
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in to continue.");
      return;
    }

    if (!selectedCourse) {
      setError("Please select a course to delete.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/api/v1/delete_course", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseName: selectedCourse,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete course.");
      }

      setSuccessMessage("Course deleted successfully!");
      setError(null);
      setSelectedCourse(""); // Reset selected course
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Delete Course Assigned to Faculty</h2>
      {loading && <div style={styles.loading}>Loading...</div>}
      {error && <div style={styles.error}>{error}</div>}
      {successMessage && <div style={styles.success}>{successMessage}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="course">Select Course</label>
          <select
            id="course"
            name="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            required
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
        <button type="submit" style={styles.button} disabled={loading}>
          Delete Course
        </button>
      </form>
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
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    opacity: "1",
  },
  loading: {
    color: "#007bff",
    marginBottom: "15px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  success: {
    color: "green",
    marginBottom: "15px",
  },
};

export default DeleteCourse;
