import { FiMapPin, FiStar, FiCheckCircle } from "react-icons/fi";
import { formatReviewDate, type Review } from "@/data/reviews";

const AVATAR_COLORS = [
  "from-blue-600 to-blue-800",
  "from-indigo-500 to-blue-700",
  "from-sky-500 to-blue-600",
  "from-blue-700 to-indigo-800",
  "from-cyan-600 to-blue-700",
];

export default function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase() || "S";
  const colorIndex =
    review.name.charCodeAt(0) % AVATAR_COLORS.length;

  return (
    <figure className="card-hover group bg-white rounded-[24px] p-7 border border-border/50 shadow-sm hover:shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar
              key={i}
              size={15}
              className={
                i < review.rating ? "fill-accent text-accent" : "text-gray-300"
              }
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-text-muted">
          {formatReviewDate(review.date)}
        </span>
      </div>

      <blockquote className="text-sm text-text-muted leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-border/60">
        <span
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${AVATAR_COLORS[colorIndex]} flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-primary/20 ring-2 ring-white shrink-0`}
        >
          {initial}
        </span>
        <div className="min-w-0">
          <p className="font-bold text-secondary text-sm truncate">
            {review.name}
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1 truncate">
            <FiMapPin className="text-primary shrink-0" size={11} />
            {review.route}
          </p>
        </div>
        {review.verified && (
          <span
            className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full shrink-0"
            title="Verified review"
          >
            <FiCheckCircle size={12} />
            Verified
          </span>
        )}
      </figcaption>
    </figure>
  );
}
