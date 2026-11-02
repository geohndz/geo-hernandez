import { Schibsted_Grotesk } from "next/font/google";

const grotesque = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function GraphicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${grotesque.className} gd min-h-dvh`}>
      <style>{`html,body{background:#F5F5F5 !important;color:#121212 !important}`}</style>
      {children}
    </div>
  );
}
