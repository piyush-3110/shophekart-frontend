// interface ICategoryDocument {
//   _id: string;
//   label: string;
//   parentCategory: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export type TCurrencyType = "USDT" | "USDC" | "CSHOP" | "BNB";

type IProduct = {
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
