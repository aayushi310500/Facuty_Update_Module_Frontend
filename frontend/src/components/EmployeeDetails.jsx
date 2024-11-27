

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const EmployeeDetails = () => {
//   const [employee, setEmployee] = useState(null); // Employee details state
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [successMessage, setSuccessMessage] = useState(null); // Success message state
//   const navigate = useNavigate(); // Navigate hook to redirect

//   // Fetch employee details on component mount
//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchEmployeeDetails = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/"); // Redirect to login if no token is found
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

//         const data = await response.json();
//         setEmployee(data);
//       } catch (error) {
//         if (error.name === "AbortError") {
//           console.log("Fetch operation aborted.");
//         } else {
//           setError(error.message);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeDetails();

//     return () => {
//       controller.abort();
//     };
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setEmployee((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleUpdate = async () => {
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//       navigate("/"); // Redirect to login if no token is found
//       return;
//     }
  
//     try {
//       const response = await fetch("http://localhost:8081/api/v1/employees", { // Change to correct endpoint
//         method: "PUT", // Use PUT as per your backend
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(employee), // Send the updated employee object
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to update employee details.");
//       }
  
//       setSuccessMessage("Employee details updated successfully!");
//       setTimeout(() => {
//           setSuccessMessage(null);
//         }, 3000);
//     } catch (error) {
//       setError(error.message);
//     }
//   };
  

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!employee) {
//     return <div>No employee details available.</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Employee Details Updation</h2>
//       <div style={styles.detailsContainer}>
//         <img
//           src={`${employee.photographPath}`}
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

//           <p>
//             <strong>Courses:</strong>
//          </p>
//           <ul>
//             {employee.courseNames && employee.courseNames.length > 0 ? (
//                employee.courseNames.map((courseName, index) => (
//                 <li key={index}>{courseName}</li>
//               ))
//             ) : (
//                <li>No courses available</li>
//             )}
//           </ul>

//           {/* Update Button */}
//           <div style={styles.formGroup}>
//             <button onClick={handleUpdate} style={styles.button}>
//               Update
//             </button>
//           </div>

//           {/* Success or Error Message */}
//           {successMessage && <div style={styles.success}>{successMessage}</div>}
//           {error && <div style={styles.error}>{error}</div>}
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
//   button: {
//     padding: "10px 15px",
//     fontSize: "14px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   success: {
//     marginTop: "10px",
//     color: "green",
//   },
//   error: {
//     marginTop: "10px",
//     color: "red",
//   },
// };

// export default EmployeeDetails;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEmployeeDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
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
      navigate("/");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/v1/employees", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee details.");
      }

      setSuccessMessage("Employee details updated successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImage = async () => {
    if (!selectedFile) {
      setError("Please select an image to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8081/api/v1/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the image.");
      }

      setSuccessMessage("Image uploaded successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        window.location.reload(); // Reload the page after the success message disappears
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };


  const deleteImage = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8081/api/v1/delete-image", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete the image.");
      }
  
      setSuccessMessage("Image deleted successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        window.location.reload(); // Reload the page after success
      }, 1000);
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

      <div style={styles.imageContainer}>
  <img
    src={`http://localhost:8081/${employee.photographPath}`}
    alt={`${employee.firstName} ${employee.lastName}`}
    style={styles.photograph}
  />
  <button onClick={deleteImage} style={styles.deleteButton}>Delete Image</button>
</div>

        <div style={styles.info}>
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

          <div style={styles.formGroup}>
            <label htmlFor="imageUpload"><strong>Upload Profile Image:</strong></label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              style={styles.input}
            />
          </div>

          {selectedFile && (
            <div style={styles.previewContainer}>
              <img src={preview} alt="Preview" style={styles.previewImage} />
              <button onClick={saveImage} style={styles.button}>
                Save Image
              </button>
            </div>
          )}

