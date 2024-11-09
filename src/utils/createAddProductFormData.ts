import TOKEN_ADDRESS from "@/constants/tokenAddress";
import { IProductFormData } from "@/store/addProductStore";

// src/hooks/web2/useAddProductForm.tsx
const createFormData = (values: IProductFormData): FormData => {
	const formData = new FormData();

	Object.keys(values).forEach((key) => {
		const value = values[key as keyof typeof values];

		if (
			value instanceof File ||
			(Array.isArray(value) && value.length > 0 && value[0] instanceof File)
		) {
			// If value is a File or a non-empty array of Files, append it directly
			if (Array.isArray(value)) {
				value.forEach((file) => formData.append(key, file as Blob));
			} else {
				formData.append(key, value as Blob);
			}
		} else if (value instanceof FileList) {
			// If value is a FileList, append its files to the form data
			Array.from(value).forEach((file) => formData.append(key, file));
		} else {
			// Otherwise, append it as a string
			formData.append(key, String(value));
		}
	});

	formData.append("details", values.productDetails);
	formData.append("currencyAddress", TOKEN_ADDRESS[values.currencyType]);

	return formData;
};

export default createFormData;
