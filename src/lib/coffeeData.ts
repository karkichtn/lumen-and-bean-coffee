export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  price: number;
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark' | 'Cold Draft' | 'Equipment' | 'Bakery';
  origin: string;
  altitude?: string;
  process?: string;
  tastingNotes: string[];
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isBestseller: boolean;
  inStock: boolean;
  imageUrl: string;
  grindOptions: string[];
  specs?: {
    varietal?: string;
    acidity?: 'Low' | 'Medium' | 'High' | 'Crisp Citrus';
    body?: 'Silky' | 'Medium' | 'Full & Heavy' | 'Velvety';
    harvestDate?: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  tastingTags: string[];
  isVerifiedBuyer: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  grind?: string;
  isCustomDrink?: boolean;
  customDetails?: {
    size: string;
    milk: string;
    roast: string;
    sweetness: number;
    extraShots: number;
    syrups: string[];
    temperature: string;
    topping: string;
    calories: number;
    caffeineMg: number;
  };
}

export interface Reservation {
  id?: string;
  bookingCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  experienceType: 'Table Reservation' | 'Cupping Masterclass' | 'Barista Pour-Over Lab' | 'Private Roastery Tour';
  locationName: string;
  reservationDate: string;
  timeSlot: string;
  partySize: number;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt?: string;
}

export interface Subscription {
  id?: string;
  customerName: string;
  customerEmail: string;
  roastPreference: 'Light & Fruity' | 'Balanced Medium' | 'Dark & Rich' | 'Roaster Curated Surprise';
  bagSize: '250g (15-18 Cups)' | '500g (30-36 Cups)' | '1kg (60-70 Cups)';
  frequency: 'Weekly (Best Freshness)' | 'Every 2 Weeks' | 'Monthly';
  grind: string;
  monthlyPrice: number;
  status: 'active' | 'paused';
}

export interface BrewGuide {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master Barista';
  time: string;
  ratio: string;
  grindSize: string;
  waterTemp: string;
  description: string;
  imageUrl: string;
  steps: {
    title: string;
    durationSeconds: number;
    instruction: string;
    waterAmount?: string;
  }[];
}

export interface CafeLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  hours: string;
  todayHours: string;
  isOpenNow: boolean;
  phone: string;
  features: string[];
  imageUrl: string;
  googleMapsUrl: string;
}

// ----------------------------------------------------
// DEFAULT DATASETS WITH INDIAN RUPEE (₹) PRICING
// ----------------------------------------------------

