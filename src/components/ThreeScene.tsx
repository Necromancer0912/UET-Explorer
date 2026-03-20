import React, { useEffect, useRef } from 'react';

const NUMBERED_IMAGES = Array.from({ length: 27 }, (_, i) => `/illustrations/${i + 1}.png`);
const EXTRA_IMAGES = Array.from({ length: 16 }, (_, i) => `/illustrations/extra${i + 1}.png`);
const LEGACY_IMAGES = [
  '/illustrations/hero.png',
  '/illustrations/software.png',
  '/illustrations/transport.png',
  '/illustrations/network.png',
  '/illustrations/link.png',
  '/illustrations/physical.png',
];
const ALL_SCENE_IMAGES = [...NUMBERED_IMAGES, ...EXTRA_IMAGES, ...LEGACY_IMAGES];
const SESSION_IMAGE_OFFSET = Math.floor(Math.random() * ALL_SCENE_IMAGES.length);

const hashNodeId = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const resolveIllustration = (nodeId?: string, index = 0, type: 'hero' | 'card' | 'slab' = 'card') => {
  if (nodeId) {
    const randomizedIdx = (hashNodeId(nodeId) + SESSION_IMAGE_OFFSET) % ALL_SCENE_IMAGES.length;
    return ALL_SCENE_IMAGES[randomizedIdx];
  }
  const typeOffset = type === 'hero' ? 7 : type === 'card' ? 13 : 19;
  return ALL_SCENE_IMAGES[(Math.abs(index) + SESSION_IMAGE_OFFSET + typeOffset) % ALL_SCENE_IMAGES.length];
};

interface ThreeSceneProps {
  color?: string;
  type?: 'hero' | 'card' | 'slab';
  index?: number;
  layers?: number;
  nodeId?: string;  // pass node id for exact image lookup
}

// Inject keyframe animations once
let injected = false;
function injectStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33%       { transform: translateY(-14px) rotate(1.5deg); }
      66%       { transform: translateY(-6px) rotate(-1deg); }
    }
    @keyframes float-slab {
      0%, 100% { transform: translateY(0px) scale(1); }
      50%       { transform: translateY(-8px) scale(1.02); }
    }
    @keyframes float-card {
      0%, 100% { transform: translateY(0px) scale(1) rotate(-1deg); }
      50%       { transform: translateY(-6px) scale(1.03) rotate(0.5deg); }
    }
    @keyframes shimmer-ring {
      0%   { opacity: 0.15; transform: scale(0.88) rotate(0deg); }
      50%  { opacity: 0.30; transform: scale(1.00) rotate(180deg); }
      100% { opacity: 0.15; transform: scale(0.88) rotate(360deg); }
    }
    @keyframes shimmer-ring2 {
      0%   { opacity: 0.10; transform: scale(1.05) rotate(0deg); }
      50%  { opacity: 0.25; transform: scale(0.93) rotate(-180deg); }
      100% { opacity: 0.10; transform: scale(1.05) rotate(-360deg); }
    }
    @keyframes glow-pulse {
      0%, 100% { box-shadow: 0 0 40px 0px rgba(20,75,184,0.08); }
      50%       { box-shadow: 0 0 80px 20px rgba(20,75,184,0.18); }
    }
  `;
  document.head.appendChild(style);
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  color = '#144BB8',
  type = 'hero',
  index = 0,
  nodeId,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { injectStyles(); }, []);

  const imgSrc = resolveIllustration(nodeId, index, type);

  // Stagger delay slightly per index so multiple cards float at different phases
  const delay = (index % 5) * 0.4;

  const renderLegacyHeroBackdrop = () => (
    <>
      <div style={{
        position: 'absolute',
        inset: '5%',
        borderRadius: '50%',
        border: `1px solid ${color}22`,
        animation: 'shimmer-ring 8s linear infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: '12%',
        borderRadius: '50%',
        border: `1px solid ${color}18`,
        animation: 'shimmer-ring2 12s linear infinite',
        pointerEvents: 'none',
      }} />
    </>
  );

  if (type === 'hero') {
    return (
      <div
        ref={ref}
        style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'visible',
        }}
      >
        {renderLegacyHeroBackdrop()}

        {/* Main illustration */}
        <img
          src={imgSrc}
          alt="UET Hero Illustration"
          style={{
            width: '82%',
            height: '82%',
            objectFit: 'contain',
            animation: `float-slow 7s ease-in-out infinite`,
            animationDelay: `0s`,
            filter: 'drop-shadow(0 24px 48px rgba(20,75,184,0.18))',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />

      </div>
    );
  }

  if (type === 'card') {
    return (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'visible',
          borderRadius: 6,
        }}
      >
        {renderLegacyHeroBackdrop()}

        <img
          src={imgSrc}
          alt="Layer Illustration"
          style={{
            width: '88%',
            height: '88%',
            objectFit: 'contain',
            animation: `float-card 5s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            filter: `drop-shadow(0 8px 20px ${color}25)`,
            userSelect: 'none',
            pointerEvents: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  // slab (detail page)
  return (
    <div
      style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {renderLegacyHeroBackdrop()}

      <img
        src={imgSrc}
        alt="Component Illustration"
        style={{
          width: '85%',
          height: '85%',
          objectFit: 'contain',
          animation: `float-slab 6s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          filter: `drop-shadow(0 20px 40px ${color}20)`,
          userSelect: 'none',
          pointerEvents: 'none',
          position: 'relative', zIndex: 1,
        }}
      />
    </div>
  );
};

export default ThreeScene;
