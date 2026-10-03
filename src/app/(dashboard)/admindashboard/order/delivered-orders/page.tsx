import OrdersView from "../all-orders/Allordercomponents/OrdersView";

const DeliveredOrders = () => {
  return (
    <OrdersView
      title="Delivered Orders"
      subtitle="Orders that have reached the customer successfully."
      initialTab="Delivered"
    />
  );
};

export default DeliveredOrders;