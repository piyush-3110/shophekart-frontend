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
    totalStaked: 0,
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
      totalTokens: 0,
      /**
       * The current tokens available in the mining pool.
       */
      currentTokens: 0,
    },
  },
  {
    token: "CSHOP",
    apr: 20,
    stakePeriod: "50 days",
    totalStaked: 0,
    tvlUsd: "60.35k",
    miningPool: {
      totalTokens:0,
      currentTokens:0,
    },
  },
  {
    token: "CSHOP",
    apr: 15,
    stakePeriod: "30 days",
    totalStaked:0,
    tvlUsd: "50.28k",
    miningPool: {
      totalTokens: 0,
      currentTokens: 0,
    },
  },
  {
    token: "CSHOP",
    apr: 12,
    stakePeriod: "10 days",
    totalStaked: 0,
    tvlUsd: "12.6k",
    miningPool: {
      totalTokens:0,
      currentTokens:0,
    },
  },
];

export default STAKING_TABLE_DATA;
