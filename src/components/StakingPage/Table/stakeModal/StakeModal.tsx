"use client";

import Button from "@/components/shared/Button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import logo from "../../../../../public/images/shared/favicon.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ToastNotification from "@/components/Form/ToastNotification";

// Define the metadata props
interface ModalMetadataProps {
  title: string;
  value: string;
}

// Define the metadata component
const ModalMetadata = ({ title, value }: ModalMetadataProps): JSX.Element => {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-[#6B6F93]">{title}</span>
      <span className="text-[#160041]">{value}</span>
    </div>
  );
};

// Define the StakeModal component
const StakeModal = () => {
  const [amount, setAmount] = useState<string>("");
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    if (value === "" || /^(\d*)\.?(\d){0,5}$/.test(value)) {
      if (value.startsWith(".")) {
        value = "0" + value;
      }
      setAmount(value);
    }
  }
  const handleComingSoon = () => {
    toast.info("AIShophee Coming soon", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="items-center">
        <DialogTitle className="text-xl font-semibold flex gap-2 items-center">
          <Image src={logo} alt="logo" className="size-8 object-contain" />
          <span>CSHOP Stake</span>
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-4 py-4">
          <ModalMetadata title="APR (fix rate)" value="25%" />
          <ModalMetadata title="Stake period" value="60 Days" />
          <ModalMetadata
            title="Remaining mining pool rewards"
            value="0"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="username" className="font-semibold text-base">
            Amount
          </Label>
          <div className="relative">
            <Input
              value={amount}
              onChange={handleInputChange}
              id="username"
              placeholder="Type the amount."
              className="relative col-span-3 text-base py-6"
            />
            <button
              type="button"
              className="text-[#0246FF] absolute right-4 top-1/2 -translate-y-1/2"
            >
              Max
            </button>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <DialogTitle className="font-semibold">Preview</DialogTitle>
          <ModalMetadata
            title="Stake time"
            value="0"
          />
          <ModalMetadata title="Estimated earnings" value="0 CSHOP" />
          <ModalMetadata
            title="Maturity time"
            value="0"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          className="w-full"
          onClick={handleComingSoon}
        >
          Stake
        </Button>
        <ToastNotification/>
      </DialogFooter>
    </DialogContent>
  );
};

export default StakeModal;
