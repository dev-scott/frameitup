// src/collections/CustomFrames.ts
import { CollectionConfig } from 'payload/types';

export const CustomFrames: CollectionConfig = {
  slug: 'custom_frames',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'originalImageUrl',
      type: 'text',
      required: true,
      label: 'URL de l\'image originale',
    },
    {
      name: 'processedImageUrl',
      type: 'text',
      required: true,
      label: 'URL de l\'image traitée',
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      required: true,
    },
    {
      name: 'size',
      type: 'select',
      required: true,
      options: [
        { label: '13x18cm', value: '13x18' },
        { label: '20x25cm', value: '20x25' },
        { label: '30x40cm', value: '30x40' },
        { label: '40x60cm', value: '40x60' },
        { label: '50x75cm', value: '50x75' },
      ],
    },
    {
      name: 'frameStyle',
      type: 'select',
      required: true,
      options: [
        { label: 'Bois Classique', value: 'wood_classic' },
        { label: 'Noir Moderne', value: 'modern_black' },
        { label: 'Blanc Minimaliste', value: 'white_minimalist' },
        { label: 'Or Élégant', value: 'gold_elegant' },
        { label: 'Bois Rustique', value: 'rustic_wood' },
      ],
    },
    {
      name: 'filter',
      type: 'select',
      options: [
        { label: 'Aucun', value: 'none' },
        { label: 'Cartoon', value: 'cartoon' },
        { label: 'Sketch', value: 'sketch' },
        { label: 'Peinture à l\'huile', value: 'oilPaint' },
        { label: 'Vintage', value: 'vintage' },
        { label: 'Noir & Blanc', value: 'blackWhite' },
      ],
    },
    {
      name: 'adjustments',
      type: 'group',
      fields: [
        {
          name: 'brightness',
          type: 'number',
          min: -100,
          max: 100,
          defaultValue: 0,
        },
        {
          name: 'contrast',
          type: 'number',
          min: -100,
          max: 100,
          defaultValue: 0,
        },
        {
          name: 'saturation',
          type: 'number',
          min: -100,
          max: 100,
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'En attente', value: 'pending' },
        { label: 'En production', value: 'production' },
        { label: 'Terminé', value: 'completed' },
        { label: 'Livré', value: 'delivered' },
      ],
    },
    {
      name: 'isPaid',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};