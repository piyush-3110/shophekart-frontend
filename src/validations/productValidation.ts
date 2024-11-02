// productValidation.ts
import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  productAddress: z.string().min(1, { message: "Product address is required" }),
  details: z.string().min(1, { message: "Details are required" }),
  category: z.string().uuid({ message: "Category ID must be valid" }),
  currencyType: z.enum(["USDT", "USDC", "CSHOP", "BNB"],{
    required_error: "Currency type is required.",
    invalid_type_error: "Currency type is invalid."
  }),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, { message: "Stock cannot be negative" }),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price must be at least 0" }),
  shippingCharges: z
    .number({ invalid_type_error: "Shipping charges must be a number" })
    .min(0, { message: "Shipping charges cannot be negative" }),
  shippingDuration: z
    .number({ invalid_type_error: "Shipping duration must be a number" })
    .min(1, { message: "Shipping duration must be at least 1 day" }),
  shippingType: z.enum(["LOCAL", "GLOBAL"],{
    required_error: "Shippingtype is required.",
    invalid_type_error: "Shipping must be either LOCAL or GLOBAL.",
  }),
  images: z
    .array(z.instanceof(File), { required_error: "At least one image is required" })
    .min(1, { message: "At least one image is required" })
    .max(5, { message: "A maximum of 5 images is allowed" }),
  sellerId: z
    .string()
    .uuid({ message: "Seller ID must be valid" }),
});

export type ProductFormValues = z.infer<typeof productValidationSchema>;
