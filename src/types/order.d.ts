type TOrder = {
  _id: string;
  orderStatus: "pending" | "delivering" | "delivered" | "cancelled" | "dispute";
  deliveryBy: Date;
  buyerId: string;
  productId: string;
  productIdOnChain: string;
  nftId: number;
  soldAtPrice: number;
  shippingPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

export default TOrder;

export type TCreateOrder = {
  productIdOnChain: number;
  deliveryBy: string;
  buyerId: string;
  productId: string;
  shippingPrice: number;
};
