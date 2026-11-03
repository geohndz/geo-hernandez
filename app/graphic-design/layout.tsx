import localFont from "next/font/local";

const grotesque = localFont({
  src: [
    { path: "../fonts/SchibstedGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SchibstedGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/SchibstedGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export default function GraphicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${grotesque.className} gd min-h-svh`}>
      <style>{`html,body{background:#F5F5F5 !important;color:#121212 !important}`}</style>
      {children}
    </div>
  );
}
