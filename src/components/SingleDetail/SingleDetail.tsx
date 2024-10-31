"use client";
import React, { useEffect, useState } from 'react';
import httpRequestService from "@/services/httpRequest.service";
import ItemDescription from './ItemDescription';
import ItemImage from './ItemImage';
import BuyerDetails from './BuyerDetails';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
}

interface Product {
  category: string;
  description: string;
  images: string[];
  name: string;
  type: string;
}

interface OrderData {
  buyer: {
    walletAddress: string;
  };
  currencyType: string;
  deliveryBy: string;
  orderStatus: 'pending' | 'delivering';
  product: Product;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  soldAtPrice: number;
  _id: string;
}

interface ItemDetailProps {
  orderId: string; 
}

const ItemDetail: React.FC<ItemDetailProps> = ({ orderId }) => {
  const [buyerDetails, setBuyerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });

  const [itemDetails, setItemDetails] = useState({
    title: '',
    description: '',
    price: 0,
    currencyType: '',
    walletAddress: '', 
    shipping: '',
    type: '',
    details: '',
    status: 'pending' as 'pending' | 'delivering',
    mainImage: '', 
    images: [] as string[], 
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      console.log("Fetching order with orderId:", orderId); 
      try {
        const response = await httpRequestService.fetchApi<OrderData>(`/order/single/${orderId}`);
        
        if (response.data) {
          const { product, shippingAddress, orderStatus, soldAtPrice, shippingPrice, currencyType, buyer } = response.data;

          setBuyerDetails({
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            email: buyer.walletAddress, 
            phoneNumber: shippingAddress.phoneNumber,
            address: shippingAddress.address,
            country: shippingAddress.country,
            state: shippingAddress.state,
            city: shippingAddress.city,
            pincode: shippingAddress.postalCode,
          });

          setItemDetails({
            title: product.name,
            description: product.description,
            price: soldAtPrice,
            currencyType: currencyType,
            walletAddress: buyer.walletAddress,
            shipping: `${shippingPrice} ${currencyType}`,
            type: product.type,
            details: `Category: ${product.category}`,
            status: orderStatus,
            mainImage: product.images[0],
            images: product.images,
          });

          console.log('Fetched Order Data:', response.data); 
        } else {
          console.warn('No data found for orderId:', orderId);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]); 

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
        <ItemImage
          mainImage={itemDetails.mainImage} 
          images={itemDetails.images} 
          altText={itemDetails.title}
        />
        <ItemDescription
          id={orderId}
          title={itemDetails.title}
          description={itemDetails.description}
          price={itemDetails.price}
          currencyType={itemDetails.currencyType} 
          walletAddress={itemDetails.walletAddress} 
          shipping={itemDetails.shipping}
          type={itemDetails.type}
          details={itemDetails.details}
          initialStatus={itemDetails.status}
        />
      </div>
      <BuyerDetails
        firstName={buyerDetails.firstName}
        lastName={buyerDetails.lastName}
        email={buyerDetails.email}
        phoneNumber={buyerDetails.phoneNumber}
        address={buyerDetails.address}
        country={buyerDetails.country}
        state={buyerDetails.state}
        city={buyerDetails.city}
        pincode={buyerDetails.pincode}
      />
    </div>
  );
};

export default ItemDetail;
