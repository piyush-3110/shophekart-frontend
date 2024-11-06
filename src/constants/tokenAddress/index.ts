export type TCurrencyType = "USDT" | "USDC" | "CSHOP" | "BNB";

export type TTokenAddress = {
	[key in TCurrencyType]: `0x${string}`;
};

const testnetTokenAddress: TTokenAddress = {
	CSHOP: "0x47C9CCfb227CdD45cCB4b17C0717CE1025206fB4",
	BNB: "0x0000000000000000000000000000000000000000",
	USDT: "0x1Ba1c8C5E4F2CB9cb2Ee116BeB5f185C59523A35",
	USDC: "0xA8Fa509180AD2646fF977a038496d9DAb070a88f",
};
const mainnetTokenAddress: TTokenAddress = {
	CSHOP: "0x9Ab5F58ec3D620F5d9D58d12Bf1ABF3560010A44",
	BNB: "0x0000000000000000000000000000000000000000",
	USDT: "0x55d398326f99059ff775485246999027b3197955",
	USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
};

const TOKEN_ADDRESS: TTokenAddress =
	process.env.NODE_ENV === "production"
		? mainnetTokenAddress
		: testnetTokenAddress;

export default TOKEN_ADDRESS;
