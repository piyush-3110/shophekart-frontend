"use client";
import React from 'react';
import httpRequestService from "@/services/httpRequest.service";
import ItemDescription from './ItemDescription';
import ItemImage from './ItemImage';
import BuyerDetails from './BuyerDetails';
import { useQuery } from '@tanstack/react-query';

type Address = {
    state: string
    address: string
    lastName: string
    email: string
    country: string
    postalCode: string
    city: string
    firstName: string
    phoneNumber: string
}

type Buyer = {
    walletAddress: `0x${string}`
}

type Product = {
    description: string
    images: string[]
    type: "FixedProduct" | "Auction"
    category: string
    name: string
}

export type OrderStatus = "pending" | "delivering" | "delivered" | "cancelled" | "dispute";

type TOrder = {
    _id: string
    deliveryBy: Date
    soldAtPrice: number
    product: Product
    currencyType: string
    orderStatus: OrderStatus
    shippingAddress: Address
    shippingPrice: number
    buyer: Buyer
}

interface ItemDetailProps {
    orderId: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ orderId }) => {
    const { data: order, isLoading, error } = useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const { data } = await httpRequestService.fetchApi<TOrder>(`/order/single/${orderId}`);
            return data
        }
    })

    if (isLoading) return <div>Loading...</div>;

    if (error || !order) {
        return <div>Error fetching data</div>
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
                <ItemImage
                    mainImage={order.product.images[0]}
                    images={order.product.images}
                    altText={order.product.name}
                />
                <ItemDescription
                    title={order.product.name}
                    description={order.product.description}
                    price={order.soldAtPrice}
                    category={order.product.category}
                    currencyType={order.currencyType}
                    walletAddress={order.buyer.walletAddress}
                    shipping={order.deliveryBy}
                    type={order.product.type}
                    status={order.orderStatus}
                />
            </div>
            <BuyerDetails
                firstName={order.shippingAddress.firstName}
                lastName={order.shippingAddress.lastName}
                email={order.shippingAddress.email}
                phoneNumber={order.shippingAddress.phoneNumber}
                address={order.shippingAddress.address}
                country={order.shippingAddress.country}
                state={order.shippingAddress.state}
                city={order.shippingAddress.city}
                pincode={order.shippingAddress.postalCode}
            />
        </div>
    );
};

export default ItemDetail;
