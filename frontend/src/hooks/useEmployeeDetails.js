// hooks/useEmployeeDetails.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useEmployeeDetails = () => {
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
      const token = sessionStorage.getItem("token");

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

  return {
    employee,
    setEmployee,
    loading,
    error,
    successMessage,
    setSuccessMessage,
    selectedFile,
    setSelectedFile,
    preview,
    setPreview,
    navigate,
  };
};

export default useEmployeeDetails;
