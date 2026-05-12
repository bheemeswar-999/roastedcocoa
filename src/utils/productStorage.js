const PRODUCT_STORAGE_KEY = 'roastedCocoaProducts';

export function getStoredProducts() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(PRODUCT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to load stored products:', error);
    return [];
  }
}

export function setStoredProducts(products) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to save stored products:', error);
  }
}
