function calculateDeliveryDate(shippingDuration: number): string {
  const currentDate = new Date();
  let workingDays = shippingDuration;
  const deliveryDate = new Date(currentDate);

  while (workingDays > 0) {
    const dayOfWeek = deliveryDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays--;
    }
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  return deliveryDate.toISOString().split("T")[0];
}

export default calculateDeliveryDate;
