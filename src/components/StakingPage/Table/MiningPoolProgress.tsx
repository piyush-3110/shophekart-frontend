/**
 * @file MiningPoolProgress.tsx
 * @description A component that displays the progress of a mining pool.
 */

import { Progress } from "@/components/ui/progress";

/**
 * @interface MiningPoolProgressProps
 * @description Props for the MiningPoolProgress component.
 * @property {number} totalTokens - The total number of tokens in the mining pool.
 * @property {number} currentTokens - The current number of tokens in the mining pool.
 */
interface MiningPoolProgressProps {
  /**
   * The total number of tokens in the mining pool.
   */
  totalTokens: number;
  /**
   * The current number of tokens in the mining pool.
   */
  currentTokens: number;
}

/**
 * @function MiningPoolProgress
 * @description A component that displays the progress of a mining pool.
 * @param {MiningPoolProgressProps} props - The props for the component.
 * @returns The component's JSX.
 */
const MiningPoolProgress: React.FC<MiningPoolProgressProps> = ({
  /**
   * The total number of tokens in the mining pool.
   */
  totalTokens,
  /**
   * The current number of tokens in the mining pool.
   */
  currentTokens,
}) => {
  /**
   * Calculate the progress of the mining pool as a percentage.
   */
  const progress = ((currentTokens / totalTokens) * 100).toFixed(2);
  return (
    <div className="space-y-4 w-[75%]" data-testid="mining-pool-progress">
      <div className="flex gap-4 justify-between">
        <span>
          {currentTokens.toFixed(2)}/{totalTokens.toFixed(2)}
        </span>
        <span>{progress}%</span>
      </div>
      <Progress value={parseFloat(progress)} />
    </div>
  );
};

export default MiningPoolProgress;
