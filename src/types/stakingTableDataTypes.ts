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
  apr: number;
  /**
   * The staking period.
   * @type {string}
   */
  stakePeriod: string;
  /**
   * The total staked amount.
   * @type {number}
   */
  totalStaked: number;
  /**
   * The total value locked in USD.
   * @type {string}
   */
  tvlUsd: string;
  /**
   * The mining pool data.
   * @type {MiningPoolData}
   */
  miningPool: MiningPoolData;
}

export type { MiningPoolData, StakingTableDataItem };
