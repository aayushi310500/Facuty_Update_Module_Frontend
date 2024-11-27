import React, { useState } from "react";

const FileUploadAndDisplay = () => {
  const [selectedFile, setSelectedFile] = useState(null); // To store the file
  const [preview, setPreview] = useState(null); // To store the file preview

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); // Set the preview after file is read
      };
      reader.readAsDataURL(file); // Read file as a data URL for preview
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload and Preview File</h2>
      <div style={styles.uploadSection}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        {selectedFile && (
          <div style={styles.fileInfo}>
            <p>
              <strong>Selected File:</strong> {selectedFile.name}
            </p>
            <p>
              <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>
      {preview && (
        <div style={styles.previewSection}>
          <p><strong>Preview:</strong></p>
          <img src={preview} alt="Preview" style={styles.imagePreview} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "20px",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  uploadSection: {
    marginBottom: "20px",
  },
  fileInput: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
  },
  fileInfo: {
    marginTop: "10px",
    textAlign: "left",
  },
  previewSection: {
    marginTop: "20px",
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};

export default FileUploadAndDisplay;
