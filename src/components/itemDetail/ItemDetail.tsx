"use client";
import React, { useEffect, useState } from 'react';
import ItemDescription from './ItemDescription';
import ItemImage from './ItemImage';
import BuyerDetails from './BuyerDetails';

interface ItemDetailProps {
  id: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ id }) => {
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
    shipping: '',
    type: '',
    details: '',
    status: 'pending' as 'pending' | 'delivering',
    mainImage: '', 
    images: [] as string[], 
  });

  useEffect(() => {
    setBuyerDetails({
      firstName: 'Random',
      lastName: 'Khan',
      email: 'khanrandom@gmail.com',
      phoneNumber: '91223231',
      address: 'Jhunjhunu',
      country: 'Pakistan',
      state: 'Khyber Pakhtunkhwa',
      city: 'Peshawar',
      pincode: '923132',
    });

    setItemDetails({
      title: 'Awesome Gadget',
      description: 'Durable gadget perfect for daily use.',
      price: 5.00,
      shipping: '3-5 days',
      type: 'Personality',
      details: 'Black, Medium, 1kg',
      status: 'pending',
      mainImage: "https://i.etsystatic.com/40317824/r/il/f5e94f/4850616230/il_570xN.4850616230_jtwn.jpg", // Add main image URL
      images: [
        "https://i.etsystatic.com/40317824/r/il/f5e94f/4850616230/il_570xN.4850616230_jtwn.jpg",
        "https://i.etsystatic.com/27713397/r/il/d34b88/4222035176/il_fullxfull.4222035176_qeti.jpg",
        "https://m.media-amazon.com/images/M/MV5BMDVlMGRjOTMtNTg4ZC00MDNmLTk5MjQtN2JiNzQ5ZjJkY2MwXkEyXkFqcGc@._V1_.jpg",
      ],
    });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
        <ItemImage
          mainImage={itemDetails.mainImage} 
          images={itemDetails.images} 
          altText={itemDetails.title}
        />
        <ItemDescription
          id={id}
          title={itemDetails.title}
          description={itemDetails.description}
          price={itemDetails.price}
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
