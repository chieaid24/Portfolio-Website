export default function HeroCorner({ className = "", size, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"          // <-- enables scaling
      // Option A: scale with font size by default
      width={size ?? "1em"}         // pass `size` to override (e.g., "64", "64px", 64)
      height={size ?? "1em"}
      preserveAspectRatio="xMidYMid meet" // keep shape undistorted
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path fill="currentColor" d="M0 0h64v22c0 23.196-18.804 42-42 42H0V0Z" />
    </svg>
  );
}


