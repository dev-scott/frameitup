"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { motion, AnimatePresence } from "motion/react";
export default function CustomFrameUploadPageTRPC() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
    width: number;
    height: number;
  } | null>(null);

  const { data: configTest } = trpc.upload.testConfig.useQuery();

  const { mutate: uploadImage, isLoading: isUploading } =
    trpc.upload.uploadImage.useMutation({
      onSuccess: (data) => {
        console.log("✅ Upload successful:", data);
        setUploadedImage({
          url: data.url,
          publicId: data.publicId,
          width: data.width,
          height: data.height,
        });
        toast.success("Image uploadée avec succès !");
      },
      onError: (error) => {
        console.error("❌ Upload error:", error);
        toast.error(`Erreur: ${error.message}`);
      },
    });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 10MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Veuillez uploader une image");
        return;
      }

      try {
        const base64Image = await convertToBase64(file);
        uploadImage({ base64Image, fileName: file.name });
      } catch (error) {
        toast.error("Erreur lors de la préparation du fichier");
      }
    },
    [uploadImage],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
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
      router.push(`/configure/edit?${params.toString()}`);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto">
          {/* <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Créez votre cadre personnalisé
            </h1>
            <p className="text-muted-foreground text-lg">
              Uploadez votre photo et personnalisez-la à votre goût
            </p>

            {configTest && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-left max-w-md mx-auto">
                <p className="font-semibold mb-2">Configuration Cloudinary:</p>
                <p>Status: {configTest.status}</p>
                <p>Cloud Name: {configTest.cloudName}</p>
                <p>API Key: {configTest.hasApiKey ? "✅" : "❌"}</p>
                <p>API Secret: {configTest.hasApiSecret ? "✅" : "❌"}</p>
              </div>
            )}
          </div> */}
          {/* 
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <Upload className="h-12 w-12 text-primary" />
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-[#92400e] to-[#ea580c] bg-clip-text text-transparent">
              Upload Your Photo
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Start creating your custom frame by uploading your favorite photo.
              High-resolution images work best!
            </p>
          </div> */}

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
                    <p className="text-lg font-medium">
                      Upload en cours via tRPC...
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
                        ou cliquez pour sélectionner
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
              <Image className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Haute qualité</h3>
              <p className="text-sm text-muted-foreground">
                Photos en haute définition
              </p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <Upload className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Upload sécurisé</h3>
              <p className="text-sm text-muted-foreground">
                Images stockées en sécurité
              </p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Livraison rapide</h3>
              <p className="text-sm text-muted-foreground">
                Cadre sous 7-10 jours
              </p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
