import { useCallback, useState } from "react";
import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, parseEther } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { Config, waitForTransactionReceipt } from "@wagmi/core";
import { toast } from "../use-toast";

function useCreateOrderOnChain(userId: `0x${string}`) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: nftIds, isSuccess: nftIdSuccess } = useReadContract<
    Abi,
    "getEscrowIDsOfUserBuyer",
    [`0x${string}`],
    Config,
    bigint[] | undefined
  >({
    config,
    ...CONTRACT_CONFIG.escrow,
    functionName: "getEscrowIDsOfUserBuyer",
    args: [userId],
    query: {
      enabled: isSuccess,
    },
  });

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
        // TODO: delete order from backend
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
        // TODO: delete order from backend
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
    isSuccess: isSuccess && nftIdSuccess,
    nftIds,
  };
}

export default useCreateOrderOnChain;
