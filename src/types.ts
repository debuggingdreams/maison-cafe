export type Language = 'EN' | 'FR';

export type Category = 'BAGELS' | 'CLASSIQUES' | 'MATCHA_LATTES' | 'SUPPLEMENTS';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  secondaryPrice?: number; // e.g. for Espresso $3.25 / $3.75
  description: {
    EN: string;
    FR: string;
  };
  tags?: ('Vegan' | 'Dairy-Free' | 'House Special' | 'Gluten-Free Friendly' | 'Best Seller' | 'Instagram Viral' | 'Limited Time' | 'Limited Time Only')[];
  image?: string;
  calories?: number;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: {
    milk?: string;
    sweetness?: string;
    bagelType?: string;
    extraMatcha?: boolean;
    notes?: string;
  };
}

export interface BookingDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Concrete Bar' | 'Window Bistro' | 'Patio Seating' | 'Quiet Reading Nook';
  welcomeDrinks: string[];
  specialRequests?: string;
  qrCodeUrl?: string;
  status: 'Confirmed' | 'Pending';
}

export interface DrinkLayer {
  name: string;
  color: string;
  heightPercent: number;
  opacity: number;
  flavor: string;
}

export interface PresetDrink {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  layers: DrinkLayer[];
  baseCalories: number;
  defaultMilk: string;
  tags: string[];
}
