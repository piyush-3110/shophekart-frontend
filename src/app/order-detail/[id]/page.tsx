"use client";
import  OrderDetail  from '@/components/orderDetail/SingleDetail';
import React from 'react';
import { useParams } from 'next/navigation';

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <OrderDetail orderId={id} />
    </div>
  );
};

export default ItemDetailPage;
