type TOrder = {
  _id: string;
  orderStatus: "pending" | "processing" | "delivered" | "cancelled";
  deliveryBy: Date;
  buyerId: string;
  productId: string;
  productIdOnChain: string;
  tokenId: number;
  soldAtPrice: number;
  shippingPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

export default TOrder;

export type TCreateOrder = {
  productIdOnChain: string;
  deliveryBy: string;
  buyerId: string;
  productId: string;
  tokenId: number;
  shippingPrice: number;
};