export const CATEGORIES: Category[] = [
  {
    id: 'cat-all',
    slug: 'all',
    name: 'All Roasts & Menu',
    description: 'Explore our complete curation of specialty single origins, blends and crafted drinks',
    icon: 'Coffee',
    displayOrder: 0,
  },
  {
    id: 'cat-1',
    slug: 'single-origin',
    name: 'Single Origin',
    description: 'Exceptional microlots directly sourced from premier high-altitude volcanic estates',
    icon: 'Globe',
    displayOrder: 1,
  },
  {
    id: 'cat-2',
    slug: 'signature-blends',
    name: 'Signature Blends',
    description: 'Harmonious house roasts engineered for depth, balance, and sweetness',
    icon: 'Sparkles',
    displayOrder: 2,
  },
  {
    id: 'cat-3',
    slug: 'espresso-bar',
    name: 'Espresso Bar',
    description: 'Velvety espresso creations, iced specialty lattes, and artisan botanicals',
    icon: 'Flame',
    displayOrder: 3,
  },
  {
    id: 'cat-4',
    slug: 'cold-brew-nitro',
    name: 'Cold Brew & Nitro',
    description: '24-hour slow steeped cold brews and creamy nitrogen-infused drafts',
    icon: 'Snowflake',
    displayOrder: 4,
  },
  {
    id: 'cat-5',
    slug: 'artisan-pastries',
    name: 'Artisan Bakery',
    description: 'Freshly baked viennoiserie, croissants & treats made with pure European butter',
    icon: 'Croissant',
    displayOrder: 5,
  },
  {
    id: 'cat-6',
    slug: 'brewing-gear',
    name: 'Brewing Equipment',
    description: 'Precision hand grinders, ceramic drippers, scales and artisan glassware',
    icon: 'Sliders',
    displayOrder: 6,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'ethiopia-yirgacheffe-gedeb',
    name: 'Ethiopia Yirgacheffe Gedeb',
    categorySlug: 'single-origin',
    description: 'A stellar Grade 1 microlot cultivated by 650 smallholders in the Banko Gotiti area of Gedeb, Yirgacheffe. Grown at breathtaking altitudes over 2,200 meters in iron-rich loam soil, this lot undergoes meticulous cherry sorting and 72-hour spring water washing followed by raised-bed sun drying. In the cup, it bursts with crystalline floral notes of night-blooming jasmine, sparkling bergamot tea, and sweet Meyer lemon curd.',
    shortDescription: 'Floral jasmine, wild bergamot, Meyer lemon & wildflower honey finish',
    price: 850,
    roastLevel: 'Light',
    origin: 'Gedeb, Yirgacheffe, Ethiopia',
    altitude: '2,100 – 2,300m',
    process: 'Washed (Grade 1)',
    tastingNotes: ['Bergamot Tea', 'Jasmine Blossom', 'Meyer Lemon', 'Wildflower Honey'],
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    isBestseller: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Whole Bean', 'Pour Over / V60', 'Aeropress', 'French Press', 'Espresso', 'Cold Brew'],
    specs: {
      varietal: 'Heirloom Ethiopian Varietals',
      acidity: 'Crisp Citrus',
      body: 'Silky',
      harvestDate: 'Current Micro-Crop',
    },
  },
  {
    id: 'prod-2',
    slug: 'colombia-huila-pink-bourbon',
    name: 'Colombia Huila Pink Bourbon',
    categorySlug: 'single-origin',
    description: 'The ultra-rare Pink Bourbon varietal is famed for its high glucose content and mesmerizing tropical profile. Grown by master producer Jairo Ruiz in San Agustin, Huila, this lot undergoes a 48-hour anaerobic cherry maceration in sealed stainless steel bioreactors before traditional natural drying. The result is explosive pink guava, passionfruit syrup, juicy blood orange, and velvety chocolate praline.',
    shortDescription: 'Exotic passionfruit, juicy pink guava, panela cane sugar & chocolate',
    price: 920,
    roastLevel: 'Light',
    origin: 'San Agustin, Huila, Colombia',
    altitude: '1,850 – 2,000m',
    process: 'Anaerobic Natural',
    tastingNotes: ['Pink Guava', 'Passionfruit', 'Blood Orange', 'Milk Chocolate Praline'],
    rating: 5.0,
    reviewsCount: 98,
    isFeatured: true,
    isBestseller: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Whole Bean', 'Pour Over / V60', 'Aeropress', 'French Press', 'Espresso'],
    specs: {
      varietal: 'Pink Bourbon (100%)',
      acidity: 'Medium',
      body: 'Velvety',
      harvestDate: 'Selected Estate Lot',
    },
  },
  {
    id: 'prod-3',
    slug: 'guatemala-antigua-los-volcanes',
    name: 'Guatemala Antigua Los Volcanes',
    categorySlug: 'single-origin',
    description: 'Nestled between the Agua, Fuego, and Acatenango volcanoes, Antigua’s microclimate yields one of the world’s most balanced and comforting cups. Shade-grown under native Inga trees, this washed coffee boasts deep molten dark chocolate notes, toasted almond brittle, spiced red crisp apple, and a lingering brown butter finish.',
    shortDescription: 'Molten dark chocolate, roasted almond brittle & spiced red apple',
    price: 790,
    roastLevel: 'Medium',
    origin: 'Antigua Valley, Guatemala',
    altitude: '1,600 – 1,800m',
    process: 'Fully Washed & Sun Dried',
    tastingNotes: ['Bittersweet Dark Chocolate', 'Toasted Almond', 'Spiced Apple', 'Brown Butter'],
    rating: 4.8,
    reviewsCount: 116,
    isFeatured: true,
    isBestseller: false,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Whole Bean', 'Pour Over / V60', 'Espresso', 'French Press', 'Moka Pot'],
    specs: {
      varietal: 'Bourbon & Caturra',
      acidity: 'Medium',
      body: 'Full & Heavy',
      harvestDate: 'Volcanic Soil Estate',
    },
  },
  {
    id: 'prod-4',
    slug: 'velvet-midnight-house-roast',
    name: 'Velvet Midnight House Roast',
    categorySlug: 'signature-blends',
    description: 'Our iconic signature dark roast, engineered for maximum richness and body without acrid bitterness. We combine washed volcanic Sumatra Mandheling with naturally processed Brazilian Cerrado beans, roasted slowly into the second crack to caramelize the natural sucrose. Yields decadent Belgian fudge, toasted hazelnut, and pipe smoke maple syrup.',
    shortDescription: 'Decadent Belgian fudge, toasted hazelnut & sweet smoky maple body',
    price: 720,
    roastLevel: 'Dark',
    origin: 'Sumatra, Indonesia & Minas Gerais, Brazil',
    altitude: '1,400 – 1,700m',
    process: 'Wet-Hulled & Natural Blend',
    tastingNotes: ['Belgian Dark Fudge', 'Smoky Maple', 'Toasted Hazelnut', 'Black Cherry'],
    rating: 4.9,
    reviewsCount: 230,
    isFeatured: true,
    isBestseller: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Whole Bean', 'Espresso', 'French Press', 'Moka Pot', 'Pour Over / V60'],
    specs: {
      varietal: 'Typica, Catuai & Mundo Novo',
      acidity: 'Low',
      body: 'Full & Heavy',
      harvestDate: 'Continuous Fresh Roasts',
    },
  },
  {
    id: 'prod-5',
    slug: 'aurora-morning-radiance',
    name: 'Aurora Morning Radiance Blend',
    categorySlug: 'signature-blends',
    description: 'Designed as the definitive sunrise brew. A radiant blend of washed Costa Rican Tarrazú and high-grown Kenya Nyeri. Crisp clementine zest balances perfectly with golden clover honey and creamy butterscotch, finishing clean and revitalizing.',
    shortDescription: 'Bright clementine citrus, butterscotch candy & golden clover honey',
    price: 690,
    roastLevel: 'Medium',
    origin: 'Tarrazú, Costa Rica & Nyeri, Kenya',
    altitude: '1,650 – 1,900m',
    process: 'Double Washed',
    tastingNotes: ['Clementine Zest', 'Butterscotch', 'Golden Honey', 'Earl Grey Tea'],
    rating: 4.8,
    reviewsCount: 89,
    isFeatured: false,
    isBestseller: false,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Whole Bean', 'Pour Over / V60', 'Aeropress', 'French Press', 'Drip Machine'],
    specs: {
      varietal: 'SL28, SL34 & Caturra',
      acidity: 'Medium',
      body: 'Silky',
      harvestDate: 'Fresh Seasonal Blend',
    },
  },
  {
    id: 'prod-6',
    slug: 'nitro-vanilla-cloud-cold-brew',
    name: 'Nitro Vanilla Bean Draft Cold Brew',
    categorySlug: 'cold-brew-nitro',
    description: 'Steeped cold for 24 hours using our Velvet Midnight roast, infused under 45 PSI pure nitrogen, and lightly aromatized with real Madagascar vanilla bean caviar. Served ice-cold from draft taps with a cascading velvet foam head.',
    shortDescription: 'Draft nitro cold brew with Madagascar vanilla bean & chocolate crema',
    price: 290,
    roastLevel: 'Cold Draft',
    origin: 'Crafted In-House Daily',
    tastingNotes: ['Madagascar Vanilla', 'Rich Fudge', 'Creamy Microfoam', 'Brown Sugar'],
    rating: 4.9,
    reviewsCount: 175,
    isFeatured: true,
    isBestseller: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Ready to Drink (Draft Cup 16oz)', 'Growler 32oz Takeaway (+ ₹150)'],
  },
  {
    id: 'prod-7',
    slug: 'pistachio-cardamom-iced-latte',
    name: 'Artisan Pistachio Cardamom Latte',
    categorySlug: 'espresso-bar',
    description: 'A double shot of our Los Volcanes espresso pulled over house-made Sicilian pistachio butter milk and a slow reduction of green Guatemala cardamom pods. Finished with cold sweet cream foam and crushed raw emerald pistachios.',
    shortDescription: 'Double espresso, roasted pistachio milk, green cardamom & sweet cold foam',
    price: 340,
    roastLevel: 'Medium',
    origin: 'Crafted In-House Barista Specialty',
    tastingNotes: ['Sicilian Pistachio', 'Green Cardamom', 'Sweet Foam', 'Dark Espresso'],
    rating: 5.0,
    reviewsCount: 310,
    isFeatured: true,
    isBestseller: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Iced Chilled (16oz)', 'Hot Steamed (12oz)'],
  },
  {
    id: 'prod-8',
    slug: 'smoked-sea-salt-caramel-latte',
    name: 'Smoked Maldon Caramel Latte',
    categorySlug: 'espresso-bar',
    description: 'Slow-simmered artisanal brown sugar caramel seasoned with flaky Maldon smoked sea salt, pulled through a double ristretto of Velvet Midnight and steamed micro-velvet oat or whole milk.',
    shortDescription: 'Velvety burnt caramel, smoky Maldon salt flakes & double ristretto espresso',
    price: 320,
    roastLevel: 'Medium-Dark',
    origin: 'Crafted In-House Barista Specialty',
    tastingNotes: ['Maldon Sea Salt', 'Burnt Caramel', 'Madagascar Vanilla', 'Silky Milk'],
    rating: 4.9,
    reviewsCount: 192,
    isFeatured: false,
    isBestseller: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Hot Steamed (12oz)', 'Hot Large (16oz)', 'Iced Chilled (16oz)'],
  },
  {
    id: 'prod-9',
    slug: 'almond-croissant-valrhona',
    name: 'Valrhona Dark Chocolate Almond Croissant',
    categorySlug: 'artisan-pastries',
    description: 'Three-day laminated French pastry made with 84% butterfat Normandy butter, stuffed with whipped Valencia almond frangipane and batons of Valrhona 70% dark Guanaja chocolate. Topped with toasted sliced almonds and powdered sugar.',
    shortDescription: '84% French butter lamination, almond frangipane & Valrhona chocolate',
    price: 260,
    roastLevel: 'Bakery',
    origin: 'Baked In-House Every Dawn',
    tastingNotes: ['Normandy Butter', 'Almond Frangipane', 'Valrhona 70% Cocoa'],
    rating: 4.9,
    reviewsCount: 87,
    isFeatured: false,
    isBestseller: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Standard Fresh', 'Warmed & Crisped'],
  },
  {
    id: 'prod-10',
    slug: 'precision-v60-ceramic-dripper',
    name: 'Ceramic V60 Artisan Brew Station Set',
    categorySlug: 'brewing-gear',
    description: 'Hand-crafted Japanese matte charcoal ceramic dripper with internal spiral ribbing designed for maximum thermal stability and optimal brew flow. Includes an olive wood base ring, a 600ml borosilicate glass decanter server, and 100 organic paper filters.',
    shortDescription: 'Japanese matte charcoal dripper, olive wood base, glass server & filters',
    price: 2450,
    roastLevel: 'Equipment',
    origin: 'Crafted in Arita, Japan',
    tastingNotes: ['Precision Spiral Ribs', 'Heat Retention', 'Pure Borosilicate'],
    rating: 5.0,
    reviewsCount: 64,
    isFeatured: false,
    isBestseller: false,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85',
    grindOptions: ['Matte Obsidian Black', 'Glazed Ivory Sand', 'Deep Espresso Bronze'],
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    authorName: 'Aarav Sharma',
    rating: 5,
    title: 'The cleanest Ethiopian pour-over I have tasted in years',
    comment: 'The bergamot and jasmine aromatics hit you the second the hot bloom begins. In the cup, it is crisp, juicy, and has this lingering sweet honey note. Absolutely world class.',
    tastingTags: ['Jasmine', 'Bergamot', 'V60 Pour-over'],
    isVerifiedBuyer: true,
    createdAt: '2 days ago',
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    authorName: 'Rhea Kapoor',
    rating: 5,
    title: 'Exotic tropical explosion!',
    comment: 'The anaerobic Pink Bourbon is unlike anything else. You get vibrant passionfruit and pink guava on the first sip. Shipped fresh with roast date clearly marked.',
    tastingTags: ['Pink Guava', 'Passionfruit', 'Sweet'],
    isVerifiedBuyer: true,
    createdAt: '4 days ago',
  },
  {
    id: 'rev-3',
    productId: 'prod-7',
    authorName: 'Devansh Mehta',
    rating: 5,
    title: 'Addictive pistachio iced latte',
    comment: 'The roasted pistachio milk with green cardamom is pure alchemy. Best signature latte in town hands down!',
    tastingTags: ['Pistachio', 'Cardamom', 'Creamy'],
    isVerifiedBuyer: true,
    createdAt: '1 week ago',
  },
  {
    id: 'rev-4',
    productId: 'prod-4',
    authorName: 'Ananya Verma',
    rating: 5,
    title: 'Rich dark roast without any bitterness',
    comment: 'I usually prefer medium roasts because dark roasts can taste burnt, but Velvet Midnight is smooth, chocolaty, and deeply satisfying with oat milk.',
    tastingTags: ['Belgian Fudge', 'Smoky Maple', 'Espresso'],
    isVerifiedBuyer: true,
    createdAt: '1 week ago',
  }
];

