"use client"
import  {ItemDetail}  from '@/components/ItemDetails/ItemDetail';
import React from 'react';
import { useParams } from 'next/navigation';  
const ItemDetailPage = () => {
  const { id } = useParams();  

  return (
    <div>
      <ItemDetail id={id.toString()} />
    </div>
  );
};

export default ItemDetailPage;
