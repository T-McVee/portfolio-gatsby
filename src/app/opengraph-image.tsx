import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tim McVinish | Senior Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(https://tmcvee.com/images/bg-splash-back.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(255, 250, 233, 0.6), rgba(255, 255, 255, 0.85))",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Tim McVinish
          </h1>
          <p
            style={{
              fontSize: "48px",
              color: "#4a4a4a",
              textAlign: "center",
            }}
          >
            Senior Software Developer
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
