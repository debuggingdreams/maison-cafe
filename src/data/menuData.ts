import { MenuItem, PresetDrink } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // BAGELS
  {
    id: 'b1',
    name: 'Nature',
    category: 'BAGELS',
    price: 5.50,
    description: {
      EN: 'Classic fresh Montreal plain bagel toasted with house cream cheese spread.',
      FR: 'Bagel nature avec fromage à la crème maison.'
    },
    tags: ['Best Seller'],
    image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=800&auto=format&fit=crop',
    calories: 320
  },
  {
    id: 'b2',
    name: 'Sésame',
    category: 'BAGELS',
    price: 5.50,
    description: {
      EN: 'Toasted sesame seed bagel served with silky house cream cheese.',
      FR: 'Bagel au sésame avec fromage à la crème.'
    },
    tags: ['Best Seller'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
    calories: 340
  },
  {
    id: 'b3',
    name: 'Saumon fumé',
    category: 'BAGELS',
    price: 12.50,
    description: {
      EN: 'Choice of toasted bagel topped with wild smoked salmon, cream cheese, capers, and house-pickled onions.',
      FR: 'Bagel de votre choix avec saumon fumé, fromage à la crème, câpres et oignons marinés.'
    },
    tags: ['House Special', 'Best Seller'],
    image: '/src/assets/images/maison_bagel_salmon_1785928358337.jpg',
    calories: 480,
    featured: true
  },
  {
    id: 'b4',
    name: 'Thon',
    category: 'BAGELS',
    price: 10.50,
    description: {
      EN: 'Signature house tuna mix served hot on toasted bagel of choice with melted Havarti cheese.',
      FR: 'Thon maison servi sur bagel de votre choix avec fromage Havarti fondu.'
    },
    tags: ['House Special'],
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop',
    calories: 450
  },
  {
    id: 'b5',
    name: 'Oeuf & Havarti Toast',
    category: 'BAGELS',
    price: 11.50,
    description: {
      EN: 'Fluffy country scrambled egg salad on artisan sourdough toast with cracked black pepper.',
      FR: 'Salade d’oeufs brouillés crémeuse sur pain au levain artisanal.'
    },
    tags: ['House Special'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
    calories: 410
  },

  // CLASSIQUES
  {
    id: 'c1',
    name: 'Espresso',
    category: 'CLASSIQUES',
    price: 3.25,
    secondaryPrice: 3.75,
    description: {
      EN: 'Rich double espresso extracted from custom dark roast beans with thick crema.',
      FR: 'Espresso double riche extrait de grains de torréfaction foncée.'
    },
    calories: 10
  },
  {
    id: 'c2',
    name: 'Americano',
    category: 'CLASSIQUES',
    price: 3.75,
    description: {
      EN: 'Double shot espresso diluted with hot water for a smooth, bold body.',
      FR: 'Double espresso dilué avec de l’eau chaude pour une texture douce.'
    },
    calories: 15
  },
  {
    id: 'c3',
    name: 'Macchiato',
    category: 'CLASSIQUES',
    price: 3.75,
    description: {
      EN: 'Espresso marked with a dollop of velvety steamed microfoam.',
      FR: 'Espresso marqué d’une touche de micro-mousse veloutée.'
    },
    calories: 30
  },
  {
    id: 'c4',
    name: 'Cappuccino',
    category: 'CLASSIQUES',
    price: 4.50,
    description: {
      EN: 'Equal balance of rich espresso, warm steamed milk, and dense foam.',
      FR: 'Équilibre parfait entre espresso, lait chaud et mousse dense.'
    },
    calories: 120
  },
  {
    id: 'c5',
    name: 'Latte',
    category: 'CLASSIQUES',
    price: 7.00,
    description: {
      EN: 'Smooth espresso with plenty of silky steamed milk and subtle microfoam art.',
      FR: 'Espresso doux avec du lait à la vapeur et art de micro-mousse.'
    },
    tags: ['Best Seller'],
    calories: 180
  },
  {
    id: 'c6',
    name: 'Matcha Latte',
    category: 'CLASSIQUES',
    price: 7.00,
    description: {
      EN: 'Ceremonial grade Uji Japanese green tea whisked fresh with oat or whole milk.',
      FR: 'Thé vert japonais Uji de qualité cérémoniale fouetté avec du lait.'
    },
    tags: ['House Special', 'Best Seller'],
    calories: 160
  },
  {
    id: 'c7',
    name: 'Chai Latte',
    category: 'CLASSIQUES',
    price: 7.00,
    description: {
      EN: 'Spiced aromatic black tea concentrate steamed with milk and dusted with cinnamon.',
      FR: 'Thé noir épicé infusé aux épices douces et lait moussé.'
    },
    calories: 210
  },
  {
    id: 'c8',
    name: 'Spanish Latte',
    category: 'CLASSIQUES',
    price: 7.00,
    description: {
      EN: 'Espresso blended with condensed milk and steamed milk for a rich caramel sweetness.',
      FR: 'Espresso mélangé avec du lait condensé et du lait chaud.'
    },
    tags: ['Best Seller'],
    calories: 260
  },
  {
    id: 'c9',
    name: 'Sea Salt Earl Grey',
    category: 'CLASSIQUES',
    price: 7.00,
    description: {
      EN: 'Fragrant Bergamot Earl Grey tea topped with fluffy sea salt cream cold foam.',
      FR: 'Thé Earl Grey à la bergamote surmonté d’une mousse de crème au sel de mer.'
    },
    tags: ['House Special'],
    calories: 190
  },

  // MATCHA & SPECIALTY LATTES
  {
    id: 'm1',
    name: 'Mango Coco Matcha',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'Layered house signature: real mango puree, cold Uji matcha green tea, topped with thick coconut foam.',
      FR: 'Signature maison étagée : purée de mangue, thé matcha Uji glacé et mousse de coco.'
    },
    tags: ['House Special', 'Best Seller'],
    image: '/src/assets/images/maison_mango_coco_1785928338386.jpg',
    calories: 230,
    featured: true
  },
  {
    id: 'm1_ube',
    name: 'Ube Matcha',
    category: 'MATCHA_LATTES',
    price: 8.50,
    description: {
      EN: 'Instagram viral signature: velvety purple ube yam puree, oat milk, crowned with rich whisked Uji matcha.',
      FR: 'Incontournable Instagram : purée d’ube violette veloutée, lait d’avoine et matcha Uji.'
    },
    tags: ['Instagram Viral', 'House Special'],
    calories: 240,
    featured: true
  },
  {
    id: 'm1_rose',
    name: 'Rose Falooda Matcha',
    category: 'MATCHA_LATTES',
    price: 8.75,
    description: {
      EN: 'A ceremonial matcha twist on falooda with vermicelli noodles, basil seeds, cold foam, and dried rose petals.',
      FR: 'Matcha twist falooda aux vermicelles, graines de basilic, mousse froide et pétales de rose.'
    },
    tags: ['Limited Time', 'House Special'],
    calories: 260,
    featured: true
  },
  {
    id: 'm1_dot',
    name: 'Dot Matcha (Sprinkles Edition)',
    category: 'MATCHA_LATTES',
    price: 8.50,
    description: {
      EN: 'Limited time celebration drink: Uji matcha latte topped with vanilla cold cloud foam and rainbow sprinkles.',
      FR: 'Édition limitée : latte au matcha Uji avec mousse à la vanille et paillettes colorées.'
    },
    tags: ['Limited Time Only'],
    calories: 270
  },
  {
    id: 'm2',
    name: 'Biscoff Latte',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'Creamy espresso latte swirled with melted Biscoff cookie butter, topped with whipped foam and cookie crumbles.',
      FR: 'Latte à l’espresso et beurre de biscuit Biscoff avec éclats de biscuit.'
    },
    tags: ['House Special', 'Best Seller'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    calories: 320,
    featured: true
  },
  {
    id: 'm3',
    name: 'Banana Bread Latte',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'Warm banana puree, brown sugar syrup, espresso and steamed oat milk topped with banana chips.',
      FR: 'Purée de banane chaude, sirop de cassonade, espresso et lait d’avoine.'
    },
    tags: ['House Special'],
    calories: 280
  },
  {
    id: 'm4',
    name: 'Maple Sea Salt Latte',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'Pure Quebec dark maple syrup espresso latte finished with salted cream cold foam.',
      FR: 'Sirop d’érable pur du Québec, espresso et mousse de crème salée.'
    },
    tags: ['Best Seller'],
    calories: 250
  },
  {
    id: 'm5',
    name: 'French Toast Latte',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'Cinnamon maple brown butter latte topped with sweet vanilla cloud foam and waffle bits.',
      FR: 'Latte au beurre brun, cannelle et érable avec mousse vanille et gaufre.'
    },
    tags: ['House Special'],
    calories: 310
  },
  {
    id: 'm6',
    name: 'Double Pistache',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'House-made Sicilian pistachio paste stirred into espresso or matcha latte with crushed pistachios.',
      FR: 'Pâte de pistache sicilienne maison mélangée au latte avec éclats de pistaches.'
    },
    tags: ['House Special'],
    calories: 290
  },
  {
    id: 'm7',
    name: 'Cookies & Cream',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'Dark chocolate espresso with crushed Oreo cream cold foam and cocoa nibs.',
      FR: 'Espresso au chocolat noir avec mousse crémeuse aux éclats d’Oreo.'
    },
    calories: 330
  },
  {
    id: 'm8',
    name: 'Strawberry Shortcake',
    category: 'MATCHA_LATTES',
    price: 8.25,
    description: {
      EN: 'Fresh strawberry compote layered with ceremonial matcha and vanilla oat foam.',
      FR: 'Compote de fraises fraîches, matcha cérémonial et mousse d’avoine à la vanille.'
    },
    tags: ['House Special'],
    calories: 260
  },

  // SUPPLÉMENTS
  {
    id: 's1',
    name: "Boisson d'avoine / Oat Milk",
    category: 'SUPPLEMENTS',
    price: 0.75,
    description: {
      EN: 'Creamy barista edition oat milk substitution.',
      FR: 'Substitution par du lait d’avoine barista crémeux.'
    },
    tags: ['Vegan']
  },
  {
    id: 's2',
    name: "Boisson d'amande / Almond Milk",
    category: 'SUPPLEMENTS',
    price: 0.75,
    description: {
      EN: 'Unsweetened almond milk substitution.',
      FR: 'Substitution par du lait d’amande non sucré.'
    },
    tags: ['Vegan']
  },
  {
    id: 's3',
    name: 'Sirop de vanille / Vanilla Syrup',
    category: 'SUPPLEMENTS',
    price: 0.50,
    description: {
      EN: 'House Madagascar vanilla bean syrup shot.',
      FR: 'Dose de sirop de gousse de vanille de Madagascar.'
    }
  },
  {
    id: 's4',
    name: "Sirop d'érable / Quebec Maple Syrup",
    category: 'SUPPLEMENTS',
    price: 0.50,
    description: {
      EN: '100% pure Quebec grade-A maple syrup shot.',
      FR: 'Dose de sirop d’érable pur du Québec.'
    }
  },
  {
    id: 's5',
    name: 'Extra Matcha Shot',
    category: 'SUPPLEMENTS',
    price: 1.00,
    description: {
      EN: 'An extra concentrated whisked shot of Uji Japanese ceremonial matcha.',
      FR: 'Dose supplémentaire de thé matcha cérémonial d’Uji.'
    }
  }
];

