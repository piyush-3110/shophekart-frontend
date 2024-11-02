"use client";
import React, { useState } from "react";
import ItemInfoHeader from "./ItemInfoHeader";
import ItemDescriptionText from "./ItemDescriptionText";
import { TCurrencyType } from "@/types/product";
import { useUserStore } from "@/store";
import ShippingModal from "./ShippingModal";
import ConnectWalletButton from "../shared/ConnectWalletButton";
import useCreateOrder from "@/hooks/web2/useCreateOrder";
import { Button } from "../ui/button";

export const ItemDescription: React.FC<ItemDescriptionProps> = ({
    ...params
}) => {
    const { user, authStatus } = useUserStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const { createOrder, isLoading } = useCreateOrder(user?.walletAddress ?? "0x0000000000000000000000000000000000000000")

    async function handleOrderCreate(shippingAddressId: string) {
        await createOrder({ shippingAddressId, buyerId: params.buyerId, productId: params.id, productIdOnChain: params.productIdOnChain, shippingDuration: params.shippingDuration, shippingPrice: params.shippingCharges }, params.price, params.currencyType)
    }

    return (
        <div className="flex flex-col gap-3 pl-4 md:pl-0 w-[95vw] md:w-[50vw] lg:w-[40vw]">
            <ItemInfoHeader
                name={params.name}
                stock={params.stock}
                reviewCount={params.reviewCount}
                stars={params.stars}
            />
            <ItemDescriptionText description={params.description} details={params.details} />

            <div className="flex flex-col md:flex-row md:gap-6 md:items-center">
                <h1 className="text-[#160041] font-[700] text-xl">
                    {params.price} {params.currencyType}
                </h1>
                <div className="flex gap-2 items-center">
                    <p className="text-sm font-[400] text-[#6B6F93]">
                        {params.shippingType === "LOCAL" ? "Local Shipping" : "Global Shipping"}
                    </p>
                </div>
            </div>

            {authStatus === "authenticated" ? (
                <Button
                    className="gradient-button mt-3 !text-sm !w-fit"
                    onClick={handleOpenModal}
                    disabled={isLoading}
                >
                    {isLoading? "Buying...":"Buy now"}
                </Button>
            ) : (
                <ConnectWalletButton />
            )}
            {isModalOpen && (
                <ShippingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onOrderCreate={handleOrderCreate} // Pass the order creation handler
                />
            )}
        </div>
    );
};

interface ItemDescriptionProps {
    name: string;
    description: string;
    details: string;
    price: number;
    currencyType: TCurrencyType;
    buyerId: string;
    shippingDuration: number;
    stock: number;
    id: string;
    shippingType: string;
    productIdOnChain: number;
    shippingCharges: number;
    stars: number;
    reviewCount: number;
}
