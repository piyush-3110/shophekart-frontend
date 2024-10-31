import Image from "next/image";
import { FC } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import WalletAddressWithCopy from "../shared/WalletAddressWithCopy";

type TProps = { walletAddress: `0x${string}`; trustScore: number };

export const ProfileCard: FC<TProps> = ({ walletAddress, trustScore }) => {
    return (
        <div className="min-h-[40vh] pb-6 rounded-md bg-white border border-red-200 shadow-sm w-[80%] mx-auto">
            <div className="h-[136px] relative w-full ">
                <Image
                    src="/images/profile/cover.png"
                    width={524}
                    height={524}
                    className="w-[99%] mx-auto h-full mt-1 object-cover"
                    alt="images"
                />
                <Image
                    src="/images/profile/profile.png"
                    alt="profile"
                    height={500}
                    width={500}
                    className="h-24 absolute z-[1] -bottom-9 left-8 w-24"
                />
            </div>
            <div>
                <div className="mx-8 mt-12 flex flex-col gap-2">
                    <WalletAddressWithCopy walletAddress={walletAddress} />
                    <div className="flex gap-3 items-center">
                        <h1 className="text-[#160041] font-[700] text-md">
                            Trust score:{" "}
                            <span className="text-gray-500 text-sm">{trustScore}</span>
                        </h1>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger>
                                <InfoCircledIcon />
                            </TooltipTrigger>
                            <TooltipContent>
                                Trust score is a measure of the reliability
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="border-t my-2 w-full bg-[#6B6F93]"></div>
                    <p className="text-sm font-[400] text-[#6B6F93]">
                        Explore my top picks from the world of e-commerce, featuring
                        products I&apos;ve carefully curated to elevate your shopping
                        experience. Whether you&apos;re looking for the latest deals or
                        timeless essentials, I&apos;ve got you covered.
                    </p>
                </div>
            </div>
        </div>
    );
};
