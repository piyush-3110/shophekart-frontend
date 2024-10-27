import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type Props = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
  text?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const ERROR_CLASSNAME =
  "text-destructive flex flex-col items-center justify-center h-full p-8 space-y-4";

function FetchError({ refetch, text, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(ERROR_CLASSNAME, className)}
      aria-live="assertive"
      aria-atomic="true"
      aria-labelledby="fetch-error-title"
      aria-describedby="fetch-error-description"
    >
      <h2 id="fetch-error-title" className="text-2xl font-bold">
        {text ?? "Failed to Load Data"}
      </h2>
      <p id="fetch-error-description" className="text-lg">
        We apologize for the inconvenience. Please try again to retrieve the
        data.
      </p>
      <Button
        aria-label="Retry failed fetch operation"
        variant={"destructive"}
        onClick={() => refetch()}
      >
        Retry
      </Button>
    </div>
  );
}

export default FetchError;
