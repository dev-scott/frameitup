// ─── User & Auth ──────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ARTIST = 'ARTIST',
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
}

// ─── Frame & Product ──────────────────────────────────────────────────────────
export interface Frame {
  id: string;
  name: string;
  material: FrameMaterial;
  color: string;
  widthMm: number;
  heightMm: number;
  depthMm: number;
  priceUsd: number;
  thumbnailUrl: string;
  available: boolean;
}

export enum FrameMaterial {
  WOOD = 'WOOD',
  METAL = 'METAL',
  ACRYLIC = 'ACRYLIC',
  COMPOSITE = 'COMPOSITE',
}

export interface FrameCustomization {
  frameId: string;
  imageUrl: string;
  matColor?: string;
  glassingType: GlasingType;
  widthPx: number;
  heightPx: number;
  cropData?: CropData;
}

export enum GlasingType {
  STANDARD = 'STANDARD',
  UV_PROTECTIVE = 'UV_PROTECTIVE',
  ANTI_REFLECTIVE = 'ANTI_REFLECTIVE',
  MUSEUM_GLASS = 'MUSEUM_GLASS',
}

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  totalUsd: number;
  stripePaymentIntentId?: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  IN_PRODUCTION = 'IN_PRODUCTION',
  QUALITY_CHECK = 'QUALITY_CHECK',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export interface OrderItem {
  id: string;
  orderId: string;
  customization: FrameCustomization;
  quantity: number;
  unitPriceUsd: number;
}

// ─── Marketplace ──────────────────────────────────────────────────────────────
export interface Artwork {
  id: string;
  artistId: string;
  title: string;
  description: string;
  imageUrl: string;
  priceUsd: number;
  edition: ArtworkEdition;
  tags: string[];
  availableCount: number;
  soldCount: number;
  createdAt: Date;
}

export enum ArtworkEdition {
  OPEN = 'OPEN',
  LIMITED = 'LIMITED',
  ONE_OF_ONE = 'ONE_OF_ONE',
}

export interface ArtistProfile {
  userId: string;
  bio: string;
  portfolioUrl?: string;
  country: string;
  stripeConnectId?: string;
  royaltyPercent: number;
  verified: boolean;
}

// ─── Finance ──────────────────────────────────────────────────────────────────
export interface RevenueEntry {
  id: string;
  source: RevenueSource;
  amountUsd: number;
  cogsUsd: number;
  profitUsd: number;
  orderId?: string;
  period: string; // YYYY-MM
  recordedAt: Date;
}

export enum RevenueSource {
  SAAS_FRAME = 'SAAS_FRAME',
  MARKETPLACE = 'MARKETPLACE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  CORPORATE = 'CORPORATE',
}

// ─── Shared Utilities ─────────────────────────────────────────────────────────
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
