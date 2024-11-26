
    // import React, { useState, useEffect } from "react";

    // const AddCourse = () => {
    //   const [courses, setCourses] = useState([]); // State to store the list of courses
    //   const [selectedCourse, setSelectedCourse] = useState(""); // State to store selected course
    //   const [error, setError] = useState(null); // Error state
    //   const [successMessage, setSuccessMessage] = useState(null); // Success message state
    
    //   // Fetch courses when the component is mounted
    //   useEffect(() => {
    //     const fetchCourses = async () => {
    //       const token = localStorage.getItem("token"); // Get token from localStorage
    
    //       if (!token) {
    //         setError("Unauthorized: Please log in to continue.");
    //         return;
    //       }
    
    //       try {
    //         const response = await fetch("http://localhost:8081/api/v1/courses", {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });
    
    //         if (!response.ok) {
    //           throw new Error("Failed to fetch courses.");
    //         }
    
    //         const data = await response.json();
    //         setCourses(data); // Update courses state
    //       } catch (err) {
    //         setError(err.message);
    //       }
    //     };
    
    //     fetchCourses();
    //   }, []);
    
    //   // Handle course selection change
    //   const handleCourseChange = (e) => {
    //     setSelectedCourse(e.target.value);
    //   };
    
    //   // Handle form submission
    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //       setError("Unauthorized: Please log in to continue.");
    //       return;
    //     }
    
    //     try {
    //       const response = await fetch("http://localhost:8081/api/v1/assign", {
    //         method: "PUT", // Use PUT method as specified
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           courseName: selectedCourse, // Pass the selected course name
    //         }),
    //       });
    
    //       if (response.status === 409) {
    //         // If the response status is 409 (Conflict), display the error message
    //         const errorData = await response.json();
    //         setError(errorData.message || "Course is already assigned to this faculty.");
    //       } else if (!response.ok) {
    //         // Handle other errors
    //         const errorData = await response.json();
    //         throw new Error(errorData.message || "Failed to assign course.");
    //       } else {
    //         // Success case
    //         setSuccessMessage("Course assigned successfully!");
    //         setSelectedCourse(""); // Reset selected course
    //         // window.location.reload();
    //       }

    //       window.location.reload();
    //     } catch (err) {
    //       setError(err.message);
    //     }
    //   };
    
    
    //   return (
    //     <div style={styles.container}>
    //       <h2>Assign Faculty to Course</h2>
    //       {error && <div style={styles.error}>{error}</div>}
    //       {successMessage && <div style={styles.success}>{successMessage}</div>}
    //       <form onSubmit={handleSubmit} style={styles.form}>
    //         <div style={styles.formGroup}>
    //           <label htmlFor="course">Select Course</label>
    //           <select
    //             id="course"
    //             name="course"
    //             value={selectedCourse}
    //             onChange={handleCourseChange}
    //             required
    //             style={styles.input}
    //           >
    //             <option value="" disabled>
    //               Select a course
    //             </option>
    //             {courses.map((course, index) => (
    //               <option key={index} value={course}>
    //                 {course}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    
    //         <button type="submit" style={styles.button}>
    //           Assign Course
    //         </button>
    //       </form>
    //     </div>
    //   );
    // };
    
    // const styles = {
    //   container: {
    //     margin: "20px",
    //     padding: "20px",
    //     backgroundColor: "#f9f9f9",
    //     borderRadius: "8px",
    //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    //   },
    //   form: {
    //     display: "flex",
    //     flexDirection: "column",
    //   },
    //   formGroup: {
    //     marginBottom: "15px",
    //   },
    //   input: {
    //     width: "100%",
    //     padding: "8px",
    //     fontSize: "14px",
    //     border: "1px solid #ccc",
    //     borderRadius: "4px",
    //     boxSizing: "border-box",
    //   },
    //   button: {
    //     padding: "10px 15px",
    //     fontSize: "14px",
    //     backgroundColor: "#007bff",
    //     color: "#fff",
    //     border: "none",
    //     borderRadius: "4px",
    //     cursor: "pointer",
    //   },
    //   error: {
    //     color: "red",
    //     marginBottom: "15px",
    //   },
    //   success: {
    //     color: "green",
    //     marginBottom: "15px",
    //   },
    // };
    
    // export default AddCourse;
    import React, { useState, useEffect } from "react";

const AddCourse = () => {
  const [courses, setCourses] = useState([]); // State to store the list of courses
  const [selectedCourse, setSelectedCourse] = useState(""); // State to store selected course
  const [error, setError] = useState(null); // Error state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Fetch courses when the component is mounted
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        setError("Unauthorized: Please log in to continue.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/api/v1/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }

        const data = await response.json();
        setCourses(data); // Update courses state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, []);

  // Handle course selection change
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

    try {
      const response = await fetch("http://localhost:8081/api/v1/assign", {
        method: "PUT", // Use PUT method as specified
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseName: selectedCourse, // Pass the selected course name
        }),
      });

      if (response.status === 409) {
        // If the response status is 409 (Conflict), display the error message
        const errorData = await response.json();
        setError(errorData.message || "Course is already assigned to this faculty.");
         setTimeout(() => {
          setError(null);
        }, 3000);
      } else if (!response.ok) {
        // Handle other errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign course.");
      } else {
        // Success case
        setSuccessMessage("Course assigned successfully!");
        setSelectedCourse(""); // Reset selected course

        // Hide the success message after 3 seconds
        // setTimeout(() => {
        //   setSuccessMessage(null);
        // }, 3000);
        setTimeout(() => {
          setSuccessMessage(null);
          window.location.reload(); // Reload the page after the success message disappears
        }, 1000);
      }

     
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Assign Faculty to Course</h2>
      {error && <div style={styles.error}>{error}</div>}
      {successMessage && (
        <div style={styles.successPopup}>
          {successMessage}
        </div>
      )}
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

        <button type="submit" style={styles.button}>
          Assign Course
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
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  successPopup: {
    color: "green",
    backgroundColor: "#d4edda",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    border: "1px solid #c3e6cb",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default AddCourse;
