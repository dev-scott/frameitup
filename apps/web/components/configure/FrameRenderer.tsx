// src/components/configure/FrameRenderer.tsx
"use client";

import React from "react";

export type FrameMaterial = "bois" | "plexiglas" | "vitre";

interface FrameRendererProps {
    /** URL de l'image à encadrer */
    imageSrc: string;
    /** Type de matière du cadre */
    material: FrameMaterial;
    /** Largeur visible de la photo en px (hors cadre) */
    artWidth?: number;
    /** Hauteur visible de la photo en px (hors cadre) */
    artHeight?: number;
    /** Épaisseur de la moulure en px (ignoré pour le plexiglas) */
    frameWidth?: number;
    /** Ajoute une légère perspective 3D, comme un cadre posé contre un mur */
    lean?: boolean;
    className?: string;
}

/**
 * FrameRenderer
 * -------------
 * Rend un cadre photo réaliste en pur CSS (aucune image de texture requise).
 *
 * Technique clé : chaque côté du cadre (haut/bas/gauche/droite) est une
 * div indépendante découpée en trapèze via `clip-path: polygon(...)`.
 * Les 4 trapèzes se rejoignent exactement à 45° aux coins, exactement
 * comme les onglets (miter joints) d'un vrai cadre en bois.
 *
 * - Bois      → dégradé brun/or + grain fin + profil bombé doré
 * - Vitre     → moulure argentée ouvragée + liseré sombre + reflet de verre
 * - Plexiglas → impression "face-mounted" sans bordure, tranche floutée + brillance
 */
export default function FrameRenderer({
    imageSrc,
    material,
    artWidth = 300,
    artHeight = 400,
    frameWidth = 26,
    lean = false,
    className = "",
}: FrameRendererProps) {
    const isPlexi = material === "plexiglas";
    const F = frameWidth;

    const outerWidth = isPlexi ? artWidth + 12 : artWidth + F * 2;
    const outerHeight = isPlexi ? artHeight + 12 : artHeight + F * 2;

    return (
        <div
            className={`fiu-scene ${lean ? "fiu-lean" : ""} ${className}`}
            style={{ width: outerWidth, height: outerHeight }}
        >
            {material === "bois" && <WoodFrame imageSrc={imageSrc} F={F} />}
            {material === "vitre" && <VitreFrame imageSrc={imageSrc} F={F} />}
            {material === "plexiglas" && <PlexiFrame imageSrc={imageSrc} />}

            <style jsx>{`
        .fiu-scene {
          position: relative;
          filter: drop-shadow(0 22px 28px rgba(0, 0, 0, 0.35));
        }
        .fiu-lean {
          transform: perspective(1400px) rotateY(-4deg) rotateX(1deg);
        }
      `}</style>
        </div>
    );
}

/* ============================================================
   CADRE EN BOIS — moulure brune ouvragée avec liseré doré
   ============================================================ */
function WoodFrame({ imageSrc, F }: { imageSrc: string; F: number }) {
    return (
        <div className="fiu-wood">
            <div className="bar top" />
            <div className="bar bottom" />
            <div className="bar left" />
            <div className="bar right" />

            <div className="art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Photo encadrée" className="art-img" />
                <div className="recess" />
            </div>

            <style jsx>{`
        .fiu-wood {
          position: absolute;
          inset: 0;
        }
        .bar {
          position: absolute;
          background-blend-mode: overlay;
        }

        /* --- Barres horizontales (haut / bas) : grain le long de l'axe X --- */
        .top,
        .bottom {
          left: 0;
          right: 0;
          height: ${F}px;
          background-image: repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.07) 0px,
              rgba(0, 0, 0, 0.09) 2px,
              transparent 5px,
              transparent 9px
            ),
            linear-gradient(
              180deg,
              #140b06 0%,
              #d8b463 5%,
              #4a2c14 12%,
              #6b4226 32%,
              #8a5a2c 50%,
              #6b4226 68%,
              #4a2c14 88%,
              #d8b463 95%,
              #140b06 100%
            );
        }
        .top {
          top: 0;
          clip-path: polygon(0 0, 100% 0, calc(100% - ${F}px) 100%, ${F}px 100%);
        }
        .bottom {
          bottom: 0;
          clip-path: polygon(${F}px 0, calc(100% - ${F}px) 0, 100% 100%, 0 100%);
        }

        /* --- Barres verticales (gauche / droite) : grain le long de l'axe Y --- */
        .left,
        .right {
          top: 0;
          bottom: 0;
          width: ${F}px;
          background-image: repeating-linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.07) 0px,
              rgba(0, 0, 0, 0.09) 2px,
              transparent 5px,
              transparent 9px
            ),
            linear-gradient(
              90deg,
              #140b06 0%,
              #d8b463 5%,
              #4a2c14 12%,
              #6b4226 32%,
              #8a5a2c 50%,
              #6b4226 68%,
              #4a2c14 88%,
              #d8b463 95%,
              #140b06 100%
            );
        }
        .left {
          left: 0;
          clip-path: polygon(0 0, 100% ${F}px, 100% calc(100% - ${F}px), 0 100%);
        }
        .right {
          right: 0;
          clip-path: polygon(0 ${F}px, 100% 0, 100% 100%, 0 calc(100% - ${F}px));
        }

        .art {
          position: absolute;
          top: ${F}px;
          left: ${F}px;
          right: ${F}px;
          bottom: ${F}px;
          overflow: hidden;
          background: #111;
        }
        .art-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* Ombre de "recul" simulant le rebord (rabbet) du cadre sur la photo */
        .recess {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.45),
            inset 0 -2px 4px rgba(255, 255, 255, 0.08);
          pointer-events: none;
        }
      `}</style>
        </div>
    );
}

