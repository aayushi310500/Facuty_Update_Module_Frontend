// utils/apiUtils.js

export const updateEmployeeDetails = async (employee, token) => {
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
  };
  
  export const uploadImage = async (selectedFile, token) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
  
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
  };
  
  export const deleteImage = async (token) => {
    const response = await fetch("http://localhost:8081/api/v1/delete-image", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete the image.");
    }
  };
  