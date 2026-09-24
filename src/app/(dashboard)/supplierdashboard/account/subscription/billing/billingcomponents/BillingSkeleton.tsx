const block = "animate-pulse rounded-xl bg-slate-200/70";

export default function BillingSkeleton() {
  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${block} h-100 lg:col-span-2`} />
        <div className={`${block} h-100`} />
      </section>
      <div className="grid gap-6 md:grid-cols-3">
        <div className={`${block} h-36`} /><div className={`${block} h-36`} /><div className={`${block} h-36`} />
      </div>
      <div className={`${block} h-72`} />
    </>
  );
}