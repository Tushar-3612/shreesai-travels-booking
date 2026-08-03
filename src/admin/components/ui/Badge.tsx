import type { ReactNode } from "react";

type BadgeTone = "green" | "amber" | "rose" | "blue" | "slate" | "purple";

const TONES: Record<BadgeTone, string> = {
  green: "adm-badge-green",
  amber: "adm-badge-amber",
  rose: "adm-badge-rose",
  blue: "adm-badge-blue",
  slate: "adm-badge-slate",
  purple: "adm-badge-purple",
};

export default function Badge({
  tone,
  children,
}: {
  tone: BadgeTone;
  children: ReactNode;
}) {
  return <span className={`adm-badge ${TONES[tone]}`}>{children}</span>;
}
