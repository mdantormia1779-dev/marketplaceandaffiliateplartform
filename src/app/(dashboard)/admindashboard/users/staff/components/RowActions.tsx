"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal, Eye, Pencil, Ban, CheckCircle2, Trash2 } from "lucide-react";

type Props = {
  suspended?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
};

const MENU_HEIGHT = 176;
const MENU_WIDTH = 176;

export default function RowActions({ suspended, onView, onEdit, onSuspend, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const openUp = window.innerHeight - r.bottom < MENU_HEIGHT;
      setPos({
        top: openUp ? r.top - MENU_HEIGHT - 4 : r.bottom + 4,
        left: Math.max(8, r.right - MENU_WIDTH),
      });
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const run = (fn?: () => void) => () => {
    setOpen(false);
    fn?.();
  };

  const item =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100";

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className={`rounded-md p-1.5 text-slate-500 hover:bg-slate-100 ${open ? "bg-slate-100" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ position: "fixed", top: pos.top, left: pos.left, width: MENU_WIDTH, zIndex: 9999 }}
            className="rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-lg"
          >
            <button type="button" role="menuitem" className={item} onClick={run(onView)}>
              <Eye className="h-4 w-4" /> View details
            </button>
            <button type="button" role="menuitem" className={item} onClick={run(onEdit)}>
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button type="button" role="menuitem" className={item} onClick={run(onSuspend)}>
              {suspended ? <CheckCircle2 className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
              {suspended ? "Activate" : "Suspend"}
            </button>
            <button
              type="button"
              role="menuitem"
              className={`${item} text-amber-700 hover:bg-amber-50`}
              onClick={run(onDelete)}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>,
          document.body
        )}
    </>
  );
}