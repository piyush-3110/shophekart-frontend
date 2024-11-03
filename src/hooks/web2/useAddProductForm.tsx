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
			if (key === "images") {
				(values.images as File[]).forEach((image) => {
					formData.append(key, image);
				});
			} else {
				const value = values[key as keyof typeof values];
				if (value instanceof File || value instanceof FileList) {
					// If value is a File or a FileList, append it directly
					formData.append(key, value);
				} else {
					// Otherwise, append it as a string
					formData.append(key, String(value));
				}
			}
		});

		formData.append("details", productDetails);
		formData.append("currencyAddress", TOKEN_ADDRESS[values.currencyType]);

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
