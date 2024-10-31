import Image from "next/image";
import {FC, useEffect, useState } from "react";

interface UploadImageProps {
  onFileSelect: (files: File[]) => void; // Callback to pass selected files to the parent component
}

const UploadImage: FC<UploadImageProps> = ({ onFileSelect }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // URLs for previewing images
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Keep track of all uploaded files

  useEffect(() => {
    onFileSelect(uploadedFiles);
  }, [uploadedFiles, onFileSelect]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file)); // Create image previews
      const newFileArray = Array.from(files); // Keep new files for uploading to the backend

      // Update the state with new files
      setImagePreviews([...imagePreviews, ...newImages]);
      setUploadedFiles([...uploadedFiles, ...newFileArray]);
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    const updatedUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
    setImagePreviews(updatedImages);
    setUploadedFiles(updatedUploadedFiles);
  };

  return (
    <div className="flex flex-wrap gap-5 space-x-2">
      {imagePreviews.map((image, index) => (
        <div key={index} className="relative w-28 h-28 md:w-44 md:h-44">
          <Image width={480} height={480} src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => handleImageDelete(index)}
            className="absolute top-0 right-0 px-1 bg-red-500 text-white hover:bg-red-700"
            style={{ transform: "translate(-30%, 20%)" }}
          >
            ✕
          </button>
        </div>
      ))}

      <label className="flex items-center justify-center w-28 h-28 md:w-44 md:h-44 border border-dashed border-gray-300 rounded-lg cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={handleImageUpload}
          multiple
          accept="image/*" // Allow only images
        />
        <span className="text-blue-500 text-center">Upload image</span>
      </label>
    </div>
  );
};

export default UploadImage;
