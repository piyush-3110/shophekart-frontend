"use client";
import { TextGenerateEffect} from "../../../ui/text-generate-effect";
 
const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;
 
export function TextGenerateEffectDemo() {
  return <div className="flex items-center w-full px-12 py-12 gap-4">
    <div>
    <TextGenerateEffect words={words} />
<p>Empower Your Marketplace Experience. Seamlessly Connect Your Wallet to Buy, Sell, and Trade Unique Items with CSHOP Cryptocurrency in a Secure, Decentralized Platform</p>
    </div>
  </div>;
}