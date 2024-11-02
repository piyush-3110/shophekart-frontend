import { FC } from "react";
import { ProductCard } from "../Profile/ProductCard";
import { TCurrencyType } from "@/types/product";
import OrderHistoryPrice from "./OrderHistoryPrice";
import UpdateOrderStatus from "../orderDetail/UpdateOrderStatus";
import { OrderStatus } from "../orderDetail/SingleDetail";

interface ItemData {
    imageUrl: string;
    category: string;
    status: OrderStatus;
    title: string;
    description: string;
    type: string;
    soldPrice: number;
    nftId: number;
    orderId: string;
    currencyType: TCurrencyType;
}

interface TableProps {
    headers: { title: string; span?: number }[];
    data: ItemData[];
}

const TableForSeller: FC<TableProps> = ({ headers, data }) => {

    return (
        <div className="relative w-full py-4">
            <div className="w-full py-4 overflow-x-auto scrollbar-hide">
                <div className="grid grid-cols-7 min-w-[800px] text-left font-bold text-[#6B6F93] text-[18px] py-4">
                    {headers.map((header, index) => (
                        <p key={index} className={`col-span-${header.span || 1}`}>
                            {header.title}
                        </p>
                    ))}
                </div>

                {/* Table Entries */}
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-7 gap-4 min-w-[800px] items-center py-4"
                    >
                        <div className="col-span-2">
                            <ProductCard
                                imageUrl={item.imageUrl}
                                category={item.category}
                                status={item.status}
                                title={item.title}
                                description={item.description}
                                orderId={item.orderId}
                            />
                        </div>
                        <p className="text-[#160041] text-sm">{item.type}</p>
                        <OrderHistoryPrice
                            currencyType={item.currencyType}
                            soldPrice={item.soldPrice}
                        />
                        {item.status==="pending" && <UpdateOrderStatus currentOrderStatus={item.status} orderId={item.orderId} className="flex-row gap-5 items-center" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableForSeller;
