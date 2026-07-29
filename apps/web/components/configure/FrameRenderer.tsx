// src/components/configure/FrameRenderer.tsx
"use client";

import React, { useId } from "react";

export type FrameMaterial = "bois" | "plexiglas" | "vitre";

interface FrameRendererProps {
  imageSrc: string;
  material: FrameMaterial;
  artWidth?: number;
  artHeight?: number;
  frameWidth?: number;
  lean?: boolean;
  className?: string;
}

const WOOD_DEPTH = 10;
const PLEXI_EDGE = 8;

export default function FrameRenderer({
  imageSrc,
  material,
  artWidth = 300,
  artHeight = 400,
  frameWidth = 28,
  lean = false,
  className = "",
}: FrameRendererProps) {
  const uid = useId().replace(/:/g, "");
  const isWood = material === "bois";
  const isPlexi = material === "plexiglas";

  let outerW: number;
  let outerH: number;
  if (isWood) {
    outerW = artWidth + WOOD_DEPTH;
    outerH = artHeight + WOOD_DEPTH;
  } else {
    outerW = artWidth + frameWidth * 2;
    outerH = artHeight + frameWidth * 2;
  }

  return (
    <div
      style={{
        position: "relative",
        width: outerW,
        height: outerH,
        filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.52))",
        transform: lean
          ? "perspective(1400px) rotateY(-4deg) rotateX(1deg)"
          : undefined,
      }}
      className={className}
    >
      {isWood && (
        <WoodPanel uid={uid} imageSrc={imageSrc} artW={artWidth} artH={artHeight} />
      )}
      {material === "vitre" && (
        <VitreFrame uid={uid} imageSrc={imageSrc} artW={artWidth} artH={artHeight} F={frameWidth} />
      )}
      {isPlexi && (
        <PlexiFrame uid={uid} imageSrc={imageSrc} artW={artWidth} artH={artHeight} F={frameWidth} />
      )}
    </div>
  );
}

/* ================================================================
   TRAPEZE HELPERS — pour VitreFrame (moulure classique)
================================================================ */
function trapTop(W: number, F: number) {
  return `M0,0 L${W},0 L${W - F},${F} L${F},${F} Z`;
}
function trapBottom(W: number, F: number) {
  return `M${F},0 L${W - F},0 L${W},${F} L0,${F} Z`;
}
function trapLeft(H: number, F: number) {
  return `M0,0 L${F},${F} L${F},${H - F} L0,${H} Z`;
}
function trapRight(H: number, F: number) {
  return `M0,${F} L${F},0 L${F},${H} L0,${H - F} Z`;
}

