const statusStyles = {
  "In Stock": "bg-green-100 text-green-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

export default function ProductCard({
  title,
  description,
  price,
  sku,
  thumbnail,
  availabilityStatus,
  rating,
  reviews = [],
  tags = [],
}) {
  return (
    <article className="flex flex-col w-72  overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="h-48 w-full object-cover bg-gray-100"
        loading="lazy"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Estado + SKU */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              statusStyles[availabilityStatus] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {availabilityStatus}
          </span>
          <span className="text-xs text-gray-400">SKU: {sku}</span>
        </div>

        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Rating + reviews */}
        <div className="flex items-center gap-1 text-sm">
          <span className="text-amber-500">★</span>
          <span className="font-medium text-gray-800">
            {rating?.toFixed(1)}
          </span>
          {reviews.length > 0 && (
            <span className="text-gray-400">({reviews.length} reviews)</span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}

        {/* Precio */}
        <p className="mt-auto pt-2 text-xl font-bold text-gray-900">
          ${price?.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
