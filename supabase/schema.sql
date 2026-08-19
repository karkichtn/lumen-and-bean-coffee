-- =========================================================
-- LUMEN & BEAN ARTISAN ROASTERS - SUPABASE SCHEMA & SEED
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category_slug VARCHAR(50) REFERENCES categories(slug) ON DELETE SET NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    roast_level VARCHAR(30) DEFAULT 'Medium', -- Light, Medium, Medium-Dark, Dark
    origin VARCHAR(100),
    altitude VARCHAR(50),
    process VARCHAR(50), -- Washed, Natural, Honey, Anaerobic
    tasting_notes TEXT[] DEFAULT '{}',
    rating DECIMAL(2, 1) DEFAULT 4.9,
    reviews_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    image_url TEXT NOT NULL,
    grind_options TEXT[] DEFAULT ARRAY['Whole Bean', 'Espresso', 'Pour Over / V60', 'French Press', 'Aeropress', 'Cold Brew'],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(30),
    order_type VARCHAR(20) DEFAULT 'delivery', -- 'delivery' or 'pickup'
    shipping_address TEXT,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'confirmed', -- 'confirmed', 'roasting', 'out_for_delivery', 'completed'
    payment_status VARCHAR(30) DEFAULT 'paid',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(150) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    grind VARCHAR(50) DEFAULT 'Whole Bean',
    custom_options JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    guest_name VARCHAR(120) NOT NULL,
    guest_email VARCHAR(150) NOT NULL,
    guest_phone VARCHAR(30) NOT NULL,
    experience_type VARCHAR(50) DEFAULT 'Table Reservation', -- 'Table Reservation', 'Cupping Masterclass', 'Barista Pour-Over Lab'
    location_name VARCHAR(100) DEFAULT 'Downtown Roastery & Flagship',
    reservation_date DATE NOT NULL,
    time_slot VARCHAR(30) NOT NULL,
    party_size INT NOT NULL DEFAULT 2,
    special_requests TEXT,
    status VARCHAR(30) DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    roast_preference VARCHAR(50) NOT NULL, -- 'Light & Fruity', 'Balanced Medium', 'Dark & Rich', 'Roaster Curated'
    bag_size VARCHAR(30) NOT NULL, -- '250g', '500g', '1kg'
    frequency VARCHAR(30) NOT NULL, -- 'Weekly', 'Every 2 Weeks', 'Monthly'
    grind VARCHAR(50) NOT NULL DEFAULT 'Whole Bean',
    monthly_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(150),
    comment TEXT NOT NULL,
    tasting_tags TEXT[] DEFAULT '{}',
    is_verified_buyer BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public Read for Catalog, Categories & Reviews
CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public products read" ON products FOR SELECT USING (true);
CREATE POLICY "Public reviews read" ON reviews FOR SELECT USING (true);

-- Public Insert for Orders, Reservations, Subscriptions, and Reviews
CREATE POLICY "Public orders insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public order items insert" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public reservations insert" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public subscriptions insert" ON subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public reviews insert" ON reviews FOR INSERT WITH CHECK (true);

-- Public Read for own orders
CREATE POLICY "Public read own orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public read order items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Public read reservations" ON reservations FOR SELECT USING (true);
