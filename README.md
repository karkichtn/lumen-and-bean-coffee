# ☕ LUMEN & BEAN Co. — Artisan Specialty Coffee Roastery & Brew Bar

An ultra-premium, full-featured specialty coffee e-commerce web application and interactive tasting experience built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript**, **Vanilla CSS & Tailwind**, and **Supabase (PostgreSQL with RLS)**.

![Lumen and Bean Banner](https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80)

---

## ✨ Features

- ☕ **Single-Origin & Micro-Lot Catalog**: Curated seasonal harvests with agronomy metadata, elevation stats, SCA scores, grind selectors, and prices formatted in Indian Rupees (**₹**).
- 🧪 **Interactive Coffee Lab**: Real-time custom drink builder with live visual cup layers, milk alternatives (Oat, Almond, Macadamia), house syrups, cold foams, and instant caffeine/calorie calculation engines.
- ⏱️ **Barista Brew Guides & Stopwatch**: Step-by-step extraction guides (V60, Chemex, Aeropress, French Press) with dynamic coffee-to-water ratio calculators (1:16, 1:15, 1:12) and interactive timers.
- 📦 **Coffee Club Subscription Engine**: Automated recurring delivery wizard with 15% member savings, bag size options, delivery cadence, and instant checkout.
- 🛍️ **Smart Tasting Cart & Checkout**:
  - Live progress meter for free pan-India shipping on orders over ₹999.
  - Promo code engine (`WELCOME15` for 15% off, `BEANS20` for 20% off).
  - Delivery / cafe pickup fulfillment toggles.
  - 256-bit simulated encrypted card checkout with downloadable invoices.
- 🗓️ **Sanctuary Table & Masterclass Booking**: Book cafe tasting tables or reserve sensory cupping workshops led by certified Q-graders.
- 🗄️ **Dual-Layer Database Architecture**:
  - Zero-config instant local state persistence for testing.
  - Live cloud synchronization with **Supabase PostgreSQL** via Row Level Security (RLS) tables.
  - Built-in Supabase credentials manager and schema copy tool in the UI.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL with RLS)
- **Styling**: Vanilla CSS Design Tokens + Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Animations**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/karkichtn/lumen-and-bean-coffee.git
cd lumen-and-bean-coffee
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) in your browser.

---

## 🗄️ Supabase Setup (Optional)

The application works out of the box with zero configuration! To connect to your own Supabase project:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard and run the schema found in [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy your **Project URL** and **Anon API Key** into the in-app **Supabase Config Modal** (or define them in `.env.local`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 📦 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Soft caramel & velvet latte design system
│   │   ├── layout.tsx           # Root layout with fonts, metadata, and modals
│   │   └── page.tsx             # Main storefront landing page
│   ├── components/
│   │   ├── Navbar.tsx           # Widescreen navigation with status indicators
│   │   ├── Hero.tsx             # Headline with live roastery status & steam animation
│   │   ├── ProductCatalog.tsx   # 4-column responsive coffee catalog with filters
│   │   ├── ProductModal.tsx     # Micro-lot origin story & grind selector
│   │   ├── CoffeeLabCustomizer.tsx # Interactive visual drink builder
│   │   ├── BrewGuides.tsx       # Live extraction timers & ratio calculators
│   │   ├── SubscriptionBuilder.tsx # Recurring coffee club builder
│   │   ├── LocationsSection.tsx # Flagship roasteries and cafes
│   │   ├── ReviewsSection.tsx   # Verified customer cupping reviews
│   │   ├── CartDrawer.tsx       # Shopping cart with free shipping meter
│   │   ├── CheckoutModal.tsx    # Encrypted checkout and receipt generator
│   │   ├── ReservationModal.tsx # Table & masterclass reservation booking
│   │   ├── SupabaseConfigModal.tsx # Live database connection manager
│   │   ├── ToastContainer.tsx   # Floating notification alerts
│   │   └── Footer.tsx           # Chronicle newsletter and roastery links
│   └── lib/
│       ├── coffeeData.ts        # Products, brew guides, cafes, and reviews in ₹
│       ├── store.tsx            # Global state store with Supabase synchronization
│       └── supabase.ts          # Supabase client helper
├── supabase/
│   └── schema.sql               # PostgreSQL tables, triggers, and RLS policies
└── next.config.ts               # Next.js image domain configurations
```

---

## 📜 License

MIT License. Designed and crafted with passion for coffee connoisseurs.
