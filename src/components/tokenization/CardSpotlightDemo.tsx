import { CardSpotlight } from "@/components/ui/card-spotlight";

interface CardSpotlightDemoProps {
  heading: string;
  description: string;
}

export function CardSpotlightDemo({ heading, description }: CardSpotlightDemoProps) {
  return (
    <CardSpotlight className="h-fit w-fit px-4 py-6">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        {heading}
      </p>

      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        {description}
      </p>
    </CardSpotlight>
  );
}