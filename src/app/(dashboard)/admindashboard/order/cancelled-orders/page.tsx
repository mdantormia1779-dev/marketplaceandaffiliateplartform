import OrdersView from "../all-orders/Allordercomponents/OrdersView";

const CancelledOrders = () => {
  return (
    <OrdersView
      title="Cancelled Orders"
      subtitle="Orders cancelled by the customer, supplier or admin."
      initialTab="Cancelled"
    />
  );
};

export default CancelledOrders;