<div style={styles.updateButtonContainer}>
    <button onClick={handleUpdate} style={styles.button}>
      Update
    </button>
  </div>

          {successMessage && <div style={styles.success}>{successMessage}</div>}
          {error && <div style={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    margin: "20px auto",
    padding: "20px",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
  },
  detailsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "flex-start",
  },
  photograph: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "3px solid #007bff",
    objectFit: "cover",
    backgroundColor: "#f0f0f0", // Light gray for no image
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    color: "#007bff",
    marginBottom: "10px", // Add space between the image and the button
  },
  info: {
    flex: 1,
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333",
    display: "flex",       // Make the container a flexbox
    flexDirection: "column", // Stack elements vertically
    justifyContent: "space-between", // Ensure the content is spaced out
    height: "100%",        // Take up full height to push the button to the bottom
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    color: "#555",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxSizing: "border-box",
    backgroundColor: "#f9f9f9",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  deleteButton: {
    padding: "10px 15px",
    fontSize: "14px",
    // backgroundColor: "#dc3545", // Red background for delete button
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  button: {
    padding: "12px 18px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    marginTop: "10px",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  },
  previewContainer: {
    marginTop: "15px",
    textAlign: "center",
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: "250px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  success: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
  },
  error: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  },
  noImage: {
    backgroundColor: "#ddd", // Slightly darker for no image
    color: "#666",
  },
  inputFocus: {
    borderColor: "#007bff",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
  },
  imageContainer: {
    display: "flex",          // Make the container a flexbox
    flexDirection: "column",  // Stack elements vertically
    alignItems: "center",     // Center elements horizontally
    justifyContent: "center", // Align content to the center vertically (optional, can be removed)
    marginBottom: "20px",     // Space between the image and the button
  },
  // Center the Update button and make it appear at the bottom of the form
  updateButtonContainer: {
    display: "flex",          // Make the container a flexbox
    justifyContent: "center", // Center the button horizontally
    marginTop: "20px",        // Add space between the inputs and the button
  },
  
  // Media queries for responsiveness
  '@media (max-width: 768px)': {
    detailsContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    info: {
      maxWidth: "90%",
    },
  },
};



// const styles = {
//   container: {
//     margin: "20px auto",
//     padding: "20px",
//     maxWidth: "800px",
//     backgroundColor: "#ffffff",
//     borderRadius: "10px",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//     fontFamily: "'Roboto', sans-serif",
//   },
//   detailsContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//     alignItems: "flex-start",
//   },
//   photograph: {
//     width: "150px",
//     height: "150px",
//     borderRadius: "50%",
//     border: "3px solid #007bff",
//     objectFit: "cover",
//     backgroundColor: "#f0f0f0", // Light gray for no image
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "16px",
//     color: "#007bff",
//     marginBottom: "10px", // Add space between the image and the button
//   },
//   info: {
//     flex: 1,
//     fontSize: "16px",
//     lineHeight: "1.5",
//     color: "#333",
//   },
//   formGroup: {
//     marginBottom: "15px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     fontSize: "14px",
//     color: "#555",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     boxSizing: "border-box",
//     backgroundColor: "#f9f9f9",
//     transition: "border-color 0.3s ease, box-shadow 0.3s ease",
//   },
//   deleteButton: {
//     padding: "10px 15px",
//     fontSize: "14px",
//     backgroundColor: "#dc3545", // Red background for delete button
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   button: {
//     padding: "12px 18px",
//     fontSize: "14px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease, transform 0.2s ease",
//     marginTop: "10px",
//   },
//   buttonHover: {
//     backgroundColor: "#0056b3",
//     transform: "scale(1.05)",
//   },
//   previewContainer: {
//     marginTop: "15px",
//     textAlign: "center",
//   },
//   previewImage: {
//     maxWidth: "100%",
//     maxHeight: "250px",
//     marginBottom: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//   },
//   success: {
//     marginTop: "15px",
//     padding: "10px",
//     borderRadius: "5px",
//     backgroundColor: "#d4edda",
//     color: "#155724",
//     border: "1px solid #c3e6cb",
//   },
//   error: {
//     marginTop: "15px",
//     padding: "10px",
//     borderRadius: "5px",
//     backgroundColor: "#f8d7da",
//     color: "#721c24",
//     border: "1px solid #f5c6cb",
//   },
//   noImage: {
//     backgroundColor: "#ddd", // Slightly darker for no image
//     color: "#666",
//   },
//   inputFocus: {
//     borderColor: "#007bff",
//     boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
//   },
//   imageContainer: {
//     display: "flex",          // Make the container a flexbox
//     flexDirection: "column",  // Stack elements vertically
//     alignItems: "center",     // Center elements horizontally
//     justifyContent: "center", // Align content to the center vertically (optional, can be removed)
//     marginBottom: "20px",     // Space between the image and the button
//   },
  
//   // Media queries for responsiveness
//   '@media (max-width: 768px)': {
//     detailsContainer: {
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     info: {
//       maxWidth: "90%",
//     },
//   },
// };




export default EmployeeDetails;