/* ============================================================
   CADRE VITRE — moulure argentée ouvragée + liseré sombre + verre
   ============================================================ */
function VitreFrame({ imageSrc, F }: { imageSrc: string; F: number }) {
    return (
        <div className="fiu-vitre">
            <div className="bar top" />
            <div className="bar bottom" />
            <div className="bar left" />
            <div className="bar right" />

            <div className="art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Photo encadrée" className="art-img" />
                <div className="glass" />
                <div className="recess" />
            </div>

            <style jsx>{`
        .fiu-vitre {
          position: absolute;
          inset: 0;
        }
        .bar {
          position: absolute;
        }
        .fluting {
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.35) 0px,
            rgba(0, 0, 0, 0.2) 1px,
            transparent 2px,
            transparent 4px
          );
        }

        /* Profil : argent/métal à l'extérieur -> liseré sombre près de la photo */
        .top,
        .bottom {
          left: 0;
          right: 0;
          height: ${F}px;
          background-image: repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.35) 0px,
              rgba(0, 0, 0, 0.2) 1px,
              transparent 2px,
              transparent 4px
            ),
            linear-gradient(
              180deg,
              #eceded 0%,
              #b8b8ba 14%,
              #8a8a8d 28%,
              #57575a 42%,
              #2a2118 68%,
              #150f0b 86%,
              #0d0906 100%
            );
        }
        .top {
          top: 0;
          clip-path: polygon(0 0, 100% 0, calc(100% - ${F}px) 100%, ${F}px 100%);
        }
        .bottom {
          bottom: 0;
          clip-path: polygon(${F}px 0, calc(100% - ${F}px) 0, 100% 100%, 0 100%);
          background-image: repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.35) 0px,
              rgba(0, 0, 0, 0.2) 1px,
              transparent 2px,
              transparent 4px
            ),
            linear-gradient(
              180deg,
              #0d0906 0%,
              #150f0b 14%,
              #2a2118 32%,
              #57575a 58%,
              #8a8a8d 72%,
              #b8b8ba 86%,
              #eceded 100%
            );
        }

        .left,
        .right {
          top: 0;
          bottom: 0;
          width: ${F}px;
        }
        .left {
          left: 0;
          clip-path: polygon(0 0, 100% ${F}px, 100% calc(100% - ${F}px), 0 100%);
          background-image: repeating-linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.35) 0px,
              rgba(0, 0, 0, 0.2) 1px,
              transparent 2px,
              transparent 4px
            ),
            linear-gradient(
              90deg,
              #eceded 0%,
              #b8b8ba 14%,
              #8a8a8d 28%,
              #57575a 42%,
              #2a2118 68%,
              #150f0b 86%,
              #0d0906 100%
            );
        }
        .right {
          right: 0;
          clip-path: polygon(0 ${F}px, 100% 0, 100% 100%, 0 calc(100% - ${F}px));
          background-image: repeating-linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.35) 0px,
              rgba(0, 0, 0, 0.2) 1px,
              transparent 2px,
              transparent 4px
            ),
            linear-gradient(
              90deg,
              #0d0906 0%,
              #150f0b 14%,
              #2a2118 32%,
              #57575a 58%,
              #8a8a8d 72%,
              #b8b8ba 86%,
              #eceded 100%
            );
        }

        .art {
          position: absolute;
          top: ${F}px;
          left: ${F}px;
          right: ${F}px;
          bottom: ${F}px;
          overflow: hidden;
          background: #111;
        }
        .art-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* Reflet de vitre : bande diagonale claire + léger voile bleuté */
        .glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              120deg,
              transparent 35%,
              rgba(255, 255, 255, 0.35) 46%,
              rgba(255, 255, 255, 0.08) 52%,
              transparent 60%
            ),
            linear-gradient(180deg, rgba(210, 230, 255, 0.06), rgba(210, 230, 255, 0.02));
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .recess {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.4);
          pointer-events: none;
        }
      `}</style>
        </div>
    );
}

/* ============================================================
   PLEXIGLAS — impression face-mounted sans bordure, tranche floutée
   ============================================================ */
function PlexiFrame({ imageSrc }: { imageSrc: string }) {
    return (
        <div className="fiu-plexi">
            <div
                className="wrap"
                style={{ backgroundImage: `url(${imageSrc})` }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="Photo encadrée" className="img" />
            <div className="gloss" />

            <style jsx>{`
        .fiu-plexi {
          position: absolute;
          inset: 0;
        }
        /* Tranche : duplicata flouté de la photo, dépasse légèrement pour
           simuler l'épaisseur de l'impression acrylique (comme une toile) */
        .wrap {
          position: absolute;
          inset: -6px;
          background-size: cover;
          background-position: center;
          filter: blur(8px) brightness(0.75) saturate(1.15);
          border-radius: 2px;
          z-index: 0;
        }
        .img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.12) contrast(1.05);
        }
        /* Brillance diagonale du plexiglas / acrylique */
        .gloss {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            115deg,
            transparent 28%,
            rgba(255, 255, 255, 0.55) 45%,
            rgba(255, 255, 255, 0.12) 52%,
            transparent 66%
          );
          mix-blend-mode: screen;
          pointer-events: none;
        }
      `}</style>
        </div>
    );
}