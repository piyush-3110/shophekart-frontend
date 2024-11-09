"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetUserReferralCode from "@/hooks/web3/useGetUserReferralCode";
import { useUserStore } from "@/store";
import Show from "@/components/shared/Show";
import React, { useEffect } from "react";
import customToast from "@/utils/toasts";
import OrderHistoryPrice from "@/components/purchaseHistory/OrderHistoryPrice";
import useGenerateReferralCode from "@/hooks/web3/useGenerateReferral";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ReadContractErrorType } from "viem";
import ConnectWalletButton from "@/components/shared/ConnectWalletButton";

const ReferralModal = () => {
  const [isClient, setIsClient] = React.useState(false);

  const { user } = useUserStore();
  const {
    referralCode,
    referralEarningInBnb,
    referralEarningInUsdt,
    referralCodeProps,
    referralEarningInBnbProps,
    referralEarningInUsdtProps,
  } = useGetUserReferralCode(user?.walletAddress);

  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(window.location.origin);
    setIsClient(true);
  }, []);

  return (
    <Show when={isClient}>
      <Show when={!user?.walletAddress}>
        <ConnectWalletButton />
      </Show>

      <Show when={!!user?.walletAddress}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-button">
              {!!referralCode ? "Check info" : "Generate"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <Show when={!!referralCode && !!user?.walletAddress}>
              <HasReferralCodeWithDependencyFunction
                referralCode={!!referralCode ? referralCode : "no-code"}
                url={url}
                referralEarningInBnb={
                  !!referralEarningInBnb ? referralEarningInBnb : "0"
                }
                referralEarningInUsdt={
                  !!referralEarningInUsdt ? referralEarningInUsdt : "0"
                }
              />
            </Show>
            <Show when={!referralCode}>
              <GenerateReferralForm
                referralCodeRefetch={referralCodeProps.refetch}
                referralEarningInBnbRefetch={referralEarningInBnbProps.refetch}
                referralEarningInUsdtRefetch={
                  referralEarningInUsdtProps.refetch
                }
              />
            </Show>
          </DialogContent>
        </Dialog>
      </Show>
    </Show>
  );
};

export default ReferralModal;

function GenerateReferralForm({
  referralCodeRefetch,
  referralEarningInBnbRefetch,
  referralEarningInUsdtRefetch,
}: {
  referralCodeRefetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<string, ReadContractErrorType>>;
  referralEarningInBnbRefetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<bigint, ReadContractErrorType>>;
  referralEarningInUsdtRefetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<bigint, ReadContractErrorType>>;
}) {
  const [referralCode, setReferralCode] = React.useState<string>("");
  const { user } = useUserStore();

  const { generateReferralCode, isLoading, isSuccess } =
    useGenerateReferralCode();

  function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (!referralCode) return customToast.error("error", "Please enter a code");
    if (!!user?.walletAddress) generateReferralCode(referralCode);
  }

  useEffect(() => {
    if (isSuccess) {
      referralCodeRefetch();
      referralEarningInBnbRefetch();
      referralEarningInUsdtRefetch();
    }
  }, [
    isSuccess,
    referralCodeRefetch,
    referralEarningInBnbRefetch,
    referralEarningInUsdtRefetch,
  ]);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create referral code</DialogTitle>
        <DialogDescription>
          📢 Make any / a certain amount of token purchases first to be able to
          generate a referral link! You will earn 5% for each token purchase
          from your link.
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4">
        <Input
          type="text"
          value={referralCode}
          onChange={(e) => {
            setReferralCode(e.target.value);
          }}
        />
        {!!user?.walletAddress ? (
          <Button
            className="gradient-button"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </form>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" className="gradient-button">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}

const HasReferralCodeWithDependencyFunction = React.memo(
  function HasReferralCode({
    referralCode,
    url,
    referralEarningInBnb,
    referralEarningInUsdt,
  }: {
    referralCode: string;
    url: string;
    referralEarningInBnb: string;
    referralEarningInUsdt: string;
  }) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            💡 Tip: You can share this link on social media or send it to your
            friends via email or WhatsApp to earn 7% for each token purchase
            from your link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`${url}/?referral=${referralCode}`}
              readOnly
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(`${url}/?referral=${referralCode}`);
              customToast.success("Copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <div className="flex gap-1 items-center">
            <h1 className=" py-3 !text-sm">Referral Earning {"(BNB)"}: </h1>
            <OrderHistoryPrice
              soldPrice={Number(referralEarningInBnb)}
              currencyType="BNB"
              className="gradient-text "
            />
          </div>
          <div className="flex gap-1 items-center">
            <h1 className=" py-3 !text-sm">Referral Earning {"(USDT)"}: </h1>
            <OrderHistoryPrice
              soldPrice={Number(referralEarningInUsdt)}
              currencyType="USDT"
              className="gradient-text "
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="gradient-button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.referralCode === nextProps.referralCode &&
      prevProps.url === nextProps.url
    );
  }
);
