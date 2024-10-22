interface ICategoryDocument {
  _id: string;
  label: string;
  parentCategory: string;
  createdAt: Date;
  updatedAt: Date;
}

type IProduct = {
  _id: string;
  productIdOnChain: string;
  sellerId: string;
  currencyType: "USDT" | "USDC" | "CSHOP" | "BNB";
  currencyAddress: string;
  name: string;
  description: string;
  shippingCharges: number;
  details: string;
  images: string[];
  shippingType: "GLOBAL" | "LOCAL";
  status: "draft" | "published" | "archived" | "deleted";
  rating: number;
  productAddress: string | null;
  category: ICategoryDocument;
  price: number;
  stock: number;
};

export default IProduct;
