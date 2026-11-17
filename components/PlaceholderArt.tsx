const paletteList = [
  { tint: "#E4EBFF", strong: "#2B4BFF", ink: "#0B0B0C" },
  { tint: "#FFE6DE", strong: "#FF5A36", ink: "#0B0B0C" },
  { tint: "#DDF3E8", strong: "#0F9D6B", ink: "#0B0B0C" },
  { tint: "#FFF1C9", strong: "#E0A800", ink: "#0B0B0C" },
  { tint: "#EAE3FF", strong: "#6A4CFF", ink: "#0B0B0C" },
  { tint: "#DDEFF6", strong: "#1388B8", ink: "#0B0B0C" },
] as const;

function hashSeed(seed: string) {
  return Array.from(seed).reduce((acc, char) => acc * 31 + char.charCodeAt(0), 0);
}

export function PlaceholderArt({ seed }: { seed: string }) {
  const variant = Math.abs(hashSeed(seed)) % paletteList.length;
  const palette = paletteList[variant];

  return (
    <div aria-hidden="true" className="relative h-full w-full overflow-hidden" style={{ background: palette.tint }}>
      {variant === 0 && (
        <>
          <div className="absolute -left-[12%] top-[-25%] h-[75%] w-[75%] rounded-full bg-[var(--ink)]" style={{ background: palette.ink }} />
          <div className="absolute left-[8%] top-[55%] h-[22%] w-[22%] rounded-full" style={{ background: palette.strong }} />
        </>
      )}

      {variant === 1 && (
        <>
          <div className="absolute bottom-[-45%] left-[8%] h-[84%] w-[84%] rounded-full" style={{ background: palette.strong }} />
          <div className="absolute left-[60%] top-[12%] h-[14%] w-[14%]" style={{ background: palette.ink }} />
        </>
      )}

      {variant === 2 && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="absolute bottom-0"
              style={{
                left: `${10 + index * 16}%`,
                width: "9%",
                height: `${35 + index * 12}%`,
                background: index % 2 === 0 ? palette.ink : palette.strong,
              }}
            />
          ))}
        </>
      )}

      {variant === 3 && (
        <>
          <div
            className="absolute left-[8%] top-[12%] rounded-full"
            style={{
              width: "62%",
              height: "70%",
              backgroundImage: `radial-gradient(${palette.ink} 3px, transparent 3px)`,
              backgroundSize: "26px 26px",
            }}
          />
          <div className="absolute bottom-[10%] right-[8%] h-[26%] w-[26%] rounded-full" style={{ background: palette.strong }} />
        </>
      )}

      {variant === 4 && (
        <>
          <div
            className="absolute left-[-10%] top-[42%] h-[20%] w-[120%]"
            style={{ background: palette.ink, transform: "rotate(-16deg)" }}
          />
          <div
            className="absolute left-[-10%] top-[66%] h-[9%] w-[120%]"
            style={{ background: palette.strong, transform: "rotate(-16deg)" }}
          />
        </>
      )}

      {variant === 5 && (
        <>
          <div
            className="absolute right-[-12%] top-[8%] h-[62%] w-[62%] rounded-full border-[7px]"
            style={{ borderColor: palette.ink }}
          />
          <div className="absolute right-[2%] top-[24%] h-[38%] w-[38%] rounded-full border-[7px]" style={{ borderColor: palette.strong }} />
          <div className="absolute right-[12%] top-[36%] h-[14%] w-[14%] rounded-full" style={{ background: palette.ink }} />
        </>
      )}
    </div>
  );
}
