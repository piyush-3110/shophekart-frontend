import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { config } from "@/config";
import { ICartItem } from "@/types";

function OrderSummary({ items }: { items: ICartItem[] }) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCost = items.reduce((acc, item) => {
    if (item.shippingType === "local shipping") {
      return acc + 10; // Local shipping cost
    } else if (item.shippingType === "global shipping") {
      return acc + 20; // Global shipping cost
    }
    return acc;
  }, 0);
  const total = subtotal + shippingCost;

  const { open } = useWeb3Modal();
  const { isConnected } = useAccount({ config });
  return (
    <div className="bg-gradient-to-tr from-[#01F6FF] via-[#017EFF] to-[#0127FF] p-[2px] rounded-md h-fit min-w-fit w-[384px] xl:max-w-md">
      <div className="px-8 py-4 xl:px-10 xl:py-6 flex flex-col gap-4 bg-white rounded-sm min-w-fit">
        <h1 className="font-bold">Order summary</h1>
        <div className="text-[#6B6F93] text-sm xl:text-base">
          <div className="flex justify-between gap-4 items-center">
            <span className="min-w-fit">Sub total</span>
            <span className="min-w-fit">{subtotal.toFixed(2)} CSHOP</span>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <span>Shipping</span>
            <span className="min-w-fit">{shippingCost} CSHOP</span>
          </div>
        </div>
        <div className="font-bold flex justify-between gap-4 items-center ">
          <span>Total</span>
          <span className="min-w-fit">{total.toFixed(2)} CSHOP</span>
        </div>
        {isConnected ? (
          <Button
            onClick={() => {
              open();
            }}
            className="bg-primary-gradient rounded-sm"
          >
            Confirm and pay
          </Button>
        ) : (
          <Button
            onClick={() => {
              open();
            }}
            variant={"outline"}
            className="border-primary rounded-sm text-primary"
          >
            Connect wallet
          </Button>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
