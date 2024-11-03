import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";
import customToast from "@/utils/toasts";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProductOnChainId() {
	const { mutateAsync, ...props } = useMutation({
		async mutationFn({
			onChainId,
			productId,
		}: {
			onChainId: string;
			productId: string;
		}) {
			const response = await HttpRequestService.updateApi<
				IProduct,
				{ onChainId: number; productId: string }
			>(`/product/${productId}/update-on-chain-id`, {
				onChainId: Number(onChainId),
				productId,
			});

			return response.data;
		},
	});

	async function updateProductOnChainId({
		onChainId,
		productId,
	}: {
		onChainId: string;
		productId: string;
	}) {
		await mutateAsync({ onChainId, productId });
	}

	return { updateProductOnChainId, ...props };
}
