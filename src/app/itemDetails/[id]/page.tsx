import { ItemDetail } from '@/components/ItemDetails/ItemDetail';
import React from 'react';
import { useParams } from 'next/navigation';  // Import useParams to get the id from the route

const ItemDetailPage = () => {
  const { id } = useParams();  // Get the dynamic id from the URL

  return (
    <div>
      {/* Pass the id to the ItemDetail component as a prop */}
      <ItemDetail id={id} />
    </div>
  );
};

export default ItemDetailPage;
