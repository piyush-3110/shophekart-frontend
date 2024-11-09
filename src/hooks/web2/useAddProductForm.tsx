import TOKEN_ADDRESS, { TCurrencyType } from "@/constants/tokenAddress";
import { useUserStore } from "@/store";
import useProductStore from "@/store/addProductStore";
import {
	ProductFormValues,
	productValidationSchema,
} from "@/validations/productValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useMemo } from "react";

export default function useAddProductForm() {
	const { user } = useUserStore();
	const { setProductData } = useProductStore();

	const currencyType = (Object.keys(TOKEN_ADDRESS) as TCurrencyType[]).map(
		(label) => ({
			label,
			tokenAddress: TOKEN_ADDRESS[label],
		})
	);

	const defaultValues: ProductFormValues = useMemo(
		() => ({
			sellerId: user?._id ?? "",
			currencyType: currencyType[1].label,
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
		}),
		[user, currencyType]
	);

	const form = useForm<z.infer<typeof productValidationSchema>>({
		resolver: zodResolver(productValidationSchema),
		defaultValues,
	});

	const onSubmit = useCallback(
		async (
			values: z.infer<typeof productValidationSchema>,
			productDetails: string
		) => {
			setProductData({ ...values, productDetails });
		},
		[setProductData]
	);

	return useMemo(() => ({ form, onSubmit }), [form, onSubmit]);
}
