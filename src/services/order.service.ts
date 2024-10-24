import { TOrder } from "@/types";
import { HttpRequestService } from ".";

const orderservice = {
  async updateOrder(orderId: string, status: string) {
    const { data: order } = await HttpRequestService.updateApi<
      TOrder,
      { orderId: string; status: string }
    >("/order/update-status", {
      orderId,
      status,
    });

    return order;
  },
};

export default orderservice;
