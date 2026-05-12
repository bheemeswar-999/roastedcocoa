# Roasted Cocoa — Premium Homemade Chocolate Shop

A responsive React + Vite + Tailwind CSS storefront for a luxury homemade chocolate and gift hamper business.

## Features
- Modern premium chocolate brand design
- Responsive layout for desktop and mobile
- Sticky blurred navbar on scroll
- Smooth animations using Framer Motion
- Products loaded from a shared `src/data/products.js`
- WhatsApp ordering with prefilled messages
- About page, products page, contact page, and footer

## Project Structure
- `src/`
  - `components/` — reusable UI components
  - `pages/` — page views for Home, Products, About, Contact
  - `data/products.js` — product definitions and image paths
  - `index.css` — Tailwind styling and global theme
  - `App.jsx` — route composition and layout
- `public/images/` — local product and hero images

## Where to place your chocolate images
Place your real images in `public/images/`.
The project currently uses these local image paths:
- `/images/hero-banner.jpg`
- `/images/dark-chocolate.jpg`
- `/images/almond-chocolate.jpg`
- `/images/chocolate-truffles.jpg`
- `/images/birthday-gift-box.jpg`
- `/images/festival-chocolate-hamper.jpg`
- `/images/customized-name-chocolates.jpg`

## Recommended image sizes
- Hero banner: `1600x900` or wider for full-screen impact
- Product cards: `1200x800` or `800x600`
- Keep file sizes under `250 KB` for fast loading
- Use `JPEG` or optimized `WebP` if possible

## How to replace images later
1. Save your new image under `public/images/`.
2. Use the same filename as the placeholder or update the `image` path in `src/data/products.js`.
3. Refresh the site to see the new image.

## Running locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev -- --host
   ```
3. Open the displayed local URL in your browser.

## Upload to GitHub
1. Initialize a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial premium chocolate shop website"
   ```
2. Create a repository on GitHub.
3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/yourusername/roasted-cocoa.git
   git branch -M main
   git push -u origin main
   ```

## Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **New Project** and import your GitHub repository.
3. Choose the project root and ensure the framework is set to **Vite**.
4. Set build command to:
   ```bash
   npm run build
   ```
5. Set output directory to:
   ```bash
   dist
   ```
6. Deploy the site and view the live URL.

## Admin page
Open `/admin` in your browser to manage product cards and customer orders.
- Sign in with email: `kcommando89@gmail.com`
- Password: `kc@986kc`
- Add new products with image uploads directly from the browser
- Preview and remove products from the local admin store
- Capture customer orders with email or phone number
- Orders and products are stored locally in browser storage

## Notes
- All pages are built with clean reusable components.
- The WhatsApp button opens chat with a prefilled order request.
- Customize text, pricing, and images to suit your brand.
