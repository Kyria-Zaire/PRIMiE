/** Pictogrammes navigation menu — SVG inline, sans dépendance. */

type IconProps = {
  readonly className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  "aria-hidden": true as const,
  focusable: false as const,
};

export function NavHomeIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6.5 10.5V19h11V10.5" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

export function NavScissorsIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.25" />
      <circle cx="6" cy="18" r="2.25" />
      <path d="M8.2 7.8 20 18" />
      <path d="M8.2 16.2 20 6" />
    </svg>
  );
}

export function NavSparklesIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3.5 1.2 3.6 3.8.3-2.9 2.5.9 3.7L12 11.8 9 13.9l.9-3.7-2.9-2.5 3.8-.3L12 3.5Z" />
      <path d="M18.5 4.5v2.5M19.75 5.75H17.25" />
      <path d="M5 15.5v2M6 16.5H4" />
    </svg>
  );
}

export function NavQuestionIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.25" />
      <path d="M9.8 9.6a2.4 2.4 0 1 1 3.5 2.1c-.9.5-1.3 1-1.3 2" />
      <path d="M12 16.8h.01" />
    </svg>
  );
}

export function NavCalendarIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.75" y="5.5" width="16.5" height="14" rx="2" />
      <path d="M3.75 10h16.5" />
      <path d="M8 3.75v3.5M16 3.75v3.5" />
    </svg>
  );
}

export function NavPhoneIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.2 3.8h2.2l1.1 3.2-1.5 1.1a10 10 0 0 0 4.5 4.5l1.1-1.5 3.2 1.1v2.2a1.5 1.5 0 0 1-1.6 1.5A12.4 12.4 0 0 1 5.7 5.4 1.5 1.5 0 0 1 7.2 3.8Z" />
    </svg>
  );
}

export function NavCloseIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round">
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

export function NavChevronIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...base} className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function NavWhatsAppIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.96.52 3.8 1.44 5.4L2 22l4.92-1.55a9.86 9.86 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.93 6.4 17.5 2 12.04 2Zm5.75 13.99c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.12.1-1.81-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.93-4.37-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.29.57-.36.76-.36h.55c.17 0 .4-.07.63.48.24.56.81 1.97.88 2.11.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 1.99 1.11.98 2.04 1.29 2.33 1.43.29.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.67-.17 1.34Z" />
    </svg>
  );
}

export function NavOrnament({ className = "h-4 w-24 text-gold/70" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M4 8h40" strokeLinecap="round" />
      <path
        d="M60 2.5c2.2 2.2 2.2 5.8 0 8-2.2-2.2-2.2-5.8 0-8Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="M54 5.5c1.8 1.4 1.8 3.6 0 5M66 5.5c-1.8 1.4-1.8 3.6 0 5" strokeLinecap="round" />
      <path d="M76 8h40" strokeLinecap="round" />
    </svg>
  );
}

const NAV_ICON_BY_ID = {
  accueil: NavHomeIcon,
  services: NavScissorsIcon,
  galerie: NavSparklesIcon,
  faq: NavQuestionIcon,
  reserver: NavCalendarIcon,
  contact: NavPhoneIcon,
} as const;

export function NavItemIcon({
  id,
  className = "size-5 shrink-0 text-gold",
}: {
  readonly id: string;
  readonly className?: string;
}) {
  const Icon = NAV_ICON_BY_ID[id as keyof typeof NAV_ICON_BY_ID];
  if (!Icon) {
    return null;
  }
  return <Icon className={className} />;
}
