import OrdersView from "../all-orders/Allordercomponents/OrdersView";

const PendingOder = () => {
  return (
    <OrdersView
      title="Pending Orders"
      subtitle="Orders awaiting payment confirmation or supplier acceptance."
      initialTab="Pending"
    />
  );
};

export default PendingOder;