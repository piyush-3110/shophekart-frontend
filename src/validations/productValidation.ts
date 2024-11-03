import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"];

export const productValidationSchema = z.object({
	name: z
		.string({
			required_error: "Product name is required",
			invalid_type_error: "Product name must be a string",
		})
		.min(1, { message: "Product name cannot be empty" })
		.max(100, { message: "Product name cannot exceed 100 characters" }),

	description: z
		.string({
			required_error: "Description is required",
			invalid_type_error: "Description must be a string",
		})
		.min(1, { message: "Description cannot be empty" })
		.max(500, { message: "Description cannot exceed 500 characters" }),

	productAddress: z
		.string({
			required_error: "Product address is required",
			invalid_type_error: "Product address must be a string",
		})
		.min(1, { message: "Product address cannot be empty" })
		.max(255, { message: "Product address cannot exceed 255 characters" }),

	category: z
		.string({
			required_error: "Category is required",
			invalid_type_error: "Category must be a string",
		})
		.min(1, { message: "Category cannot be empty" })
		.max(50, { message: "Category cannot exceed 50 characters" }),

	currencyType: z.enum(["USDT", "USDC", "CSHOP", "BNB"], {
		required_error: "Currency type is required",
		invalid_type_error: "Invalid currency type",
	}),

	stock: z
		.string({
			required_error: "Stock is required",
			invalid_type_error: "Stock must be a string",
		})
		.regex(/^\d+$/, { message: "Stock must be a positive integer" })
		.refine((stock) => Number(stock) >= 1, {
			message: "Stock cannot be less than 1",
		})
		.refine((stock) => Number(stock) <= 100000, {
			message: "Stock cannot exceed 100,000",
		}),

	price: z
		.string({
			required_error: "Price is required",
			invalid_type_error: "Price must be a number",
		})
		.refine((price) => Number(price) <= 1000000, {
			message: "Price cannot exceed 1,000,000",
		})
		.refine((price) => Number(price) > 0, `Price must be more than 0`),
	shippingCharges: z
		.string({
			required_error: "Shipping charges are required",
			invalid_type_error: "Shipping charges must be a string",
		})
		.regex(/^[\d\.]+$/, { message: "Shipping charges must be a valid number" })

		.refine((shippingCharges) => Number(shippingCharges) <= 1000000, {
			message: "Shipping charges cannot exceed 1,000,000",
		})
		.refine(
			(shippingCharges) => Number(shippingCharges) > 0,
			`Shipping charges must be more than 0`
		),

	shippingDuration: z
		.string({
			required_error: "Shipping duration is required",
			invalid_type_error: "Shipping duration must be a string",
		})
		.regex(/^\d+$/, { message: "Shipping duration must be a positive integer" })
		.refine((shippingDuration) => Number(shippingDuration) >= 1, {
			message: "Shipping duration must be at least 1 day",
		})
		.refine((shippingDuration) => Number(shippingDuration) <= 365, {
			message: "Shipping duration cannot exceed 1 year",
		}),

	shippingType: z.enum(["LOCAL", "GLOBAL"], {
		required_error: "Shipping type is required",
		invalid_type_error: "Invalid shipping type",
	}),

	images: z
		.array(z.instanceof(File))
		.min(1, { message: "At least one image is required" })
		.max(5, { message: "Maximum 5 images allowed" })
		.refine(
			(files) =>
				files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
			`Only ${ACCEPTED_IMAGE_EXTENSIONS.join(", ")} files are allowed`
		)
		.refine(
			(files) => files.every((file) => file.size <= 5 * 1024 * 1024),
			"Each image cannot exceed 5MB"
		),

	sellerId: z.string({
		required_error: "Seller ID is required",
		invalid_type_error: "Seller ID must be a string",
	}),
});

export type ProductFormValues = z.infer<typeof productValidationSchema>;
