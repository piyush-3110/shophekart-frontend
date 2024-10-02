interface ICartItem {
  productName: string;
  category: string;
  productImage: string;
  price: number;
  quantity: number;
  shippingType: "global shipping" | "local shipping";
}

export default ICartItem;
