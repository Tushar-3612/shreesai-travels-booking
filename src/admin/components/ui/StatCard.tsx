import Link from "next/link";
import type { IconType } from "react-icons";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconType;
  tone: "blue" | "green" | "amber" | "rose" | "purple" | "slate";
  href?: string;
  hint?: string;
}

const TONES: Record<
  StatCardProps["tone"],
  { bg: string; text: string; glow: string }
> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", glow: "shadow-blue-600/10" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", glow: "shadow-emerald-600/10" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", glow: "shadow-amber-600/10" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", glow: "shadow-rose-600/10" },
  purple: { bg: "bg-violet-50", text: "text-violet-600", glow: "shadow-violet-600/10" },
  slate: { bg: "bg-slate-100", text: "text-slate-600", glow: "shadow-slate-600/10" },
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  tone,
  href,
  hint,
}: StatCardProps) {
  const toneStyles = TONES[tone];
  const content = (
    <div
      className={`adm-card p-5 hover:shadow-lg hover:shadow-slate-200/70 hover:-translate-y-0.5 transition-all duration-300 ${toneStyles.glow}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 leading-none">
            {value}
          </p>
          {hint && <p className="text-[11px] text-slate-400 mt-2">{hint}</p>}
        </div>
        <div
          className={`w-11 h-11 rounded-xl ${toneStyles.bg} ${toneStyles.text} flex items-center justify-center shrink-0`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
