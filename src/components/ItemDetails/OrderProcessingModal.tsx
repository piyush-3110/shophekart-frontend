import Link from "next/link";
import Loader from "../shared/Loader";
import Show from "../shared/Show";
import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const OrderProcessingModal: React.FC<IProps> = ({
	orderId,
	setIsOpen,
	isOpen,
	isSuccess,
	isLoading,
}) => {
	return (
		<Dialog open={isOpen}>
			<DialogContent isCloseButton={false}>
				<DialogHeader>
					<Show when={isLoading}>
						<DialogTitle>📦 Order Processing...</DialogTitle>
						<DialogDescription>
							Your order is being processed. This may take a few minutes.
						</DialogDescription>
					</Show>
					<Show when={!isLoading && isSuccess}>
						<DialogTitle>✅ Order Processed!</DialogTitle>
						<DialogDescription>
							Your order has been successfully processed.
						</DialogDescription>
					</Show>
					<Show when={!isLoading && !isSuccess}>
						<DialogTitle>📦 Order Processing...</DialogTitle>
						<DialogDescription className="text-destructive">
							Error Processing Order
						</DialogDescription>
					</Show>
				</DialogHeader>
				<Show when={isLoading}>
					<div className="space-y-4">
						<h2 className="text-lg font-medium text-destructive">
							* Do not refresh or close this page
						</h2>
						<div className="flex items-center justify-center size-20 mx-auto">
							<Loader variant="secondary" />
						</div>
						<div className="text-sm text-gray-600 space-y-4">
							<p>Your order is being processed...</p>
							<p>
								Please don&apos;t close this window or refresh your browser
								until we&apos;re done. We&apos;ll let you know when everything
								is complete.
							</p>
						</div>
					</div>
				</Show>
				<Show when={!isLoading && isSuccess}>
					<div className="space-y-4">
						<div className="text-sm text-gray-600">
							<p>
								Thank you for your order! You can view the details of your order
								by clicking the {`"View Order"`} button below.
							</p>
						</div>
						<div className="flex gap-4 items-center">
							<Link
								className="h-9 px-4 py-2 bg-primary-gradient hover:bg-primary-gradient-reverse text-white text-sm font-medium rounded-md"
								href={`/order-detail/${orderId}`}
							>
								View Order
							</Link>
							<Button
								onClick={() => {
									setIsOpen(false);
								}}
								className="bg-secondary hover:bg-secondary-foreground"
							>
								Continue Shopping
							</Button>
						</div>
					</div>
				</Show>
				<Show when={!isSuccess && !isLoading}>
					<div className="space-y-4">
						<div className="text-sm text-gray-600">
							<p>Sorry, we encountered an issue while processing your order.</p>
							<p>
								Please try again later or contact our support team for
								assistance.
							</p>
						</div>
						<div className="flex gap-4 items-center">
							<Button
								onClick={() => {
									setIsOpen(false);
								}}
								variant={"destructive"}
							>
								Close
							</Button>
						</div>
					</div>
				</Show>
			</DialogContent>
		</Dialog>
	);
};

interface IProps {
	isLoading: boolean;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isSuccess: boolean;
	orderId?: string;
}

export default OrderProcessingModal;
