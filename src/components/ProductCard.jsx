import { motion } from 'framer-motion';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import { getAverageRating, getReviewCount } from '../utils/reviewStorage';

function ProductCard({ product, onReviewClick }) {
  const whatsappMessage = product.whatsappMessage ||
    `Hi! I'd like to order "${product.name}"${product.price ? ` for ${product.price}` : ''}. Please confirm availability and quantity options.`;

  const whatsappUrl = `https://wa.me/919963781985?text=${encodeURIComponent(whatsappMessage)}`;

  const averageRating = getAverageRating(product.id);
  const reviewCount = getReviewCount(product.id);


  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[2rem] border border-espresso/10 bg-white/90 p-4 shadow-premium transition duration-300"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-espresso/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-espresso">{product.name}</h3>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-sm font-semibold text-cocoa">{product.price}</span>
        </div>
        <p className="text-sm leading-6 text-espresso/75">{product.description}</p>

        {(averageRating > 0 || reviewCount > 0) && (
          <div className="flex items-center gap-3 rounded-full bg-gold/10 px-3 py-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`h-3 w-3 ${index < Math.round(averageRating) ? 'text-gold' : 'text-gold/30'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-espresso">
              {averageRating} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-espresso/95"
        >
          <FaWhatsapp className="text-green-400" /> Order on WhatsApp
        </a>

        {onReviewClick && (
          <button
            type="button"
            onClick={() => onReviewClick(product.id)}
            className="inline-flex w-full items-center justify-center rounded-full border border-espresso/10 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-espresso transition hover:bg-espresso/5"
          >
            Write a review
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default ProductCard;
