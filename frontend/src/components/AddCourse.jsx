    // import React, { useState, useEffect } from "react";

    // const AddCourse = () => {
    // const [courses, setCourses] = useState([]); // State to store the list of courses
    // const [selectedCourse, setSelectedCourse] = useState(""); // State to store selected course
    // const [employee, setEmployee] = useState({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     department: "",
    // }); // State for employee details
    // const [error, setError] = useState(null); // Error state
    // const [successMessage, setSuccessMessage] = useState(null); // Success message state

    // // Fetch courses when the component is mounted
    // useEffect(() => {
    //     const fetchCourses = async () => {
    //     const token = localStorage.getItem("token"); // Get token from localStorage

    //     if (!token) {
    //         setError("Unauthorized: Please log in to continue.");
    //         return;
    //     }

    //     try {
    //         const response = await fetch("http://localhost:8081/api/v1/courses", {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //         });

    //         if (!response.ok) {
    //         throw new Error("Failed to fetch courses.");
    //         }

    //         const data = await response.json();
    //         setCourses(data); // Update courses state
    //     } catch (err) {
    //         setError(err.message);
    //     }
    //     };

    //     fetchCourses();
    // }, []);

    // // Handle employee form input changes
    // // const handleInputChange = (e) => {
    // //     const { name, value } = e.target;
    // //     setEmployee((prevEmployee) => ({
    // //     ...prevEmployee,
    // //     [name]: value,
    // //     }));
    // // };

    // // Handle course selection change
    // const handleCourseChange = (e) => {
    //     setSelectedCourse(e.target.value);
    // };

    // // Handle form submission
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //     setError("Unauthorized: Please log in to continue.");
    //     return;
    //     }

    //     try {
    //     const response = await fetch("http://localhost:8081/api/v1/assign", {
    //         method: "POST",
    //         headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ ...employee, course: selectedCourse }),
    //     });

    //     if (!response.ok) {
    //         throw new Error("Failed to add employee.");
    //     }

    //     setSuccessMessage("Employee added successfully!");
    //     setEmployee({
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //         department: "",
    //     }); // Reset employee form
    //     setSelectedCourse(""); // Reset selected course
    //     } catch (err) {
    //     setError(err.message);
    //     }
    // };

    // return (
    //     <div style={styles.container}>
    //     <h2>Add Employee</h2>
    //     {error && <div style={styles.error}>{error}</div>}
    //     {successMessage && <div style={styles.success}>{successMessage}</div>}
    //     <form onSubmit={handleSubmit} style={styles.form}>
    //         {/* <div style={styles.formGroup}>
    //         <label htmlFor="firstName">First Name</label>
    //         <input
    //             type="text"
    //             id="firstName"
    //             name="firstName"
    //             value={employee.firstName}
    //             onChange={handleInputChange}
    //             required
    //             style={styles.input}
    //         />
    //         </div>

    //         <div style={styles.formGroup}>
    //         <label htmlFor="lastName">Last Name</label>
    //         <input
    //             type="text"
    //             id="lastName"
    //             name="lastName"
    //             value={employee.lastName}
    //             onChange={handleInputChange}
    //             required
    //             style={styles.input}
    //         />
    //         </div>

    //         <div style={styles.formGroup}>
    //         <label htmlFor="email">Email</label>
    //         <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             value={employee.email}
    //             onChange={handleInputChange}
    //             required
    //             style={styles.input}
    //         />
    //         </div>

    //         <div style={styles.formGroup}>
    //         <label htmlFor="department">Department</label>
    //         <input
    //             type="text"
    //             id="department"
    //             name="department"
    //             value={employee.department}
    //             onChange={handleInputChange}
    //             required
    //             style={styles.input}
    //         />
    //         </div> */}

    //         <div style={styles.formGroup}>
    //         <label htmlFor="course">Select Course</label>
    //         <select
    //             id="course"
    //             name="course"
    //             value={selectedCourse}
    //             onChange={handleCourseChange}
    //             required
    //             style={styles.input}
    //         >
    //             <option value="" disabled>
    //             Select a course
    //             </option>
    //             {courses.map((course) => (
    //             <option key={course} value={course}>
    //                 {course}
    //             </option>
    //             ))}
    //         </select>
    //         </div>

    //         <button type="submit" style={styles.button}>
    //         Add Employee
    //         </button>
    //     </form>
    //     </div>
    // );
    // };

    // const styles = {
    // container: {
    //     margin: "20px",
    //     padding: "20px",
    //     backgroundColor: "#f9f9f9",
    //     borderRadius: "8px",
    //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    // },
    // form: {
    //     display: "flex",
    //     flexDirection: "column",
    // },
    // formGroup: {
    //     marginBottom: "15px",
    // },
    // input: {
    //     width: "100%",
    //     padding: "8px",
    //     fontSize: "14px",
    //     border: "1px solid #ccc",
    //     borderRadius: "4px",
    //     boxSizing: "border-box",
    // },
    // button: {
    //     padding: "10px 15px",
    //     fontSize: "14px",
    //     backgroundColor: "#007bff",
    //     color: "#fff",
    //     border: "none",
    //     borderRadius: "4px",
    //     cursor: "pointer",
    // },
    // error: {
    //     color: "red",
    //     marginBottom: "15px",
    // },
    // success: {
    //     color: "green",
    //     marginBottom: "15px",
    // },
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
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to assign course.");
          }
    
          setSuccessMessage("Course assigned successfully!");
          setSelectedCourse(""); // Reset selected course
        } catch (err) {
          setError(err.message);
        }
      };
    
      return (
        <div style={styles.container}>
          <h2>Assign Faculty to Course</h2>
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
      success: {
        color: "green",
        marginBottom: "15px",
      },
    };
    
    export default AddCourse;
    