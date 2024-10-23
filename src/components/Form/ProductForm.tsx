"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import RichTextEditor from "./RichTextArea";
import InputField from "./InputField";
import TextArea from "./TextArea";
import Button from "./Button";
import { toast } from "react-toastify";
import ToastNotification from "./ToastNotification";
import Loader from "./Loader";
import CategorySelect from "./CategorySelect";
import SelectField from "./SelectField";
import { HttpRequestService, PinataService } from "@/services";
import { useWriteContract } from "wagmi";
import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { parseEther } from "viem";
import TOKEN_ADDRESS from "@/constants/tokenAddress";
import { IProduct } from "@/types";
import { envConfig } from "@/config/envConfig";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useWatchContractEvent } from "wagmi";
import { bscTestnet } from "viem/chains";
import { MARKETPLACE_ABI } from "@/constants/ABI";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);

  const [marketItemId, setMarketItemId] = useState<bigint | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productAddress: "",
    details: "",
    category: "", // Will hold category ID
    currencyType: "CSHOP",
    stock: "",
    price: "",
    shippingCharges: "",
    shippingType: "",
    shippingDuration: "",
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { writeContractAsync, isPending } = useWriteContract({
    config,
  });

  useWatchContractEvent({
    // ...CONTRACT_CONFIG.marketplace,
    address: "0xc479963Bbc64f53a3bE9F0841611D440645cB20F",
    abi: MARKETPLACE_ABI,
    eventName: "MarketItemCreated",
    batch: false,
    onLogs(logs) {
      setMarketItemId(logs[0].args?.marketItemId.toString());
    },
    chainId: bscTestnet.id,
    onError(error) {
      console.log(error);
    },
    config,
  });

  const { user } = useUserStore();

  const currencyTypeAddresses = {
    USDT: TOKEN_ADDRESS.usdt,
    BNB: TOKEN_ADDRESS.bnb,
    CSHOP: TOKEN_ADDRESS.cshop,
    USDC: TOKEN_ADDRESS.usdc,
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (value: string) => {
    setFormData((prev) => ({ ...prev, details: value }));
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedImages(files);
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData((prev) => ({ ...prev, category: categoryId })); // Set the selected category ID
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("productAddress", formData.productAddress);
    formDataToSubmit.append("details", formData.details);
    formDataToSubmit.append("category", formData.category); // Send category ID to backend
    formDataToSubmit.append("currencyType", formData.currencyType);
    formDataToSubmit.append("stock", formData.stock);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("shippingCharges", formData.shippingCharges);
    formDataToSubmit.append("shippingDuration", formData.shippingDuration);
    formDataToSubmit.append("shippingType", formData.shippingType);
    formDataToSubmit.append(
      "productIdOnChain",
      marketItemId?.toString() ?? "12345"
    );
    formDataToSubmit.append("sellerId", user?._id ?? ""); // Example seller ID
    formDataToSubmit.append(
      "currencyAddress",
      currencyTypeAddresses[
        formData.currencyType as keyof typeof currencyTypeAddresses
      ]
    );

    selectedImages.forEach((file) => {
      formDataToSubmit.append("images", file);
    });
    let product;
    try {
      const response = await HttpRequestService.postApi<IProduct, FormData>(
        `/fixedProduct/create`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const res = await PinataService.uplaodFile({
        name: response.data.name,
        description: response.data.description,
        image: response.data.images[0],
        attributes: [
          {
            trait_type: "Category",
            value: formData.category,
          },
          {
            trait_type: "Token",
            value: response.data.currencyType,
          },
          {
            trait_type: "Price",
            value: response.data.price.toString(),
          },
        ],
      });

      const TOKEN_URI = PinataService.getFile(res.IpfsHash);
      if (response.success) {
        product = response.data;

        const hash = await writeContractAsync({
          ...CONTRACT_CONFIG.marketplace,
          functionName: "createMarketItem",
          args: [
            Number(formData.stock),
            currencyTypeAddresses[
              formData.currencyType as keyof typeof currencyTypeAddresses
            ],
            parseEther(formData.price),
            parseEther(formData.shippingCharges),
            TOKEN_URI,
          ],
          value: parseEther("0.001"),
        });

        await waitForTransactionReceipt(config, {
          hash,
        });
      }

      setLoading(false);
      toast.success("Product Created Successfully");

      // Clear the form and selected images
      setFormData({
        name: "",
        description: "",
        productAddress: "",
        details: "",
        category: "",
        currencyType: "",
        stock: "",
        price: "",
        shippingCharges: "",
        shippingType: "",
        shippingDuration: "",
      });
      setSelectedImages([]); // Reset selected images
    } catch (error) {
      if (product) {
        try {
          await axios.delete(
            `${envConfig.BACKEND_URL}/product/${product._id}/delete`,
            {
              withCredentials: true,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }

      setLoading(false);
      if (error) {
        console.log(error);
        toast.error("Failed to create product");
      }
    }
  };

  return (
    <div className="p-8 w-[95vw] md:w-[80vw] my-10 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add product</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          label="Name"
          placeholder="E.g. Smart watch"
          name="name"
          type="string"
          value={formData.name}
          onChange={handleChange}
        />
        <TextArea
          label="Description"
          placeholder="Write your description here..."
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <InputField
          label="Product Address"
          placeholder="Street, City, State, Country, Postal Code"
          name="productAddress"
          value={formData.productAddress}
          onChange={handleChange}
        />
        <RichTextEditor
          label="Product Details"
          value={formData.details}
          onChange={handleRichTextChange}
        />
        <CategorySelect
          category={formData.category}
          onChange={handleCategoryChange}
        />
        <div>
          <label className="block text-sm font-medium mb-1">
            Product media
          </label>
          <UploadImage onFileSelect={handleFileSelect} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField
            label="Currency Type"
            options={[
              "Select Currency Type",
              "USDT",
              "BNB",
              "CSHOP",
              "USDC",
            ].map((type) => ({ label: type, value: type }))}
            name="currencyType"
            value={formData.currencyType}
            onChange={handleChange}
          />
          <InputField
            label="Stock"
            placeholder="Enter stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <InputField
            label="Price"
            placeholder="Enter price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <InputField
            label="Shipping charges"
            placeholder="Enter Shipping price"
            name="shippingCharges"
            type="number"
            value={formData.shippingCharges}
            onChange={handleChange}
          />
          <SelectField
            label="Shipping Type"
            options={["Select Shipping Type", "LOCAL", "GLOBAL"].map(
              (type) => ({ label: type, value: type })
            )}
            name="shippingType"
            value={formData.shippingType}
            onChange={handleChange}
          />
          <InputField
            label="Shipping duration"
            placeholder="Enter Shipping duration in days"
            name="shippingDuration"
            type="number"
            value={formData.shippingDuration}
            onChange={handleChange}
          />
        </div>

        <Button
          text={loading || isPending ? <Loader /> : "Save and publish product"}
          disabled={loading || isPending}
        />
        <ToastNotification />
      </form>
    </div>
  );
};

export default ProductForm;
