"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { config } from "@/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";
import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { SiweService, UserService } from "@/services";
import { createSiweMessage, parseSiweMessage } from "viem/siwe";
import { useUserStore } from "@/store";

// Setup queryClient
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function Web3ModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);
  const { authStatus, setAuthStatus, setUser } = useUserStore();

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        const response = await UserService.getProfile();
        setAuthStatus(
          response.walletAddress ? "authenticated" : "unauthenticated"
        );
        setUser(response);
      } catch {
        setAuthStatus("unauthenticated");
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    // 1. page loads
    fetchStatus();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", fetchStatus);
    return () => window.removeEventListener("focus", fetchStatus);
  }, [setAuthStatus, setUser]);

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const nonce = await SiweService.fetchNonce();
      return nonce;
    },
    createMessage: ({ nonce, address, chainId }) => {
      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });

      return message;
    },

    verify: async ({ message, signature }) => {
      try {
        const verifyRes = await SiweService.signIn({
          signature,
          message: parseSiweMessage(message),
        });

        if (verifyRes) {
          setAuthStatus(verifyRes ? "authenticated" : "unauthenticated");
        }

        return verifyRes;
      } catch {
        return false;
      }
    },

    signOut: async () => {
      await SiweService.logout();
      setUser(null);
      setAuthStatus("unauthenticated");
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={authStatus}
        >
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
