// import { useState } from "react";
// import { getAuthToken } from "../utils/apiClient";

// export const useAssignCourse = () => {
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const assignCourse = async (courseName) => {
//     const token = getAuthToken();

//     if (!token) {
//       setError("Unauthorized: Please log in to continue.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8081/api/v1/assign", {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ courseName }),
//       });
//       if(response.status === 401){
//         setError("Invalid token");
//       }
//       else if(response.status===404){
//         setError("No courses found");
//       }
//       else if (error.response && error.response.status === 401) {
//         setError(error.response.data); // Backend error message
//       }
//       else if (response.status === 409) {
//         const errorData = await response.json();
//         setError(errorData.message || "Course is already assigned to this faculty.");
//         setTimeout(() => {
//           setError(null);
//         }, 1000);
//       } else if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to assign course.");
//       } else {
//         setSuccessMessage("Course assigned successfully!");
//         setTimeout(() => {
//           setSuccessMessage(null);
//           window.location.reload(); 
//         }, 1000);
//       }
//     } catch (err) {
//       setError(err.message);
//       setTimeout(() => {
//         setError(null);
//       }, 2000);
//     }
//   };

//   return { assignCourse, error, successMessage };
// };
import { useState } from "react";
import { getAuthToken } from "../utils/apiClient";

export const useAssignCourse = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const assignCourse = async (courseName) => {
    const token = getAuthToken();

    if (!token) {
      setError("Unauthorized: Please log in to continue.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/v1/assign", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseName }),
      });
      if(response.status === 401){
        const errorData = await response.json();
                setError(errorData.message || "Invalid token");
              }
              else if(response.status===404){
                const errorData = await response.json();
                setError(errorData.message || "No courses found");
              }
      if (response.status === 409) {
        const errorData = await response.json();
        setError(errorData.message || "Course is already assigned to this faculty.");
        setTimeout(() => {
          setError(null);
        }, 1000);
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign course.");
      } else {
        setSuccessMessage("Course assigned successfully!");
        setTimeout(() => {
          setSuccessMessage(null);
          window.location.reload(); 
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return { assignCourse, error, successMessage };
};
