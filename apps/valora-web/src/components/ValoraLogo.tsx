interface ValoraLogoProps {
  className?: string;
  compact?: boolean;
}

export const ValoraLogo = ({ className = "", compact = false }: ValoraLogoProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      style={{
        WebkitFontSmoothing: "antialiased"
      }}
    >
      <svg
        width={compact ? 26 : 42}
        height={compact ? 26 : 42}
        viewBox="0 0 42 42"
        aria-hidden
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="valora-sheen" x1="12%" y1="0%" x2="88%" y2="100%">
            <stop offset="0%" stopColor="#d9e8ff" />
            <stop offset="48%" stopColor="#9fb6d3" />
            <stop offset="100%" stopColor="#607796" />
          </linearGradient>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width="40.5"
          height="40.5"
          rx="11"
          fill="url(#valora-sheen)"
          fillOpacity="0.08"
          stroke="url(#valora-sheen)"
          strokeOpacity="0.25"
        />
        <path
          d="M12.5 26.75c-.83 0-1.5-.67-1.5-1.5v-4.5c0-.83.67-1.5 1.5-1.5h5.25c.83 0 1.5.67 1.5 1.5v4.5c0 .83-.67 1.5-1.5 1.5H12.5Zm11-4.5c-.83 0-1.5-.67-1.5-1.5v-6c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-5Z"
          fill="url(#valora-sheen)"
          fillOpacity="0.35"
        />
        <path
          d="M22.85 27.96c.52-.52 1.36-.52 1.88 0l4.88 4.88a1.33 1.33 0 0 1-1.88 1.88l-4.88-4.88c-.52-.52-.52-1.36 0-1.88Z"
          fill="url(#valora-sheen)"
          fillOpacity="0.65"
        />
        <circle cx="28.5" cy="13.5" r="3.25" fill="url(#valora-sheen)" />
        <circle cx="34.5" cy="19.5" r="2.5" fill="url(#valora-sheen)" />
        <circle cx="24" cy="22.5" r="2.75" fill="url(#valora-sheen)" />
        <path
          d="M26.5 14c-.83 0-1.5.67-1.5 1.5 0 .83.67 1.5 1.5 1.5 1.25 0 2.5.5 3.54 1.54 1.04 1.04 1.46 1.83 1.46 3.46 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-2.35-.76-4.1-2.5-5.84C29.76 14.76 28.05 14 26.5 14Z"
          fill="url(#valora-sheen)"
        />
      </svg>
      {!compact && (
        <p className="text-2xl font-semibold uppercase tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-br from-[#e2ecff] via-[#a2b8d4] to-[#6c819d]">
          VALORA
        </p>
      )}
    </div>
  );
};
