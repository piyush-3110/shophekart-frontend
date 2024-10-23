import { useCallback, useState } from "react";
import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { toast } from "../use-toast";

function useCreateOrderOnChain() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { writeContractAsync } = useWriteContract({
    config,
    mutation: {
      onError() {
        toast({ title: "Error placing order", variant: "destructive" });
      },
    },
  });

  const createOrderBNBCallback = useCallback(
    async (markerItemId: number, shippingCharges: number, price: number) => {
      try {
        setIsLoading(true);
        setIsSuccess(false);
        const contractConfigWithArgs = {
          ...CONTRACT_CONFIG.marketplace,
          functionName: "purchaseByPayingInBNB",
          args: [markerItemId],
          value: parseEther((shippingCharges + price).toString()),
        };

        const hash = await writeContractAsync(contractConfigWithArgs);

        await waitForTransactionReceipt(config, {
          hash,
        });
        setIsSuccess(true);
        return hash;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [writeContractAsync]
  );

  const createOrderOtherTokencallback = useCallback(
    async (
      token: string,
      markerItemId: number,
      shippingCharges: number,
      price: number
    ) => {
      try {
        setIsLoading(true);
        setIsSuccess(false);
        const approveContractConfig = {
          ...CONTRACT_CONFIG[token],
          functionName: "approve",
          args: [
            CONTRACT_CONFIG.marketplace.address,
            parseEther((shippingCharges + price).toString()),
          ],
        };

        const createOrderContractConfig = {
          ...CONTRACT_CONFIG.marketplace,
          functionName: "purchaseByPayingInToken",
          args: [markerItemId],
        };

        const approveHash = await writeContractAsync(approveContractConfig);

        await waitForTransactionReceipt(config, {
          hash: approveHash,
        });

        const hash = await writeContractAsync(createOrderContractConfig);

        await waitForTransactionReceipt(config, {
          hash,
        });
        setIsSuccess(true);
        return { hash, approveHash };
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [writeContractAsync]
  );

  return {
    createOrderBNB: createOrderBNBCallback,
    createOrderOtherToken: createOrderOtherTokencallback,
    isPending: isLoading,
    isSuccess,
  };
}

export default useCreateOrderOnChain;
