interface MiningPoolData {
  /**
   * The total tokens available in the mining pool.
   * @type {number}
   */
  totalTokens: number;
  /**
   * The current tokens available in the mining pool.
   * @type {number}
   */
  currentTokens: number;
}

interface StakingTableDataItem {
  /**
   * The token symbol.
   * @type {string}
   */
  token: string;
  /**
   * The annual percentage rate.
   * @type {number}
   */
  apr: string;
  /**
   * The staking period (e.g., '60 days').
   * @type {string}
   */
  stakePeriod: string;
  /**
   * The total staked amount (for Stake Options).
   * @type {number | null}
   */
  totalStaked?: number | null;
  /**
   * The total value locked in USD (for Stake Options).
   * @type {string | null}
   */
  tvlUsd?: string | null;
  /**
   * The mining pool data (for Stake Options).
   * @type {MiningPoolData | null}
   */
  miningPool?: MiningPoolData | null;
  /**
   * The user's personal stake amount (for My Stake).
   * @type {number | null}
   */
  myStake?: number | null;
  /**
   * The rewards earned by the user (for My Stake).
   * @type {string | null}
   */
  rewardEarned?: string | null;
  /**
   * The token unlock period (for My Stake).
   * @type {string | null}
   */
  tokenUnlockPeriod?: string | null;
}

export type { MiningPoolData, StakingTableDataItem };
