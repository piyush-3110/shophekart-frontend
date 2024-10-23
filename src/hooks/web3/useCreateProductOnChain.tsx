import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { toast } from "../use-toast";

const useCreateProductOnChain = (userWalletAddress: `0x${string}`) => {
  const [productId, setProductId] = useState<string | null>(null);

  const { writeContractAsync, data: hash } = useWriteContract({
    config,
    mutation: {
      async onError() {
        toast({
          title: "Error creating product",
          description:
            "There was an error while creating the product. Please try again later.",
          variant: "destructive",
        });
        if (productId) {
          await HttpRequestService.deleteApi<IProduct>(
            `/product/${productId}/delete`
          );
        }
      },
    },
  });

  const { isSuccess } = useWaitForTransactionReceipt({ hash, config });

  const { data: onChainIds } = useReadContract({
    config,
    ...CONTRACT_CONFIG.marketplace,
    functionName: "getUserListedItemIds",
    args: [userWalletAddress],
    query: {
      enabled: isSuccess,
    },
  });

  const { mutateAsync } = useMutation({
    async mutationFn(onChainId: string) {
      if (!productId) {
        throw new Error("Something went wrong while creating product");
      }
      console.log(productId);
      const response = await HttpRequestService.updateApi<
        IProduct,
        { onChainId: number; productId: string }
      >(`/product/${productId}/update-on-chain-id`, {
        onChainId: Number(onChainId),
        productId,
      });

      return response.data;
    },
    onSuccess() {
      toast({
        title: "Product created successfully",
      });
    },
    onError() {
      toast({
        title: "Error creating product",
        description:
          "There was an error while creating the product. Please try again later.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (isSuccess && onChainIds) {
      (async () => {
        const productId = (onChainIds as bigint[])[
          (onChainIds as number[]).length - 1
        ];
        console.log(productId.toString());
        await mutateAsync(productId.toString());
      })();
    }
  }, [isSuccess, onChainIds, mutateAsync, hash]);

  return { writeContractAsync, setProductId };
};

export default useCreateProductOnChain;
