import React, { useEffect, useRef } from 'react';

// New image set is prioritized for top-level and mid-level nodes.
const LAYER_IMAGES: Record<string, string> = {
  // root + primary layers (less deep)
  uet: '/illustrations/hero.png',
  software: '/illustrations/extra2.png',
  transport: '/illustrations/extra3.png',
  network: '/illustrations/extra4.png',
  link: '/illustrations/extra5.png',
  physical: '/illustrations/extra6.png',

  // major second-level sections
  libfabric: '/illustrations/extra7.png',
  'collective-ops': '/illustrations/extra8.png',
  ses: '/illustrations/extra9.png',
  pds: '/illustrations/extra10.png',
  cms: '/illustrations/extra11.png',
  tss: '/illustrations/extra12.png',
  'packet-spray': '/illustrations/extra13.png',
  'fabric-topology': '/illustrations/extra14.png',
  llr: '/illustrations/extra15.png',
  fec: '/illustrations/extra16.png',
  'control-plane': '/illustrations/extra1.png',
  pcm: '/illustrations/extra11.png',
  'qos-queues': '/illustrations/extra4.png',
  cbfc: '/illustrations/extra5.png',
  'ctlos-faults': '/illustrations/extra6.png',
  'software-math-models': '/illustrations/extra7.png',
  'transport-math-models': '/illustrations/extra8.png',
  'network-math-models': '/illustrations/extra9.png',
  'link-math-models': '/illustrations/extra10.png',
  'physical-math-models': '/illustrations/extra12.png',
  'discovery-completion-apis': '/illustrations/extra13.png',
  'tx-rx-queues-mr': '/illustrations/extra14.png',
  'wire-protocol-mapping': '/illustrations/extra15.png',
  'ofi-error-codes': '/illustrations/extra16.png',
  'lldp-org-tlvs': '/illustrations/extra1.png',
  'ofi-api-semantics': '/illustrations/extra7.png',
  'linux-control-api': '/illustrations/extra10.png',
  'ses-header-formats': '/illustrations/extra9.png',
  'pds-headers-control-packets': '/illustrations/extra10.png',
  'cc-telemetry-modes': '/illustrations/extra11.png',
  'secure-domain-kdf-replay': '/illustrations/extra12.png',
  'cbfc-operations-messages': '/illustrations/extra5.png',
  'profile-negotiation-config': '/illustrations/extra2.png',
  'jobid-auth-flows': '/illustrations/extra3.png',
  'ofi-object-api-sequence': '/illustrations/extra7.png',
  'ses-addressing-identifiers': '/illustrations/extra9.png',
  'fi-eq-open': '/illustrations/extra7.png',
  'fi-domain': '/illustrations/extra7.png',
  'fi-mr-reg-key': '/illustrations/extra10.png',
  'fi-ep-bind': '/illustrations/extra10.png',
  'fi-getname': '/illustrations/extra14.png',
  'fi-cq-cntr-open': '/illustrations/extra13.png',
  'ses-send-types': '/illustrations/extra9.png',
  'ses-write-read-types': '/illustrations/extra9.png',
  'ses-atomic-response-types': '/illustrations/extra11.png',
  'ses-ordering-completion': '/illustrations/extra12.png',
  'pds-header-format-catalog': '/illustrations/extra10.png',
  'pds-field-catalog': '/illustrations/extra10.png',
  'pds-ack-cack-sack-catalog': '/illustrations/extra13.png',
  'pds-control-packet-catalog': '/illustrations/extra14.png',
};

// Legacy/base set reused for deeper/fallback visuals.
const CARD_IMAGES = [
  '/illustrations/software.png',
  '/illustrations/transport.png',
  '/illustrations/network.png',
  '/illustrations/link.png',
  '/illustrations/physical.png',
  '/illustrations/extra1.png',
];

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

  // Pick the right image
  let imgSrc: string;
  if (nodeId && LAYER_IMAGES[nodeId]) {
    imgSrc = LAYER_IMAGES[nodeId];
  } else if (type === 'hero') {
    imgSrc = '/illustrations/hero.png';
  } else if (type === 'card') {
    imgSrc = CARD_IMAGES[index % CARD_IMAGES.length];
  } else {
    // slab — pick by index cycling through layers
    imgSrc = CARD_IMAGES[index % CARD_IMAGES.length];
  }

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
