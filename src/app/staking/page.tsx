"use client";

/**
 * Importing necessary libraries and custom components.
 * @see https://reactjs.org/docs/hooks-state.html
 * @see https://nextjs.org/docs/rendering
 */
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
import Button, {
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from "@/components/shared/Button";
import MiningPoolProgress from "@/components/StakingPage/Table/MiningPoolProgress";
import { StakingTab } from "@/constants/stakingTabs";
import { STAKING_TABLE_DATA, STAKING_TABS } from "@/constants";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import StakeModal from "@/components/StakingPage/Table/stakeModal/StakeModal";

/**
 * Define the type for the component's props.
 * @typedef {null} PageProps
 */
type PageProps = null;

/**
 * Define the Page component as a functional component.
 * @param {PageProps} props - The component's props (not used in this case)
 * @returns {JSX.Element} - The JSX element representing the page
 */
const Page: React.FC<PageProps> = (): JSX.Element => {
  /**
   * Initialize the state to keep track of the active tab.
   * @type {StakingTab}
   */
  const [activeTab, setActiveTab] = useState<StakingTab>(STAKING_TABS[0].title);

  return (
    <main className="bg-white">
      {/* Tab container */}
      <div className="bg-[#F1F4FF] w-full">
        <div className="px-4 lg:px-28 flex gap-2">
          {/**
           * Render a button for each tab option.
           * @param {{title: StakingTab}} tab - The current tab option
           * @param {number} index - The index of the current tab option
           */}
          {STAKING_TABS.map(({ title }, index) => {
            const isActive = activeTab === title;
            return (
              <Button
                /**
                 * Key for the button element.
                 */
                key={index}
                className="relative"
                /**
                 * Set the active tab when the button is clicked.
                 */
                onClick={() => setActiveTab(title)}
                /**
                 * Determine if the button is active based on the current tab state.
                 */
                variant={
                  isActive ? ButtonVariant.TRANSPARENT : ButtonVariant.SECONDARY
                }
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

      {/* Table container */}
      <div className="px-4 lg:px-28 mt-8">
        <Table>
          {/* Table caption */}
          <TableCaption>Your Staking Positions</TableCaption>

          {/* Table header */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Token</TableHead>
              <TableHead>APR (fix rate)</TableHead>
              <TableHead>Stake Period</TableHead>
              <TableHead className="text-left">Total Staked</TableHead>
              <TableHead className="text-left">TVL USD</TableHead>
              <TableHead className="text-left">Mining Pool (CSHOP)</TableHead>
              <TableHead className="text-center">Operate</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table body */}
          <TableBody>
            {/**
             * Render a table row for each item in the staking table data.
             * @param {object} data - The current staking table data item
             * @param {number} index - The index of the current staking table data item
             */}
            {STAKING_TABLE_DATA.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{data.token}</TableCell>
                <TableCell>{data.apr}%</TableCell>
                <TableCell>{data.stakePeriod}</TableCell>
                <TableCell className="text-left">{data.totalStaked}</TableCell>
                <TableCell className="text-left">{data.tvlUsd}</TableCell>
                <TableCell className="">
                  <MiningPoolProgress
                    totalTokens={data.miningPool.totalTokens}
                    currentTokens={data.miningPool.currentTokens}
                  />
                </TableCell>
                <TableCell className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size={ButtonSize.SMALL} shape={ButtonShape.ROUND}>
                        Stake
                      </Button>
                    </DialogTrigger>
                    <StakeModal />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default Page;
