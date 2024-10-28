import { StakingTableDataItem } from "@/types/stakingTableDataTypes";

// Updated staking data with 9 fields in total
const STAKING_TABLE_DATA: StakingTableDataItem[] = [
  // Combined Data (Stake Options and My Stake in the same rows)
  {
    token: "CSHOP",
    apr: 25,
    stakePeriod: "60 days",
    totalStaked: 1000, // Filled for Stake Options
    tvlUsd: "68.78k", // Filled for Stake Options
    miningPool: { // Filled for Stake Options
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 100, // Filled for My Stake
    rewardEarned: "$300", // Filled for My Stake
    tokenUnlockPeriod: "2024-12-01", // Filled for My Stake
  },
  {
    token: "CSHOP",
    apr: 20,
    stakePeriod: "50 days",
    totalStaked: 800, // Filled for Stake Options
    tvlUsd: "60.35k", // Filled for Stake Options
    miningPool: { // Filled for Stake Options
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 80, // Filled for My Stake
    rewardEarned: "$240", // Filled for My Stake
    tokenUnlockPeriod: "2024-11-01", // Filled for My Stake
  },
  {
    token: "CSHOP",
    apr: 15,
    stakePeriod: "30 days",
    totalStaked: 500, // Filled for Stake Options
    tvlUsd: "50.28k", // Filled for Stake Options
    miningPool: { // Filled for Stake Options
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 50, // Filled for My Stake
    rewardEarned: "$150", // Filled for My Stake
    tokenUnlockPeriod: "2024-10-15", // Filled for My Stake
  },
  {
    token: "CSHOP",
    apr: 12,
    stakePeriod: "10 days",
    totalStaked: 300, // Filled for Stake Options
    tvlUsd: "12.6k", // Filled for Stake Options
    miningPool: { // Filled for Stake Options
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 30, // Filled for My Stake
    rewardEarned: "$90", // Filled for My Stake
    tokenUnlockPeriod: "2024-10-05", // Filled for My Stake
  },
  {
    token: "CSHOP",
    apr: 10,
    stakePeriod: "5 days",
    totalStaked: 100, // Filled for Stake Options
    tvlUsd: "5.00k", // Filled for Stake Options
    miningPool: { // Filled for Stake Options
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 10, // Filled for My Stake
    rewardEarned: "$30", // Filled for My Stake
    tokenUnlockPeriod: "2024-09-30", // Filled for My Stake
  },
];

export default STAKING_TABLE_DATA;