export const PRESET_DRINKS: PresetDrink[] = [
  {
    id: 'ube-matcha',
    name: 'Ube Matcha',
    subtitle: 'Viral Purple & Green Layer',
    description: 'Velvety purple ube yam puree layered with oat milk and crowned with stone-ground Japanese Uji matcha.',
    price: 8.50,
    baseCalories: 240,
    defaultMilk: 'Oat Milk',
    tags: ['Instagram Viral', 'Iced Only'],
    layers: [
      { name: 'Ceremonial Uji Matcha', color: '#4E6E45', heightPercent: 35, opacity: 0.9, flavor: 'Earthy Green Tea' },
      { name: 'Barista Oat Milk', color: '#FAF8F5', heightPercent: 30, opacity: 0.85, flavor: 'Creamy Oat Milk' },
      { name: 'Pure Purple Ube Puree', color: '#7E52A0', heightPercent: 35, opacity: 0.95, flavor: 'Sweet Purple Yam' },
    ]
  },
  {
    id: 'mango-coco',
    name: 'Mango Coco Matcha',
    subtitle: 'Signature Layered Infusion',
    description: 'Vibrant sweet mango puree on the bottom, organic Uji ceremonial matcha in the middle, topped with airy coconut cream foam.',
    price: 8.25,
    baseCalories: 230,
    defaultMilk: 'Oat Milk',
    tags: ['Signature', 'Iced Only', 'Best Seller'],
    layers: [
      { name: 'Coconut Cream Foam', color: '#FAF8F3', heightPercent: 22, opacity: 0.95, flavor: 'Silky Coconut Cloud' },
      { name: 'Ceremonial Uji Matcha', color: '#4E6E45', heightPercent: 43, opacity: 0.9, flavor: 'Earthy Green Tea' },
      { name: 'Real Mango Puree', color: '#E8A838', heightPercent: 35, opacity: 0.98, flavor: 'Tropical Mango Swirl' },
    ]
  },
  {
    id: 'rose-matcha',
    name: 'Rose Falooda Matcha',
    subtitle: 'Floral & Basil Seed Twist',
    description: 'Matcha twist on traditional falooda with sweet rose syrup, basil seeds, vermicelli, Uji matcha, and cold foam.',
    price: 8.75,
    baseCalories: 260,
    defaultMilk: 'Whole Milk',
    tags: ['Limited Edition', 'Iced Only'],
    layers: [
      { name: 'Rose Petal Cold Foam', color: '#FADEE1', heightPercent: 25, opacity: 0.95, flavor: 'Sweet Rose Cream' },
      { name: 'Ceremonial Uji Matcha', color: '#4E6E45', heightPercent: 40, opacity: 0.9, flavor: 'Uji Green Tea' },
      { name: 'Rose Syrup & Basil Seeds', color: '#D85A75', heightPercent: 35, opacity: 0.95, flavor: 'Rose & Basil Seeds' },
    ]
  },
  {
    id: 'biscoff-latte',
    name: 'Biscoff Cookie Latte',
    subtitle: 'Spiced Cookie Butter Indulgence',
    description: 'Melted Belgian Biscoff cookie paste, double espresso, oat milk, crowned with spiced cookie cold foam.',
    price: 8.25,
    baseCalories: 320,
    defaultMilk: 'Whole Milk',
    tags: ['Indulgent', 'Hot or Iced', 'Popular'],
    layers: [
      { name: 'Cinnamon Biscoff Foam', color: '#EAD1BB', heightPercent: 20, opacity: 0.9, flavor: 'Caramelised Cookie Foam' },
      { name: 'Barista Steamed Milk', color: '#F7EFE3', heightPercent: 45, opacity: 0.85, flavor: 'Creamy Milk Base' },
      { name: 'Espresso & Biscoff Paste', color: '#3A2413', heightPercent: 35, opacity: 0.95, flavor: 'Spiced Caramel Coffee' },
    ]
  },
  {
    id: 'strawberry-shortcake',
    name: 'Strawberry Shortcake Matcha',
    subtitle: 'Sweet Berry & Earthy Uji',
    description: 'Hand-mashed fresh Quebec strawberries, vanilla bean oat milk, layered under brilliant green ceremonial matcha.',
    price: 8.25,
    baseCalories: 260,
    defaultMilk: 'Oat Milk',
    tags: ['Berry Infused', 'Iced Only'],
    layers: [
      { name: 'Vanilla Cloud Foam', color: '#FFFFFF', heightPercent: 18, opacity: 0.9, flavor: 'Sweet Vanilla Cloud' },
      { name: 'Uji Matcha Layer', color: '#567A4B', heightPercent: 42, opacity: 0.9, flavor: 'Rich Matcha' },
      { name: 'Fresh Strawberry Compote', color: '#C83B4A', heightPercent: 40, opacity: 0.95, flavor: 'Real Strawberry Mash' },
    ]
  },
  {
    id: 'maple-sea-salt',
    name: 'Maple Sea Salt Latte',
    subtitle: 'Pure Quebec Maple Blend',
    description: 'Dark amber Quebec maple syrup whisked into espresso and steamed milk, finished with sea salt cold foam.',
    price: 8.25,
    baseCalories: 250,
    defaultMilk: 'Oat Milk',
    tags: ['Quebec Special', 'Balanced Sweetness'],
    layers: [
      { name: 'Flaky Sea Salt Cold Foam', color: '#F3EFE9', heightPercent: 25, opacity: 0.95, flavor: 'Salty Sweet Cream' },
      { name: 'Velvety Steamed Milk', color: '#EBE1D3', heightPercent: 45, opacity: 0.85, flavor: 'Steamed Milk' },
      { name: 'Quebec Maple Espresso', color: '#4A2F1B', heightPercent: 30, opacity: 0.98, flavor: 'Rich Maple Espresso' },
    ]
  }
];

export const REVIEWS = [
  {
    id: 'r1',
    author: 'Sophie Tremblay',
    rating: 5,
    date: '2 days ago',
    comment: 'The Mango Coco Matcha is out of this world! The interior concrete aesthetic feels so Parisian and refined. Saumon fumé bagel was super fresh!',
    location: 'LaSalle, Montreal'
  },
  {
    id: 'r2',
    author: 'Marc-Antoine L.',
    rating: 5,
    date: '1 week ago',
    comment: 'Maison Cafe is hands down my favorite coffee shop in town. Their Biscoff Latte and Double Pistache lattes are rich without being overly sweet. Great vibe.',
    location: 'Verdun'
  },
  {
    id: 'r3',
    author: 'Camille B.',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Obsessed with the retro photobooth strip and the warm pendant lighting! Perfect place to study or catch up with friends over a fresh sesame bagel.',
    location: 'Downtown Montreal'
  }
];