export const BREW_GUIDES: BrewGuide[] = [
  {
    id: 'guide-v60',
    name: 'V60 Pour-Over',
    subtitle: 'Crisp, articulate cup that highlights delicate floral & fruit notes',
    icon: 'Droplets',
    difficulty: 'Intermediate',
    time: '3:15 min',
    ratio: '1:16 (15g Coffee : 240g Water)',
    grindSize: 'Medium-Fine (like sea salt)',
    waterTemp: '93°C / 200°F',
    description: 'The conical V60 with 60-degree angle and spiral ribs allows you to control flow rate for an exceptionally clean cup with shimmering clarity.',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    steps: [
      {
        title: 'Rinse & Pre-Heat',
        durationSeconds: 30,
        instruction: 'Place filter paper in V60 dripper. Rinse thoroughly with hot water to remove paper taste and preheat the decanter. Discard rinse water.',
        waterAmount: 'Hot water flush',
      },
      {
        title: 'The Bloom (Initial Soak)',
        durationSeconds: 45,
        instruction: 'Add 15g freshly ground coffee. Start timer and gently pour 45g of hot water in concentric spirals. Let coffee degas and bloom for 45s.',
        waterAmount: '45g Water',
      },
      {
        title: 'First Continuous Pour',
        durationSeconds: 45,
        instruction: 'Pour continuously in gentle slow circles from center outward, keeping water stream steady until reaching 150g total weight.',
        waterAmount: 'Pour to 150g',
      },
      {
        title: 'Final Pour & Drawdown',
        durationSeconds: 75,
        instruction: 'Pour final stream up to 240g total. Give the V60 a gentle swirl to ensure a flat bed. Allow total drawdown to finish around 3:15.',
        waterAmount: 'Pour to 240g',
      },
    ],
  },
  {
    id: 'guide-french-press',
    name: 'Immersion French Press',
    subtitle: 'Rich, velvety body with decadent chocolate and nut oils preserved',
    icon: 'Coffee',
    difficulty: 'Beginner',
    time: '4:30 min',
    ratio: '1:15 (30g Coffee : 450g Water)',
    grindSize: 'Coarse (like breadcrumbs)',
    waterTemp: '95°C / 203°F',
    description: 'Total immersion brewing allows natural aromatic coffee oils and micro-solids to infuse fully for a heavy, comforting, and viscous mouthfeel.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    steps: [
      {
        title: 'Pre-warm & Add Grounds',
        durationSeconds: 30,
        instruction: 'Preheat the French press vessel with boiling water, discard, and add 30g coarse ground coffee.',
      },
      {
        title: 'Total Pour & Saturate',
        durationSeconds: 30,
        instruction: 'Start timer and pour all 450g of hot water vigorously to submerge every ground evenly. Place lid on top without pressing.',
        waterAmount: '450g Water',
      },
      {
        title: 'Break the Crust',
        durationSeconds: 30,
        instruction: 'At 4:00 minutes, remove lid and gently stir the floating coffee crust 3 times with a spoon. Scoop off excess foam on top.',
      },
      {
        title: 'Press & Decant Immediately',
        durationSeconds: 30,
        instruction: 'Insert plunger and press down slowly with steady pressure. Decant immediately into cups or a carafe to prevent over-extraction.',
      },
    ],
  },
  {
    id: 'guide-aeropress',
    name: 'Aeropress Inverted Method',
    subtitle: 'Punchy, sweet extraction combining pressure and full immersion',
    icon: 'Gauge',
    difficulty: 'Intermediate',
    time: '2:00 min',
    ratio: '1:12 (18g Coffee : 220g Water)',
    grindSize: 'Medium-Fine',
    waterTemp: '88°C / 190°F',
    description: 'Using the inverted technique prevents any premature drip-through, giving maximum sweetness, punchy acidity, and zero bitterness.',
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    steps: [
      {
        title: 'Setup Inverted & Dose',
        durationSeconds: 30,
        instruction: 'Set Aeropress inverted (plunger on bottom). Add 18g medium-fine coffee into the chamber.',
      },
      {
        title: 'Pour & Agitate',
        durationSeconds: 45,
        instruction: 'Pour 220g of 88°C water over 15 seconds. Stir vigorously back-and-forth 10 times to ensure thorough extraction.',
        waterAmount: '220g Water',
      },
      {
        title: 'Cap & Invert',
        durationSeconds: 15,
        instruction: 'Rinse paper filter, lock cap securely onto Aeropress, and carefully invert the entire assembly onto your server.',
      },
      {
        title: 'Smooth Plunge',
        durationSeconds: 30,
        instruction: 'Press down with gentle arm weight for 30 seconds until you hear a soft hiss. Stop before compressing the puck.',
      },
    ],
  },
];

