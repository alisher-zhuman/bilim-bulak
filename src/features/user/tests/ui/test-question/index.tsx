"use client";
import { useState } from "react";

interface Option {
  id: string;
  label: string;
}

const OPTIONS: Option[] = [
  { id: "a1", label: "Көбүнчө туура" },
  { id: "a2", label: "Кээде" },
  { id: "a3", label: "Жок" },
];

export const TestQuestion = () => {
  const [selectedId, setSelectedId] = useState<string>("a1");

  return (
    <>
      <h2 className="font-semibold text-xl md:text-3xl mt-5 md:mt-10 text-center">
        Себепсиз тынчсызданам
      </h2>
      <div style={{ width: "100%", marginTop: 20, display: "grid", gap: 12 }}>
        {OPTIONS.map((opt) => {
          const isSelected = opt.id === selectedId;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedId(opt.id)}
              className="px-4 py-3"
              style={{
                width: "100%",
                borderRadius: 16,
                background: isSelected ? "rgba(21,112,239,0.08)" : "#fff",
                border: `2px solid ${isSelected ? "#1570EF" : "#E5E7EB"}`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 150ms ease",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  border: `2px solid ${isSelected ? "#1570EF" : "#D1D5DB"}`,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {isSelected ? (
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background: "#1570EF",
                    }}
                  />
                ) : null}
              </span>

              <span className="font-medium text-xl text-neutral-700">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
