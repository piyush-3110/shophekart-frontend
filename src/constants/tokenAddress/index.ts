type TAddress = `0x${string}`;

type TTokenAddress = {
  bnb: TAddress;
  cshop: TAddress;
  usdt: TAddress;
  usdc: TAddress;
};

const TOKEN_ADDRESS: TTokenAddress = {
  bnb: "0x0000000000000000000000000000000000000000",
  cshop: "0x47C9CCfb227CdD45cCB4b17C0717CE1025206fB4",
  usdt: "0x1Ba1c8C5E4F2CB9cb2Ee116BeB5f185C59523A35",
  usdc: "0xA8Fa509180AD2646fF977a038496d9DAb070a88f",
};

export default TOKEN_ADDRESS;