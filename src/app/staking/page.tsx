// src/app/staking/page.tsx

"use client";

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

// Define the type for the component's props (empty since no props are used)
type PageProps = object;

// Define the Page component as a functional component
const Page: React.FC<PageProps> = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<StakingTab>(STAKING_TABS[0].title);

  return (
    <main className="bg-white">
      {/* Tab container */}
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

      {/* Table container */}
      <div className="px-4 lg:px-28 mt-8">
        <Table>
          <TableCaption>Your Staking Positions</TableCaption>
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
          <TableBody>
            {STAKING_TABLE_DATA.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{data.token}</TableCell>
                <TableCell>{data.apr}%</TableCell>
                <TableCell>{data.stakePeriod}</TableCell>
                <TableCell className="text-left">{data.totalStaked}</TableCell>
                <TableCell className="text-left">{data.tvlUsd}</TableCell>
                <TableCell>
                  <MiningPoolProgress
                    totalTokens={data.miningPool.totalTokens}
                    currentTokens={data.miningPool.currentTokens}
                  />
                </TableCell>
                <TableCell className="flex justify-center">
                  <Button size={ButtonSize.SMALL} shape={ButtonShape.ROUND}>
                    Stake
                  </Button>
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
