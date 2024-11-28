import { useState, useEffect } from "react";
import { getAuthToken } from "../utils/apiClient";

export const useFetchCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = getAuthToken();

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
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, []);

  return { courses, error };
};
