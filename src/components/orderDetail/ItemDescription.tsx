import WalletAddressWithCopy from "../shared/WalletAddressWithCopy";
import { OrderStatus } from "./SingleDetail";
import OrderHistoryPrice from "../purchaseHistory/OrderHistoryPrice";
import { FC } from "react";

interface ItemDescriptionProps {
	title: string;
	description: string;
	price: number;
	shipping: Date;
	type: string;
	currencyType: string;
	walletAddress: `0x${string}`;
	status: OrderStatus;
	category: string;
	nftId: number;
}

const ItemDescription: FC<ItemDescriptionProps> = ({
	title,
	description,
	price,
	shipping,
	type,
	currencyType,
	walletAddress,
	status,
	category,
	nftId,
}) => {
	return (
		<div className="bg-white p-4 shadow-lg rounded-lg w-full pb-4 lg:w-full">
			<h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
			<p className="text-md text-neutral-600 mb-8">{description}</p>

			<div className="space-y-2">
				<div className="flex justify-between text-gray-700 text-sm">
					<span className="font-bold">Type:</span>
					<span className="capitalize">
						{type === "FixedProduct" ? "Buy Now" : "Auction"}
					</span>
				</div>
				<div className="flex justify-between text-gray-700 text-sm">
					<span className="font-bold">NFT Id:</span>
					<span className="capitalize">{nftId}</span>
				</div>
				<div className="flex justify-between text-gray-700 text-sm">
					<span className="font-bold">Category:</span>
					<span className="capitalize">{category}</span>
				</div>
				<div className="flex justify-between text-gray-700 text-sm">
					<span className="font-bold">Price:</span>
					<OrderHistoryPrice
						currencyType={currencyType}
						soldPrice={price}
						className="text-sm"
					/>
				</div>
				<div className="flex justify-between text-gray-700 text-sm">
					<span className="font-bold">Delivery by:</span>
					<span>{new Date(shipping).toLocaleDateString()}</span>
				</div>
				<div className="flex justify-between text-gray-700 text-sm">
					<span className="font-bold">Wallet Address:</span>
					<WalletAddressWithCopy
						walletAddress={walletAddress}
						className="text-sm font-normal"
					/>
				</div>
				<div className="flex justify-between text-gray-700 text-sm">
					<span className="font-bold">Status:</span>
					<span className="capitalize">{status}</span>
				</div>
			</div>
		</div>
	);
};

export default ItemDescription;
