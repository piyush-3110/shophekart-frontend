interface TCreateProductData {
  productIdOnChain?: number;
  sellerId: string;
  currencyType: "USDT" | "USDC" | "CSHOP" | "BNB";
  name: string;
  description: string;
  details: string;
  images: File[];
  shippingType: "LOCAL" | "GLOBAL";
  shippingCharge: string;
  shippingDuration: string;
  category: string;
  productAddress: string;
  price: string;
  stock: string;
}

export default TCreateProductData;
