export enum StakingTab {
  StakeOptions = "Stake options",
  MyStake = "My stake",
}

interface TabItem {
  title: StakingTab;
  metadata?: unknown;
}

const STAKING_TABS: TabItem[] = [
  {
    title: StakingTab.StakeOptions,
    metadata: {
      icon: "stake-options-icon",
    },
  },
  {
    title: StakingTab.MyStake,
    metadata: {
      icon: "my-stake-icon",
    },
  },
];

export default STAKING_TABS;
