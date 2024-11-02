import { TOrder } from "@/types";
import { HttpRequestService } from ".";
import { OrderStatus } from "@/components/orderDetail/SingleDetail";
import { TCreateOrder } from "@/types/order";
import { calculateDeliveryDate } from "@/utils";

const orderservice = {
    async updateOrder(orderId: string, status: OrderStatus) {
        const { data: order } = await HttpRequestService.updateApi<
            TOrder,
            { orderId: string; status: OrderStatus }
        >("/order/update-status", {
            orderId,
            status,
        });

        return order;
    },

    async createOrder({ ...params }: TCreateOrderParams) {
        const response = await HttpRequestService.postApi<TOrder, TCreateOrder>(
            "/order/create",
            {
                buyerId: params.buyerId,
                deliveryBy: calculateDeliveryDate(params.shippingDuration),
                productId: params.productId,
                productIdOnChain: params.productIdOnChain,
                shippingPrice: params.shippingPrice,
                shippingAddress: params.shippingAddressId // Add the shipping address ID to the payload
            }
        );

        return response.data;
    },

    async deleteOrder(orderId:string){
        const response = await HttpRequestService.deleteApi<TOrder>(`/order/${orderId}`)

        return response.data
    },

    async udpateOrderNftId({orderId, nftId}:TUpdateNftIdParams){
        const response = await HttpRequestService.updateApi<TOrder, TUpdateNftIdParams>("/order/update-nft-id",{nftId,orderId})

        return response.data
    }
};

export default orderservice;


export type TCreateOrderParams = {
    productIdOnChain: number;
    shippingDuration: number;
    buyerId: string;
    productId: string;
    shippingPrice: number;
    shippingAddressId: string;
}

export type TUpdateNftIdParams = {nftId:number, orderId:string}
