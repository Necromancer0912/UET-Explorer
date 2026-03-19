import { Suspense, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThreeScene } from '../components/ThreeScene';
import SpecificationLinks from '../components/SpecificationLinks';
import Footer from '../components/Footer';
import MindTreeViewer from '../components/MindTreeViewer';
import { uetTree } from '../data/uetTree';

const MONO_STACK = 'JetBrains Mono, IBM Plex Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const children = uetTree.children || [];

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [location.state]);

  const callouts = [
    { label: 'Transport Core', pos: { top: '14%', left: '2%' } },
    { label: 'Semantic Layer', pos: { top: '26%', right: '3%' } },
    { label: 'Physical Fabric', pos: { bottom: '34%', left: '1%' } },
    { label: 'Congestion Engine', pos: { bottom: '18%', right: '5%' } },
    { label: 'Security Shell', pos: { top: '54%', left: '2%' } },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        id="section-architecture"
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: 'calc(100vh - 56px)',
          maxWidth: 1320, margin: '0 auto',
          padding: '4rem 3rem 2rem', gap: '1rem', alignItems: 'center',
        }}
      >
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p style={{ fontFamily: MONO_STACK, fontSize: 11, color: '#9CA3AF', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            ARCHITECTURE EXPLORER // UE-SPECIFICATION v1.0.2
          </p>
          <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.25rem)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.03em', color: '#0A0A0A', marginBottom: '1.75rem' }}>
            Ultra<br />Ethernet<br />Transport
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6B7280', maxWidth: 440, marginBottom: '2rem', fontWeight: 400 }}>
            {uetTree.description}
          </p>
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {(uetTree.details || []).map(d => (
              <span key={d} style={{ fontFamily: MONO_STACK, fontSize: 10, padding: '0.3rem 0.75rem', border: '1px solid rgba(0,0,0,0.10)', borderRadius: 3, color: '#888', letterSpacing: '0.06em' }}>{d}</span>
            ))}
          </div>
          <button
            onClick={() => navigate('/node/transport')}
            style={{
              fontFamily: MONO_STACK, fontSize: 12,
              padding: '0.7rem 1.4rem', borderRadius: 4,
              border: '1px solid #144BB8', background: '#144BB8',
              color: '#fff', cursor: 'pointer', letterSpacing: '0.06em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            EXPLORE TRANSPORT LAYER →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ position: 'relative', height: 560 }}
        >
          <Suspense fallback={null}>
              <ThreeScene color="#144BB8" type="hero" nodeId="uet" />
          </Suspense>
          {callouts.map(({ label, pos }) => (
            <div key={label} style={{ position: 'absolute', ...pos, display: 'flex', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none' }}>
              <div style={{ width: 28, height: 1, background: 'rgba(0,0,0,0.15)' }} />
              <span style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Layer Grid (no horizontal scroll) ───────────────── */}
      <section id="section-layers" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 3rem 5rem' }}>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '2.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ fontFamily: MONO_STACK, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF' }}>
            Primary Components
          </h2>
          <span style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#D1CFC8' }}>
            0{children.length} LAYERS
          </span>
        </div>

        {/* 2-row grid — 3 columns then 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.125rem' }}>
          {children.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              onClick={() => navigate(`/node/${node.id}`)}
              style={{
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 8,
                padding: '1.75rem 1.625rem',
                display: 'flex', flexDirection: 'column', gap: '0.875rem',
                cursor: 'pointer',
                transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
              }}
              whileHover={{
                borderColor: node.color || '#144BB8',
                background: '#ffffff',
                boxShadow: `0 6px 32px ${(node.color || '#144BB8')}15`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: MONO_STACK, fontSize: 11, color: '#CCCCCC', letterSpacing: '0.05em' }}>0{i + 1}</span>
                <span style={{ fontSize: 18, color: node.color || '#144BB8', opacity: 0.7, lineHeight: 1 }}>→</span>
              </div>

              {/* 3D mini preview */}
              <div style={{ height: 120, position: 'relative', margin: '0 -0.5rem' }}>
                <Suspense fallback={<div style={{ height: '100%', borderRadius: 6, background: `${node.color || '#144BB8'}08` }} />}>
                  <ThreeScene color={node.color || '#144BB8'} type="card" index={i} nodeId={node.id} />
                </Suspense>
              </div>

              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em', color: '#0A0A0A', marginBottom: '0.4rem' }}>{node.label}</h3>
                <p style={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.65, fontWeight: 400 }}>
                  {node.description.slice(0, 100)}…
                </p>
              </div>

              {/* Algorithm tags */}
              {node.algorithms && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {node.algorithms.slice(0, 3).map(a => (
                    <span key={a} style={{
                      fontFamily: MONO_STACK, fontSize: 9,
                      padding: '0.15rem 0.5rem', border: '1px solid rgba(20,75,184,0.2)',
                      borderRadius: 2, color: '#144BB8', opacity: 0.8, letterSpacing: '0.03em',
                    }}>{a}</span>
                  ))}
                </div>
              )}

              <div style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#C4C4C4', letterSpacing: '0.05em' }}>
                {(node.children || []).length} sub-components ↓
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Component Hierarchy ────────────────────────────────── */}
      <MindTreeViewer />

      {/* ── Specification ────────────────────────────────────── */}
      <section id="section-spec" style={{ maxWidth: 1320, margin: '0 auto', padding: '3rem 3rem 6rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontFamily: MONO_STACK, fontSize: 11, color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              UE SPECIFICATION
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: '0.75rem' }}>
              UET Specification v1.0.2
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 520, lineHeight: 1.8 }}>
              Published January 28, 2026 by the Ultra Ethernet Consortium under the Linux Foundation. CC BY-ND 4.0. Covers all 5 protocol layers: Software, Transport (SES, PDS, CMS, TSS), Network, Link, and Physical.
            </p>
          </div>
        </div>
      </section>

      <SpecificationLinks />
      <Footer />
    </div>
  );
};

export default LandingPage;
