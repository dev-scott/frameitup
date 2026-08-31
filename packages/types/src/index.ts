// ─── User & Auth ──────────────────────────────────────────────────────────────
export interface User {
  id: string;
  clerkId: string;
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
  user?: User;
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
  frameId: string;
  frame?: Frame;
  imageUrl: string;
  matColor?: string;
  glasingType: GlasingType;
  widthPx: number;
  heightPx: number;
  quantity: number;
  unitPriceUsd: number;
  createdAt: Date;
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
  published: boolean;
  createdAt: Date;
}

export enum ArtworkEdition {
  OPEN = 'OPEN',
  LIMITED = 'LIMITED',
  ONE_OF_ONE = 'ONE_OF_ONE',
}

export interface ArtistProfile {
  id: string;
  userId: string;
  user?: User;
  bio: string;
  portfolioUrl?: string;
  country: string;
  stripeConnectId?: string;
  royaltyPercent: number;
  verified: boolean;
}

// ─── Finance & Accounting Core ────────────────────────────────────────────────
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

export enum ExpenseCategory {
  RAW_MATERIALS_WOOD = 'RAW_MATERIALS_WOOD',
  RAW_MATERIALS_GLASS = 'RAW_MATERIALS_GLASS',
  PACKAGING = 'PACKAGING',
  SHIPPING_LOGISTICS = 'SHIPPING_LOGISTICS',
  MARKETING_ADS = 'MARKETING_ADS',
  SOFTWARE_SERVERS = 'SOFTWARE_SERVERS',
  PAYROLL_SALARIES = 'PAYROLL_SALARIES',
  WORKSHOP_RENT = 'WORKSHOP_RENT',
  PAYMENT_FEES = 'PAYMENT_FEES',
  LEGAL_ACCOUNTING = 'LEGAL_ACCOUNTING',
  OTHER_OPEX = 'OTHER_OPEX',
}

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  DIRECT_DEBIT = 'DIRECT_DEBIT',
}

export enum PaymentTerms {
  DUE_ON_RECEIPT = 'DUE_ON_RECEIPT',
  NET_15 = 'NET_15',
  NET_30 = 'NET_30',
  NET_60 = 'NET_60',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum PayoutStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export interface Supplier {
  id: string;
  name: string;
  category: ExpenseCategory;
  contactEmail?: string;
  contactPhone?: string;
  taxId?: string;
  paymentTerms: PaymentTerms;
  currency: string;
  balanceDueUsd: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  supplierId?: string;
  supplier?: Supplier;
  supplierName?: string;
  category: ExpenseCategory;
  description: string;
  amountUsd: number; // Montant HT
  taxRatePercent: number; // TVA % (ex: 20%)
  taxAmountUsd: number; // Montant TVA
  totalWithTaxUsd: number; // Montant TTC
  status: ExpenseStatus;
  paymentMethod: PaymentMethod;
  date: Date;
  dueDate?: Date;
  paidAt?: Date;
  period: string; // YYYY-MM
  isRecurring: boolean;
  receiptUrl?: string;
  notes?: string;
  createdAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPriceUsd: number;
  totalUsd: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  clientTaxId?: string;
  issueDate: Date;
  dueDate: Date;
  subtotalUsd: number;
  taxRatePercent: number;
  taxAmountUsd: number;
  totalUsd: number;
  status: InvoiceStatus;
  paidAt?: Date;
  items?: InvoiceItem[];
  pdfUrl?: string;
  notes?: string;
}

export interface ArtistPayout {
  id: string;
  artistId: string;
  artist?: ArtistProfile;
  amountUsd: number;
  period: string;
  status: PayoutStatus;
  stripeTransferId?: string;
  processedAt?: Date;
  artworksCount: number;
  createdAt: Date;
}

export interface FinancialBudget {
  id: string;
  period: string;
  category: string;
  targetAmountUsd: number;
  actualAmountUsd: number;
  notes?: string;
}

// ─── Financial Analytics DTOs ─────────────────────────────────────────────────

export interface FinancialKpiSummary {
  totalRevenue: number;
  revenueGrowthPercent: number;
  totalCogs: number;
  grossProfit: number;
  grossMarginPercent: number;
  totalOpex: number;
  ebitda: number;
  netProfit: number;
  netMarginPercent: number;
  cashRunwayMonths: number;
  currentCashReserve: number;
  netCashFlow: number;
  averageOrderValue: number;
  totalOrdersCount: number;
  unpaidInvoicesAmount: number;
  pendingExpensesAmount: number;
  artistPayoutsPending: number;
}

export interface RevenueBreakdown {
  saasFrames: number;
  marketplace: number;
  subscriptions: number;
  corporateB2b: number;
  total: number;
}

export interface ExpenseBreakdown {
  category: ExpenseCategory;
  categoryLabel: string;
  amountUsd: number;
  percentage: number;
}

export interface MonthlyFinancialTrend {
  period: string; // "Jan 2026", "2026-01"
  revenue: number;
  cogs: number;
  opex: number;
  grossProfit: number;
  netProfit: number;
  cashFlow: number;
}

export interface UnitEconomics {
  orderId: string;
  orderNumber: string;
  clientName: string;
  date: Date;
  productName: string;
  frameMaterial: FrameMaterial;
  glasingType: GlasingType;
  sellingPrice: number;
  costMaterial: number;
  costGlass: number;
  costPackaging: number;
  costShipping: number;
  stripeFee: number;
  totalCost: number;
  netMargin: number;
  netMarginPercent: number;
}

export interface VatReport {
  period: string;
  collectedVat: number; // TVA collectée sur ventes
  deductibleVat: number; // TVA déductible sur achats/dépenses
  netVatPayable: number; // TVA nette due (ou crédit de TVA si négatif)
  totalTaxableSales: number;
  totalTaxablePurchases: number;
}

export interface ProfitAndLossStatement {
  period: string;
  revenue: {
    saasCustomFrames: number;
    marketplaceArt: number;
    corporateB2b: number;
    subscriptions: number;
    totalRevenue: number;
  };
  costOfGoodsSold: {
    woodMouldings: number;
    museumGlassPlexi: number;
    matboardsBackings: number;
    packagingSupplies: number;
    directShipping: number;
    totalCogs: number;
  };
  grossProfit: number;
  grossMarginPercent: number;
  operatingExpenses: {
    salariesAndWages: number;
    marketingAndAds: number;
    softwareAndHosting: number;
    workshopRentAndUtilities: number;
    paymentProcessingFees: number;
    legalAndAccounting: number;
    otherGeneralAndAdmin: number;
    totalOpex: number;
  };
  operatingIncomeEbitda: number;
  taxesAndDuties: number;
  netIncome: number;
  netMarginPercent: number;
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
