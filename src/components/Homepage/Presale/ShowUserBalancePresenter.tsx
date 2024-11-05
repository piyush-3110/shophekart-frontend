import { useUserStore } from "@/store";
import ShowUserBalanceContainer from "./ShowUserBalanceContainer";
import useGetUserTokenBalance from "@/hooks/web3/useGetUserBalance";
import { useEffect, useState } from "react";

export default function ShowUserBalancePresenter() {
	const [isClientReady, setIsClientReady] = useState<boolean>(false);

	const { user } = useUserStore();
	const { cshopBalance, isLoading, isError } = useGetUserTokenBalance(
		user?.walletAddress
	);

	useEffect(() => {
		setIsClientReady(true);
	}, []);

	return isClientReady ? (
		<ShowUserBalanceContainer
			userWalletAddress={user?.walletAddress}
			isLoading={isLoading}
			balance={cshopBalance}
			isError={isError}
		/>
	) : (
		<span>Loading...</span>
	);
}
