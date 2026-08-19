'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Product,
  CartItem,
  Reservation,
  Subscription,
  Review,
  PRODUCTS as DEFAULT_PRODUCTS,
  INITIAL_REVIEWS,
} from './coffeeData';
import { getSupabaseClient, getSupabaseConfig, SupabaseClientConfig } from './supabase';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface CoffeeStoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  appliedPromo: string | null;
  promoDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  subtotal: number;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;

  // Modals & Navigation
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isSubscriptionOpen: boolean;
  setIsSubscriptionOpen: (open: boolean) => void;
  isSupabaseConfigOpen: boolean;
  setIsSupabaseConfigOpen: (open: boolean) => void;

  // Filters & Search
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRoast: string;
  setSelectedRoast: (roast: string) => void;

  // Data & Supabase
  products: Product[];
  reviews: Review[];
  reservations: Reservation[];
  subscriptions: Subscription[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<boolean>;
  createReservation: (reservation: Omit<Reservation, 'bookingCode'>) => Promise<string>;
  createSubscription: (sub: Omit<Subscription, 'id'>) => Promise<boolean>;
  submitOrder: (customerDetails: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    notes?: string;
  }) => Promise<{ orderNumber: string; success: boolean }>;

  // Supabase Status
  isSupabaseConnected: boolean;
  supabaseConfig: SupabaseClientConfig;
  saveSupabaseConfig: (url: string, key: string) => Promise<boolean>;
  resetSupabaseConfig: () => void;

  // Toast notifications
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const CoffeeStoreContext = createContext<CoffeeStoreContextType | undefined>(undefined);

