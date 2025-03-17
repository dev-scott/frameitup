// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from '@/config/products'

export const COLORS = [
  { label: 'Black', value: 'black', tw: 'zinc-900' },
  {
    label: 'Blue',
    value: 'blue',
    tw: 'blue-950',
  },
  { label: 'Rose', value: 'rose', tw: 'rose-950' },
] as const

export const MODELS = {
  name: 'models',
  options: [
    {
      label: 'iPhone X',
      value: 'iphonex',
    },
    {
      label: 'iPhone 11',
      value: 'iphone11',
    },
    {
      label: 'iPhone 12',
      value: 'iphone12',
    },
    {
      label: 'iPhone 13',
      value: 'iphone13',
    },
    {
      label: 'iPhone 14',
      value: 'iphone14',
    },
    {
      label: 'iPhone 15',
      value: 'iphone15',
    },
  ],
} as const

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'WOOD',
      value: 'WOOD',
      description: 'A traditional and versatile material ',
      price: PRODUCT_PRICES.material.WOOD,
    },
    {
      label: 'Metal ',
      value: 'METAL',
      description: 'A sleek and moder material',
      price: PRODUCT_PRICES.material.METAL,
    },
    {
      label: 'Plastic ',
      value: 'PLASTIC',
      description: 'Lightweight and affordable material available',
      price: PRODUCT_PRICES.material.PLASTIC,
    },
    {
      label: 'Composite ',
      value: 'COMPOSITE',
      description: 'Made from engineered materials like MDF ( Medium-Density-Fiberboard )',
      price: PRODUCT_PRICES.material.COMPOSITE,
    },
  ],
} as const

export const STYLES = {
  name: 'style',
  options: [
    {
      label: 'Classic Style',
      value: 'CLASSIC',
      description: "Timeless designs with clean lines and minimal ornamentation",
      price: PRODUCT_PRICES.style.CLASSIC,
    },
    {
      label: 'Modern Style',
      value: 'MODERN',
      description: 'Contemporary designs emphasizing simplicity and sleekness',
      price: PRODUCT_PRICES.style.MODERN,
    },
    {
      label: 'Rustic Style',
      value: 'RUSTIC',
      description: 'Designs inspired by nature with distressed finishes',
      price: PRODUCT_PRICES.style.RUSTIC,
    },
    {
      label: 'Industrial Style',
      value: 'INDUSTRIAL',
      description: 'Urban-inspired designs featuring raw materials like metal and reclaimed wood',
      price: PRODUCT_PRICES.style.INDUSTRIAL,
    },
  ],
} as const
