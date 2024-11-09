import Loader from "@/components/shared/Loader";
import Show from "@/components/shared/Show";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useBuyCshopToken from "@/hooks/web3/useBuyCshopToken";
import useGetPaymentInfo from "@/hooks/web3/useGetPaymentInfo";
import { useSearchParams } from "next/navigation";

export default function BuyTokenConfirmationModal({
	amount,
	token,
	refetchBnb,
	refetchCshop,
	refetchUsdt,
	setIsModalOpen,
	isModalOpen,
}: IProps) {
	const { cshopToken, isLoading } = useGetPaymentInfo({
		amount,
		token,
	});

	const {
		buyCshopToken,
		isPending,
		isSuccess,
		setIsSuccess,
		isApproveLoading,
		isBuyTokenLoading,
	} = useBuyCshopToken();

	const searchParams = useSearchParams();

	const referralCode = searchParams.get("referral");

	async function handleConfirm() {
		await buyCshopToken({
			amount: Number(amount),
			token,
			referralCode: referralCode ?? undefined,
		});
		refetchBnb();
		refetchCshop();
		refetchUsdt();
	}
	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={(open) => {
				setIsModalOpen(open);
				setIsSuccess(false);
			}}
		>
			{isLoading || !cshopToken ? (
				<DialogContent className="sm:max-w-md">
					<DialogTitle>
						<div className="h-4 w-80 bg-gray-200 animate-pulse rounded-full"></div>
					</DialogTitle>
					<p>Loading...</p>
				</DialogContent>
			) : (
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>You transaction details</DialogTitle>
						<DialogDescription>
							Congratulations! 🎉 {"You're about to receive"}{" "}
							{Number(cshopToken).toFixed(2)} CSHOP tokens.
						</DialogDescription>
					</DialogHeader>
					<form className="grid gap-4 py-4">
						<div>
							<Show when={isSuccess}>
								<p className="text-secondary">Thanks for purchasing CSHOP!!!</p>
							</Show>
							<Show when={!isSuccess && isPending}>
								<div className="flex items-center justify-center size-20 mx-auto">
									<Loader variant="secondary" />
								</div>
								<div className="flex flex-col gap-2">
									<Show when={isApproveLoading}>
										<p className="text-gray-500">
											Please approve the transaction for usdt transfer in
											metamask
										</p>
									</Show>
									<Show when={isBuyTokenLoading}>
										<p className="text-gray-500">
											Please confirm the transaction for buying cshop token in
											metamask
										</p>
									</Show>
									<Show
										when={
											!isApproveLoading &&
											!isBuyTokenLoading &&
											!isSuccess &&
											isPending
										}
									>
										<p className="text-gray-500">
											Waiting for transaction to be confirmed on blockchain
										</p>
									</Show>
									<p className="text-red-400 text-sm">
										* Please do not refresh the page or close this modal while
										the transaction is being processed.
									</p>
								</div>
							</Show>
							<Show when={!isPending && !isSuccess}>
								<p className="text-sm text-gray-500">
									Please confirm to complete your purchase. Your tokens will be
									added to your wallet shortly after the transaction is
									finalized!
								</p>
							</Show>
						</div>
						<Show when={!isSuccess}>
							<Button
								className="gradient-button"
								onClick={handleConfirm}
								disabled={isPending}
							>
								{isPending ? "Buying..." : "Confirm"}
							</Button>
						</Show>
						<Show when={isSuccess}>
							<DialogClose asChild>
								<Button
									type="button"
									className="bg-secondary hover:bg-secondary"
								>
									Close
								</Button>
							</DialogClose>
						</Show>
					</form>
				</DialogContent>
			)}
		</Dialog>
	);
}

interface IProps {
	token: "USDT" | "BNB";
	amount: string;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isModalOpen: boolean;
	refetchBnb: () => void;
	refetchCshop: () => void;
	refetchUsdt: () => void;
}
