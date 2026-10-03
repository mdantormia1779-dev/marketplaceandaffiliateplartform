import OrdersView from "../all-orders/Allordercomponents/OrdersView";

const ShippedOrders = () => {
  return (
    <OrdersView
      title="Shipped Orders"
      subtitle="Orders handed to the carrier and on their way to customers."
      initialTab="Shipped"
    />
  );
};

export default ShippedOrders;