export const CAFE_LOCATIONS: CafeLocation[] = [
  {
    id: 'loc-1',
    name: 'Downtown Roastery & Flagship Lab',
    tagline: 'Custom cast-iron roasters, cupping bar & glass atrium',
    address: '428 Artisan Way, Heritage Quarter',
    city: 'Indiranagar, Bangalore 560038',
    hours: 'Mon – Sun: 7:00 AM – 10:00 PM',
    todayHours: 'Open Today: 7:00 AM – 10:00 PM',
    isOpenNow: true,
    phone: '+91 80 4920 3340',
    features: ['Live Roasting Demonstrations', 'Single Origin Cupping Bar', 'Ultra-fast Gigabit WiFi', 'Outdoor Garden Terrace', 'Pet Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com',
  },
  {
    id: 'loc-2',
    name: 'Waterfront Pavilion & Espresso Bar',
    tagline: 'Panoramic promenade views, nitro draft taps & morning bakery',
    address: '18 Promenade Boulevard, Bandra West',
    city: 'Mumbai, MH 400050',
    hours: 'Mon – Sun: 7:30 AM – 11:00 PM',
    todayHours: 'Open Today: 7:30 AM – 11:00 PM',
    isOpenNow: true,
    phone: '+91 22 8920 4455',
    features: ['Waterfront Seating', 'Cold Brew & Nitro Draft Bar', 'Fresh Baked Croissants', 'Takeaway Bike Window'],
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com',
  },
  {
    id: 'loc-3',
    name: 'The Mission Sanctuary & Slow Bar',
    tagline: 'Quiet reading lounge, manual brew station & botanicals',
    address: '912 Mehrauli Heritage Lane',
    city: 'New Delhi, DL 110030',
    hours: 'Mon – Sun: 8:00 AM – 10:30 PM',
    todayHours: 'Open Today: 8:00 AM – 10:30 PM',
    isOpenNow: true,
    phone: '+91 11 4050 8899',
    features: ['Siphon & Kyoto Drip Towers', 'Acoustic Soundproofing', 'Artisan Pastry Collabs', 'Specialty Matcha Bar'],
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com',
  },
];
