import React, { useState } from "react";
import { useFetchCourses } from "../hooks/useFetchCourses";
import { useAssignCourse } from "../hooks/useAssignCourses";
import "../css/AddCourses.css"; // Import the CSS file

const AddCourse = () => {
  const { courses, error: fetchError } = useFetchCourses();
  const { assignCourse, error: assignError, successMessage } = useAssignCourse();
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    assignCourse(selectedCourse);
    setSelectedCourse("");
    
  };

  return (
    <div className="container">
      <h2>Assign Faculty to Course</h2>
      {fetchError && <div className="error">{fetchError}</div>}
      {assignError && <div className="error">{assignError}</div>}
      {successMessage && <div className="successPopup">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
        <div class="selectcourse">
          <label htmlFor="course">Select Course</label>
          </div>
          <select
            id="course"
            name="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            required
            className="input"
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
        <button type="submit" className="button">
          Assign Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
