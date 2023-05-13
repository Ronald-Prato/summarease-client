import { Header } from "@/components";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="" />
      {children}
    </div>
  );
}
