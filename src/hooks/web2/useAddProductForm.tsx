import TOKEN_ADDRESS, { TCurrencyType } from "@/constants/tokenAddress";
import { useCreateProduct } from "@/hooks";
import { useUserStore } from "@/store";
import { productValidationSchema } from "@/validations/productValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../use-toast";

export default function useAddProductForm() {
	const { user } = useUserStore();

	const currencyType = (Object.keys(TOKEN_ADDRESS) as TCurrencyType[]).map(
		(label) => ({
			label,
			tokenAddress: TOKEN_ADDRESS[label],
		})
	);

	const form = useForm<z.infer<typeof productValidationSchema>>({
		resolver: zodResolver(productValidationSchema),
		defaultValues: {
			sellerId: user?._id,
			currencyType: currencyType[0].label,
			shippingType: "GLOBAL",
			stock: "0",
			shippingDuration: "0",
			shippingCharges: "0",
			productAddress: "India",
			price: "0",
			name: "",
			images: [],
			description: "",
			category: "",
		},
	});

	const { addProduct, isLoading } = useCreateProduct(
		user?.walletAddress ?? "0x0000000000000000000000000000000000000000"
	);

	async function onSubmit(
		values: z.infer<typeof productValidationSchema>,
		productDetails: string
	) {
		// Convert values to FormData
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

		formData.append("details", productDetails);
		formData.append("currencyAddress", TOKEN_ADDRESS[values.currencyType]);
		console.log(formData.getAll("images"));
		try {
			await addProduct(formData);
		} catch {
			toast({
				title: "There was a problem while creating product",
				description: "Please try again later",
				variant: "destructive",
			});
		}
	}

	return { form, onSubmit, isLoading };
}
