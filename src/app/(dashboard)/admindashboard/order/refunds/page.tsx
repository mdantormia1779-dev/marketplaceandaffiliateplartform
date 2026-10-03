import OrdersView from "../all-orders/Allordercomponents/OrdersView";

const Refunds = () => {
  return (
    <OrdersView
      title="Refunds"
      subtitle="Orders that have been refunded or are awaiting a refund."
      initialTab="Refunds"
    />
  );
};

export default Refunds;