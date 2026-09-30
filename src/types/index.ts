export type ProductCategory =
  | "Sofa"
  | "Chair"
  | "Table"
  | "Bed"
  | "Storage"
  | "Lighting"
  | "Decor";

export type RoomCategory =
  | "living-room"
  | "bedroom"
  | "dining-room"
  | "workspace";

export type ProductStyle =
  | "Modern"
  | "Scandinavian"
  | "Japandi"
  | "Mid-Century"
  | "Minimal";

export interface ProductVariant {
  name: string;
  value: string;
  colorCode?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  room: RoomCategory;
  collectionName?: string;
  style: ProductStyle;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    unit: string;
  };
  material: string;
  colors: {
    name: string;
    code: string;
  }[];
  sizes?: string[];
  images: string[];
  featured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string; // unique item id: productId-color-size
  productId: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  selectedColor: string;
  selectedSize?: string;
  quantity: number;
  stock: number;
}

export interface Customer {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  notes?: string;
}

export type ShippingTier = "regular" | "express" | "same-day";

export interface ShippingMethod {
  id: ShippingTier;
  name: string;
  estimatedDays: string;
  price: number;
}

export type PaymentMethodType =
  | "bank-bca"
  | "bank-mandiri"
  | "bank-bni"
  | "bank-bri"
  | "va-bca"
  | "va-mandiri"
  | "va-bni"
  | "ewallet-gopay"
  | "ewallet-ovo"
  | "ewallet-dana"
  | "qris"
  | "cod";

export interface PaymentMethodOption {
  id: PaymentMethodType;
  name: string;
  category: "bank" | "va" | "ewallet" | "qris" | "cod";
  accountNumber?: string;
  icon?: string;
}

export type OrderStatus =
  | "created"
  | "paid"
  | "processing"
  | "shipped"
  | "in_transit"
  | "delivered";

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: Customer;
  shipping: ShippingMethod;
  payment: PaymentMethodOption;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  trackingNumber: string;
  estimatedDeliveryDate: string;
}
