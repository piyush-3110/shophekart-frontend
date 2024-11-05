"use client";
import Image from "next/image";
import { FC, useState } from "react";
import WalletAddressWithCopy from "../shared/WalletAddressWithCopy";
import TrustScoreWithTooltip from "../shared/TrustScoreWithTooltip";
import { IoPencil } from "react-icons/io5";
import { EditDescriptionModal } from "./EditDescriptionModal";
import { useUserStore } from "@/store"; // Import useUserStore hook

type TProps = { walletAddress: `0x${string}`; trustScore: number; description: string };

export const ProfileCard: FC<TProps> = ({ walletAddress, trustScore, description }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const { user, setUser } = useUserStore(); // Destructure user and setUser from the store

    const handleUpdateDescription = (newDescription: string) => {
        if (user) {
            // Update the user's description in the store
            setUser({ ...user, description: newDescription });
        }
        setEditModalOpen(false); // Close modal after update
    };

    return (
        <div className="min-h-[40vh] pb-6 rounded-md bg-white border border-red-200 shadow-sm w-[80%] mx-auto">
            <div className="h-[136px] relative w-full">
                <Image
                    src="/images/profile/cover.png"
                    width={524}
                    height={524}
                    className="w-[99%] mx-auto h-full mt-1 object-cover"
                    alt="Cover Image"
                />
                <Image
                    src="/images/profile/profile.png"
                    alt="Profile Image"
                    height={500}
                    width={500}
                    className="h-24 absolute z-[1] -bottom-9 left-8 w-24"
                />
            </div>
            <div>
                <div className="mx-8 mt-12 flex flex-col gap-2">
                    <WalletAddressWithCopy walletAddress={walletAddress} />
                    <TrustScoreWithTooltip trustScore={trustScore} />
                    <button
                        className="text-gray-500 flex justify-end hover:text-gray-700 cursor-pointer ml-2"
                        onClick={() => setEditModalOpen(true)}
                    >
                        <IoPencil size={18} />
                    </button>
                    <div className="border-t my-2 w-full bg-[#6B6F93]"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-[400] text-[#6B6F93]">{user?.description}</p>
                    </div>
                </div>
            </div>
            {/* Description Edit Modal */}
            <EditDescriptionModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onUpdate={handleUpdateDescription}
            />
        </div>
    );
};
