// interface ICategoryDocument {
//   _id: string;
//   label: string;
//   parentCategory: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export type TCurrencyType = "USDT" | "USDC" | "CSHOP" | "BNB";

export type IProduct = {
  _id: string;
  productIdOnChain: number;
  sellerId: string;
  currencyType: TCurrencyType;
  currencyAddress: string;
  name: string;
  description: string;
  shippingCharges: number;
  shippingDuration: number;
  details: string;
  images: string[];
  shippingType: "GLOBAL" | "LOCAL";
  status: "draft" | "published" | "archived" | "deleted";
  rating: number;
  productAddress: string | null;
  category: string;
  price: number;
  stock: number;
};

export default IProduct;

export type TSingleProduct = {
  type: "FixedProduct";
  __v: number;
  shippingDuration: number;
  currencyType: "USDT" | "USDC" | "CSHOP" | "BNB";
  shippingType: "GLOBAL" | "LOCAL";
  status: "draft" | "published" | "archived" | "deleted" | "out of stock";
  currencyAddress: string;
  stock: number;
  createdAt: Date;
  reviewCount: number;
  _id: string;
  images: string[];
  price: number;
  details: string;
  description: string;
  shippingCharges: number;
  productIdOnChain: number;
  productAddress: string;
  sellerId: string;
  updatedAt: Date;
  averageRating: number;
  name: string;
  category: string;
};