/* ================================================================
   BOIS — Tableau bois / Wood panel print
   Photo pleine face, sans bordure.
   Perspective isometrique : face gauche + face basse visibles,
   imitant un panneau pose contre un mur (comme la reference).
================================================================ */
function WoodPanel({
  uid,
  imageSrc,
  artW,
  artH,
}: {
  uid: string;
  imageSrc: string;
  artW: number;
  artH: number;
}) {
  const D = WOOD_DEPTH;
  const outerW = artW + D;
  const outerH = artH + D;

  // Projection isometrique (coin bas-gauche visible)
  // Face avant : decalee en haut a droite
  const fx = D;   // x offset de la face avant
  const fy = 0;   // y offset de la face avant

  // Face gauche (parallelogramme) : (D,0)-(D,artH)-(0,artH+D)-(0,D)
  const leftPts = `${D},0 ${D},${artH} 0,${artH + D} 0,${D}`;

  // Face basse (parallelogramme) : (D,artH)-(D+artW,artH)-(artW,artH+D)-(0,artH+D)
  const botPts = `${D},${artH} ${D + artW},${artH} ${artW},${artH + D} 0,${artH + D}`;

  // Point d'accroche (hanger hook) position top center
  const hangerCenterX = fx + artW / 2;

  return (
    <svg
      width={outerW}
      height={outerH}
      viewBox={`0 0 ${outerW} ${outerH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        {/* ── Grain bois sur les tranches ── */}
        <filter id={`${uid}-grain`} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 0.35" numOctaves="4" seed="11" result="noise" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.05
                    0 0 0 0 0.08
                    0 0 0 0 0.06
                    0 0 0 0.40 0"
            in="noise"
            result="colorNoise"
          />
          <feBlend in="SourceGraphic" in2="colorNoise" mode="overlay" result="blended" />
        </filter>

        {/* ── Gradient face gauche : eclairage top-right vers bas-left ── */}
        <linearGradient
          id={`${uid}-lf`}
          x1={D} y1={0}
          x2={0} y2={artH + D}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#4a6560" />
          <stop offset="35%"  stopColor="#2f4540" />
          <stop offset="100%" stopColor="#16221e" />
        </linearGradient>

        {/* ── Gradient face basse : plutot sombre ── */}
        <linearGradient
          id={`${uid}-bf`}
          x1={D} y1={artH}
          x2={artW} y2={artH + D}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#1c2c28" />
          <stop offset="60%"  stopColor="#121e1a" />
          <stop offset="100%" stopColor="#0a1512" />
        </linearGradient>

        {/* ── Vignette subtile sur la face avant ── */}
        <radialGradient id={`${uid}-vig`} cx="50%" cy="50%" r="72%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </radialGradient>

        {/* ── Ombre AO coin inferieur gauche ── */}
        <radialGradient id={`${uid}-ao`} cx="0%" cy="100%" r="35%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* ── Shadow subtile bord gauche de la face avant ── */}
        <linearGradient id={`${uid}-ls`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(0,0,0,0.28)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* ── Shadow subtile bord bas de la face avant ── */}
        <linearGradient id={`${uid}-bs`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
        </linearGradient>

        {/* ── Highlight leger sur le dessus de la face avant ── */}
        <linearGradient id={`${uid}-ht`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.07)" />
          <stop offset="20%"  stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* ── Metal gradient pour l'accroche ── */}
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f0f4" />
          <stop offset="40%" stopColor="#9a9aa0" />
          <stop offset="70%" stopColor="#64646a" />
          <stop offset="100%" stopColor="#38383e" />
        </linearGradient>

        <clipPath id={`${uid}-fc`}>
          <rect x={fx} y={fy} width={artW} height={artH} />
        </clipPath>
      </defs>

      {/* ── Point d'accroche (Behind / top-centered metal hanger) ── */}
      <g transform={`translate(${hangerCenterX - 10}, ${fy - 12})`}>
        {/* Shadow of hanger */}
        <path d="M 3,12 C 3,4 17,4 17,12 L 15,12 C 15,6 5,6 5,12 Z" fill="rgba(0,0,0,0.4)" transform="translate(1,1)" />
        {/* Metal ring/hook */}
        <path d="M 3,12 C 3,3 17,3 17,12 L 14.5,12 C 14.5,5.5 5.5,5.5 5.5,12 Z" fill={`url(#${uid}-metal)`} stroke="#222" strokeWidth="0.5" />
        {/* Small brass/metal mounting clip */}
        <rect x="6" y="10" width="8" height="5" rx="1" fill={`url(#${uid}-metal)`} stroke="#333" strokeWidth="0.5" />
        <circle cx="10" cy="12.5" r="1" fill="#222" />
      </g>

      {/* ── Face gauche (tranche gauche du panneau) ── */}
      <g filter={`url(#${uid}-grain)`}>
        <polygon points={leftPts} fill={`url(#${uid}-lf)`} />
      </g>

      {/* ── Face basse (tranche inferieure du panneau) ── */}
      <g filter={`url(#${uid}-grain)`}>
        <polygon points={botPts} fill={`url(#${uid}-bf)`} />
      </g>

      {/* ── Ligne de jonction face gauche / face basse (AO) ── */}
      <line
        x1={D} y1={artH}
        x2={0} y2={artH + D}
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="1.5"
      />

      {/* ── Photo pleine face (sans bordure) ── */}
      <image
        href={imageSrc}
        x={fx}
        y={fy}
        width={artW}
        height={artH}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${uid}-fc)`}
      />

      {/* ── Ombre de bord gauche sur la photo ── */}
      <rect x={fx} y={fy} width={8} height={artH} fill={`url(#${uid}-ls)`} />

      {/* ── Ombre de bord bas sur la photo ── */}
      <rect x={fx} y={fy + artH - 8} width={artW} height={8} fill={`url(#${uid}-bs)`} />

      {/* ── Vignette globale sur la face avant ── */}
      <rect x={fx} y={fy} width={artW} height={artH} fill={`url(#${uid}-vig)`} />

      {/* ── Highlight haut de la face avant ── */}
      <rect x={fx} y={fy} width={artW} height={artH} fill={`url(#${uid}-ht)`} />

      {/* ── Ligne de separation face avant / tranche basse ── */}
      <line x1={D} y1={artH} x2={D + artW} y2={artH} stroke="rgba(0,0,0,0.30)" strokeWidth="1.5" />
    </svg>
  );
}

/* ================================================================
   VITRE — Cadre verre sous moulure champagne/argent ouvragée
   - Texture bois/métal brossé warm champagne (#d5cbb3, #eee7d8, #94876e)
   - Double liseré/passe filet intérieur argent/blanc (#ffffff / #c2beb4)
   - Reflet de verre réaliste avec spot de brillance au sommet
================================================================ */
function VitreFrame({
  uid,
  imageSrc,
  artW,
  artH,
  F,
}: {
  uid: string;
  imageSrc: string;
  artW: number;
  artH: number;
  F: number;
}) {
  const outerW = artW + F * 2;
  const outerH = artH + F * 2;

  // Width of the inner silver/white double fillet (bead profile)
  const filletW = Math.max(5, Math.round(F * 0.22));

  return (
    <svg
      width={outerW}
      height={outerH}
      viewBox={`0 0 ${outerW} ${outerH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        {/* Fine champagne wood/metallic grain noise filter */}
        <filter id={`${uid}-champagneNoise`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.35" numOctaves="4" seed="23" result="noise" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.40
                    0 0 0 0 0.36
                    0 0 0 0 0.28
                    0 0 0 0.35 0"
            in="noise"
            result="coloredNoise"
          />
          <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
        </filter>

        {/* Outer Champagne Metallic Gradients for Miter Bars */}
        <linearGradient id={`${uid}-chTop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#b5aa91" />
          <stop offset="8%"   stopColor="#f5efe0" />
          <stop offset="22%"  stopColor="#d6cbb3" />
          <stop offset="40%"  stopColor="#9e9177" />
          <stop offset="55%"  stopColor="#7c7058" />
          <stop offset="70%"  stopColor="#baa38a" />
          <stop offset="88%"  stopColor="#ece4d4" />
          <stop offset="100%" stopColor="#8c8069" />
        </linearGradient>

        <linearGradient id={`${uid}-chBottom`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#8c8069" />
          <stop offset="12%"  stopColor="#ece4d4" />
          <stop offset="30%"  stopColor="#baa38a" />
          <stop offset="45%"  stopColor="#7c7058" />
          <stop offset="60%"  stopColor="#9e9177" />
          <stop offset="78%"  stopColor="#d6cbb3" />
          <stop offset="92%"  stopColor="#f5efe0" />
          <stop offset="100%" stopColor="#b5aa91" />
        </linearGradient>

        <linearGradient id={`${uid}-chLeft`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#b5aa91" />
          <stop offset="8%"   stopColor="#f5efe0" />
          <stop offset="22%"  stopColor="#d6cbb3" />
          <stop offset="40%"  stopColor="#9e9177" />
          <stop offset="55%"  stopColor="#7c7058" />
          <stop offset="70%"  stopColor="#baa38a" />
          <stop offset="88%"  stopColor="#ece4d4" />
          <stop offset="100%" stopColor="#8c8069" />
        </linearGradient>

        <linearGradient id={`${uid}-chRight`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#8c8069" />
          <stop offset="12%"  stopColor="#ece4d4" />
          <stop offset="30%"  stopColor="#baa38a" />
          <stop offset="45%"  stopColor="#7c7058" />
          <stop offset="60%"  stopColor="#9e9177" />
          <stop offset="78%"  stopColor="#d6cbb3" />
          <stop offset="92%"  stopColor="#f5efe0" />
          <stop offset="100%" stopColor="#b5aa91" />
        </linearGradient>

        {/* Double Inner Silver/White Fillet Bevel Gradient */}
        <linearGradient id={`${uid}-filletGrad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="40%"  stopColor="#ded8ca" />
          <stop offset="70%"  stopColor="#b8b09e" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Glass Glare Diagonal Sweep */}
        <linearGradient id={`${uid}-glassSweep`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.02)" />
          <stop offset="35%"  stopColor="rgba(255,255,255,0.05)" />
          <stop offset="48%"  stopColor="rgba(255,255,255,0.38)" />
          <stop offset="55%"  stopColor="rgba(240,248,255,0.15)" />
          <stop offset="70%"  stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Top Glare Spot Light Flare (simulating top light reflection on glass as seen in photo) */}
        <radialGradient id={`${uid}-topGlint`} cx="60%" cy="1%" r="35%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.95)" />
          <stop offset="20%"  stopColor="rgba(255,255,245,0.65)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Inner Rabbet Drop Shadow */}
        <filter id={`${uid}-rabbetShadow`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.45)" />
        </filter>

        <clipPath id={`${uid}-artClip`}>
          <rect x={F} y={F} width={artW} height={artH} />
        </clipPath>
      </defs>

      {/* ── 1. MAIN OUTER MOULDING BARS (Mitred 45°) ── */}
      <g filter={`url(#${uid}-champagneNoise)`}>
        <path d={trapTop(outerW, F)} fill={`url(#${uid}-chTop)`} />
        <g transform={`translate(0,${outerH - F})`}>
          <path d={trapBottom(outerW, F)} fill={`url(#${uid}-chBottom)`} />
        </g>
        <path d={trapLeft(outerH, F)} fill={`url(#${uid}-chLeft)`} />
        <g transform={`translate(${outerW - F},0)`}>
          <path d={trapRight(outerH, F)} fill={`url(#${uid}-chRight)`} />
        </g>
      </g>

      {/* 45° Miter corner seam lines for realistic joinery */}
      <line x1="0" y1="0" x2={F} y2={F} stroke="rgba(70,60,45,0.5)" strokeWidth="1" />
      <line x1={outerW} y1="0" x2={outerW - F} y2={F} stroke="rgba(70,60,45,0.5)" strokeWidth="1" />
      <line x1="0" y1={outerH} x2={F} y2={outerH - F} stroke="rgba(70,60,45,0.5)" strokeWidth="1" />
      <line x1={outerW} y1={outerH} x2={outerW - F} y2={outerH - F} stroke="rgba(70,60,45,0.5)" strokeWidth="1" />

      {/* Outer border fine highlight */}
      <rect x="0.5" y="0.5" width={outerW - 1} height={outerH - 1} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

      {/* ── 2. DOUBLE INNER SILVER/WHITE FILLET BEVEL BORDERS ── */}
      {/* Outer fillet ring */}
      <rect
        x={F - filletW}
        y={F - filletW}
        width={artW + filletW * 2}
        height={artH + filletW * 2}
        fill="none"
        stroke={`url(#${uid}-filletGrad)`}
        strokeWidth={filletW}
      />
      {/* Inner fine shadow line between moulding and fillet */}
      <rect
        x={F - filletW}
        y={F - filletW}
        width={artW + filletW * 2}
        height={artH + filletW * 2}
        fill="none"
        stroke="rgba(60,50,35,0.6)"
        strokeWidth="1.2"
      />
      {/* Inner crisp white lip border right against the glass/photo */}
      <rect
        x={F - 1.5}
        y={F - 1.5}
        width={artW + 3}
        height={artH + 3}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
      />

      {/* ── 3. ARTWORK IMAGE ── */}
      <image
        href={imageSrc}
        x={F}
        y={F}
        width={artW}
        height={artH}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${uid}-artClip)`}
      />

      {/* Inner shadow over artwork from the inner fillet lip */}
      <rect
        x={F}
        y={F}
        width={artW}
        height={artH}
        fill="none"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="3"
        filter={`url(#${uid}-rabbetShadow)`}
      />

      {/* ── 4. GLASS REFLECTIONS & TOP SPOT LIGHT GLINT ── */}
      {/* Soft glass glare overlay across artwork */}
      <rect x={F} y={F} width={artW} height={artH} fill={`url(#${uid}-glassSweep)`} />

      {/* Top Specular Glint Spot (Light Reflection on glass at top) */}
      <rect x={0} y={0} width={outerW} height={outerH} fill={`url(#${uid}-topGlint)`} />

      {/* Subtle outer frame edge shadow */}
      <rect x="0" y="0" width={outerW} height={outerH} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
    </svg>
  );
}

/* ================================================================
   PLEXIGLAS — Impression Acrylique / Face-Mounted Plexiglass
   - Moulure argent/platine brossé métallisé avec onglets 45° (#e4e0d7, #b8b0a2, #7c786e)
   - Passe-partout blanc épuré intégré autour de l'image
   - Rendu acrylique haute brillance : spot de flare au sommet + reflet coin bas-droite
   - Couleurs vives saturées style tirage sous plexiglas
================================================================ */
function PlexiFrame({
  uid,
  imageSrc,
  artW,
  artH,
  F,
}: {
  uid: string;
  imageSrc: string;
  artW: number;
  artH: number;
  F: number;
}) {
  const outerW = artW + F * 2;
  const outerH = artH + F * 2;

  // Integrated white mat width around the photo (slimmer inner margin)
  const matMargin = Math.max(6, Math.round(Math.min(artW, artH) * 0.04));
  const photoW = artW - matMargin * 2;
  const photoH = artH - matMargin * 2;
  const photoX = F + matMargin;
  const photoY = F + matMargin;

  return (
    <svg
      width={outerW}
      height={outerH}
      viewBox={`0 0 ${outerW} ${outerH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        {/* Silver/Platinum Metallic Grain Noise */}
        <filter id={`${uid}-plexiNoise`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.4" numOctaves="4" seed="35" result="noise" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.35
                    0 0 0 0 0.35
                    0 0 0 0 0.32
                    0 0 0 0.30 0"
            in="noise"
            result="coloredNoise"
          />
          <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
        </filter>

        {/* Silver/Platinum Moulding Gradients for 45° Bars */}
        <linearGradient id={`${uid}-plTop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c8c2b5" />
          <stop offset="10%"  stopColor="#f8f4ec" />
          <stop offset="28%"  stopColor="#ded8cb" />
          <stop offset="48%"  stopColor="#a29a8a" />
          <stop offset="62%"  stopColor="#746c5d" />
          <stop offset="78%"  stopColor="#b4ac9c" />
          <stop offset="90%"  stopColor="#f0ece2" />
          <stop offset="100%" stopColor="#8c8475" />
        </linearGradient>

        <linearGradient id={`${uid}-plBottom`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#8c8475" />
          <stop offset="14%"  stopColor="#f0ece2" />
          <stop offset="32%"  stopColor="#b4ac9c" />
          <stop offset="48%"  stopColor="#746c5d" />
          <stop offset="64%"  stopColor="#a29a8a" />
          <stop offset="80%"  stopColor="#ded8cb" />
          <stop offset="92%"  stopColor="#f8f4ec" />
          <stop offset="100%" stopColor="#c8c2b5" />
        </linearGradient>

        <linearGradient id={`${uid}-plLeft`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#c8c2b5" />
          <stop offset="10%"  stopColor="#f8f4ec" />
          <stop offset="28%"  stopColor="#ded8cb" />
          <stop offset="48%"  stopColor="#a29a8a" />
          <stop offset="62%"  stopColor="#746c5d" />
          <stop offset="78%"  stopColor="#b4ac9c" />
          <stop offset="90%"  stopColor="#f0ece2" />
          <stop offset="100%" stopColor="#8c8475" />
        </linearGradient>

        <linearGradient id={`${uid}-plRight`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#8c8475" />
          <stop offset="14%"  stopColor="#f0ece2" />
          <stop offset="32%"  stopColor="#b4ac9c" />
          <stop offset="48%"  stopColor="#746c5d" />
          <stop offset="64%"  stopColor="#a29a8a" />
          <stop offset="80%"  stopColor="#ded8cb" />
          <stop offset="92%"  stopColor="#f8f4ec" />
          <stop offset="100%" stopColor="#c8c2b5" />
        </linearGradient>

        {/* Inner Silver Rim Bevel Gradient */}
        <linearGradient id={`${uid}-plInnerRim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="50%"  stopColor="#cfc7b9" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Acrylic High-Gloss Diagonal Reflection */}
        <linearGradient id={`${uid}-plexiGlassSweep`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.04)" />
          <stop offset="32%"  stopColor="rgba(255,255,255,0.06)" />
          <stop offset="45%"  stopColor="rgba(255,255,255,0.48)" />
          <stop offset="52%"  stopColor="rgba(235,245,255,0.20)" />
          <stop offset="68%"  stopColor="rgba(255,255,255,0.03)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Top Glare Light Spot (Top center-right specular flare) */}
        <radialGradient id={`${uid}-plexiTopFlare`} cx="66%" cy="0.8%" r="30%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.98)" />
          <stop offset="25%"  stopColor="rgba(255,255,248,0.70)" />
          <stop offset="55%"  stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Bottom Right Corner Acrylic Smear Reflection (matching reference image) */}
        <radialGradient id={`${uid}-bottomRightSheen`} cx="85%" cy="92%" r="22%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.45)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Photo Color Saturation Filter for Vibrant Acrylic Print */}
        <filter id={`${uid}-plexiSat`}>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.08" intercept="-0.03" />
            <feFuncG type="linear" slope="1.06" intercept="-0.02" />
            <feFuncB type="linear" slope="1.10" intercept="-0.04" />
          </feComponentTransfer>
          <feColorMatrix type="saturate" values="1.16" />
        </filter>

        <clipPath id={`${uid}-photoClip`}>
          <rect x={photoX} y={photoY} width={photoW} height={photoH} />
        </clipPath>
      </defs>

      {/* ── 1. MOULDING BARS (Mitred 45°) ── */}
      <g filter={`url(#${uid}-plexiNoise)`}>
        <path d={trapTop(outerW, F)} fill={`url(#${uid}-plTop)`} />
        <g transform={`translate(0,${outerH - F})`}>
          <path d={trapBottom(outerW, F)} fill={`url(#${uid}-plBottom)`} />
        </g>
        <path d={trapLeft(outerH, F)} fill={`url(#${uid}-plLeft)`} />
        <g transform={`translate(${outerW - F},0)`}>
          <path d={trapRight(outerH, F)} fill={`url(#${uid}-plRight)`} />
        </g>
      </g>

      {/* 45° Miter lines */}
      <line x1="0" y1="0" x2={F} y2={F} stroke="rgba(60,50,40,0.45)" strokeWidth="1" />
      <line x1={outerW} y1="0" x2={outerW - F} y2={F} stroke="rgba(60,50,40,0.45)" strokeWidth="1" />
      <line x1="0" y1={outerH} x2={F} y2={outerH - F} stroke="rgba(60,50,40,0.45)" strokeWidth="1" />
      <line x1={outerW} y1={outerH} x2={outerW - F} y2={outerH - F} stroke="rgba(60,50,40,0.45)" strokeWidth="1" />

      {/* Inner Silver Rim */}
      <rect
        x={F - 3}
        y={F - 3}
        width={artW + 6}
        height={artH + 6}
        fill="none"
        stroke={`url(#${uid}-plInnerRim)`}
        strokeWidth="3"
      />
      <rect
        x={F - 3}
        y={F - 3}
        width={artW + 6}
        height={artH + 6}
        fill="none"
        stroke="rgba(50,40,30,0.5)"
        strokeWidth="1"
      />

      {/* ── 2. INTEGRATED WHITE PASSE-PARTOUT / MAT ── */}
      <rect
        x={F}
        y={F}
        width={artW}
        height={artH}
        fill="#fcfcfc"
      />
      {/* Soft inner shadow on white mat from the frame rim */}
      <rect
        x={F}
        y={F}
        width={artW}
        height={artH}
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="2.5"
      />

      {/* ── 3. VIBRANT ARTWORK IMAGE ── */}
      <image
        href={imageSrc}
        x={photoX}
        y={photoY}
        width={photoW}
        height={photoH}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${uid}-photoClip)`}
        filter={`url(#${uid}-plexiSat)`}
      />
      {/* Subtle border around photo on mat */}
      <rect
        x={photoX}
        y={photoY}
        width={photoW}
        height={photoH}
        fill="none"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
      />

      {/* ── 4. ACRYLIC / PLEXIGLAS HIGH-GLOSS REFLECTIONS ── */}
      {/* Diagonal gloss sweep over whole frame area */}
      <rect x={F} y={F} width={artW} height={artH} fill={`url(#${uid}-plexiGlassSweep)`} />

      {/* Top Specular Glint Spot */}
      <rect x={0} y={0} width={outerW} height={outerH} fill={`url(#${uid}-plexiTopFlare)`} />

      {/* Bottom Right Corner Sheen Reflection (acrylic texture) */}
      <rect x={0} y={0} width={outerW} height={outerH} fill={`url(#${uid}-bottomRightSheen)`} />

      {/* Outer border line */}
      <rect x="0.5" y="0.5" width={outerW - 1} height={outerH - 1} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}
