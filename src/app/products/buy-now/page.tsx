/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BuyCard from "@/components/products/BuyCard";
import ProductPagination from "@/components/products/shared/productPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store";
import { useEffect } from "react";
import { Suspense } from "react";

const PAGINATION_CONSTANT = 12;

const Productpage = () => {
	const searchParams = useSearchParams();
	const searchTerm = useUserStore((state) => state.searchTerm);
	const selectedCategory = useUserStore((state) => state.selectedCategory); // Get selected category from store

	const pageParam = searchParams.get("page");
	const currentPage = pageParam ? parseInt(pageParam) : 1;

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ["products", searchTerm, selectedCategory],
		queryFn: async () => {
			let endpoint = "";

			// Determine the API endpoint based on search term or category
			if (searchTerm) {
				endpoint = `/fixedProduct/search?query=${searchTerm}`;
			} else if (selectedCategory) {
				endpoint = `/product/by-category/${selectedCategory}`;
			} else {
				endpoint = "/fixedProduct/getAll";
			}

			const response = await HttpRequestService.fetchApi<IProduct[]>(endpoint);
			return response;
		},
		enabled: true,
		staleTime: Infinity,
	});

	useEffect(() => {
		// Refetch whenever the component mounts (initial load)

		refetch();
	}, [refetch]);

	useEffect(() => {
		if (!searchTerm && !selectedCategory) {
			// Refetch to get all products if both search term and category are empty
			refetch();
		}
	}, [searchTerm, selectedCategory, refetch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error || !data) {
		return <div>Oops, something went wrong...</div>;
	}

	// Default to an empty array if data.data is undefined
	const products = data?.data || [];

	if (products.length < 1) {
		return (
			<div>Seems like there are no products available at the moment...</div>
		);
	}

	const totalPages = Math.ceil(products.length / PAGINATION_CONSTANT);
	const startIndex = (currentPage - 1) * PAGINATION_CONSTANT;
	const endIndex = startIndex + PAGINATION_CONSTANT;
	const paginatedProducts = products.slice(startIndex, endIndex);

	return (
		<section className="space-y-8 py-8">
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
				{paginatedProducts.map((product) => (
					<Link
						key={product._id}
						href={`/itemDetails/${product._id}`}
					>
						<BuyCard
							id={product._id}
							productPrice={product.price + product.shippingCharges}
							productName={product.name}
							productImage={product.images[0]}
							currencyType={product.currencyType}
							stock={product.stock}
						/>
					</Link>
				))}
			</div>
			<ProductPagination
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</section>
	);
};

const page = () => (
	<Suspense fallback={<div>Loading page...</div>}>
		<Productpage />
	</Suspense>
);

export default page;
