
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const EmployeeDetails = () => {
//   const [employee, setEmployee] = useState(null); // Employee details state
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const navigate = useNavigate(); // Navigate hook to redirect

//   // Fetch employee details on component mount
//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchEmployeeDetails = async () => {
//       const token = localStorage.getItem("token"); // Get the token from localStorage

//       if (!token) {
//         navigate("/"); // Redirect to login if no token found
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:8081/api/v1/employee", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           signal,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch employee details.");
//         }

//         const data = await response.json(); // Parse the response data
//         setEmployee(data); // Update the employee state with the data
//       } catch (error) {
//         if (error.name === "AbortError") {
//           console.log("Fetch operation aborted.");
//         } else {
//           setError(error.message); // Set error state if any error occurs
//         }
//       } finally {
//         setLoading(false); // Set loading to false once the request is complete
//       }
//     };

//     fetchEmployeeDetails();

//     return () => {
//       controller.abort(); // Abort the fetch request on cleanup
//     };
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setEmployee((prev) => ({
//       ...prev,
//       [id]: value, // Dynamically update the field in the employee state
//     }));
//   };

//   // If loading, show loading spinner or message
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // If there is an error, display an error message
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // If no employee data is returned, display a message
//   if (!employee) {
//     return <div>No employee details available.</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Employee Details</h2>
//       <div style={styles.detailsContainer}>
//         <img
//           src={`http://localhost:8081/${employee.photographPath}`}
//           alt={`${employee.firstName} ${employee.lastName}`}
//           style={styles.photograph}
//         />
//         <div style={styles.info}>
//           {/* Title */}
//           <div style={styles.formGroup}>
//             <label htmlFor="title"><strong>Title:</strong></label>
//             <input
//               type="text"
//               id="title"
//               value={employee.title}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>

//           {/* First Name */}
//           <div style={styles.formGroup}>
//             <label htmlFor="firstName"><strong>First Name:</strong></label>
//             <input
//               type="text"
//               id="firstName"
//               value={employee.firstName}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>

//           {/* Last Name */}
//           <div style={styles.formGroup}>
//             <label htmlFor="lastName"><strong>Last Name:</strong></label>
//             <input
//               type="text"
//               id="lastName"
//               value={employee.lastName}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>

//           {/* Department (Readonly) */}
//           <div style={styles.formGroup}>
//             <label htmlFor="department"><strong>Department:</strong></label>
//             <input
//               type="text"
//               id="department"
//               value={employee.department}
//               readOnly
//               style={styles.input}
//             />
//           </div>

//           {/* Photograph Path */}
//           <div style={styles.formGroup}>
//             <label htmlFor="photographPath"><strong>Photograph Path:</strong></label>
//             <input
//               type="text"
//               id="photographPath"
//               value={employee.photographPath}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>

//           {/* Courses */}
//           <p>
//             <strong>Courses:</strong>
//           </p>
//           <ul>
//             {employee.courseNames && employee.courseNames.length > 0 ? (
//               employee.courseNames.map((courseName, index) => (
//                 <li key={index}>{courseName}</li>
//               ))
//             ) : (
//               <li>No courses available</li>
//             )}
//           </ul>
//         </div>
//       </div>
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
//   detailsContainer: {
//     display: "flex",
//     alignItems: "center",
//   },
//   photograph: {
//     width: "150px",
//     height: "150px",
//     borderRadius: "50%",
//     marginRight: "20px",
//   },
//   info: {
//     fontSize: "16px",
//     lineHeight: "1.6",
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
// };

// export default EmployeeDetails;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null); // Employee details state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state
  const navigate = useNavigate(); // Navigate hook to redirect

  // Fetch employee details on component mount
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEmployeeDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/api/v1/employee", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employee details.");
        }

        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch operation aborted.");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();

    return () => {
      controller.abort();
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/"); // Redirect to login if no token is found
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8081/api/v1/employees", { // Change to correct endpoint
        method: "PUT", // Use PUT as per your backend
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee), // Send the updated employee object
      });
  
      if (!response.ok) {
        throw new Error("Failed to update employee details.");
      }
  
      setSuccessMessage("Employee details updated successfully!");
    } catch (error) {
      setError(error.message);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>No employee details available.</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Employee Details Updation</h2>
      <div style={styles.detailsContainer}>
        <img
          src={`http://localhost:8081/${employee.photographPath}`}
          alt={`${employee.firstName} ${employee.lastName}`}
          style={styles.photograph}
        />
        <div style={styles.info}>
          {/* Title */}
          <div style={styles.formGroup}>
            <label htmlFor="title"><strong>Title:</strong></label>
            <input
              type="text"
              id="title"
              value={employee.title}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          {/* First Name */}
          <div style={styles.formGroup}>
            <label htmlFor="firstName"><strong>First Name:</strong></label>
            <input
              type="text"
              id="firstName"
              value={employee.firstName}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          {/* Last Name */}
          <div style={styles.formGroup}>
            <label htmlFor="lastName"><strong>Last Name:</strong></label>
            <input
              type="text"
              id="lastName"
              value={employee.lastName}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          {/* Department (Readonly) */}
          <div style={styles.formGroup}>
            <label htmlFor="department"><strong>Department:</strong></label>
            <input
              type="text"
              id="department"
              value={employee.department}
              readOnly
              style={styles.input}
            />
          </div>

          {/* Photograph Path */}
          <div style={styles.formGroup}>
            <label htmlFor="photographPath"><strong>Photograph Path:</strong></label>
            <input
              type="text"
              id="photographPath"
              value={employee.photographPath}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <p>
            <strong>Courses:</strong>
         </p>
          <ul>
            {employee.courseNames && employee.courseNames.length > 0 ? (
               employee.courseNames.map((courseName, index) => (
                <li key={index}>{courseName}</li>
              ))
            ) : (
               <li>No courses available</li>
            )}
          </ul>

          {/* Update Button */}
          <div style={styles.formGroup}>
            <button onClick={handleUpdate} style={styles.button}>
              Update
            </button>
          </div>

          {/* Success or Error Message */}
          {successMessage && <div style={styles.success}>{successMessage}</div>}
          {error && <div style={styles.error}>{error}</div>}
        </div>
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
  detailsContainer: {
    display: "flex",
    alignItems: "center",
  },
  photograph: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  info: {
    fontSize: "16px",
    lineHeight: "1.6",
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
  success: {
    marginTop: "10px",
    color: "green",
  },
  error: {
    marginTop: "10px",
    color: "red",
  },
};

export default EmployeeDetails;

