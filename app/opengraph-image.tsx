import { ImageResponse } from "next/og";

export const alt = "betreibermanager.de – Betreiberpflichten organisieren";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#173f33",
          color: "#f7faf8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div
            style={{
              width: 64,
              height: 70,
              borderRadius: 6,
              background: "#c4e48a",
              color: "#173f33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
            }}
          >
            B
          </div>
          betreibermanager.de
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.1 }}>Betreiberpflichten organisieren</div>
          <div style={{ fontSize: 34, color: "#cfd8d3" }}>Prüfungen, Fristen und Nachweise aus einer Hand</div>
        </div>
      </div>
    ),
    size,
  );
}
