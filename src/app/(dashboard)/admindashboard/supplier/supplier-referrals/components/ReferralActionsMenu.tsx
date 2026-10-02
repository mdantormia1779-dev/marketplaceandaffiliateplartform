"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Ban, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface ReferralActionsMenuProps {
  onView: () => void;
  onEdit: () => void;
  onApprove: () => void;
  onMarkPaid: () => void;
  onReject: () => void;
  onSuspend: () => void;
  onDelete: () => void;
}

export default function ReferralActionsMenu(props: ReferralActionsMenuProps) {
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Table er overflow er karone menu kete jay, tai "fixed" position e dekhai
  const toggle = () => {
    if (pos) return setPos(null);
    const r = btnRef.current!.getBoundingClientRect();
    setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
  };

  // scroll / resize hole menu bondho
  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [pos]);

  // item e click -> menu bondho + kaj
  const run = (fn: () => void) => () => {
    setPos(null);
    fn();
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        className="rounded p-1 text-gray-500 hover:bg-gray-100"
        aria-label="Row actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {pos && (
        <>
          {/* bairer e click korle bondho */}
          <div className="fixed inset-0 z-40" onClick={() => setPos(null)} />
          <div
            style={{ top: pos.top, right: pos.right }}
            className="fixed z-50 w-52 rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg"
          >
            <Item onClick={run(props.onView)} icon={<Eye size={15} />}>View details</Item>
            <Item onClick={run(props.onEdit)} icon={<Pencil size={15} />}>Edit</Item>
            <Item onClick={run(props.onApprove)}>Approve referral</Item>
            <Item onClick={run(props.onMarkPaid)}>Mark reward paid</Item>
            <Item onClick={run(props.onReject)} amber>Reject referral</Item>
            <Item onClick={run(props.onSuspend)} icon={<Ban size={15} />}>Suspend</Item>
            <Item onClick={run(props.onDelete)} icon={<Trash2 size={15} />} amber>Delete</Item>
          </div>
        </>
      )}
    </>
  );
}

function Item({
  children, icon, amber, onClick,
}: { children: ReactNode; icon?: ReactNode; amber?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm hover:bg-gray-50 ${
        amber ? "text-amber-700" : "text-gray-800"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}