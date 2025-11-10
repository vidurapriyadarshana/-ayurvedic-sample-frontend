import React, { useState } from 'react';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

    const serverUrl = import.meta.env.VITE_SERVER_URL;
  // 1. Updates state when a file is chosen
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(null); // Clear previous image URL
    setError(null); // Clear previous error
  };

  // 2. Handles the upload button click
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    // 3. Create a FormData object
    const formData = new FormData();
    // The key "image" MUST match your backend's multer config:
    // upload.single("image")
    formData.append("image", selectedFile);

      console.log(formData.get("image"));

      console.log(formData);
    // 4. Get your auth token (you would get this from context or state)
    // !! REPLACE THIS with your actual token management !!
    const token = "YOUR AUTH_TOKEN_HERE"; // e.g., from context or localStorage
    
    if (!token) {
        setError("User is not authenticated.");
        setIsLoading(false);
        return;
    }

    try {
      // 5. Send the request
      // We use "/api/upload" because the Vite proxy will handle it
      const response = await fetch(`${serverUrl}/api/uploads/image`, {
        method: "POST",
        body: formData,
        headers: {
          // Add your authorization token
          "Authorization": `Bearer ${token}`,
          
          // --- IMPORTANT ---
          // DO NOT set the 'Content-Type': 'multipart/form-data'.
          // The browser will automatically set it, along with the
          // required 'boundary' for FormData.
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      // Success!
      console.log("Upload successful:", result);
        setImageUrl(result.data.url);
      
      console.log();  // Set the returned URL

    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Upload Image</h3>
      
      {/* File input */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        disabled={isLoading}
      />
      
      {/* Upload button */}
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {/* --- Feedback --- */}
      {error && (
        <p style={{ color: 'red' }}>Error: {error}</p>
      )}

      {imageUrl && (
        <div>
          <p>Upload successful!</p>
          <img src={imageUrl} alt="Uploaded" width="300" />
          <p>URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;