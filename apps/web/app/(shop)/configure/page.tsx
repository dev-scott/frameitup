'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getSeedFrames } from '@/app/actions';
import { useFrameStore, FrameOption, GlasingType } from '@/store/use-frame-store';
import FramePreview3D from '@/components/configure/frame-preview-3d';
import { Button } from '@frameitup/ui';
import { useLanguageStore } from '@/store/use-language-store';

const translateMaterial = (mat: string, lang: string) => {
  if (lang === 'fr') {
    switch (mat.toLowerCase()) {
      case 'oak': return 'Chêne';
      case 'wood': return 'Bois';
      case 'aluminum': return 'Aluminium';
      case 'walnut': return 'Noyer';
      case 'pine': return 'Pin';
      case 'resin': return 'Résine';
      case 'clay': return 'Argile';
      default: return mat;
    }
  }
  return mat;
};

// Lucide Icons mocks/components for zero-dependency reliability
function UploadIcon() {
  return (
    <svg className="w-12 h-12 text-[var(--brand-500)] mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg className="w-6 h-6 animate-spin text-[var(--brand-500)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

const PRESET_SIZES = [
  { label: 'A2 (420×594 mm)', w: 420, h: 594 },
  { label: 'A3 (297×420 mm)', w: 297, h: 420 },
  { label: 'A4 (210×297 mm)', w: 210, h: 297 },
  { label: 'A5 (148×210 mm)', w: 148, h: 210 },
];

const MAT_COLORS = [
  { name: 'Cotton White', hex: '#FAFAF9', desc: 'Clean and bright gallery finish' },
  { name: 'Warm Cream', hex: '#F5EFEB', desc: 'Soft classic look for historic prints' },
  { name: 'Charcoal Black', hex: '#292524', desc: 'Dramatize dark shadows and high contrast' },
  { name: 'Forest Green', hex: '#1C3F3A', desc: 'Rich organic tone for landscapes' },
];

export default function ConfigurePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguageStore();

  const localizedMatColors = [
    { name: language === 'fr' ? 'Blanc coton' : 'Cotton White', hex: '#FAFAF9', desc: language === 'fr' ? 'Finition galerie propre et lumineuse' : 'Clean and bright gallery finish' },
    { name: language === 'fr' ? 'Crème chaleureuse' : 'Warm Cream', hex: '#F5EFEB', desc: language === 'fr' ? 'Style classique et doux pour tirages historiques' : 'Soft classic look for historic prints' },
    { name: language === 'fr' ? 'Noir charbon' : 'Charcoal Black', hex: '#292524', desc: language === 'fr' ? 'Accentue les ombres sombres et les contrastes élevés' : 'Dramatize dark shadows and high contrast' },
    { name: language === 'fr' ? 'Vert forêt' : 'Forest Green', hex: '#1C3F3A', desc: language === 'fr' ? 'Ton organique riche pour les paysages' : 'Rich organic tone for landscapes' },
  ];
  
  // Zustand Store values
  const {
    imageSrc,
    fileName,
    artworkWidthMm,
    artworkHeightMm,
    selectedFrame,
    hasMat,
    matColor,
    matColorName,
    matWidthMm,
    glasingType,
    quantity,
    setImage,
    setDimensions,
    setSelectedFrame,
    setMat,
    setGlasing,
    setQuantity,
    reset,
    calculatePrice,
  } = useFrameStore();

  // Component States
  const [frames, setFrames] = useState<FrameOption[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [previewMode, setPreviewMode] = useState<'2D' | '3D'>('2D');
  const [uploading, setUploading] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  
  // Image diagnostics & palette
  const [isHighRes, setIsHighRes] = useState<boolean>(true);
  const [imagePalette, setImagePalette] = useState<string[]>([]);

  // Load Seed Frames from database
  useEffect(() => {
    async function load() {
      const data = await getSeedFrames();
      setFrames(data as FrameOption[]);
      if (data.length > 0) {
        setSelectedFrame(data[0] as FrameOption);
      }
    }
    load();
  }, [setSelectedFrame]);

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragOver(true);
    } else if (e.type === "dragleave") {
      setDragOver(false);
    }
  };

  // Process File and Extract Palette
  const processFile = (file: File) => {
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      
      // Load image to extract details
      const img = new Image();
      img.onload = () => {
        // High resolution print readiness
        const highRes = img.naturalWidth >= 1200 || img.naturalHeight >= 1200;
        setIsHighRes(highRes);

        // Extract dominant palette using Canvas
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = 50;
            canvas.height = 50;
            ctx.drawImage(img, 0, 0, 50, 50);
            const imgData = ctx.getImageData(0, 0, 50, 50).data;
            
            // Extract a few pixels for dynamic styling suggestions
            const colors: string[] = [];
            for (let i = 0; i < imgData.length; i += 400) {
              const r = imgData[i];
              const g = imgData[i + 1];
              const b = imgData[i + 2];
              const hex = '#' + ((1 << 24) + (r! << 16) + (g! << 8) + b!).toString(16).slice(1);
              if (!colors.includes(hex) && colors.length < 4) {
                colors.push(hex);
              }
            }
            setImagePalette(colors);
          }
        } catch (e) {
          console.error("Color extraction failed: ", e);
        }

        const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        setImage(src, file.name, sizeStr);
        setUploading(false);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Dynamic calculations
  const prices = calculatePrice();

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!imageSrc ? (
            /* ─────────────────────────────────────────────────────────────────
               STATE 1: UPLOAD DESIGN
               ───────────────────────────────────────────────────────────────── */
            <motion.div
              key="upload-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-12 text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-center"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-radial-gradient from-[var(--brand-200)]/10 to-transparent pointer-events-none" />

              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 flex flex-col items-center ${
                  dragOver
                    ? 'border-[var(--brand-500)] bg-[var(--brand-50)]/50 scale-[1.01]'
                    : 'border-[var(--border)] hover:border-[var(--brand-400)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {uploading ? (
                  <div className="py-8 flex flex-col items-center space-y-4">
                    <LoaderIcon />
                    <p className="text-sm font-semibold text-[var(--text-secondary)]">{t.configurePage.analyzing}</p>
                  </div>
                ) : (
                  <>
                    <UploadIcon />
                    <h3 className="font-display text-2xl font-bold mb-2 text-[var(--text-primary)]">
                      {t.configurePage.uploadTitle}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-sm">
                      {t.configurePage.uploadDesc}
                    </p>
                    <Button className="bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white shadow-brand font-semibold px-6 py-2.5 rounded-xl transition-all">
                      {t.configurePage.chooseFile}
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            /* ─────────────────────────────────────────────────────────────────
               STATE 2: FRAME DESIGNER
               ───────────────────────────────────────────────────────────────── */
            <motion.div
              key="editor-state"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              
              {/* LEFT COLUMN: VISUAL PREVIEW & TOGGLES */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Mode Selector */}
                <div className="flex bg-[var(--bg-secondary)] p-1 rounded-xl w-fit self-center border border-[var(--border)]">
                  <button
                    onClick={() => setPreviewMode('2D')}
                    className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                      previewMode === '2D'
                        ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {t.configurePage.preview2d}
                  </button>
                  <button
                    onClick={() => setPreviewMode('3D')}
                    className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                      previewMode === '3D'
                        ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {t.configurePage.preview3d}
                  </button>
                </div>

                {/* Canvas Container */}
                <div className="aspect-[4/5] md:aspect-[1.3] lg:aspect-auto lg:h-[500px] w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-lg p-8 flex items-center justify-center relative">
                  
                  {/* Resolution Indicator Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isHighRes
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isHighRes ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {isHighRes ? t.configurePage.resolutionHD : t.configurePage.resolutionStandard}
                    </span>
                  </div>

                  {previewMode === '3D' ? (
                    <FramePreview3D
                      imageSrc={imageSrc}
                      frameColor={selectedFrame.color}
                      frameWidthMm={selectedFrame.widthMm}
                      frameThicknessMm={selectedFrame.depthMm}
                      artworkWidthMm={artworkWidthMm}
                      artworkHeightMm={artworkHeightMm}
                      hasMat={hasMat}
                      matColor={matColor}
                      matWidthMm={matWidthMm}
                      glasingType={glasingType}
                    />
                  ) : (
                    /* 2D Realistic Styled CSS frame with Guidelines */
                    <div className="relative flex flex-col items-center justify-center w-full h-full p-12">
                      <div
                        className="relative transition-all duration-300 flex items-center justify-center"
                        style={{
                          // Dynamic border size and colors representing frame profile
                          border: `${selectedFrame.widthMm / 3.5}px solid ${selectedFrame.color}`,
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(0,0,0,0.5)',
                          // Dynamic mat padding
                          padding: hasMat ? `${matWidthMm / 3.5}px` : '0px',
                          backgroundColor: hasMat ? matColor : 'transparent',
                        }}
                      >
                        {/* Artwork display */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageSrc}
                          alt="Custom layout preview"
                          className="max-h-[300px] object-contain transition-all"
                          style={{
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        />
                      </div>

                      {/* Dimension labels overlay */}
                      <div className="absolute bottom-4 text-center text-xs text-[var(--text-secondary)] font-semibold flex flex-col items-center">
                        <span className="text-[10px] text-[var(--text-subtle)] uppercase">{t.configurePage.totalDimensions}</span>
                        <span className="text-[var(--brand-600)]">
                          {artworkWidthMm + (hasMat ? matWidthMm * 2 : 0) + (selectedFrame.widthMm * 2)} mm × {artworkHeightMm + (hasMat ? matWidthMm * 2 : 0) + (selectedFrame.heightMm * 2)} mm
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dominant Palette Colors (Suggested Mats) */}
                {imagePalette.length > 0 && (
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">{t.configurePage.suggestionsTitle}</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">{t.configurePage.suggestionsDesc}</p>
                    </div>
                    <div className="flex gap-2.5">
                      {imagePalette.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMat(true, color, language === 'fr' ? `Palette extraite ${idx+1}` : `Extracted Palette ${idx+1}`)}
                          className="w-8 h-8 rounded-full border border-stone-300 shadow-sm relative group"
                          style={{ backgroundColor: color }}
                        >
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-stone-900 text-[8px] text-white px-1.5 py-0.5 rounded font-mono">
                            {color}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: EDITOR SIDE PANEL */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 shadow-md">
                <div>
                  
                  {/* Title info */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-xl font-bold font-display text-[var(--text-primary)]">{t.configurePage.title}</h2>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">{fileName}</span>
                    </div>
                    <button
                      onClick={reset}
                      className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                    >
                      {t.configurePage.delete}
                    </button>
                  </div>

                  {/* Wizard Stepper Header */}
                  <div className="grid grid-cols-4 gap-2 mb-8 border-b border-[var(--border)] pb-4 text-center text-xs">
                    {[t.configurePage.steps.size, t.configurePage.steps.frame, t.configurePage.steps.matting, t.configurePage.steps.glass].map((label, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`pb-2 border-b-2 font-semibold transition-all ${
                          activeStep === idx
                            ? 'border-[var(--brand-500)] text-[var(--brand-600)]'
                            : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* ACTIVE STEP WORKSPACE */}
                  <div className="min-h-[260px]">
                    
                    {/* STEP 1: DIMENSIONS */}
                    {activeStep === 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                            {t.configurePage.presetDimensions}
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {PRESET_SIZES.map((size) => (
                              <button
                                key={size.label}
                                onClick={() => setDimensions(size.w, size.h)}
                                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                                  artworkWidthMm === size.w && artworkHeightMm === size.h
                                    ? 'border-[var(--brand-500)] bg-[var(--brand-50)] text-[var(--brand-600)]'
                                    : 'border-[var(--border)] hover:bg-[var(--bg-secondary)]'
                                }`}
                              >
                                {size.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* <div className="space-y-4">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                            {t.configurePage.customInputs}
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[10px] text-[var(--text-muted)] block mb-1">{t.configurePage.width}</span>
                              <input
                                type="number"
                                min={150}
                                max={1000}
                                value={artworkWidthMm}
                                onChange={(e) => setDimensions(Math.min(1000, Math.max(150, parseInt(e.target.value) || 150)), artworkHeightMm)}
                                className="w-full px-3 py-2 border rounded-xl bg-transparent font-medium"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-[var(--text-muted)] block mb-1">{t.configurePage.height}</span>
                              <input
                                type="number"
                                min={150}
                                max={1000}
                                value={artworkHeightMm}
                                onChange={(e) => setDimensions(artworkWidthMm, Math.min(1000, Math.max(150, parseInt(e.target.value) || 150)))}
                                className="w-full px-3 py-2 border rounded-xl bg-transparent font-medium"
                              />
                            </div>
                          </div>
                        </div> */}
                      </motion.div>
                    )}

                    {/* STEP 2: FRAME SELECTION */}
                    {activeStep === 1 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="space-y-4"
                      >
                        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          {t.configurePage.selectProfile}
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {frames.map((frame) => (
                            <button
                              key={frame.id}
                              onClick={() => setSelectedFrame(frame)}
                              className={`p-4 rounded-2xl border flex items-center justify-between text-left transition-all ${
                                selectedFrame.id === frame.id
                                  ? 'border-[var(--brand-500)] bg-[var(--brand-50)]/50'
                                  : 'border-[var(--border)] hover:bg-[var(--bg-secondary)]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className="w-6 h-6 rounded-full border border-stone-300 shadow-inner"
                                  style={{ backgroundColor: frame.color }}
                                />
                                <div>
                                  <span className="block font-bold text-sm text-[var(--text-primary)]">
                                    {frame.name}
                                  </span>
                                  <span className="text-[10px] text-[var(--text-muted)] uppercase">
                                    {language === 'fr' ? `${t.framesPage.profile} ${translateMaterial(frame.material, language)}` : `${frame.material} ${t.framesPage.profile}`} • {frame.widthMm}mm {language === 'fr' ? 'largeur de profil' : 'profile width'}
                                  </span>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-[var(--brand-600)]">
                                {frame.priceUsd.toLocaleString('fr-FR')} FCFA/m
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: MATTING (PASSE-PARTOUT) — Désactivé temporairement */}
                    {activeStep === 2 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="space-y-6"
                      >
                        <div className="flex justify-between items-center bg-[var(--bg-secondary)] p-4 rounded-xl opacity-60 cursor-not-allowed">
                          <div>
                            <span className="block text-sm font-bold text-[var(--text-primary)]">{t.configurePage.addPassePartout}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">{t.configurePage.passePartoutDesc}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brand-100)] text-[var(--brand-600)]">
                              {language === 'fr' ? 'Bientôt' : 'Soon'}
                            </span>
                            <input
                              type="checkbox"
                              checked={false}
                              disabled
                              className="w-5 h-5 accent-[var(--brand-500)] cursor-not-allowed"
                            />
                          </div>
                        </div>

                        {/* Informational note */}
                        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                          <span className="text-amber-500 text-lg flex-shrink-0">ℹ️</span>
                          <p className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
                            {language === 'fr'
                              ? 'Le passe-partout sera disponible prochainement. Contactez-nous sur WhatsApp pour des options personnalisées.'
                              : 'Matting will be available soon. Contact us on WhatsApp for custom options.'}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: GLAZING & PROTECTION — Standard uniquement */}
                    {activeStep === 3 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="space-y-3"
                      >
                        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          {t.configurePage.selectGlazing}
                        </label>

                        {/* Standard — actif et sélectionné */}
                        <button
                          onClick={() => setGlasing('STANDARD' as GlasingType)}
                          className="p-4 rounded-2xl border text-left flex justify-between items-center w-full transition-all border-[var(--brand-500)] bg-[var(--brand-50)]/50"
                        >
                          <div>
                            <span className="block font-bold text-sm text-[var(--text-primary)]">{t.configurePage.glazingTypes.standard}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">{t.configurePage.glazingTypes.standardDesc}</span>
                          </div>
                          <span className="text-xs font-bold text-[var(--brand-600)]">0 FCFA</span>
                        </button>

                        {/* Options désactivées */}
                        {[
                          { title: t.configurePage.glazingTypes.uv, desc: t.configurePage.glazingTypes.uvDesc, price: '15 000 FCFA' },
                          { title: t.configurePage.glazingTypes.antiReflective, desc: t.configurePage.glazingTypes.antiReflectiveDesc, price: '25 000 FCFA' },
                          { title: t.configurePage.glazingTypes.museum, desc: t.configurePage.glazingTypes.museumDesc, price: '45 000 FCFA' },
                        ].map((gl) => (
                          <div
                            key={gl.title}
                            className="p-4 rounded-2xl border border-[var(--border)] text-left flex justify-between items-center w-full opacity-45 cursor-not-allowed"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="block font-bold text-sm text-[var(--text-primary)]">{gl.title}</span>
                                <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]">
                                  {language === 'fr' ? 'Bientôt' : 'Soon'}
                                </span>
                              </div>
                              <span className="text-[10px] text-[var(--text-muted)]">{gl.desc}</span>
                            </div>
                            <span className="text-xs font-bold text-[var(--text-muted)]">{gl.price}</span>
                          </div>
                        ))}

                        {/* Note WhatsApp */}
                        <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 mt-2">
                          <span className="text-base flex-shrink-0">💬</span>
                          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-relaxed">
                            {language === 'fr'
                              ? 'Besoin de verre antireflet ou museale ? Contactez-nous sur WhatsApp.'
                              : 'Need UV or museum glass? Contact us on WhatsApp.'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* PRICE CALCULATION & ACTION FOOTER */}
                <div className="border-t border-[var(--border)] pt-6 mt-8 space-y-4">
                  
                  {/* Breakdown details */}
                  <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                    <div className="flex justify-between">
                      <span>{selectedFrame.name} {language === 'fr' ? t.framesPage.profile : `${t.framesPage.profile} Profile`}</span>
                      <span>{prices.baseFrame.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    {hasMat && (
                      <div className="flex justify-between">
                        <span>{language === 'fr' ? `Passe-partout (${matColorName})` : `Passe-partout Mat (${matColorName})`}</span>
                        <span>{prices.matPrice.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    )}
                    {glasingType !== 'STANDARD' && (
                      <div className="flex justify-between">
                        <span>{language === 'fr' ? `Traitement de verre (${glasingType === 'STANDARD' ? 'Standard' : glasingType === 'UV_PROTECTIVE' ? 'Protection UV' : glasingType === 'ANTI_REFLECTIVE' ? 'Anti-reflet' : 'Qualité Muséale'})` : `Glazing Treatment (${glasingType.replace('_', ' ')})`}</span>
                        <span>{prices.glassPrice.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Total */}
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[var(--text-muted)]">{t.configurePage.qty}</span>
                      <div className="flex items-center border border-[var(--border)] rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-2.5 py-1 text-sm font-bold hover:bg-[var(--bg-secondary)] rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-2.5 py-1 text-sm font-bold hover:bg-[var(--bg-secondary)] rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[10px] text-[var(--text-subtle)] block uppercase font-bold">{t.configurePage.totalPrice}</span>
                      <span className="text-2xl font-black text-[var(--text-primary)] font-display">
                        {prices.total.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Checkout Action */}
                  <Button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white font-bold rounded-xl py-3 shadow-brand hover:shadow-brand-lg hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
                  >
                    {t.configurePage.checkoutBtn}
                    <span className="text-sm">→</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
