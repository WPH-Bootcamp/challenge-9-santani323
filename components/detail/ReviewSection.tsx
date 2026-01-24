interface Review {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ReviewSection({
  reviews,
  averageRating,
  totalReviews,
}: ReviewSectionProps) {
  return (
    <section className="mt-14">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Review</h2>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="font-semibold text-lg">
            {averageRating} ({totalReviews} Ulasan)
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-400">
                {review.user.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-lg">
                    {review.user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {review.user.name}
                </h3>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < review.star ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          Show More
        </button>
      </div>
    </section>
  );
}
