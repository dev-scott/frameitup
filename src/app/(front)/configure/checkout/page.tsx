'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/utils';

const CheckoutSchema = z.object({
  phone: z.string().regex(/^6\d{8}$/, 'Numéro invalide (ex: 699887766)'),
  address: z.string().min(10, 'Adresse trop courte'),
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

function CustomFrameCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [config, setConfig] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
  });

  useEffect(() => {
    const configData = {
      originalUrl: searchParams.get('originalUrl'),
      previewUrl: searchParams.get('previewUrl'),
      publicId: searchParams.get('publicId'),
      sizeId: searchParams.get('sizeId'),
      frameId: searchParams.get('frameId'),
      filterId: searchParams.get('filterId'),
      brightness: parseInt(searchParams.get('brightness') || '0'),
      contrast: parseInt(searchParams.get('contrast') || '0'),
      saturation: parseInt(searchParams.get('saturation') || '0'),
      price: parseInt(searchParams.get('price') || '0'),
    };
    
    if (!configData.originalUrl || !configData.publicId) {
      router.push('/custom-frame/upload');
      return;
    }
    
    setConfig(configData);
  }, [searchParams, router]);

  const { mutate: createFrame, isLoading } = trpc.customFrame.createCustomFrame.useMutation({
    onSuccess: ({ url }) => {
      toast.success('Commande créée avec succès !');
      if (url) router.push(url);
    },
    onError: (error) => {
      toast.error('Erreur lors de la création de la commande');
      console.error(error);
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (!config) return;
    
    createFrame({
      originalImageUrl: config.originalUrl,
      processedImageUrl: config.previewUrl,
      cloudinaryPublicId: config.publicId,
      size: config.sizeId,
      frameStyle: config.frameId,
      filter: config.filterId,
      adjustments: {
        brightness: config.brightness,
        contrast: config.contrast,
        saturation: config.saturation,
      },
      price: config.price,
      phone: data.phone,
      address: data.address,
    });
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Votre cadre</h2>
            
            <div className="aspect-square relative mb-6 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={config.previewUrl}
                alt="Frame preview"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taille</span>
                <span className="font-medium">{config.sizeId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Style de cadre</span>
                <span className="font-medium capitalize">
                  {config.frameId.replace('_', ' ')}
                </span>
              </div>
              {config.filterId !== 'none' && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Filtre</span>
                  <span className="font-medium capitalize">{config.filterId}</span>
                </div>
              )}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(config.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Informations de livraison</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  placeholder="699887766"
                  {...register('phone')}
                  className="mt-2"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Format: 6XXXXXXXX
                </p>
              </div>

              <div>
                <Label htmlFor="address">Adresse de livraison</Label>
                <Input
                  id="address"
                  placeholder="Douala, Akwa, Rue..."
                  {...register('address')}
                  className="mt-2"
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Informations importantes</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Délai de production: 5-7 jours</li>
                  <li>• Livraison sous 2-3 jours après production</li>
                  <li>• Paiement à la livraison</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Retour
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    'Confirmer la commande'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Pourquoi choisir FrameitUp ?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">✓ Qualité supérieure</h4>
              <p className="text-sm text-muted-foreground">
                Impression haute définition sur papier photo premium
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">✓ Livraison sécurisée</h4>
              <p className="text-sm text-muted-foreground">
                Emballage soigné pour protéger votre cadre
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">✓ Garantie satisfaction</h4>
              <p className="text-sm text-muted-foreground">
                Retour gratuit si vous nêtes pas satisfait
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomFrameCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <CustomFrameCheckoutContent />
    </Suspense>
  );
}