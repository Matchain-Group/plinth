# Plinth — Lagos Rental Listings (Portfolio Demo)

Frontend-only Next.js 14 + Tailwind site. Mock data, no backend — built for a
social media / Upwork portfolio piece.

## Before you deploy

 Open `lib/listings.ts` and replace `WHATSAPP_NUMBER` with your real WhatsApp
   number in international format, no `+` or spaces (e.g. `2348012345678`).


## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push this folder to a GitHub repo and import it at vercel.com/new — zero
config needed, Vercel auto-detects Next.js.

## Deploy to Railway

Railway can also run this directly: create a new project from this repo,
it'll detect Next.js and use `npm run build` / `npm run start` automatically.
Just make sure the `PORT` env var is respected (Next.js handles this by
default on Railway).

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next/font (Fraunces, Inter, IBM Plex Mono) — auto-optimized, no manual font
  files needed
