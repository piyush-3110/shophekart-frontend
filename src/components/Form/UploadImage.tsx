import Image from "next/image";
import React, {
	ChangeEvent,
	FC,
	ForwardRefExoticComponent,
	RefAttributes,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Input, InputProps } from "../ui/input";
import { CloseIcon } from "@/icons";

interface UploadImageProps {
	onFileSelect?: (files: File[]) => void; // Callback to pass selected files to the parent component
}

const UploadImage: FC<UploadImageProps> = ({ onFileSelect, ...props }) => {
	const [imagePreviews, setImagePreviews] = useState<string[]>([]); // URLs for previewing images
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Keep track of all uploaded files

	useEffect(() => {
		onFileSelect && onFileSelect(uploadedFiles);
	}, [uploadedFiles]);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const newImages = Array.from(files).map((file) =>
				URL.createObjectURL(file)
			); // Create image previews
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
		<div className="flex flex-wrap gap-5 space-x-2 items-center">
			{imagePreviews.map((image, index) => (
				<div
					key={index}
					className="relative aspect-square w-28 md:w-44"
				>
					<img
						width={480}
						height={480}
						src={image}
						alt={`Product ${index}`}
						className="w-full h-full object-cover"
					/>
					<button
						type="button"
						onClick={() => handleImageDelete(index)}
						className="absolute top-0 right-0 bg-red-500 text-white hover:bg-red-700"
						style={{ transform: "translate(-30%, 20%)" }}
					>
						<CloseIcon className="hover:bg-red-700" />
					</button>
				</div>
			))}
			{imagePreviews.length <= 4 && (
				<>
					<label
						htmlFor="file-input"
						className="flex items-center justify-center w-28 md:w-44 aspect-square border border-dashed border-gray-300 rounded-lg cursor-pointer"
					>
						Upload image
					</label>
					<input
						id="file-input"
						name="file-input"
						type="file"
						className="hidden"
						onChange={handleImageUpload}
						multiple
						accept="image/jpeg,image/jpg,image/png" // Allow only images
					/>
				</>
			)}
		</div>
	);
};

export default React.memo(UploadImage);
