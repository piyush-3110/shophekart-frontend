import { AxiosError } from "axios";

import { useToast } from "./use-toast";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useChainId, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { SiweService } from "@/services/";

const useSiweSignIn = () => {
  const { toast } = useToast();
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (): Promise<string | null> => {
      if (!walletAddress || !chainId) return null;

      const nonce = await SiweService.fetchNonce();

      const message = new SiweMessage({
        domain: window.location.host,
        address: walletAddress,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      const response = await SiweService.signIn({ signature, message });
      return response;
    },

    onSuccess(message) {
      toast({
        title: message ?? "Please connet your wallet",
        description: "You can now access all features of our application.",
        className: "text-[#02BC7D]",
      });
    },
  });

  const handleSignIn = async () => {
    if (!walletAddress || !chainId) return;
    try {
      await mutateAsync();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error signing in.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error signing in.",
        variant: "destructive",
      });
    }
  };

  return { isPending, handleSignIn, isSuccess };
};

export default useSiweSignIn;
