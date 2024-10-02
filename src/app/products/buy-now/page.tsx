"use client";

import AuctionCard from "@/components/products/auction/AuctionCard";
import ProductPagination from "@/components/products/shared/productPagination";
import Link from "next/link";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const PRODUCT_DETAIL: {
  productName: string;
  productPrice: number;
  auctionDeadline: Date;
  productImage: string;
}[] = [
  {
    productName: "Product 1",
    productPrice: 100,
    auctionDeadline: new Date("2024-12-16T00:00:00"),
    productImage: "/images/products/auction/watch.png",
  },
  {
    productName: "Product 1",
    productPrice: 100,
    auctionDeadline: new Date("2024-12-16T00:00:00"),
    productImage: "/images/products/auction/bag.png",
  },
  {
    productName: "Product 1",
    productPrice: 100,
    auctionDeadline: new Date("2024-12-16T00:00:00"),
    productImage: "/images/products/auction/shoes.png",
  },
  {
    productName: "Product 1",
    productPrice: 100,
    auctionDeadline: new Date("2024-12-16T00:00:00"),
    productImage: "/images/products/auction/cap.png",
  },
  {
    productName: "Product 1",
    productPrice: 100,
    auctionDeadline: new Date("2024-12-16T00:00:00"),
    productImage: "/images/products/auction/chair.png",
  },
  {
    productName: "Product 1",
    productPrice: 100,
    auctionDeadline: new Date("2024-12-16T00:00:00"),
    productImage: "/images/products/auction/bottle.png",
  },
];

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const productsPerPage = 6;
  const totalPages = Math.ceil(PRODUCT_DETAIL.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productList = PRODUCT_DETAIL.slice(startIndex, endIndex);

  // const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    if (page < 1) {
      router.push(`${pathname}?page=1`);
    } else if (page > totalPages) {
      router.push(`${pathname}?page=${totalPages}`);
    }
  }, [page, pathname, router, totalPages]);

  return (
    <section className="space-y-8 py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
        {productList.map(
          (
            { auctionDeadline, productImage, productName, productPrice },
            index
          ) => {
            return (
              <Link key={index} href={`/itemDetails`}>
                <AuctionCard
                  auctionDeadline={auctionDeadline}
                  productImage={productImage}
                  productName={productName}
                  productPrice={productPrice}
                />
              </Link>
            );
          }
        )}
      </div>
      <ProductPagination currentPage={page} totalPages={totalPages} />
    </section>
  );
};

export default Page;
