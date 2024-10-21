import { SiweMessage } from "siwe";
import { HttpRequestService } from ".";

type TSiweSignInProps = {
  signature: `0x${string}`;
  message: SiweMessage;
};

const siweService = {
  async signIn({ signature, message }: TSiweSignInProps): Promise<string> {
    const response = await HttpRequestService.postApi<null, TSiweSignInProps>(
      "/user/verify",
      { signature, message }
    );
    return response.message;
  },

  async fetchNonce(): Promise<string> {
    const {
      data: { nonce },
    } = await HttpRequestService.fetchApi<{ nonce: string }>("/user/nonce");
    return nonce;
  },

  async logout() {
    const response = await HttpRequestService.postApi<null, null>(
      "/user/logout"
    );

    localStorage.removeItem("user");

    return { ...response };
  },
};

export default siweService;
