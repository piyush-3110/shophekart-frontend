"use client";

import {
  OrderSummary,
  ProductItem,
  ProductQuantity,
} from "@/components/checkout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CloseIcon } from "@/icons";
import { ICartItem } from "@/types";
import Link from "next/link";
import { useState } from "react";

/**
 * Functional component representing the checkout page.
 * Displays a list of items in the shopping cart with options to update quantities and delete items.
 * Utilizes internal state to manage cart items and provides interactive user interface elements.
 */

const Page = () => {
  const CART_ITEMS: ICartItem[] = [
    {
      productName: "Camera Sling Bag",
      category: "Bags",
      productImage: "/images/products/auction/bag.png",
      price: 120,
      quantity: 3,
      shippingType: "global shipping",
    },
    {
      productName: "Wireless Headphones",
      category: "Electronics",
      productImage: "/images/products/auction/bag.png",
      price: 80,
      quantity: 2,
      shippingType: "global shipping",
    },
    {
      productName: "Leather Wallet",
      category: "Wallets",
      productImage: "/images/products/auction/bag.png",
      price: 50,
      quantity: 1,
      shippingType: "local shipping",
    },
    {
      productName: "Vintage Watch",
      category: "Watches",
      productImage: "/images/products/auction/bag.png",
      price: 200,
      quantity: 1,
      shippingType: "global shipping",
    },
    {
      productName: "Portable Power Bank",
      category: "Electronics",
      productImage: "/images/products/auction/bag.png",
      price: 30,
      quantity: 2,
      shippingType: "local shipping",
    },
    {
      productName: "Gaming Mouse",
      category: "Computer Accessories",
      productImage: "/images/products/auction/bag.png",
      price: 60,
      quantity: 1,
      shippingType: "global shipping",
    },
  ];

  const [items, setItems] = useState(CART_ITEMS);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  const handleDeleteItem = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return (
    <main className="mt-4 py-10">
      <h1 className="bg-[#F4F6FA] text-center text-3xl font-semibold py-7">
        Checkout
      </h1>
      <section className="px-4 lg:px-36 mt-12 space-y-10">
        <div className="mt-8 flex gap-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center text-center mx-auto">
              <p className="text-lg font-medium mb-4">Your cart is empty.</p>
              <p className="text-base text-gray-600 mb-6">
                Don&apos;t worry, it happens! Head over to our store to find
                some amazing products to fill your cart!
              </p>
              <Link
                href="/products/auction"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm"
              >
                Visit our store
              </Link>
            </div>
          ) : (
            <Table>
              <TableCaption className="sr-only">
                Your Shopping Cart
              </TableCaption>
              <TableHeader>
                <TableRow className="text-gray-600 text-left text-sm font-bold">
                  <TableHead className="py-2 px-2">Item</TableHead>
                  <TableHead className="py-2 px-2">Unit price</TableHead>
                  <TableHead className="py-2 px-2">Quantity</TableHead>
                  <TableHead className="py-2 px-2">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="py-7 font-medium">
                        <ProductItem
                          className="w-full p-2"
                          category={item.category}
                          productImage={item.productImage}
                          productName={item.productName}
                          shippingType={item.shippingType}
                        />
                      </TableCell>
                      <TableCell className="p-2 text-left">
                        {item.price.toFixed(2)} CSHOP
                      </TableCell>
                      <TableCell className="p-2 text-left">
                        <ProductQuantity
                          initialValue={item.quantity}
                          inputType="number"
                          min={1}
                          onChange={(newQuantity) =>
                            handleQuantityChange(index, newQuantity)
                          }
                        />
                      </TableCell>
                      <TableCell className="p-2 text-left relative">
                        <button
                          aria-label="delete"
                          type="button"
                          onClick={() => handleDeleteItem(index)}
                          className="absolute right-2 top-2"
                        >
                          <CloseIcon />
                        </button>
                        <span>
                          {(item.quantity * item.price).toFixed(2)} CSHOP
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          {items.length > 0 && <OrderSummary items={items} />}
        </div>
      </section>
    </main>
  );
};

export default Page;
