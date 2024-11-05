"use client";
import Image from "next/image";
import { FC, useState } from "react";
import WalletAddressWithCopy from "../shared/WalletAddressWithCopy";
import TrustScoreWithTooltip from "../shared/TrustScoreWithTooltip";
import { FaEdit } from "react-icons/fa";

import { EditDescriptionModal } from "./EditDescriptionModal";
import { EditNameModal } from "./EditNameModal";
import { useUserStore } from "@/store"; // Import useUserStore hook

type TProps = { walletAddress: `0x${string}`; trustScore: number; description: string; name: string };

export const ProfileCard: FC<TProps> = ({ walletAddress, trustScore, description, name }) => {
    const [isEditDescriptionModalOpen, setEditDescriptionModalOpen] = useState(false);
    const [isEditNameModalOpen, setEditNameModalOpen] = useState(false);
    const { user, setUser } = useUserStore(); // Destructure user and setUser from the store

    const handleUpdateDescription = (newDescription: string) => {
        if (user) {
            setUser({ ...user, description: newDescription });
        }
        setEditDescriptionModalOpen(false); // Close modal after update
    };

    const handleUpdateName = (newName: string) => {
        if (user) {
            setUser({ ...user, name: newName });
        }
        setEditNameModalOpen(false); // Close modal after update
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
                 <div className="flex gap-5 items-center">
                 <div className="flex gap-2 items-center">
                    <p className="text-lg font-semibold">Name</p>
                    <p className="text-lg ">{user?.name}</p>
                    </div>
                 <button
                            className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
                            onClick={() => setEditNameModalOpen(true)}
                        >
                            <FaEdit size={18} />
                        </button>
                 </div>
                 
                    <div className="flex justify-between items-center">
                        <TrustScoreWithTooltip trustScore={trustScore} />
                      
                
                    <button
                        className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
                        onClick={() => setEditDescriptionModalOpen(true)}
                    >
                        <FaEdit size={18} />
                    </button>
                    </div>
                    <div className="border-t my-2 w-full bg-[#6B6F93]"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-[400] text-[#6B6F93]">{user?.description}</p>
                    </div>
                </div>
            </div>
            {/* Description Edit Modal */}
            <EditDescriptionModal
                isOpen={isEditDescriptionModalOpen}
                onClose={() => setEditDescriptionModalOpen(false)}
                onUpdate={handleUpdateDescription}
            />
            {/* Name Edit Modal */}
            <EditNameModal
                isOpen={isEditNameModalOpen}
                onClose={() => setEditNameModalOpen(false)}
                onUpdate={handleUpdateName}
             
            />
        </div>
    );
};
