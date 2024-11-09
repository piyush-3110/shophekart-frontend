import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import useProductStore from "@/store/addProductStore";
import createFormData from "@/utils/createAddProductFormData";
import Show from "../shared/Show";
import Loader from "../shared/Loader";

const textOptions = [
	"Processing and publishing your listing...",
	"Please wait while we list your product...",
	"Your product is being listed on the marketplace...",
	"Publishing your listing, please be patient...",
	"Your listing is being processed, this might take a moment...",
];

const ProductCreateConfirmationModal: React.FC<IProps> = ({
	isModalOpen,
	setIsModalOpen,
	addProduct,
	isLoading,
	isSuccess,
}) => {
	const { productData, reset } = useProductStore();
	const [textIndex, setTextIndex] = useState(0);
	const [currentText, setCurrentText] = useState(textOptions[0]);

	async function onConfirm() {
		const data = createFormData({ ...productData });
		await addProduct(data);
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
		}, 30000); // 30000 milliseconds = 30 seconds

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		setCurrentText(textOptions[textIndex]);
	}, [textIndex]);

	useEffect(() => {
		if (isSuccess) {
			reset();
		}
	}, [isSuccess, reset]);

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={setIsModalOpen}
		>
			<DialogContent>
				<DialogTitle>Product Listing Confirmation</DialogTitle>
				<DialogDescription>
					Review and Confirm Product Listing
				</DialogDescription>
				<div className="space-y-4">
					<Show when={!isSuccess && !isLoading}>
						<p className="">
							Are you sure you want to list your product on the marketplace?
						</p>
					</Show>
					<Show when={isLoading}>
						<div className="flex items-center justify-center">
							<Loader />
						</div>
						<p className="text-gray-500">{currentText}</p>
						<p className="text-red-400 text-sm">
							* Please do not refresh the page or close this modal while the
							item is being listed.
						</p>
					</Show>
					<Show when={isSuccess}>
						<p className="text-secondary">
							Your product has been successfully listed on the marketplace. You
							will soon be redirected to your product listing page
						</p>
					</Show>
					<Show when={!isSuccess}>
						<Button
							onClick={onConfirm}
							disabled={isLoading}
							className="gradient-button"
						>
							{!isLoading ? "Confirm" : "Publishing..."}
						</Button>
					</Show>
				</div>
			</DialogContent>
		</Dialog>
	);
};

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	addProduct: (params: FormData) => Promise<void>;
	isSuccess: boolean;
	isLoading: boolean;
}

export default React.memo(
	ProductCreateConfirmationModal,
	(prevProps, nextProps) => {
		// Write your custom comparison function here
		// Return true if the props are equal, false otherwise
		return (
			prevProps.isModalOpen === nextProps.isModalOpen &&
			prevProps.setIsModalOpen === nextProps.setIsModalOpen &&
			prevProps.addProduct === nextProps.addProduct &&
			prevProps.isSuccess === nextProps.isSuccess &&
			prevProps.isLoading === nextProps.isLoading
		);
	}
);
