import DashboardShell from "./Affiliatecomponents/DashboardShell";


export default function AffiliateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}