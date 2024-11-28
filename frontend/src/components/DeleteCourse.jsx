import React from "react";
import useDeleteCourse from "../hooks/useDeleteCourse";
import "../css/DeleteCourses.css";

const DeleteCourse = () => {
  const {
    courses,
    selectedCourse,
    loading,
    error,
    successMessage,
    handleCourseChange,
    handleSubmit,
  } = useDeleteCourse();

  return (
    <div className="container">
      <h2>Delete Course Assigned to Faculty</h2>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
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
        <button type="submit" className="button" disabled={loading}>
          Delete Course
        </button>
      </form>
    </div>
  );
};

export default DeleteCourse;
