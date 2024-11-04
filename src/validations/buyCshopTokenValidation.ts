import { z } from "zod";

const buyCshopTokenSchema = z.object({
	amount: z
		.string({
			required_error: "Amount is required",
		})
		.refine((amount) => Number(amount) > 0, {
			message: "Amount must be greater than 0",
		}),
	currencyType: z.enum(["BNB", "USDT"], {
		required_error: "Currency type is required",
		invalid_type_error: `Currency must be either "USDT" or "BNB"`,
	}),
});

export type TBuyCShopTokenProps = z.TypeOf<typeof buyCshopTokenSchema>;

export default buyCshopTokenSchema;
