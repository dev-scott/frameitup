"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CustomFrameUploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
    width: number;
    height: number;
  } | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      console.log("❌ No file selected");
      return;
    }

    console.log("📁 File selected:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (file.size > 10 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 10MB");
      console.error("❌ File too large:", file.size);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez uploader une image");
      console.error("❌ Invalid file type:", file.type);
      return;
    }

    setIsUploading(true);
    console.log("🚀 Starting upload...");

    try {
      // Test de la route d'abord
      console.log("🧪 Testing Cloudinary route...");
      const testResponse = await fetch("/api/cloudinary/upload", {
        method: "GET",
      });

      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log("✅ Route test successful:", testData);
      } else {
        console.error("❌ Route test failed:", testResponse.status);
      }

      // Préparer le FormData
      const formData = new FormData();
      formData.append("file", file);

      console.log("📤 Sending POST request to /api/cloudinary/upload");

      const response = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Upload failed:", errorText);
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Upload successful:", data);

      setUploadedImage({
        url: data.url,
        publicId: data.publicId,
        width: data.width,
        height: data.height,
      });

      toast.success("Image uploadée avec succès !");
    } catch (error: any) {
      console.error("💥 Upload error:", error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setIsUploading(false);
      console.log("🏁 Upload process finished");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleContinue = () => {
    if (uploadedImage) {
      const params = new URLSearchParams({
        url: uploadedImage.url,
        publicId: uploadedImage.publicId,
        width: uploadedImage.width.toString(),
        height: uploadedImage.height.toString(),
      });
      router.push(`/custom-frame/edit?${params.toString()}`);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Créez votre cadre personnalisé
            </h1>
            <p className="text-muted-foreground text-lg">
              Uploadez votre photo et personnalisez-la à votre goût
            </p>
          </div>

          {/* Bouton de test */}
          <div className="mb-4 text-center">
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  const response = await fetch("/api/cloudinary/upload");
                  const data = await response.json();
                  console.log("Test result:", data);
                  toast.success("Route is accessible!");
                } catch (error) {
                  console.error("Test error:", error);
                  toast.error("Route is NOT accessible!");
                }
              }}
            >
              🧪 Test Cloudinary Route
            </Button>
          </div>

          {!uploadedImage ? (
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-primary",
                isUploading && "opacity-50 cursor-not-allowed",
              )}
            >
              <input {...getInputProps()} />

              <div className="flex flex-col items-center gap-4">
                {isUploading ? (
                  <>
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                    <p className="text-lg font-medium">Upload en cours...</p>
                    <p className="text-sm text-muted-foreground">
                      Vérifiez la console pour les détails
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium mb-2">
                        {isDragActive
                          ? "Déposez votre image ici"
                          : "Glissez-déposez votre image ici"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ou cliquez pour sélectionner un fichier
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, JPEG ou WEBP (max. 10MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <img
                  src={uploadedImage.url}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setUploadedImage(null)}
                >
                  Changer dimage
                </Button>
                <Button onClick={handleContinue} size="lg" className="px-8">
                  Continuer
                </Button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border rounded-lg text-center">
              <ImageIcon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Haute qualité</h3>
              <p className="text-sm text-muted-foreground">
                Vos photos seront imprimées en haute définition
              </p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <Upload className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Upload sécurisé</h3>
              <p className="text-sm text-muted-foreground">
                Vos images sont stockées en toute sécurité
              </p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Livraison rapide</h3>
              <p className="text-sm text-muted-foreground">
                Recevez votre cadre sous 7-10 jours
              </p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
