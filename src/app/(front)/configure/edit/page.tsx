"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";

const CANVAS_SIZES = [
  { id: "13x18", label: "13x18cm", width: 13, height: 18, price: 3000 },
  { id: "20x25", label: "20x25cm", width: 20, height: 25, price: 4500 },
  { id: "30x40", label: "30x40cm", width: 30, height: 40, price: 7000 },
  { id: "40x60", label: "40x60cm", width: 40, height: 60, price: 10000 },
  { id: "50x75", label: "50x75cm", width: 50, height: 75, price: 15000 },
];

const FRAME_STYLES = [
  { id: "wood_classic", name: "Bois Classique", price: 5000, color: "#8B4513" },
  { id: "modern_black", name: "Noir Moderne", price: 4500, color: "#000000" },
  {
    id: "white_minimalist",
    name: "Blanc Minimaliste",
    price: 4000,
    color: "#FFFFFF",
  },
  { id: "gold_elegant", name: "Or Élégant", price: 6000, color: "#FFD700" },
  { id: "rustic_wood", name: "Bois Rustique", price: 5500, color: "#654321" },
];

const FILTERS = [
  { id: "none", name: "Aucun", transform: "" },
  { id: "cartoon", name: "Cartoon", transform: "e_cartoonify" },
  { id: "sketch", name: "Sketch", transform: "e_art:incognito" },
  { id: "oilPaint", name: "Peinture", transform: "e_art:quartz" },
  { id: "vintage", name: "Vintage", transform: "e_sepia:80" },
  { id: "blackWhite", name: "N&B", transform: "e_grayscale" },
];

function CustomFrameEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [publicId, setPublicId] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedSize, setSelectedSize] = useState(CANVAS_SIZES[2]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_STYLES[0]);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);

  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  useEffect(() => {
    const url = searchParams.get("url");
    const pid = searchParams.get("publicId");

    if (url && pid) {
      setOriginalUrl(url);
      setPublicId(pid);
      setPreviewUrl(url);
    } else {
      router.push("/configure/upload");
    }
  }, [searchParams, router]);

  const buildTransformUrl = () => {
    const transforms = [];

    if (selectedFilter.transform) {
      transforms.push(selectedFilter.transform);
    }

    if (brightness !== 0) {
      transforms.push(`e_brightness:${brightness}`);
    }

    if (contrast !== 0) {
      transforms.push(`e_contrast:${contrast}`);
    }

    if (saturation !== 0) {
      transforms.push(`e_saturation:${saturation}`);
    }

    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const transformStr =
      transforms.length > 0 ? transforms.join(",") + "/" : "";

    return `${baseUrl}/${transformStr}${publicId}`;
  };

  useEffect(() => {
    if (publicId) {
      const url = buildTransformUrl();
      setPreviewUrl(url);
    }
  }, [selectedFilter, brightness, contrast, saturation, publicId]);

  const totalPrice = selectedSize.price + selectedFrame.price;

  const handleContinue = () => {
    const params = new URLSearchParams({
      originalUrl,
      previewUrl,
      publicId,
      sizeId: selectedSize.id,
      frameId: selectedFrame.id,
      filterId: selectedFilter.id,
      brightness: brightness.toString(),
      contrast: contrast.toString(),
      saturation: saturation.toString(),
      price: totalPrice.toString(),
    });

    router.push(`/configure/checkout?${params.toString()}`);
  };

  if (!publicId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Personnalisez votre cadre</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="aspect-square relative">
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              )}

              <div
                className="w-full h-full p-4 rounded-lg"
                style={{
                  backgroundColor: selectedFrame.color,
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain bg-white"
                  onLoad={() => setIsProcessing(false)}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Taille</span>
                <span className="font-semibold">{selectedSize.label}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Cadre</span>
                <span className="font-semibold">{selectedFrame.name}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="size" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="size">Taille</TabsTrigger>
                <TabsTrigger value="frame">Cadre</TabsTrigger>
                <TabsTrigger value="filter">Filtre</TabsTrigger>
                <TabsTrigger value="adjust">Ajuster</TabsTrigger>
              </TabsList>

              {/* Size Tab */}
              <TabsContent value="size" className="space-y-4">
                <Label>Sélectionnez la taille</Label>
                <div className="grid grid-cols-2 gap-4">
                  {CANVAS_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "p-4 border-2 rounded-lg text-left transition-colors",
                        selectedSize.id === size.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <div className="font-semibold">{size.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {formatPrice(size.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              {/* Frame Tab */}
              <TabsContent value="frame" className="space-y-4">
                <Label>Choisissez votre cadre</Label>
                <div className="grid grid-cols-2 gap-4">
                  {FRAME_STYLES.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      className={cn(
                        "p-4 border-2 rounded-lg text-left transition-colors",
                        selectedFrame.id === frame.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: frame.color }}
                        />
                        <div className="font-semibold">{frame.name}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(frame.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              {/* Filter Tab */}
              <TabsContent value="filter" className="space-y-4">
                <Label>Appliquer un filtre</Label>
                <div className="grid grid-cols-3 gap-4">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setIsProcessing(true);
                        setSelectedFilter(filter);
                      }}
                      className={cn(
                        "p-4 border-2 rounded-lg text-center transition-colors",
                        selectedFilter.id === filter.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <div className="font-medium text-sm">{filter.name}</div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              {/* Adjust Tab */}
              <TabsContent value="adjust" className="space-y-6">
                <div>
                  <Label>Luminosité: {brightness}</Label>
                  <Slider
                    value={[brightness]}
                    onValueChange={(v: any) => {
                      setIsProcessing(true);
                      setBrightness(v[0]);
                    }}
                    min={-100}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Contraste: {contrast}</Label>
                  <Slider
                    value={[contrast]}
                    onValueChange={(v: any) => {
                      setIsProcessing(true);
                      setContrast(v[0]);
                    }}
                    min={-100}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Saturation: {saturation}</Label>
                  <Slider
                    value={[saturation]}
                    onValueChange={(v: any) => {
                      setIsProcessing(true);
                      setSaturation(v[0]);
                    }}
                    min={-100}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setBrightness(0);
                    setContrast(0);
                    setSaturation(0);
                  }}
                  className="w-full"
                >
                  Réinitialiser
                </Button>
              </TabsContent>
            </Tabs>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Retour
              </Button>
              <Button onClick={handleContinue} className="flex-1" size="lg">
                Continuer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomFrameEditPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <CustomFrameEditContent />
    </Suspense>
  );
}
