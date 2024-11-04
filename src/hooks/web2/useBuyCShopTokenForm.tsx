import buyCshopTokenSchema, {
	TBuyCShopTokenProps,
} from "@/validations/buyCshopTokenValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useBuyCshopToken from "../web3/useBuyCshopToken";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useBuyCshopTokenForm() {
	const form = useForm<TBuyCShopTokenProps>({
		resolver: zodResolver(buyCshopTokenSchema),
		defaultValues: {
			amount: "0",
			currencyType: "BNB",
		},
	});

	const { buyCshopToken, isPending, isSuccess } = useBuyCshopToken();

	const searchParams = useSearchParams();

	const referralCode = searchParams.get("referral");

	const onSubmit = useCallback(
		async (values: TBuyCShopTokenProps) => {
			await buyCshopToken({
				amount: Number(values.amount),
				token: values.currencyType,
				referralCode: referralCode ?? undefined,
			});
		},
		[buyCshopToken, referralCode]
	);

	return { onSubmit, isPending, isSuccess, form };
}
