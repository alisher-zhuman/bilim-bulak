import Image from "next/image";
import type { CourseVideoItem } from "@/entities/user/courses/model/types";

interface Props {
  video: CourseVideoItem;
  onOpen: (video: CourseVideoItem) => void;
}

export const VideoCard = ({ video, onOpen }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      style={{
        width: 360,
        borderRadius: 24,
        padding: 16,
        background: "#fff",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        border: "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 220,
          borderRadius: 24,
          overflow: "hidden",
          background: "#F5F5F5",
          position: "relative",
        }}
      >
        <Image
          src="/images/fallback-video-preview.webp"
          alt={video.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="360px"
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 999,
              background: "rgba(255,255,255,0.95)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "14px solid transparent",
                borderBottom: "14px solid transparent",
                borderLeft: "22px solid #1570EF",
                marginLeft: 4,
              }}
            />
          </div>
        </div>
      </div>

      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {video.title}
      </h3>
    </button>
  );
};
