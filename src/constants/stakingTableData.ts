import { StakingTableDataItem } from "@/types/stakingTableDataTypes";

const STAKING_TABLE_DATA: StakingTableDataItem[] = [
  {
    token: "CSHOP",
    apr: 25,
    stakePeriod: "60 days",
    totalStaked: 1000,
    tvlUsd: "68.78k",
    miningPool: {
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 100,
    rewardEarned: "$300",
    tokenUnlockPeriod: "2024-12-01",
  },
  {
    token: "CSHOP",
    apr: 20,
    stakePeriod: "50 days",
    totalStaked: 800,
    tvlUsd: "60.35k",
    miningPool: {
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 80,
    rewardEarned: "$240",
    tokenUnlockPeriod: "2024-11-01",
  },
  {
    token: "CSHOP",
    apr: 15,
    stakePeriod: "30 days",
    totalStaked: 500,
    tvlUsd: "50.28k",
    miningPool: {
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 50,
    rewardEarned: "$150",
    tokenUnlockPeriod: "2024-10-15",
  },
  {
    token: "CSHOP",
    apr: 12,
    stakePeriod: "10 days",
    totalStaked: 300,
    tvlUsd: "12.6k",
    miningPool: {
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 30,
    rewardEarned: "$90",
    tokenUnlockPeriod: "2024-10-05",
  },
  {
    token: "CSHOP",
    apr: 10,
    stakePeriod: "5 days",
    totalStaked: 100,
    tvlUsd: "5.00k",
    miningPool: {
      totalTokens: 0,
      currentTokens: 0,
    },
    myStake: 10,
    rewardEarned: "$30",
    tokenUnlockPeriod: "2024-09-30",
  },
];

export default STAKING_TABLE_DATA;
