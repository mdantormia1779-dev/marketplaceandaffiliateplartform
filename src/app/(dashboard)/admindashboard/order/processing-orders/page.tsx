import OrdersView from "../all-orders/Allordercomponents/OrdersView";

const ProcessingOrders = () => {
  return (
    <OrdersView
      title="Processing Orders"
      subtitle="Orders being prepared and packed by suppliers."
      initialTab="Processing"
    />
  );
};

export default ProcessingOrders;