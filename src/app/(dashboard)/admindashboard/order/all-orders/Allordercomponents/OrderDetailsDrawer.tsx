import { X, Package, User, Truck, Share2, CreditCard, Check } from "lucide-react";
import { Order, OrderStatus } from "./types";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order | null;
  onClose: () => void;
  onPrint: (id: string) => void;
  onAdvance: (id: string) => void;
}

const flow: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered"];

const Box = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="rounded-lg border p-4">
    <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase text-gray-500">
      <Icon size={14} /> {title}
    </div>
    {children}
  </div>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between py-0.5 text-sm">
    <span className="text-gray-500">{k}</span><span className="font-medium">{v}</span>
  </div>
);

export default function OrderDetailsDrawer({ order, onClose, onPrint, onAdvance }: Props) {
  if (!order) return null;
  const idx = flow.indexOf(order.status);
  const canAdvance = idx !== -1 && idx < flow.length - 1;
  const commission = order.affiliate ? (order.amount * 0.1).toFixed(2) : "0.00";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-start justify-between border-b p-5">
          <div>
            <h2 className="text-lg font-bold">{order.id}</h2>
            <p className="text-xs text-gray-500">Placed on {order.date} · {order.items.length} items</p>
          </div>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5">
          <div className="flex gap-2">
            <StatusBadge label={order.status} />
            <StatusBadge label={order.payment} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["Order Total", `$${order.amount.toFixed(2)}`],
              ["Items", String(order.items.length)],
              ["Commission", `$${commission}`],
              ["Payment", order.payment],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border bg-white p-3">
                <p className="text-xs text-gray-500">{k}</p>
                <p className="font-bold">{v}</p>
              </div>
            ))}
          </div>

          <Box title="Products" icon={Package}>
            {order.items.map((i) => (
              <div key={i.sku} className="flex justify-between py-2 text-sm">
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-xs text-gray-500">{i.sku}</p>
                </div>
                <span>x{i.qty} · ${i.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t pt-2 font-bold">
              <span>Subtotal</span><span>${order.amount.toFixed(2)}</span>
            </div>
          </Box>

          <div className="grid grid-cols-2 gap-3">
            <Box title="Customer" icon={User}>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-xs text-gray-500">{order.customer.email}</p>
              <p className="mt-2 text-xs text-gray-500">{order.customer.address}</p>
            </Box>
            <Box title="Supplier" icon={Truck}>
              <p className="font-medium">{order.supplier}</p>
              <Row k="Fulfilment" v={order.status === "Delivered" ? "Done" : "In progress"} />
            </Box>
          </div>

          {order.affiliate && (
            <Box title="Affiliate" icon={Share2}>
              <p className="font-medium">{order.affiliate.name}</p>
              <p className="text-xs text-gray-500">{order.affiliate.code}</p>
              <Row k="Commission earned" v={`$${commission}`} />
            </Box>
          )}

          <Box title="Payment" icon={CreditCard}>
            <Row k="Method" v={order.method} />
            <Row k="Status" v={order.payment} />
            <Row k="Transaction" v={order.transaction} />
          </Box>

          <Box title="Order Timeline" icon={Package}>
            {order.status === "Cancelled" ? (
              <p className="text-sm text-red-600">This order was cancelled.</p>
            ) : (
              <ul className="space-y-3">
                {["Order placed", "Payment confirmed", ...flow.slice(1)].map((step, n) => {
                  const done = n <= idx + 1;
                  return (
                    <li key={step} className="flex items-center gap-3 text-sm">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${done ? "bg-green-600 text-white" : "bg-gray-200"}`}>
                        {done && <Check size={12} />}
                      </span>
                      <span className={done ? "font-medium" : "text-gray-400"}>{step}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Box>
        </div>

        <div className="flex justify-end gap-2 border-t p-4">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm hover:bg-gray-100">Close</button>
          <button onClick={() => onPrint(order.id)} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">Print invoice</button>
          <button
            disabled={!canAdvance}
            onClick={() => onAdvance(order.id)}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-40"
          >
            Update status
          </button>
        </div>
      </aside>
    </>
  );
}