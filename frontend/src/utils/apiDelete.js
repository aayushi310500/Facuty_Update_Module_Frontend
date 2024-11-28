const API_BASE_URL = "http://localhost:8081/api/v1";

export const fetchCourses = async (token) => {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch courses.");
  }

  return await response.json();
};

export const deleteCourse = async (courseName, token) => {
  const response = await fetch(`${API_BASE_URL}/delete_course`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ courseName }),
  });

  if(response.status === 401){
    throw new Error("Invalid token");
  }
  else if (response.status === 400) {  
    throw new Error("No courses like this found assigned to the faculty");
  } 
  
  else if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete course.");
  }
};
