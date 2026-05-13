const REVIEWS_STORAGE_KEY = 'roastedCocoaProductReviews';

export const getProductReviews = (productId) => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const allReviews = stored ? JSON.parse(stored) : {};
    return allReviews[productId] || [];
  } catch (error) {
    console.error('Error reading reviews from storage:', error);
    return [];
  }
};

export const addProductReview = (productId, review) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const allReviews = stored ? JSON.parse(stored) : {};

    if (!allReviews[productId]) {
      allReviews[productId] = [];
    }

    const newReview = {
      id: Date.now().toString(),
      ...review,
      createdAt: new Date().toISOString(),
    };

    allReviews[productId].push(newReview);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews));
    return newReview;
  } catch (error) {
    console.error('Error saving review to storage:', error);
  }
};

export const getAverageRating = (productId) => {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  return (sum / reviews.length).toFixed(1);
};

export const getReviewCount = (productId) => {
  return getProductReviews(productId).length;
};
