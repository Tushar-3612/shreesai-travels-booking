import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export default function Card({
  title,
  subtitle,
  actions,
  children,
  className = "",
  bodyClassName = "p-6",
}: CardProps) {
  return (
    <div className={`adm-card ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-0">
          <div>
            {title && (
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