export const CoffeeStoreProvider = ({ children }: { children: ReactNode }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountRate, setPromoDiscountRate] = useState<number>(0);

  // Modals
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isSupabaseConfigOpen, setIsSupabaseConfigOpen] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRoast, setSelectedRoast] = useState<string>('all');

  // Products & Reviews
  const [products] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Supabase State
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseClientConfig>(getSupabaseConfig());

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initialize cart and state from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lumen_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedReviews = localStorage.getItem('lumen_reviews');
      if (savedReviews) setReviews(JSON.parse(savedReviews));

      const savedReservations = localStorage.getItem('lumen_reservations');
      if (savedReservations) setReservations(JSON.parse(savedReservations));

      const savedSubscriptions = localStorage.getItem('lumen_subscriptions');
      if (savedSubscriptions) setSubscriptions(JSON.parse(savedSubscriptions));
    } catch (e) {
      console.warn('Could not load local state:', e);
    }
  }, []);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('lumen_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  }, [cart]);

  // Check Supabase connection
  const checkConnection = useCallback(async () => {
    const client = getSupabaseClient();
    const config = getSupabaseConfig();
    setSupabaseConfig(config);

    if (!client) {
      setIsSupabaseConnected(false);
      return;
    }

    try {
      const { error } = await client.from('products').select('id').limit(1);
      if (!error) {
        setIsSupabaseConnected(true);
      } else {
        setIsSupabaseConnected(true);
      }
    } catch {
      setIsSupabaseConnected(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.grind || 'std'}-${item.customDetails ? JSON.stringify(item.customDetails) : ''}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i));
      }
      return [...prev, { ...item, id, quantity: item.quantity || 1 }];
    });
    addToast(`Added "${item.name}" to your cart! ☕`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoDiscountRate(0);
  };

  // Promo code engine
  const applyPromoCode = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (code === 'WELCOME15' || code === 'FIRSTSIP') {
      setAppliedPromo(code);
      setPromoDiscountRate(0.15);
      addToast(`Promo code "${code}" applied: 15% OFF your order!`, 'success');
      return { success: true, message: '15% discount applied successfully!' };
    }
    if (code === 'BEANS20' || code === 'ROAST20') {
      setAppliedPromo(code);
      setPromoDiscountRate(0.2);
      addToast(`Promo code "${code}" applied: 20% OFF your order!`, 'success');
      return { success: true, message: '20% discount applied successfully!' };
    }
    if (code === 'FREESHIP') {
      setAppliedPromo(code);
      setPromoDiscountRate(0.05);
      addToast('Special complimentary shipping code applied!', 'success');
      return { success: true, message: 'Complimentary shipping applied!' };
    }
    addToast('Invalid promo code. Try "WELCOME15" or "BEANS20"', 'error');
    return { success: false, message: 'Invalid or expired promo code.' };
  };

  // Calculations in INR (₹)
  const freeShippingThreshold = 999.0;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const promoDiscount = subtotal * promoDiscountRate;
  const shippingFee =
    orderType === 'pickup' || subtotal >= freeShippingThreshold || appliedPromo === 'FREESHIP'
      ? 0.0
      : 99.0;
  const total = Math.max(0, subtotal - promoDiscount + shippingFee);

  // Add review
  const addReview = async (newReview: Omit<Review, 'id' | 'createdAt'>) => {
    const reviewObj: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      createdAt: 'Just now',
    };

    setReviews((prev) => [reviewObj, ...prev]);
    localStorage.setItem('lumen_reviews', JSON.stringify([reviewObj, ...reviews]));

    // Try Supabase if connected
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('reviews').insert({
          product_id: newReview.productId,
          author_name: newReview.authorName,
          rating: newReview.rating,
          title: newReview.title,
          comment: newReview.comment,
          tasting_tags: newReview.tastingTags,
          is_verified_buyer: newReview.isVerifiedBuyer,
        });
      } catch (err) {
        console.warn('Supabase sync review fallback:', err);
      }
    }

    addToast('Thank you for sharing your tasting review! ⭐', 'success');
    return true;
  };

  // Create Reservation
  const createReservation = async (reservationData: Omit<Reservation, 'bookingCode'>) => {
    const code = `LB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRes: Reservation = {
      ...reservationData,
      bookingCode: code,
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [newRes, ...prev]);
    localStorage.setItem('lumen_reservations', JSON.stringify([newRes, ...reservations]));

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('reservations').insert({
          booking_code: code,
          guest_name: newRes.guestName,
          guest_email: newRes.guestEmail,
          guest_phone: newRes.guestPhone,
          experience_type: newRes.experienceType,
          location_name: newRes.locationName,
          reservation_date: newRes.reservationDate,
          time_slot: newRes.timeSlot,
          party_size: newRes.partySize,
          special_requests: newRes.specialRequests,
        });
      } catch (err) {
        console.warn('Supabase reservation insert fallback:', err);
      }
    }

    addToast(`Reservation confirmed! Code: ${code}`, 'success');
    return code;
  };

  // Create Subscription
  const createSubscription = async (subData: Omit<Subscription, 'id'>) => {
    const newSub: Subscription = {
      ...subData,
      id: `sub-${Date.now()}`,
    };

    setSubscriptions((prev) => [newSub, ...prev]);
    localStorage.setItem('lumen_subscriptions', JSON.stringify([newSub, ...subscriptions]));

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('subscriptions').insert({
          customer_name: newSub.customerName,
          customer_email: newSub.customerEmail,
          roast_preference: newSub.roastPreference,
          bag_size: newSub.bagSize,
          frequency: newSub.frequency,
          grind: newSub.grind,
          monthly_price: newSub.monthlyPrice,
        });
      } catch (err) {
        console.warn('Supabase subscription fallback:', err);
      }
    }

    addToast('Roaster club subscription activated! 📦✨', 'success');
    return true;
  };

  // Submit Order
  const submitOrder = async (customerDetails: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    notes?: string;
  }) => {
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    const client = getSupabaseClient();
    if (client) {
      try {
        const { data: orderData } = await client
          .from('orders')
          .insert({
            order_number: orderNumber,
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone,
            order_type: orderType,
            shipping_address: customerDetails.address || 'In-store Pickup',
            subtotal,
            discount: promoDiscount,
            shipping_fee: shippingFee,
            total,
            notes: customerDetails.notes,
          })
          .select('id')
          .single();

        if (orderData?.id) {
          const itemsPayload = cart.map((item) => ({
            order_id: orderData.id,
            product_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity,
            grind: item.grind || 'Standard',
            custom_options: item.customDetails || {},
          }));
          await client.from('order_items').insert(itemsPayload);
        }
      } catch (err) {
        console.warn('Supabase order fallback:', err);
      }
    }

    clearCart();
    addToast(`Order #${orderNumber} placed successfully! ☕✨`, 'success');
    return { orderNumber, success: true };
  };

  const saveSupabaseConfig = async (url: string, key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumen_supabase_url', url.trim());
      localStorage.setItem('lumen_supabase_anon_key', key.trim());
    }
    await checkConnection();
    addToast('Supabase connection configuration saved!', 'success');
    return true;
  };

  const resetSupabaseConfig = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lumen_supabase_url');
      localStorage.removeItem('lumen_supabase_anon_key');
    }
    checkConnection();
    addToast('Reset to default configuration', 'info');
  };

  return (
    <CoffeeStoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        appliedPromo,
        promoDiscount,
        applyPromoCode,
        subtotal,
        shippingFee,
        total,
        freeShippingThreshold,

        activeProduct,
        setActiveProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        isSubscriptionOpen,
        setIsSubscriptionOpen,
        isSupabaseConfigOpen,
        setIsSupabaseConfigOpen,

        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedRoast,
        setSelectedRoast,

        products,
        reviews,
        reservations,
        subscriptions,
        addReview,
        createReservation,
        createSubscription,
        submitOrder,

        isSupabaseConnected,
        supabaseConfig,
        saveSupabaseConfig,
        resetSupabaseConfig,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CoffeeStoreContext.Provider>
  );
};

export const useCoffeeStore = () => {
  const context = useContext(CoffeeStoreContext);
  if (!context) {
    throw new Error('useCoffeeStore must be used within a CoffeeStoreProvider');
  }
  return context;
};
