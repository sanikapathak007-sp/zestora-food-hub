import { MenuItem, RewardPerk } from '../types';
import steakImg from '../assets/images/truffle_ribeye_steak_1790854702676.jpg';
import risottoImg from '../assets/images/saffron_seafood_risotto_1790854731395.jpg';
import cocktailImg from '../assets/images/signature_cocktail_craft_1790854744583.jpg';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Prime Black Truffle Wagyu Ribeye',
    hindiTitle: 'ट्रफल वैग्यू स्टेक',
    category: 'specials',
    price: 1450,
    description: '45-day dry-aged Prime tenderloin with winter black truffle compound butter, charred bone marrow jus, and Maldon sea salt flake crust.',
    image: steakImg,
    calories: 780,
    prepTime: '18-22 min',
    spiciness: 0,
    tags: ['Chef Special', 'Gluten-Free'],
    allergens: ['Dairy'],
    pairing: 'Sula Dindori Reserve Shiraz or Smoked Rosemary Botanical Old Fashioned',
    pairingNote: 'Bold smoky tannins effortlessly slice through rich marbled wagyu fat.',
    sensory: {
      umami: 5,
      aroma: 5,
      acidity: 2,
      richness: 5,
      signatureNote: 'Woodland Truffle & Hearth Ember'
    },
    customizationOptions: [
      {
        name: 'Doneness',
        choices: [
          { label: 'Medium Rare (Chef Signature)' },
          { label: 'Rare' },
          { label: 'Medium' },
          { label: 'Well Done' }
        ]
      },
      {
        name: 'Artisanal Sauce',
        choices: [
          { label: 'Truffle Bone Marrow Butter' },
          { label: 'Green Peppercorn Cognac Reduction', extraPrice: 120 },
          { label: 'Smoked Chimichurri Herb Emulsion', extraPrice: 90 }
        ]
      }
    ]
  },
  {
    id: 'dish-2',
    name: 'Kashmiri Saffron Scallop & Prawn Risotto',
    hindiTitle: 'केसर स्कैलप रिसोट्टो',
    category: 'specials',
    price: 1180,
    description: 'Acquerello carnaroli rice infused with organic Pampore saffron broth, butter-poached tiger prawns, pan-seared sea scallops, and cold-pressed chive oil.',
    image: risottoImg,
    calories: 620,
    prepTime: '15-18 min',
    spiciness: 0,
    tags: ['Chef Special', 'Gluten-Free'],
    allergens: ['Shellfish', 'Dairy'],
    pairing: 'Fratelli Sette Reserve White or Crisp Chenin Blanc',
    pairingNote: 'Mineral crispness lifts the aromatic golden saffron and sweet crustacean glaze.',
    sensory: {
      umami: 4,
      aroma: 5,
      acidity: 3,
      richness: 4,
      signatureNote: 'Pampore Saffron & Sweet Brine'
    },
    customizationOptions: [
      {
        name: 'Cheese Finish',
        choices: [
          { label: '36-Month Parmigiano-Reggiano' },
          { label: 'Aged Pecorino Romano' },
          { label: 'Dairy-Free Cashew Emulsion' }
        ]
      }
    ]
  },
  {
    id: 'dish-3',
    name: 'Smoked Citrus Botanical Elixir',
    hindiTitle: 'धूम्र सिट्रस अमृत',
    category: 'drinks',
    price: 420,
    description: 'Artisanal zero-proof distilled botanicals, cold-pressed blood orange, clarified bergamot cordial, infused with smoking Himalayan cedarwood aromatics.',
    image: cocktailImg,
    calories: 110,
    prepTime: '4 min',
    spiciness: 0,
    tags: ['Chef Special', 'Vegan', 'Jain Friendly', 'Gluten-Free'],
    allergens: [],
    pairing: 'Truffle Ribeye or Morel Mushroom Tart',
    pairingNote: 'Smoked citrus aromatics balance rich savory umami textures.',
    sensory: {
      umami: 1,
      aroma: 5,
      acidity: 4,
      richness: 2,
      signatureNote: 'Bergamot Smoke & Sweet Bitter'
    }
  },
  {
    id: 'dish-4',
    name: 'Himalayan Guchhi Morel & Chanterelle Tart',
    hindiTitle: 'गुच्छी मशरूम टार्ट',
    category: 'starters',
    price: 680,
    description: 'Flaky artisanal butter pastry layered with wild foraged Kashmiri guchhi morels, whipped goat chèvre, caramelized shallot reduction, and wild thyme honey.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    calories: 410,
    prepTime: '10 min',
    spiciness: 0,
    tags: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten'],
    pairing: 'Grover Zampa La Réserve White',
    pairingNote: 'Earthy forest floor complexities marry beautifully with goat cheese tang.',
    sensory: {
      umami: 5,
      aroma: 4,
      acidity: 2,
      richness: 4,
      signatureNote: 'Wild Forest Earth & Tangy Chèvre'
    }
  },
  {
    id: 'dish-5',
    name: 'Truffled Malai Paneer & Fig Carpaccio',
    hindiTitle: 'ट्रफल्ड मलाई पनीर कारपैशियो',
    category: 'starters',
    price: 580,
    description: 'House-churned organic buffalo milk paneer sheets, infused with winter truffle oil, sun-ripened Anjeer fig reduction, toasted pine nuts, and micro amaranth.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    calories: 360,
    prepTime: '8 min',
    spiciness: 0,
    tags: ['Vegetarian', 'Jain Friendly', 'Gluten-Free'],
    allergens: ['Dairy', 'Tree Nuts'],
    pairing: 'Sparkling Rosé or Peach Kombucha',
    pairingNote: 'Effervescent sweetness cuts through velvety fresh malai curd.',
    sensory: {
      umami: 4,
      aroma: 4,
      acidity: 3,
      richness: 4,
      signatureNote: 'Velvet Curd & Sun Fig'
    }
  },
  {
    id: 'dish-6',
    name: 'Ahi Yellowfin Tuna Tartare & Avruga Caviar',
    hindiTitle: 'टुना टार्टारे एवं कैवियार',
    category: 'starters',
    price: 790,
    description: 'Sashimi-grade Arabian Sea yellowfin tuna, compressed avocado, yuzu ponzu gel, crispy nori sesame crisps, and smoked black sea salt.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    calories: 320,
    prepTime: '8 min',
    spiciness: 1,
    tags: ['Gluten-Free', 'Halal'],
    allergens: ['Fish', 'Sesame'],
    pairing: 'Chandon Brut Vintage Cuvée',
    pairingNote: 'Crisp brioche acidity lifts the raw buttery tuna fattiness.',
    sensory: {
      umami: 4,
      aroma: 4,
      acidity: 4,
      richness: 3,
      signatureNote: 'Yuzu Citrus & Silken Tuna'
    }
  },
  {
    id: 'dish-7',
    name: 'Pan-Roasted Chilean Sea Bass in Mirin Broth',
    hindiTitle: 'चिली सी बास इन दशी',
    category: 'mains',
    price: 1380,
    description: 'Miso-mirin glazed wild sea bass, baby bok choy, lemongrass ginger dashi broth, and crispy lotus root ribbons.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    calories: 540,
    prepTime: '16 min',
    spiciness: 1,
    tags: ['Chef Special', 'Gluten-Free', 'Halal'],
    allergens: ['Fish', 'Soy'],
    pairing: 'Dry Riesling or Jasmine Blossom Iced Tea',
    pairingNote: 'Floral notes enhance the subtle caramelized mirin crust.',
    sensory: {
      umami: 5,
      aroma: 5,
      acidity: 3,
      richness: 3,
      signatureNote: 'Charred Miso & Ginger Vapor'
    }
  },
  {
    id: 'dish-8',
    name: 'Fire-Roasted Heirloom Cauliflower Steak',
    hindiTitle: 'रोस्टेड गोभी स्टेक',
    category: 'mains',
    price: 590,
    description: 'Whole spiced turmeric cauliflower roasted over open mesquite fire, roasted pine nut romesco sauce, pickled pomegranate gems, and micro cilantro.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    calories: 380,
    prepTime: '12 min',
    spiciness: 1,
    tags: ['Vegan', 'Jain Friendly', 'Gluten-Free', 'Nut-Free'],
    allergens: [],
    pairing: 'Skin-Contact Orange Wine or Hibiscus Tonic',
    pairingNote: 'Charred crust smokiness harmonizes with rich toasted nuts.',
    sensory: {
      umami: 3,
      aroma: 4,
      acidity: 4,
      richness: 3,
      signatureNote: 'Smoked Char & Pomegranate Tang'
    }
  },
  {
    id: 'dish-9',
    name: 'Wild Mushroom Campanelle in Black Truffle Cream',
    hindiTitle: 'वाइल्ड मशरूम कैम्पनेल',
    category: 'pastas',
    price: 760,
    description: 'Fluted extruded bronze-die pasta ribbons with fermented black garlic cream, roasted king trumpet mushrooms, crispy leeks, and 24-month Pecorino.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    calories: 610,
    prepTime: '12 min',
    spiciness: 0,
    tags: ['Vegetarian'],
    allergens: ['Gluten', 'Dairy'],
    pairing: 'KRSMA Sangiovese Estate Reserve',
    pairingNote: 'Lively red cherry acidity cleanly cuts rich black garlic emulsion.',
    sensory: {
      umami: 5,
      aroma: 4,
      acidity: 2,
      richness: 5,
      signatureNote: 'Aged Pecorino & Black Truffle'
    }
  },
  {
    id: 'dish-10',
    name: 'Handmade Slow-Braised Duck Agnolotti',
    hindiTitle: 'डक एग्नोलोटी पास्ता',
    category: 'pastas',
    price: 920,
    description: 'Delicate hand-pinched pasta pillows stuffed with slow-confit duck, sage brown butter, aged 12-year balsamic vinegar glaze, and toasted hazelnuts.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=800&auto=format&fit=crop&q=80',
    calories: 690,
    prepTime: '14 min',
    spiciness: 0,
    tags: ['Chef Special'],
    allergens: ['Gluten', 'Dairy', 'Tree Nuts', 'Eggs'],
    pairing: 'Barolo DOCG or Aged Pinot Noir',
    pairingNote: 'Savoury duck game notes enriched by brown butter and sweet balsamic.',
    sensory: {
      umami: 5,
      aroma: 5,
      acidity: 3,
      richness: 4,
      signatureNote: 'Brown Butter Sage & Confit Essence'
    }
  },
  {
    id: 'dish-11',
    name: 'Smoked Valrhona Chocolate Dome with Espresso Ganache',
    hindiTitle: 'वाल्ह्रोना चॉकलेट डोम',
    category: 'desserts',
    price: 520,
    description: '70% dark Guanaja chocolate dome, passion fruit curd core, hazelnut feuilletine crunch, melted tableside with hot salted caramel espresso ganache.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
    calories: 490,
    prepTime: '6 min',
    spiciness: 0,
    tags: ['Vegetarian', 'Jain Friendly'],
    allergens: ['Dairy', 'Tree Nuts', 'Eggs'],
    pairing: 'Aged Tawny Port or Single Origin Cold Brew',
    pairingNote: 'Dark cacao bitterness lifted by sharp tropical passion fruit core.',
    sensory: {
      umami: 2,
      aroma: 5,
      acidity: 3,
      richness: 5,
      signatureNote: '70% Dark Cocoa & Salted Caramel'
    }
  },
  {
    id: 'dish-12',
    name: 'Saffron Pistachio Ghewar Mille-Feuille',
    hindiTitle: 'केसर पिस्ता घेवर मिल-फेई',
    category: 'desserts',
    price: 480,
    description: 'Crisp caramelized honeycomb ghewar disc layered with cardamom diplomat cream, rabri drizzle, crushed Iranian pistachios, and edible 24k silver vark.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    calories: 430,
    prepTime: '5 min',
    spiciness: 0,
    tags: ['Vegetarian', 'Jain Friendly'],
    allergens: ['Gluten', 'Dairy', 'Tree Nuts'],
    pairing: 'Sauternes or Spiced Kashmiri Kahwa',
    pairingNote: 'Cardamom and saffron warmth perfectly pairs with fragrant kahwa green tea.',
    sensory: {
      umami: 1,
      aroma: 5,
      acidity: 1,
      richness: 5,
      signatureNote: 'Honeycomb Crisp & Cardamom Rabri'
    }
  },
  {
    id: 'dish-13',
    name: 'Kyoto Ceremonial Matcha & Yuzu Sparkler',
    hindiTitle: 'क्योतो माचा युज़ू स्पार्कल',
    category: 'drinks',
    price: 380,
    description: 'Ceremonial grade Uji matcha whisked with sparkling yuzu mineral water, pandan syrup, and cold foam cloud topper.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80',
    calories: 95,
    prepTime: '4 min',
    spiciness: 0,
    tags: ['Vegan', 'Jain Friendly', 'Gluten-Free'],
    allergens: [],
    pairing: 'Mille-Feuille or Light Seafood Courses',
    pairingNote: 'Vibrant chlorophyll tea notes balance rich dessert pastry.',
    sensory: {
      umami: 3,
      aroma: 4,
      acidity: 4,
      richness: 2,
      signatureNote: 'Earthy Matcha & Citric Spark'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Complete Menu' },
  { id: 'specials', label: 'Chef\'s Signatures' },
  { id: 'starters', label: 'Starters & Small Plates' },
  { id: 'mains', label: 'Artisanal Mains' },
  { id: 'pastas', label: 'Handmade Pastas' },
  { id: 'desserts', label: 'Confections & Sweets' },
  { id: 'drinks', label: 'Elixirs & Cellar' }
];

export const DIETARY_FILTERS = [
  'All',
  'Chef Special',
  'Vegetarian',
  'Jain Friendly',
  'Vegan',
  'Gluten-Free',
  'Halal'
];

export const REWARD_PERKS: RewardPerk[] = [
  {
    id: 'perk-1',
    title: 'Signature Smoked Botanical Elixir',
    pointsCost: 350,
    category: 'Beverage',
    description: 'Redeem a complimentary handcrafted smoked citrus elixir (Worth ₹420) with your dinner.',
    unlocked: false
  },
  {
    id: 'perk-2',
    title: 'Saffron Pistachio Ghewar Mille-Feuille',
    pointsCost: 450,
    category: 'Dish',
    description: 'Enjoy our signature pastry chef confection served tableside with rabri drizzle (Worth ₹480).',
    unlocked: false
  },
  {
    id: 'perk-3',
    title: '₹500 Epicurean Dining Credit',
    pointsCost: 750,
    category: 'Voucher',
    description: 'Flat ₹500 discount applied directly to your active table check.',
    unlocked: false
  },
  {
    id: 'perk-4',
    title: 'Sommelier Reserve Cellar Flight (3 Pours)',
    pointsCost: 1100,
    category: 'Experience',
    description: 'Three 2oz pours of rare vintage cellar selections paired with your courses (Worth ₹1,200).',
    unlocked: false
  }
];
