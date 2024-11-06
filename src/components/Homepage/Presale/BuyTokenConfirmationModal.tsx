import { Button, ButtonProps } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import useBuyCshopToken from "@/hooks/web3/useBuyCshopToken";
import useGetPaymentInfo from "@/hooks/web3/useGetPaymentInfo";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function BuyTokenConfirmationModal({
	amount,
	token,
	refetchBnb,
	refetchCshop,
	refetchUsdt,
	...props
}: IProps) {
	const { cshopToken, isLoading, refetch } = useGetPaymentInfo({
		amount,
		token,
	});

	const { buyCshopToken, isPending, isSuccess } = useBuyCshopToken();

	const searchParams = useSearchParams();

	const referralCode = searchParams.get("referral");

	function handleConfirm() {
		buyCshopToken({
			amount: Number(amount),
			token,
			referralCode: referralCode ?? undefined,
		});
	}
	useEffect(() => {
		refetch();
		if (isSuccess) {
			refetchBnb();
			refetchCshop();
			refetchUsdt();
		}
	}, [
		amount,
		token,
		refetch,
		isSuccess,
		refetchBnb,
		refetchCshop,
		refetchUsdt,
	]);
	return (
		<Dialog>
			<DialogTrigger
				className="w-full"
				asChild
			>
				<Button
					{...props}
					className="gradient-button"
				>
					Buy
				</Button>
			</DialogTrigger>
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
							{/* {isSuccess ? (
								<p className="text-secondary">Thanks for purchasing CSHOP!!!</p>
							) :*/}
							{isPending ? (
								<p className="text-yellow-400">
									Warning: Please do not refresh the page or close this modal
									while the transaction is being processed.
								</p>
							) : (
								<p>
									Please confirm to complete your purchase. Your tokens will be
									added to your wallet shortly after the transaction is
									finalized!
								</p>
							)}
						</div>
						<Button
							className="gradient-button"
							onClick={handleConfirm}
							disabled={isPending}
						>
							{isPending ? "Buying..." : "Confirm"}
						</Button>
						{/* <Show when={isSuccess}>
							<DialogClose asChild>
								<Button
									type="button"
									className="bg-secondary hover:bg-secondary"
									// onClick={() => {
									// 	setIsSuccess(false);
									// }}
								>
									Close
								</Button>
							</DialogClose>
						</Show> */}
					</form>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button
								type="button"
								variant={"destructive"}
							>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
}

interface IProps extends ButtonProps {
	token: "USDT" | "BNB";
	amount: string;
	refetchBnb: () => void;
	refetchCshop: () => void;
	refetchUsdt: () => void;
}
