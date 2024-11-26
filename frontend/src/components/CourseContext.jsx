import React, { createContext, useContext, useState } from "react";

// Create Context
const CourseContext = createContext();

// Create Provider
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  // Function to add a course
  const addCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  // Function to delete a course
  const deleteCourse = (courseToDelete) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course !== courseToDelete)
    );
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use the CourseContext
export const useCourseContext = () => useContext(CourseContext);
