import OrderHistoryPrice from "@/components/purchaseHistory/OrderHistoryPrice";
import Show from "@/components/shared/Show";

export default function ShowUserBalanceContainer({
	userWalletAddress,
	isLoading,
	balance,
	isError,
}: TShowUserBalanceContainerProps) {
	return (
		<div suppressHydrationWarning>
			<Show when={!userWalletAddress}>
				<Text text="Please connect wallet" />
			</Show>
			<Show when={!!userWalletAddress && isLoading}>
				<Text text="loading balance..." />
			</Show>
			<Show when={!!balance}>
				<div className="flex gap-1 items-center">
					<h1 className="gradient-text py-3 !text-sm">Balance: </h1>
					<OrderHistoryPrice
						soldPrice={Number(balance)}
						currencyType="CSHOP"
						className="gradient-text "
					/>
				</div>
			</Show>
			<Show when={isError && !!userWalletAddress && !isLoading}>
				<Text text="Balance: 0 CSHOP" />
			</Show>
		</div>
	);
}

function Text({ text }: { text: string }) {
	return <p className="gradient-text py-3 !text-sm">{text}</p>;
}

type TShowUserBalanceContainerProps = {
	userWalletAddress?: `0x${string}`;
	isLoading: boolean;
	balance?: string;
	isError: boolean;
};
