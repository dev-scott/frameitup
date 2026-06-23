'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox, useTexture, Center } from '@react-three/drei';
import * as THREE from 'three';

// ─── Textured Artwork Plane ─────────────────────────────────────────
function ArtPlane({ url, width, height }: { url: string; width: number; height: number }) {
  // Load texture using Drei helper. Works with base64 and object URLs.
  const texture = useTexture(url);
  
  // Adjust texture settings for crisp display
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return (
    <mesh position={[0, 0, 0.046]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// ─── Fallback Artwork Plane (when no image is uploaded) ─────────────
function PlaceholderPlane({ width, height }: { width: number; height: number }) {
  return (
    <mesh position={[0, 0, 0.046]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial 
        color="#EDE8E3" 
        roughness={0.9} 
        metalness={0.0} 
      />
    </mesh>
  );
}

// ─── The Main 3D Frame Object ───────────────────────────────────────
interface FrameObjectProps {
  imageSrc: string | null;
  frameColor: string;
  frameWidthMm: number;
  frameThicknessMm: number;
  artworkWidthMm: number;
  artworkHeightMm: number;
  hasMat: boolean;
  matColor: string;
  matWidthMm: number;
  glasingType: string;
}

function FrameObject({
  imageSrc,
  frameColor,
  frameWidthMm,
  frameThicknessMm,
  artworkWidthMm,
  artworkHeightMm,
  hasMat,
  matColor,
  matWidthMm,
  glasingType,
}: FrameObjectProps) {
  // Convert mm to scene units (100mm = 1 unit)
  const scale = 0.01;
  const artW = artworkWidthMm * scale;
  const artH = artworkHeightMm * scale;
  const matW = hasMat ? matWidthMm * scale : 0;
  const borderW = frameWidthMm * scale;
  const thick = frameThicknessMm * scale;

  // Total dimensions
  const innerW = artW + matW * 2;
  const innerH = artH + matW * 2;
  const outerW = innerW + borderW * 2;
  const outerH = innerH + borderW * 2;

  // Glasing properties based on type
  const isMuseum = glasingType === 'MUSEUM_GLASS';
  const isAntiReflective = glasingType === 'ANTI_REFLECTIVE';
  const glassOpacity = isAntiReflective ? 0.08 : isMuseum ? 0.15 : 0.22;
  const glassColor = isMuseum ? '#E0F2FE' : '#F0FDFA';

  return (
    <group>
      {/* 1. Outer Frame Border (Thick Bevelled Box) */}
      <RoundedBox 
        args={[outerW, outerH, thick]} 
        radius={0.04} 
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={frameColor}
          roughness={0.35}
          metalness={0.2}
          envMapIntensity={1.0}
        />
      </RoundedBox>

      {/* 2. Matting (Passe-partout) Plane - sits slightly forward */}
      {hasMat && (
        <mesh position={[0, 0, thick / 2 + 0.005]}>
          <planeGeometry args={[innerW, innerH]} />
          <meshStandardMaterial 
            color={matColor} 
            roughness={0.8} 
            metalness={0.05} 
          />
        </mesh>
      )}

      {/* 3. Artwork Image - sits slightly in front of mat */}
      <Suspense fallback={<PlaceholderPlane width={artW} height={artH} />}>
        {imageSrc ? (
          <ArtPlane url={imageSrc} width={artW} height={artH} />
        ) : (
          <PlaceholderPlane width={artW} height={artH} />
        )}
      </Suspense>

      {/* 4. Glass Reflection Overlay - sits in front of artwork to create realism */}
      <mesh position={[0, 0, thick / 2 + 0.01]}>
        <planeGeometry args={[innerW, innerH]} />
        <meshPhysicalMaterial
          color={glassColor}
          transparent
          opacity={glassOpacity}
          roughness={0.05}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </group>
  );
}

// ─── Wall Mount Backdrop ────────────────────────────────────────────
function WallBackdrop() {
  return (
    <mesh position={[0, 0, -0.6]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#F3F4F6" 
        roughness={0.95} 
        metalness={0.0} 
      />
    </mesh>
  );
}

// ─── Main 3D Canvas Exporter ────────────────────────────────────────
export default function FramePreview3D(props: FrameObjectProps) {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-stone-900 shadow-inner flex items-center justify-center">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[5, 5, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.2} 
          castShadow 
        />
        <directionalLight 
          position={[-5, 5, 5]} 
          intensity={0.6} 
        />
        
        <Center>
          <FrameObject {...props} />
        </Center>
        
        <WallBackdrop />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Control Help Overlay */}
      <div className="absolute bottom-4 left-4 pointer-events-none bg-black/60 backdrop-blur-md text-[10px] text-stone-300 px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold">
        Drag to Orbit • Scroll to Zoom
      </div>
    </div>
  );
}
