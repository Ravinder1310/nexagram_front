import React, { useState } from 'react';

const UploadGallery = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedFiles(fileArray);
  };

  return (
    <div className="upload-gallery pt-20">
        <h1>Gallery</h1>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        className=""
        id="gallery-upload"
      />
      <label htmlFor="gallery-upload" className="cursor-pointer">
        <div className="upload-button">Select Files</div>
      </label>
      <div className="gallery-preview grid grid-cols-3 gap-4 mt-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="image-item">
            <img src={file} alt={`file-preview-${index}`} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadGallery;
