import { StakingTableDataItem } from "@/types/stakingTableDataTypes";

/**
 * The staking table data.
 * @type {StakingTableDataItem[]}
 */
const STAKING_TABLE_DATA: StakingTableDataItem[] = [
  {
    /**
     * The token symbol.
     */
    token: "CSHOP",
    /**
     * The annual percentage rate.
     */
    apr: 25,
    /**
     * The staking period.
     */
    stakePeriod: "60 days",
    /**
     * The total staked amount.
     */
    totalStaked: 200562.8,
    /**
     * The total value locked in USD.
     */
    tvlUsd: "68.78k",
    /**
     * The mining pool data.
     */
    miningPool: {
      /**
       * The total tokens available in the mining pool.
       */
      totalTokens: 20000.0,
      /**
       * The current tokens available in the mining pool.
       */
      currentTokens: 18612.63,
    },
  },
  {
    token: "CSHOP",
    apr: 20,
    stakePeriod: "50 days",
    totalStaked: 195250.66,
    tvlUsd: "60.35k",
    miningPool: {
      totalTokens: 20000.0,
      currentTokens: 6585.22,
    },
  },
  {
    token: "CSHOP",
    apr: 15,
    stakePeriod: "30 days",
    totalStaked: 155807.25,
    tvlUsd: "50.28k",
    miningPool: {
      totalTokens: 20000.0,
      currentTokens: 2150.75,
    },
  },
  {
    token: "CSHOP",
    apr: 12,
    stakePeriod: "10 days",
    totalStaked: 65620.14,
    tvlUsd: "12.6k",
    miningPool: {
      totalTokens: 20000.0,
      currentTokens: 1058.45,
    },
  },
];

export default STAKING_TABLE_DATA;
