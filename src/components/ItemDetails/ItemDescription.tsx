"use client";
import React, { useEffect } from "react";
import ItemInfoHeader from "./ItemInfoHeader";
import ItemDescriptionText from "./ItemDescriptionText";
import Loader from "../Form/Loader";
import ToastNotification from "../Form/ToastNotification";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { HttpRequestService } from "@/services";
import { TOrder } from "@/types";
import { calculateDeliveryDate } from "@/utils";
import { TCreateOrder } from "@/types/order";
import { TCurrencyType } from "@/types/product";
import { useCreateOrderOnChain } from "@/hooks";
import { useUserStore } from "@/store";

interface ItemDescriptionProps {
  name: string;
  description: string;
  details: string;
  price: number;
  currencyType: TCurrencyType;
  buyerId: string;
  shippingDuration: number;
  stock: number;
  id: string;
  shippingType: string;
  productIdOnChain: number;
  shippingCharges: number;
}

export const ItemDescription: React.FC<ItemDescriptionProps> = ({
  name,
  description,
  details,
  price,
  shippingCharges,
  shippingDuration,
  productIdOnChain,
  id,
  buyerId,
  currencyType,
  stock,
  shippingType,
}) => {
  const { toast } = useToast();
  const { user } = useUserStore();

  const {
    createOrderBNB,
    createOrderOtherToken,
    isPending,
    isSuccess,
    nftIds,
  } = useCreateOrderOnChain(user?.walletAddress as `0x${string}`);

  const {
    mutateAsync,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: async () => {
      const response = await HttpRequestService.postApi<TOrder, TCreateOrder>(
        "/order/create",
        {
          buyerId,
          deliveryBy: calculateDeliveryDate(shippingDuration),
          productId: id,
          productIdOnChain,
          shippingPrice: shippingCharges,
        }
      );

      return response;
    },
    onSuccess: async () => {
      if (currencyType === "BNB") {
        await createOrderBNB(productIdOnChain, shippingCharges, price);
      } else {
        await createOrderOtherToken(
          currencyType.toLowerCase(),
          productIdOnChain,
          shippingCharges,
          price
        );
      }
    },
    onError: () => {
      toast({
        title: "Error buying item",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (isSuccess && nftIds?.length && nftIds.length > 0 && data) {
      (async () => {
        const stringNftId = nftIds[nftIds.length - 1].toString();
        try {
          await HttpRequestService.updateApi<
            TOrder,
            { orderId: string; nftId: number }
          >("/order/update-nft-id", {
            orderId: data.data._id,
            nftId: Number(stringNftId),
          });

          toast({ title: "Order placed successfully" });
        } catch (error) {
          console.log(error);
          toast({ title: "Error updating NFT ID", variant: "destructive" });
        }
      })();
    }
  }, [isSuccess, toast, data, nftIds]);

  return (
    <div className="flex flex-col gap-3 pl-4 md:pl-0 w-[95vw] md:w-[50vw] lg:w-[40vw]">
      <ItemInfoHeader name={name} stock={stock} />
      <ItemDescriptionText description={description} details={details} />

      <div className="flex flex-col md:flex-row md:gap-6 md:items-center">
        <h1 className="text-[#160041] font-[700] text-xl">
          {price} {currencyType}
        </h1>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-[400] text-[#6B6F93]">
            {shippingType === "LOCAL" ? "Local Shipping" : "Global Shipping"}
          </p>
        </div>
      </div>

      <button
        className="gradient-button mt-3 !text-sm !w-fit"
        onClick={() => {
          mutateAsync();
        }}
        disabled={isLoading || isPending}
      >
        {isLoading || isPending ? <Loader /> : "Buy Now"} <ToastNotification />
      </button>
    </div>
  );
};
