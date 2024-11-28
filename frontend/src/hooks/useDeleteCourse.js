// import { useState, useEffect } from "react";
// import { fetchCourses, deleteCourse } from "../utils/apiDelete";

// const useDeleteCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         setLoading(true);
//         const token = sessionStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized: Please log in to continue.");
//           return;
//         }

//         const data = await fetchCourses(token);
//         setCourses(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCourses();
//   }, []);

//   const handleCourseChange = (e) => {
//     setSelectedCourse(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const token = sessionStorage.getItem("token");
//       if (!token) {
//         setError("Unauthorized: Please log in to continue.");
//         return;
//       }

//       if (!selectedCourse) {
//         setError("Please select a course to delete.");
//         return;
//       }

//       await deleteCourse(selectedCourse, token);
//       setSuccessMessage("Course deleted successfully!");
//       setError(null);

//       setTimeout(() => {
//         setSuccessMessage(null);
//         window.location.reload();
//       }, 1000);
//     } catch (err) {
//       setError(err.message);
//       setSuccessMessage(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     courses,
//     selectedCourse,
//     loading,
//     error,
//     successMessage,
//     handleCourseChange,
//     handleSubmit,
//   };
// };

// export default useDeleteCourse;
import { useState, useEffect } from "react";
import { fetchCourses, deleteCourse } from "../utils/apiDelete";

const useDeleteCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in to continue.");
          return;
        }

        const data = await fetchCourses(token);
        setCourses(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in to continue.");
        return;
      }

      if (!selectedCourse) {
        setError("Please select a course to delete.");
        return;
      }

      await deleteCourse(selectedCourse, token);
      setSuccessMessage("Course deleted successfully!");
      setError(null);

      setTimeout(() => {
        setSuccessMessage(null);
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err.message);
      // Check if the error is a 400 status with a specific message
      if (err.message === "No courses like this found assigned to the faculty") {
        setError("No courses found assigned to the faculty.");
      } else {
        // Display the error message from the backend or a generic message
        setError(err.message || "An error occurred while deleting the course.");
      }

      setSuccessMessage(null);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 2000);
      setLoading(false);
    }
  };

  return {
    courses,
    selectedCourse,
    loading,
    error,
    successMessage,
    handleCourseChange,
    handleSubmit,
  };
};

export default useDeleteCourse;
