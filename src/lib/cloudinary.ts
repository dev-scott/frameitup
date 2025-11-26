import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary


export const CLOUDINARY_TRANSFORMATIONS = {
  cartoon: 'e_cartoonify',
  sketch: 'e_art:incognito',
  oilPaint: 'e_art:quartz',
  vintage: 'e_sepia:80',
  blackWhite: 'e_grayscale',
  enhance: 'e_improve',
  sharpen: 'e_sharpen:100',
  blur: 'e_blur:300',
  vignette: 'e_vignette',
};


export const FRAME_STYLES = [
  {
    id: 'wood_classic',
    name: 'Bois Classique',
    overlay: 'frame-wood-classic',
    price: 5000,
  },
  {
    id: 'modern_black',
    name: 'Noir Moderne',
    overlay: 'frame-modern-black',
    price: 4500,
  },
  {
    id: 'white_minimalist',
    name: 'Blanc Minimaliste',
    overlay: 'frame-white-minimalist',
    price: 4000,
  },
  {
    id: 'gold_elegant',
    name: 'Or Élégant',
    overlay: 'frame-gold-elegant',
    price: 6000,
  },
  {
    id: 'rustic_wood',
    name: 'Bois Rustique',
    overlay: 'frame-rustic-wood',
    price: 5500,
  },
];

export const CANVAS_SIZES = [
  { id: '13x18', label: '13x18cm', width: 13, height: 18, price: 3000 },
  { id: '20x25', label: '20x25cm', width: 20, height: 25, price: 4500 },
  { id: '30x40', label: '30x40cm', width: 30, height: 40, price: 7000 },
  { id: '40x60', label: '40x60cm', width: 40, height: 60, price: 10000 },
  { id: '50x75', label: '50x75cm', width: 50, height: 75, price: 15000 },
];

export interface FrameConfiguration {
  imageUrl: string;
  croppedImageUrl?: string;
  size: typeof CANVAS_SIZES[0];
  frameStyle: typeof FRAME_STYLES[0];
  filter?: string;
  adjustments: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
  };
}

export const buildCloudinaryUrl = (
  publicId: string,
  transformations: string[]
): string => {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const transformStr = transformations.join(',');
  return `${baseUrl}/${transformStr}/${publicId}`;
};