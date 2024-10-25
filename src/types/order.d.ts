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

export type TSellerOrder = {
  orderStatus: "pending" | "delivering" | "delivered" | "cancelled" | "dispute";
  deliveryBy: string;
  buyerId: string;
  productIdOnChain: number;
  nftId: number;
  categoryLabel: string;
  _id: string;
  soldAtPrice: number;
  shippingPrice: number;
  product: {
    imageUrl: string[];
    name: string;
    description: string;
    type: "FixedProduct";
    currencyType: "USDT" | "USDC" | "CSHOP" | "BNB";
  }[];
};
