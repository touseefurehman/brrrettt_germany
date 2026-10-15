import type { ReactNode } from "react";

type IconProps = { size?: number; strokeWidth?: number };

function Icon({ name, size = 24, strokeWidth = 2, children }: IconProps & { name: string; children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-${name}`}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: IconProps) => (
  <Icon name="arrow-up-right" {...p}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </Icon>
);

export const ArrowRight = (p: IconProps) => (
  <Icon name="arrow-right" {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon name="menu" {...p}>
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </Icon>
);

export const X = (p: IconProps) => (
  <Icon name="x" {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon name="check" {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const Minus = (p: IconProps) => (
  <Icon name="minus" {...p}>
    <path d="M5 12h14" />
  </Icon>
);

export const Plus = (p: IconProps) => (
  <Icon name="plus" {...p}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Icon>
);

export const CircleCheck = (p: IconProps) => (
  <Icon name="circle-check" {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const ShieldCheck = (p: IconProps) => (
  <Icon name="shield-check" {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const CalendarDays = (p: IconProps) => (
  <Icon name="calendar-days" {...p}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </Icon>
);

export const FileCheckCorner = (p: IconProps) => (
  <Icon name="file-check-corner" {...p}>
    <path d="M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="m14 20 2 2 4-4" />
  </Icon>
);

export const Network = (p: IconProps) => (
  <Icon name="network" {...p}>
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
    <path d="M12 12V8" />
  </Icon>
);

export const ClipboardList = (p: IconProps) => (
  <Icon name="clipboard-list" {...p}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </Icon>
);

export const Zap = (p: IconProps) => (
  <Icon name="zap" {...p}>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </Icon>
);

export const Flame = (p: IconProps) => (
  <Icon name="flame" {...p}>
    <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
  </Icon>
);

export const ArrowUpDown = (p: IconProps) => (
  <Icon name="arrow-up-down" {...p}>
    <path d="m21 16-4 4-4-4" />
    <path d="M17 20V4" />
    <path d="m3 8 4-4 4 4" />
    <path d="M7 4v16" />
  </Icon>
);

export const Wind = (p: IconProps) => (
  <Icon name="wind" {...p}>
    <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
    <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
    <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
  </Icon>
);

export const Gauge = (p: IconProps) => (
  <Icon name="gauge" {...p}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </Icon>
);

export const Building2 = (p: IconProps) => (
  <Icon name="building2 lucide-building-2" {...p}>
    <path d="M10 12h4" />
    <path d="M10 8h4" />
    <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
    <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
  </Icon>
);

export const MoveUpRight = (p: IconProps) => (
  <Icon name="move-up-right" {...p}>
    <path d="M13 5H19V11" />
    <path d="M19 5L5 19" />
  </Icon>
);
