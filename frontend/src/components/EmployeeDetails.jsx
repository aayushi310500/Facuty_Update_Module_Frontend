// // // EmployeeDetails.js
// import React from "react";
// import useEmployeeDetails from "../hooks/useEmployeeDetails";
// import { updateEmployeeDetails, uploadImage, deleteImage } from "../utils/apiUtils";
// import "../css/EmployeeDetails.css";


// const EmployeeDetails = () => {
//   const {
//     employee,
//     setEmployee,
//     loading,
//     error,
//     setError,
//     successMessage,
//     setSuccessMessage,
//     selectedFile,
//     setSelectedFile,
//     preview,
//     setPreview,
//     navigate,
//   } = useEmployeeDetails();

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setEmployee((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleUpdate = async () => {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//       navigate("/");
//       return;
//     }

//      // Validate first name and last name

//      if (!employee.firstName || !employee.lastName) {
//       setError("First Name and Last Name cannot be empty.");
//     } else {
//       setError(null); // Clear the error if fields are valid
//     }
  


//     try {
//       await updateEmployeeDetails(employee, token);
//       setSuccessMessage("Employee details updated successfully!");
//       setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];

//      // Validate file size (5MB = 5 * 1024 * 1024 bytes)
//      if (file.size > 5 * 1024 * 1024) {
//       setError("File size must be less than 5MB.");
//       setSelectedFile(null); // Clear previously selected file if invalid
//       setPreview(null); // Clear preview as well
//       return; // Ex
//       // return;
//     }
//     setSelectedFile(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const saveImage = async () => {
//     const token = sessionStorage.getItem("token");

//     if (!selectedFile) {
//       console.error("Please select an image to upload.");
//       return;
//     }

//     try {
//       await uploadImage(selectedFile, token);
//       setSuccessMessage("Image uploaded successfully!");
//       setTimeout(() => window.location.reload(), 1000);
//     } catch (err) {
//       setError(err.message );
//       console.error(err.message);
//     }
//   };

//   const handleDeleteImage = async () => {
//     const token = sessionStorage.getItem("token");

//     try {
//       await deleteImage(token);
//       setSuccessMessage("Image deleted successfully!");
//       setTimeout(() => window.location.reload(), 1000);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!employee) return <div>No employee details available.</div>;

//   return (
//     <div className="container">
//       <h2>Employee Details Updation</h2>
//       <div className="details-container">
//       <div className="image-container">
//   <img
//     src={`http://localhost:8081/${employee.photographPath}`}
//     alt=""
//     className="photograph"
//   />
//   {/* Fallback when the image is not found */}
//   {!employee.photographPath && (
//   <>
//   <div className="fallback-text">
//     {employee.firstName} {employee.lastName} - Profile Image
//   </div>
//   </>
//   )}
// </div>

//   {employee.photographPath && (
//     <>
//       <button onClick={handleDeleteImage} className="delete-button">
//         Delete Image
//       </button>
//     </>
//   )}
// {/* </div> */}


//         <div className="info">
//           <div className="form-group">
//             <label htmlFor="title"><strong>Title:</strong></label>
//             <input
//               type="text"
//               id="title"
//               value={employee.title}
//               onChange={handleInputChange}
//               className="input"
//             />
//           </div>
//           <div className="form-group">
//           {error && <div className="error">{error}</div>}
//             <label htmlFor="firstName"><strong>First Name:</strong></label>
//             <input
//               type="text"
//               id="firstName"
//               value={employee.firstName}
//               onChange={handleInputChange}
//               className="input"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName"><strong>Last Name:</strong></label>
//             <input
//               type="text"
//               id="lastName"
//               value={employee.lastName}
//               onChange={handleInputChange}
//               className="input"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="department"><strong>Department:</strong></label>
//             <input
//               type="text"
//               id="department"
//               value={employee.department}
//               readOnly
//               className="input"
//             />
//           </div>

//           <div>
//             <p><strong>Courses:</strong></p>
//             <ul>
//               {employee.courseNames && employee.courseNames.length > 0 ? (
//                 employee.courseNames.map((courseName, index) => (
//                   <li key={index}>{courseName}</li>
//                 ))
//               ) : (
//                 <li>No courses available</li>
//               )}
//             </ul>
//           </div>

//           <div className="form-group">
//             <label htmlFor="imageUpload"><strong>Upload Profile Image:</strong></label>
//             <input
//               type="file"
//               accept="image/png, image/jpeg"
//               onChange={handleImageUpload}
//               className="input"
//             />
//           </div>

//           {selectedFile && (
//             <div className="preview-container">
//               <img src={preview} alt="Preview" className="preview-image" />
//               <button onClick={saveImage} className="button">
//                 Save Image
//               </button>
//             </div>
//           )}

//           <div className="update-button-container">
//             <button onClick={handleUpdate} className="button">
//               Update
//             </button>
//           </div>

//           {successMessage && <div className="success">{successMessage}</div>}
//           {error && <div className="error">{error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetails;
import React from "react";
import useEmployeeDetails from "../hooks/useEmployeeDetails";
import { updateEmployeeDetails, uploadImage, deleteImage } from "../utils/apiUtils";
import "../css/EmployeeDetails.css";

const EmployeeDetails = () => {
  const {
    employee,
    setEmployee,
    loading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    selectedFile,
    setSelectedFile,
    preview,
    setPreview,
    navigate,
  } = useEmployeeDetails();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    // Validate first name and last name
    if (!employee.firstName || !employee.lastName || !employee.title) {
      setError("First Name and Last Name cannot be empty.");
    } else {
      setError(null); // Clear the error if fields are valid
    }

    try {
      await updateEmployeeDetails(employee, token);
      setSuccessMessage("Employee details updated successfully!");
      // setTimeout(() => setSuccessMessage(null), 3000);
      setTimeout(() => {
        setSuccessMessage(null);
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(null);
    setPreview(null);
    
    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setSelectedFile(null);
      setPreview(null); 
      setError("File size must be less than 5MB.");
      
      
      e.target.value = "";
      setTimeout(() => {
        setError(null);
      }, 2000); 
      // Clear preview as well
      // Exit early if file is invalid
      return;

    }
    else{
      setError(null);
    }
   
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveImage = async () => {
    const token = sessionStorage.getItem("token");

    if (!selectedFile) {
      console.error("Please select an image to upload.");
      return;
    }

    try {
      await uploadImage(selectedFile, token);
      setSuccessMessage("Image uploaded successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  const handleDeleteImage = async () => {
    const token = sessionStorage.getItem("token");

    try {
      await deleteImage(token);
      setSuccessMessage("Image deleted successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>No employee details available.</div>;

  return (
    <div className="container">
      <h2>Employee Details Updation</h2>
      <div className="details-container">
        <div className="image-container">
          <img
            src={`http://localhost:8081/${employee.photographPath}`}
            alt=""
            className="photograph"
          />
          {!employee.photographPath && (
            <div className="fallback-text">
              {employee.firstName} {employee.lastName} - Profile Image
            </div>
          )}
        </div>

        {employee.photographPath && (
          <button onClick={handleDeleteImage} className="delete-button">
            Delete Image
          </button>
        )}

        <div className="info">
          <div className="form-group">
            <label htmlFor="title"><strong>Title:</strong></label>
            <input
              type="text"
              id="title"
              value={employee.title}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="form-group">
            {error && <div className="error">{error}</div>}
            <label htmlFor="firstName"><strong>First Name:</strong></label>
            <input
              type="text"
              id="firstName"
              value={employee.firstName}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName"><strong>Last Name:</strong></label>
            <input
              type="text"
              id="lastName"
              value={employee.lastName}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department"><strong>Department:</strong></label>
            <input
              type="text"
              id="department"
              value={employee.department}
              readOnly
              className="input"
            />
          </div>

          <div>
            <p><strong>Courses:</strong></p>
            <ul>
              {employee.courseNames && employee.courseNames.length > 0 ? (
                employee.courseNames.map((courseName, index) => (
                  <li key={index}>{courseName}</li>
                ))
              ) : (
                <li>No courses available</li>
              )}
            </ul>
          </div>

          <div className="form-group">
            <label htmlFor="imageUpload"><strong>Upload Profile Image:</strong></label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              className="input"
            />
          </div>

          {selectedFile && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
              <button onClick={saveImage} className="button">
                Save Image
              </button>
            </div>
          )}

         {!error && (
  <div className="update-button-container">
    <button onClick={handleUpdate} className="button">
      Update
    </button>
  </div>
)}


          <div>
  {error && <div className="error">{error}</div>}
  {!error && successMessage && <div className="success">{successMessage}</div>}
</div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

