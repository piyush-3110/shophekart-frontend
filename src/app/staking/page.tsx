"use client";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button, { ButtonVariant } from "@/components/shared/Button";
import MiningPoolProgress from "@/components/StakingPage/Table/MiningPoolProgress";
import { StakingTab } from "@/constants/stakingTabs";
import { STAKING_TABLE_DATA, STAKING_TABS } from "@/constants";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { Dialog } from "@/components/ui/dialog";
import StakeModal from "@/components/StakingPage/Table/stakeModal/StakeModal";
import { StakingTableDataItem } from "@/types/stakingTableDataTypes";
import "react-toastify/dist/ReactToastify.css";
import ToastNotification from "@/components/Form/ToastNotification";
import { ClaimModal } from "@/components/StakingPage/Table/stakeModal/ClaimModal";

const Page: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<StakingTab>(StakingTab.StakeOptions);
  const [isStakeModalOpen, setStakeModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedAPR, setSelectedAPR] = useState<number | null>(null);

  const handleOpenModal = () => {
    setIsClaimModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClaimModalOpen(false);
  };

  return (
    <main className="bg-white">
      <ToastNotification />
      <div className="bg-[#F1F4FF] w-full">
        <div className="px-4 lg:px-28 flex gap-2">
          {STAKING_TABS.map(({ title }, index) => {
            const isActive = activeTab === title;
            return (
              <Button
                key={index}
                className="relative"
                onClick={() => setActiveTab(title)}
                variant={isActive ? ButtonVariant.TRANSPARENT : ButtonVariant.SECONDARY}
              >
                {isActive && (
                  <motion.div
                    transition={{ duration: 0.3 }}
                    layoutId="tab-bg"
                    className={twMerge("absolute bg-primary-gradient inset-0")}
                  />
                )}
                <span className="relative z-[2]">{title}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="px-4 lg:px-28 mt-8">
        <Table>
          <TableCaption>
            {activeTab === StakingTab.StakeOptions ? "Your Staking Positions" : "Your Stakes"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Token</TableHead>
              <TableHead>APR (fix rate)</TableHead>
              <TableHead>Stake Period</TableHead>
              <TableHead className="text-left">
                {activeTab === StakingTab.StakeOptions ? "Total Staked" : "Your Stake Amount"}
              </TableHead>
              <TableHead className="text-left">
                {activeTab === StakingTab.StakeOptions ? "TVL USD" : "Reward"}
              </TableHead>
              <TableHead className="text-left">
                {activeTab === StakingTab.StakeOptions
                  ? "Mining Pool (CSHOP)"
                  : "Token Unlock Period"}
              </TableHead>
              <TableHead className="text-center">Operate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STAKING_TABLE_DATA.map((data: StakingTableDataItem, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{data.token}</TableCell>
                <TableCell>{data.apr}%</TableCell>
                <TableCell>{data.stakePeriod}</TableCell>
                <TableCell className="text-left">
                  {activeTab === StakingTab.StakeOptions ? data.totalStaked : data.myStake}
                </TableCell>
                <TableCell className="text-left">
                  {activeTab === StakingTab.StakeOptions ? data.tvlUsd : data.rewardEarned}
                </TableCell>
                <TableCell>
                  {activeTab === StakingTab.StakeOptions ? (
                    data.miningPool ? (
                      <MiningPoolProgress
                        totalTokens={data.miningPool.totalTokens}
                        currentTokens={data.miningPool.currentTokens}
                      />
                    ) : (
                      <span>No Pool</span>
                    )
                  ) : (
                    data.tokenUnlockPeriod
                  )}
                </TableCell>
                <TableCell className="flex justify-center">
                  {activeTab === StakingTab.StakeOptions ? (
                    <Dialog>
                      <button
                        onClick={() => {
                          setStakeModalOpen(true);
                          setSelectedAPR(data.apr); // Pass APR to modal
                        }}
                        className="gradient-button !py-2 !px-4"
                      >
                        Stake
                      </button>
                      <StakeModal
                        isOpen={isStakeModalOpen}
                        apr={selectedAPR} // Pass APR to modal as prop
                        onClose={() => setStakeModalOpen(false)}
                      />
                    </Dialog>
                  ) : (
                    <button
                      onClick={handleOpenModal}
                      className="gradient-button !py-2 !px-4 text-white"
                    >
                      Claim
                    </button>
                  )}
                  <ClaimModal isOpen={isClaimModalOpen} onClose={handleCloseModal} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
