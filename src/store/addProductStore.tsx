import { ProductFormValues } from "@/validations/productValidation";
import { create } from "zustand";

export interface IProductFormData extends ProductFormValues {
	productDetails: string;
}

interface IProductStore {
	productData: IProductFormData;
	setProductData: (data: IProductFormData) => void;
	reset: () => void;
}

const defaultState: IProductFormData = {
	name: "",
	description: "",
	productDetails: "",
	productAddress: "United Arab Emirates",
	category: "",
	currencyType: "BNB",
	stock: "",
	price: "",
	shippingCharges: "",
	shippingDuration: "",
	shippingType: "GLOBAL",
	images: [],
	sellerId: "",
};

const useProductStore = create<IProductStore>((set) => ({
	productData: defaultState,
	setProductData(data) {
		return set({ productData: data });
	},
	reset: () => set({ productData: defaultState }),
}));

export default useProductStore;
