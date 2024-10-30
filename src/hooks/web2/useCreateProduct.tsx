import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";
import { useMutation } from "@tanstack/react-query";
import useCreateProductOnChain from "../web3/useCreateProductOnChain";
import { toast } from "../use-toast";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import TOKEN_ADDRESS from "@/constants/tokenAddress";
import { createTokenUri } from "@/utils";
import { parseEther } from "viem";
import { PRODUCT_CREATION_FEE } from "@/constants/application";

const currencyTypeAddresses = {
  USDT: TOKEN_ADDRESS.USDT,
  BNB: TOKEN_ADDRESS.BNB,
  CSHOP: TOKEN_ADDRESS.CSHOP,
  USDC: TOKEN_ADDRESS.USDC,
};

export default function useCreateProduct(userWalletAddress: `0x${string}`) {
  const { writeContractAsync, setProductId } =
    useCreateProductOnChain(userWalletAddress);

  const { mutateAsync } = useMutation({
    async mutationFn(data: FormData) {
      const response = await HttpRequestService.postApi<IProduct, FormData>(
        "/fixedProduct/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    },
    async onSuccess({ data: product }) {
      const tokenUri = await createTokenUri({
        name: product.name,
        category: product.category,
        currencyType: product.currencyType,
        description: product.description,
        image: product.images[0],
        price: product.price.toString(),
      });

      await writeContractAsync({
        ...CONTRACT_CONFIG.marketplace,
        functionName: "createMarketItem",
        args: [
          product.stock,
          currencyTypeAddresses[product.currencyType],
          parseEther(product.price.toString()),
          parseEther(product.shippingCharges.toString()),
          tokenUri,
        ],
        value: parseEther(PRODUCT_CREATION_FEE),
      });

      setProductId(product._id);
    },
    onError(error) {
      console.log(error);
      toast({
        title: "Error creating product",
        description:
          "There was an error while creating the product. Please try again later.",
        variant: "destructive",
      });
    },
  });

  return { mutateAsync };
}
