import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anjali Shrestha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#F5F0E8",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          background: "#BB764E",
          borderRadius: 16,
          marginBottom: 40,
        }}>
          <span style={{ color: "#F7F4EF", fontSize: 36, fontWeight: "bold" }}>a.</span>
        </div>
        <div style={{ fontSize: 56, fontWeight: 400, color: "#1C1917", lineHeight: 1.1, marginBottom: 20 }}>
          Anjali Shrestha
        </div>
        <div style={{ fontSize: 24, color: "#78716C", fontStyle: "italic" }}>
          Living slowly, noticing more.
        </div>
      </div>
    ),
    { ...size }
  );
}
