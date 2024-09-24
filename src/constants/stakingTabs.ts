// src/constants/stakingTabs.ts

/**
 * Defines the available staking tabs.
 */
export enum StakingTab {
  /**
   * Tab for viewing and selecting stake options.
   */
  StakeOptions = "Stake options",
  /**
   * Tab for viewing and managing the user's stake.
   */
  MyStake = "My stake",
  // Add new enum values as needed
}

/**
 * Interface for a tab item.
 */
interface TabItem {
  /**
   * The title of the tab.
   */
  title: StakingTab;
  /**
   * Optional: any additional metadata for the tab.
   */
  metadata?: unknown;
}

/**
 * Array of available staking tabs.
 */
const STAKING_TABS: TabItem[] = [
  {
    title: StakingTab.StakeOptions,
    metadata: {
      // Example: additional metadata for the tab
      icon: "stake-options-icon",
    },
  },
  {
    title: StakingTab.MyStake,
    metadata: {
      icon: "my-stake-icon",
    },
  },
  // Add new tab items as needed
];

/**
 * Returns the available staking tabs.
 */
export function getStakingTabs(): TabItem[] {
  return STAKING_TABS;
}

/**
 * Returns a staking tab item by its title.
 */
export function getStakingTab(tabTitle: StakingTab): TabItem | undefined {
  return STAKING_TABS.find((tab) => tab.title === tabTitle);
}

export default STAKING_TABS;
