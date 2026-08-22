import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f5f5",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: -0.5 }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: -1.6, lineHeight: 1.15 }}>
            Product designer who codes.
          </div>
          <div style={{ fontSize: 24, color: "#a1a1a1", maxWidth: 760 }}>
            {site.description}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
