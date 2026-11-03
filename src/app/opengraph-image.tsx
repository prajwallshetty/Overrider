import { ImageResponse } from "next/og";

export const alt = "Override-R — Intelligent Fire & Building Safety Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0d1117", color: "white", padding: 72, fontFamily: "sans-serif", backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: "#d4271d", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 30, height: 30, borderRadius: 30, border: "4px solid white" }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 4, display: "flex" }}>
            OVERRIDE<span style={{ color: "#ef4d42" }}>-R</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Engineering</div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1, display: "flex" }}>
            <span style={{ color: "#ef4d42" }}>Safer</span>&nbsp;Buildings.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", letterSpacing: 3, textTransform: "uppercase" }}>Intelligent Fire &amp; Building Safety Technology</div>
      </div>
    ),
    size,
  );
}
