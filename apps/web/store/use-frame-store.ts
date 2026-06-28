import { create } from 'zustand';
import { getSizeLabel, getFramePrice } from '@/lib/frame-pricing';

export type GlasingType = 'STANDARD' | 'UV_PROTECTIVE' | 'ANTI_REFLECTIVE' | 'MUSEUM_GLASS';

export interface FrameOption {
  id: string;
  name: string;
  material: string;
  color: string;
  widthMm: number;
  heightMm: number;
  depthMm: number;
  priceUsd: number; // kept for fallback display on frames page
  thumbnailUrl: string;
}

export interface ShippingDetails {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp?: string;
}

interface FrameState {
  // Image Upload State
  imageSrc: string | null;
  fileName: string | null;
  fileSize: string | null;

  // Customization State
  artworkWidthMm: number;
  artworkHeightMm: number;

  // Frame Option
  selectedFrame: FrameOption;

  // Matting State (désactivé pour l'instant)
  hasMat: boolean;
  matColor: string;
  matColorName: string;
  matWidthMm: number;

  // Glasing State
  glasingType: GlasingType;

  // Pricing Details
  quantity: number;

  // Checkout info
  shippingDetails: ShippingDetails | null;

  // Actions
  setImage: (src: string | null, name: string | null, size: string | null) => void;
  setDimensions: (width: number, height: number) => void;
  setSelectedFrame: (frame: FrameOption) => void;
  setMat: (hasMat: boolean, color?: string, name?: string, width?: number) => void;
  setGlasing: (type: GlasingType) => void;
  setQuantity: (qty: number) => void;
  setShipping: (details: ShippingDetails) => void;
  reset: () => void;

  // Price Calculators
  calculatePrice: () => {
    baseFrame: number;
    matPrice: number;
    glassPrice: number;
    total: number;
    isAvailable: boolean;      // false si la taille n'est pas dispo pour ce cadre
    sizeLabel: string | null;  // ex: 'A3'
  };
}

const DEFAULT_FRAME: FrameOption = {
  id: 'frame-bois',
  name: 'Cadre en Bois',
  material: 'WOOD',
  color: '#8B6914',
  widthMm: 25,
  heightMm: 25,
  depthMm: 12,
  priceUsd: 7000,
  thumbnailUrl: '/frames/bois.webp',
};

export const useFrameStore = create<FrameState>((set, get) => ({
  imageSrc: null,
  fileName: null,
  fileSize: null,

  // Taille par défaut : A3
  artworkWidthMm: 297,
  artworkHeightMm: 420,

  selectedFrame: DEFAULT_FRAME,

  hasMat: false,
  matColor: '#FAFAF9',
  matColorName: 'Cotton White',
  matWidthMm: 30,

  glasingType: 'STANDARD',
  quantity: 1,
  shippingDetails: null,

  setImage: (src, name, size) => set({ imageSrc: src, fileName: name, fileSize: size }),

  setDimensions: (width, height) => set({ artworkWidthMm: width, artworkHeightMm: height }),

  setSelectedFrame: (frame) => set({ selectedFrame: frame }),

  setMat: (hasMat, color, name, width) => set((state) => ({
    hasMat,
    matColor: color ?? state.matColor,
    matColorName: name ?? state.matColorName,
    matWidthMm: width ?? state.matWidthMm,
  })),

  setGlasing: (type) => set({ glasingType: type }),

  setQuantity: (qty) => set({ quantity: qty }),

  setShipping: (details) => set({ shippingDetails: details }),

  reset: () => set({
    imageSrc: null,
    fileName: null,
    fileSize: null,
    artworkWidthMm: 297,
    artworkHeightMm: 420,
    selectedFrame: DEFAULT_FRAME,
    hasMat: false,
    matColor: '#FAFAF9',
    matColorName: 'Cotton White',
    matWidthMm: 30,
    glasingType: 'STANDARD',
    quantity: 1,
    shippingDetails: null,
  }),

  calculatePrice: () => {
    const { artworkWidthMm, artworkHeightMm, selectedFrame, quantity } = get();

    // Détermine le label ISO (A2, A3, A4, A5)
    const sizeLabel = getSizeLabel(artworkWidthMm, artworkHeightMm);

    // Cherche le prix fixe pour ce cadre + cette taille
    const fixedPrice = getFramePrice(selectedFrame.id, sizeLabel);

    const isAvailable = fixedPrice !== null;

    // Prix de base = prix fixe pour cette combinaison, ou 0 si non dispo
    const baseFrame = fixedPrice ?? 0;

    // Passe-partout désactivé pour l'instant
    const matPrice = 0;

    // Verre Standard uniquement = gratuit
    const glassPrice = 0;

    const subtotal = baseFrame + matPrice + glassPrice;
    const total = subtotal * quantity;

    return {
      baseFrame,
      matPrice,
      glassPrice,
      total,
      isAvailable,
      sizeLabel,
    };
  },
}));
