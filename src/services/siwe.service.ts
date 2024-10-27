// import { SiweMessage } from "siwe";
import { HttpRequestService } from ".";

type TSiweSignInProps = {
  signature: `${string}`;
  message: unknown;
};

const siweService = {
  async signIn({ signature, message }: TSiweSignInProps): Promise<boolean> {
    const response = await HttpRequestService.postApi<null, TSiweSignInProps>(
      "/user/verify",
      { signature, message }
    );
    return response.success;
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
