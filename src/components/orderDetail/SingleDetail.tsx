"use client";
import React from 'react';
import httpRequestService from "@/services/httpRequest.service";
import ItemDescription from './ItemDescription';
import BuyerDetails from './BuyerDetails';
import { useQuery } from '@tanstack/react-query';
import ItemCard from '../ItemDetails/ItemCard';
import FetchError from '../shared/FetchError';
import UpdateOrderStatus from './UpdateOrderStatus';
import CancelOrder from './CancelOrder';
import ClaimFunds from './ClaimFunds';
import ConfirmDelivery from './ConfirmDelivery';
import RaiseDispute from './RaiseDispute';

const OrderDetail: React.FC<ItemDetailProps> = ({ orderId }) => {
    const { data: order, isLoading, error, refetch } = useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const { data } = await httpRequestService.fetchApi<TOrder>(`/order/single/${orderId}`);
            return data
        }
    })

    if (isLoading) return <div>Loading...</div>;

    if (error || !order) {
        return <FetchError refetch={refetch} />
    }
    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
                <ItemCard images={order.product.images} />
                <ItemDescription
                    nftId={order.nftId}
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
            {order.isCallerBuyer ? <BuyerActions orderId={order._id} currentOrderStatus={order.orderStatus} /> : order.isCallerSeller ? <SellerActions deliveryBy={order.deliveryBy} nftId={order.nftId} orderId={order._id} currentOrderStatus={order.orderStatus} /> : null}
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

export default OrderDetail;

function BuyerActions({ orderId, currentOrderStatus }: { orderId: string, currentOrderStatus: OrderStatus }) {
    return <div className="p-6 flex flex-wrap gap-10 items-center">
        <div className='space-y-4'>
            <h2>
                Confirm Delivery
            </h2>
            <ConfirmDelivery orderId={orderId} currentStatus={currentOrderStatus} />
        </div>
        <div className='space-y-4'>
            <h2>
                Cancel Order
            </h2>
            <CancelOrder orderId={orderId} currentOrderStatus={currentOrderStatus} />
        </div>
        <div className='space-y-4'>
            <h2>
                Raise dispute
            </h2>
            <RaiseDispute orderId={orderId} currentOrderStatus={currentOrderStatus}/>
        </div>
    </div>
}


function SellerActions({ orderId, currentOrderStatus, nftId , deliveryBy}: { orderId: string, currentOrderStatus: OrderStatus, nftId: number, deliveryBy:Date }) {
    return <div className="p-6 flex flex-wrap gap-10 items-start">
       {currentOrderStatus==="pending"&& <div className='space-y-4'>
            <h2>
                Update the delivery status
            </h2>
            <UpdateOrderStatus orderId={orderId} currentOrderStatus={currentOrderStatus} />
        </div>}
        <div className='space-y-4'>
        <h2>
                Claim funds
            </h2>
            <ClaimFunds deliveryBy={deliveryBy} currentOrderStatus={currentOrderStatus} nftId={nftId} />
        </div>
    </div>
}

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
    isCallerBuyer: boolean
    isCallerSeller: boolean
    nftId: number
}

interface ItemDetailProps {
    orderId: string;
}
