export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Jain Friendly' | 'Gluten-Free' | 'Chef Special' | 'Spicy' | 'Nut-Free' | 'Halal' | 'Dairy-Free';

export type CategoryId = 'all' | 'specials' | 'starters' | 'mains' | 'pastas' | 'desserts' | 'drinks';

export interface SensoryProfile {
  umami: number; // 1-5
  aroma: number; // 1-5
  acidity: number; // 1-5
  richness: number; // 1-5
  signatureNote: string;
}

export interface MenuItem {
  id: string;
  name: string;
  hindiTitle?: string;
  category: CategoryId;
  price: number; // Price in INR (₹)
  description: string;
  image: string;
  calories: number;
  prepTime: string;
  spiciness: number; // 0 to 3
  tags: DietaryTag[];
  allergens: string[];
  pairing: string;
  pairingNote?: string;
  sensory?: SensoryProfile;
  customizationOptions?: {
    name: string;
    choices: { label: string; extraPrice?: number }[];
  }[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedChoices?: Record<string, string>;
  specialInstructions?: string;
}

export interface RecommendationPreferences {
  mood: 'romantic' | 'comfort' | 'celebration' | 'energizing' | 'light';
  diet: 'all' | 'vegetarian' | 'vegan' | 'jain' | 'gluten-free' | 'dairy-free';
  spiceTolerance: 'mild' | 'medium' | 'fiery';
  craving: 'savory' | 'rich-creamy' | 'umami-seared' | 'crisp-fresh' | 'sweet';
  budget: 'budget-low' | 'budget-mid' | 'budget-high'; // Under ₹500 | ₹500-₹1,000 | ₹1,000+
}

export interface TableBooking {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  partySize: number;
  seatingZone: 'Main Dining' | 'Solarium Garden' | 'Chef\'s Tasting Counter' | 'Intimate Velvet Booth';
  specialOccasion: string;
  notes: string;
  status: 'Confirmed' | 'Pending';
}

export interface OrderState {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  discount: number;
  total: number;
  tableNumber: string;
  diningMode: 'Dine-In' | 'Takeaway Express';
  timestamp: string;
  status: 'confirmed' | 'cooking' | 'plating' | 'served';
  estimatedMinutes: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionPayload?: {
    type: 'ADD_TO_CART' | 'GO_TO_RESERVATION' | 'VIEW_MENU' | 'TRACK_ORDER';
    itemId?: string;
    partySize?: number;
    label: string;
  };
}

export interface RewardPerk {
  id: string;
  title: string;
  pointsCost: number;
  category: 'Dish' | 'Beverage' | 'Voucher' | 'Experience';
  description: string;
  unlocked: boolean;
}
