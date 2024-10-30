"use client";
import  ItemDetail  from '@/components/SingleDetail/SingleDetail';
import React from 'react';
import { useParams } from 'next/navigation';

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 

  return (
    <div>
      <ItemDetail orderId={id} /> 
    </div>
  );
};

export default ItemDetailPage;
