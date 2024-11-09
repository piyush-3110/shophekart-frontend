import useGetUserTokenBalance from "@/hooks/web3/useGetUserBalance";
import { useUserStore } from "@/store";
import dynamic from "next/dynamic";
const ShowUserBalanceContainer = dynamic(
	() => import("./ShowUserBalanceContainer"),
	{
		ssr: false,
	}
);

export default function ShowUserBalancePresenter() {
	const { user } = useUserStore();
	const { cshopBalance, isLoading, isError } = useGetUserTokenBalance(
		user?.walletAddress
	);

	return (
		<ShowUserBalanceContainer
			userWalletAddress={user?.walletAddress}
			isLoading={isLoading}
			balance={cshopBalance}
			isError={isError}
		/>
	);
}
