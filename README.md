# Avataar :: Decor & Gifts

React + TypeScript + Tailwind (v3) + React Router + Lucide.

    npm install
    npm run dev

- Products: `src/data/products.ts`  (add/edit here, images can go in `public/images/`)
- Business info, delivery charge, free-delivery limit: `src/data/business.ts`
- WhatsApp message format: `src/utils/whatsapp.ts`

For hosting on Netlify/Vercel add an SPA fallback so /product/... and /cart work on refresh.
