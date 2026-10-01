import { Star } from "lucide-react";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={15}
          className={n <= rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}