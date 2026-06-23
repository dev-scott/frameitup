import { create } from 'zustand';

export type GlasingType = 'STANDARD' | 'UV_PROTECTIVE' | 'ANTI_REFLECTIVE' | 'MUSEUM_GLASS';

export interface FrameOption {
  id: string;
  name: string;
  material: string;
  color: string;
  widthMm: number;
  heightMm: number;
  depthMm: number;
  priceUsd: number;
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
  
  // Matting State
  hasMat: boolean;
  matColor: string; // Hex color code
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
  };
}

const DEFAULT_FRAME: FrameOption = {
  id: 'frame-matte-black',
  name: 'Matte Black',
  material: 'METAL',
  color: '#1A1A1A',
  widthMm: 20,
  heightMm: 20,
  depthMm: 10,
  priceUsd: 39.99,
  thumbnailUrl: '/frames/matte-black.webp',
};

export const useFrameStore = create<FrameState>((set, get) => ({
  imageSrc: null,
  fileName: null,
  fileSize: null,
  
  artworkWidthMm: 300,
  artworkHeightMm: 400,
  
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
    artworkWidthMm: 300,
    artworkHeightMm: 400,
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
    const { artworkWidthMm, artworkHeightMm, selectedFrame, hasMat, matWidthMm, glasingType, quantity } = get();
    
    // Price scales with total perimeter size of frame
    // Total perimeter in meters:
    const totalWidth = artworkWidthMm + (hasMat ? matWidthMm * 2 : 0) + (selectedFrame.widthMm * 2);
    const totalHeight = artworkHeightMm + (hasMat ? matWidthMm * 2 : 0) + (selectedFrame.widthMm * 2);
    const perimeterM = ((totalWidth + totalHeight) * 2) / 1000;
    
    // 1. Frame base cost depends on linear meter pricing of chosen profile
    const baseFrame = selectedFrame.priceUsd * perimeterM;
    
    // 2. Matting cost: flat fee + scaled with mat size
    const matPrice = hasMat ? (15.00 + perimeterM * 10) : 0;
    
    // 3. Glasing cost: Standard is free, others scale with surface area in sq. meters
    const surfaceAreaSqm = (totalWidth * totalHeight) / 1000000;
    let glassPrice = 0;
    if (glasingType === 'UV_PROTECTIVE') {
      glassPrice = 15.00 + surfaceAreaSqm * 40;
    } else if (glasingType === 'ANTI_REFLECTIVE') {
      glassPrice = 25.00 + surfaceAreaSqm * 60;
    } else if (glasingType === 'MUSEUM_GLASS') {
      glassPrice = 45.00 + surfaceAreaSqm * 100;
    }
    
    const subtotal = baseFrame + matPrice + glassPrice;
    const total = subtotal * quantity;
    
    return {
      baseFrame: parseFloat(baseFrame.toFixed(2)),
      matPrice: parseFloat(matPrice.toFixed(2)),
      glassPrice: parseFloat(glassPrice.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  },
}));
