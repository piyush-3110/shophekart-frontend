"use client";

import ProductCreateConfirmationModal from "@/components/addProduct/ProductCreateConfirmationModal";
import { HypeModal } from "@/components/Form/HypeModal";
import RichTextEditor from "@/components/Form/RichTextEditor";
import UploadImage from "@/components/Form/UploadImage";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TOKEN_ADDRESS, { TCurrencyType } from "@/constants/tokenAddress";
import { useCreateProduct } from "@/hooks";
import useAddProductForm from "@/hooks/web2/useAddProductForm";
import { HttpRequestService } from "@/services";
import { useUserStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Country } from "country-state-city";
import { useCallback, useMemo, useState } from "react";

const Page = () => {
	const [productDetails, setProductDetails] = useState<string>("");
	const [isHypeModalOpen, setIsHypeModalOpen] = useState(false);

	const countries = useMemo(
		() =>
			Country.getAllCountries().map(({ name }) => ({
				label: name,
				value: name,
			})),
		[]
	);

	const currencyType = (Object.keys(TOKEN_ADDRESS) as TCurrencyType[]).map(
		(label) => ({
			label,
			tokenAddress: TOKEN_ADDRESS[label],
		})
	);

	const { data: categories, isLoading: categoryLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await HttpRequestService.fetchApi<ICategoryDocument[]>(
				"/category/all"
			);
			return response.data;
		},
	});

	const { form, onSubmit } = useAddProductForm();

	const handleFileSelect = useCallback(
		(files: File[]) => form.setValue("images", files),
		[form]
	);

	const { user } = useUserStore();

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

	const { addProduct, isLoading, isProductCreateSuccess } = useCreateProduct(
		user?.walletAddress ?? "0x0000000000000000000000000000000000000000"
	);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="p-8 w-[95vw] md:w-[80vw] my-10 mx-auto bg-white shadow-lg rounded-lg prose-sm">
				<h1 className="font-medium">Add Product</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(async (values) => {
							await onSubmit(values, productDetails);

							setIsConfirmModalOpen(true);
						})}
						className="space-y-8"
					>
						{/* Product name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input
											placeholder="E.g. Smart Watch"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormDescription>This is your product name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Product description */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Description</FormLabel>
									<FormControl>
										<Textarea
											rows={5}
											placeholder="Write your description here"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormDescription>
										This is your product description.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Country */}
						<FormField
							control={form.control}
							name="productAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isLoading}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder={"Select a product country"} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{countries?.map((country, index) => (
												<SelectItem
													key={index}
													value={country.value}
												>
													{country.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Please enter the country where your product will be shipped
										from.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Product details */}
						<div className={"space-y-4"}>
							<RichTextEditor
								label="Product Details"
								onChange={(details) => {
									setProductDetails(details);
								}}
								value={productDetails}
							/>
							<Button
								type="button"
								className="gradient-button !px-4 !py-2"
								onClick={() => {
									setIsHypeModalOpen(true);
								}}
								disabled={isLoading}
							>
								AIShophee
							</Button>
						</div>

						{/* Category */}
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isLoading || categoryLoading}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													placeholder={
														categoryLoading
															? "loading..."
															: "Select a product category"
													}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories?.map((category) => (
												<SelectItem
													key={category._id}
													value={category._id}
												>
													{category.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										This is your product category.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Product Images */}
						<FormField
							control={form.control}
							name="images"
							render={() => (
								<FormItem>
									<FormLabel>Product Images</FormLabel>
									<FormControl>
										<UploadImage onFileSelect={handleFileSelect} />
									</FormControl>
									<FormDescription>
										Please upload the images of the product.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							{/* Currency Type */}
							<FormField
								control={form.control}
								name="currencyType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={isLoading}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Please Select Token" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{currencyType?.map((currency) => (
													<SelectItem
														key={currency.label}
														value={currency.label}
														disabled={currency.label === "CSHOP"}
													>
														{currency.label === "CSHOP"
															? "CSHOP (coming soon)"
															: currency.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Select the token you want to receive payment in.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Stock */}
							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Stock</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="50"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Please enter the stock of the product.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Price */}
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="50"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Please enter the price of the product.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Shipping Charges */}
							<FormField
								control={form.control}
								name="shippingCharges"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Shipping Charges</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="50"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Please enter the shipping charges of the product.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Shipping Type */}
							<FormField
								control={form.control}
								name="shippingType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Shipping Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={isLoading}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Please Select Token" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={"GLOBAL"}>{"Global"}</SelectItem>
												<SelectItem value={"LOCAL"}>{"Local"}</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
											Select the whether you do Global shipping or local
											{"(your country)"} shipping only.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Shipping Duration */}
							<FormField
								control={form.control}
								name="shippingDuration"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Shipping Duration</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="50"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Please enter the shipping duration of the product in days.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							className="gradient-button w-full !text-base"
							size={"lg"}
							type="submit"
						>
							{isLoading ? "Publishing..." : "Save and publish product"}
						</Button>
					</form>
				</Form>
				<ProductCreateConfirmationModal
					addProduct={addProduct}
					isModalOpen={isConfirmModalOpen}
					setIsModalOpen={setIsConfirmModalOpen}
					isLoading={isLoading}
					isSuccess={isProductCreateSuccess}
				/>
				{/* Hype Modal */}
				{isHypeModalOpen && (
					<HypeModal
						isOpen={isHypeModalOpen}
						onClose={() => {
							setIsHypeModalOpen(false);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default Page;

type ICategoryDocument = {
	_id: string;
	label: string;
	parentCategory: string | null;
	createdAt: Date;
	updatedAt: Date;
};
