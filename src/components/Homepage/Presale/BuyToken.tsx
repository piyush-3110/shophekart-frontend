import React, { useEffect, useState } from "react";
import ConnectButton from "../Hero/Navbar/ConnectButton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useBuyCshopTokenForm from "@/hooks/web2/useBuyCShopTokenForm";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useGetUserTokenBalance from "@/hooks/web3/useGetUserBalance";
import { useUserStore } from "@/store";

export const BuyToken: React.FC = () => {
	const { isPending, isSuccess, onSubmit, form } = useBuyCshopTokenForm();

	const { user } = useUserStore();

	const {
		bnbBalance,
		usdtBalance,
		isLoading,
		isError,
		refetchBnb,
		refetchCshop,
		refetchUsdt,
	} = useGetUserTokenBalance(user?.walletAddress);

	const handleMaxAmount = () => {
		if (
			(form.getValues("currencyType") === "BNB" ||
				form.getValues("currencyType") === "USDT") &&
			!isLoading &&
			!isError &&
			!!bnbBalance &&
			!!usdtBalance
		) {
			form.getValues("currencyType") === "BNB" &&
				form.setValue("amount", bnbBalance);

			form.getValues("currencyType") === "USDT" &&
				form.setValue("amount", usdtBalance);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			form.reset;
			refetchBnb();
			refetchCshop();
			refetchUsdt();
		}
	}, [isSuccess]);

	return (
		<div className="flex flex-col gap-4 bg-white w-full max-w-md">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-2"
				>
					<div className="flex flex-row gap-4">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex w-[80%] relative">
											<Input
												type="number"
												placeholder="E.g. 10"
												className="px-4 py-2 border w-full text-sm border-gray-300 rounded-md text-black placeholder-[#c7bfbf] focus:outline-none focus:ring-1 focus:ring-blue-500"
												{...field}
												disabled={isPending}
											/>
											<button
												type="button"
												onClick={handleMaxAmount}
												className="text-[#0246FF] font-400 text-[1rem] !text-sm absolute right-3 top-1/2 transform -translate-y-1/2"
											>
												Max
											</button>
										</div>
									</FormControl>
									<FormDescription>
										Please enter the amount of tokens you want to buy with.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="currencyType"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isPending}
									>
										<FormControl>
											<SelectTrigger className="w-min">
												<SelectValue placeholder="Please Select Token" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={"BNB"}>{"BNB"}</SelectItem>
											<SelectItem value={"USDT"}>{"USDT"}</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Select the token you want to buy with
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						className="gradient-button"
						type="submit"
						disabled={isPending}
					>
						{isPending ? "Buying..." : "Buy"}
					</Button>
				</form>
			</Form>
		</div>
	);
};
