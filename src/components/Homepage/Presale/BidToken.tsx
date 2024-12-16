import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useGetUserTokenBalance from "@/hooks/web3/useGetUserBalance";
import { useUserStore } from "@/store";
// import BuyTokenConfirmationModal from "./BuyTokenConfirmationModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import buyCshopTokenSchema, {
  TBuyCShopTokenProps,
} from "@/validations/buyCshopTokenValidation";
import { Button } from "@/components/ui/button";
import BuyTokenConfirmationModal from "./BuyTokenConfirmationModal";
import dynamic from "next/dynamic";
const Show = dynamic(() => import("@/components/shared/Show"), { ssr: false });
import ConnectWalletButton from "@/components/shared/ConnectWalletButton";

export const BidToken: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const form = useForm<TBuyCShopTokenProps>({
    resolver: zodResolver(buyCshopTokenSchema),
    defaultValues: {
      amount: "0",
      currencyType: "BNB",
    },
  });

  function onSubmit() {
    setIsModalOpen(true);
  }

  const { user } = useUserStore();

  const {
    bnbBalance,
    usdtBalance,
    isLoading,
    isError,
    refetchBnb,
    refetchCshop,
    refetchUsdt,
  } = useGetUserTokenBalance(user?.walletAddress);

  const handleMaxAmount = () => {
    if (
      (form.getValues("currencyType") === "BNB" ||
        form.getValues("currencyType") === "USDT") &&
      !isLoading &&
      !isError &&
      !!bnbBalance &&
      !!usdtBalance
    ) {
      if (form.getValues("currencyType") === "BNB")
        form.setValue("amount", bnbBalance);

      if (form.getValues("currencyType") === "USDT")
        form.setValue("amount", usdtBalance);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-[#0f1113]  w-full lg:max-w-[25vw] mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex relative">
                      <Input
                        type="number"
                        placeholder="Enter the amount"
                        className="px-4 py-2  text-sm border-[1px] border-[rgba(255,255,255,0.09)] rounded-md text-white placeholder-[#988f8f] focus:outline-none focus:ring-1 focus:ring-blue-500"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={handleMaxAmount}
                        className="text-[#0246FF] font-400 text-[1rem] !text-sm absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        Max
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currencyType"
              render={({ field }) => (
                <FormItem className="min-w-fit w-40 text-white   ">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    // disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[1px] border-[rgba(255,255,255,0.09)] ">
                        <SelectValue placeholder="Please Select Token" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"BNB"}>{"BNB"}</SelectItem>
                      <SelectItem value={"USDT"}>{"USDT"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Show when={!!user?.walletAddress}>
            <Button
              disabled={!user?.walletAddress}
              type="submit"
              className="gradient-button w-full"
            >
              Buy
            </Button>
          </Show>
          <Show when={!user?.walletAddress}>
            <ConnectWalletButton />
          </Show>
        </form>
      </Form>
      <BuyTokenConfirmationModal
        amount={form.getValues("amount")}
        token={form.getValues("currencyType")}
        refetchBnb={refetchBnb}
        refetchCshop={refetchCshop}
        refetchUsdt={refetchUsdt}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
