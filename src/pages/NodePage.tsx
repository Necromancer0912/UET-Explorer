import React, { Suspense, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeScene } from '../components/ThreeScene';
import { uetTree, findNode, findPath } from '../data/uetTree';

const MONO_STACK = 'JetBrains Mono, IBM Plex Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const NodePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const node = id ? findNode(uetTree, id) : uetTree;
  const path = id ? findPath(uetTree, id) || [] : [uetTree];
  const children = node?.children || [];
  const hasChildren = children.length > 0;

  const handleClick = useCallback((childId: string) => {
    navigate(`/node/${childId}`);
  }, [navigate]);

  const goBack = useCallback(() => {
    if (path.length > 1) {
      const parent = path[path.length - 2];
      if (parent.id === uetTree.id) navigate('/');
      else navigate(`/node/${parent.id}`);
    } else {
      navigate('/');
    }
  }, [path, navigate]);

  if (!node) return <div style={{ padding: '8rem 3rem', fontFamily: MONO_STACK }}>Node not found.</div>;

  const depth = path.length;
  const sceneType: 'hero' | 'slab' = depth >= 3 ? 'slab' : 'hero';
  const slabLayers = Math.max(2, 5 - depth);
  const parentNode = path.length > 1 ? path[path.length - 2] : null;
  const nodeIndex = parentNode ? (parentNode.children || []).findIndex(c => c.id === node.id) : 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ minHeight: '100vh', paddingTop: 56 }}
      >
        {/* Breadcrumb */}
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {path.map((p, i) => (
            <React.Fragment key={p.id}>
              <button
                onClick={() => i < path.length - 1 && (p.id === uetTree.id ? navigate('/') : navigate(`/node/${p.id}`))}
                style={{
                  fontSize: 11, color: i === path.length - 1 ? '#0A0A0A' : '#9CA3AF',
                  background: 'none', border: 'none',
                  cursor: i < path.length - 1 ? 'pointer' : 'default',
                  letterSpacing: '0.08em', padding: 0,
                  fontFamily: MONO_STACK, textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (i < path.length - 1) e.currentTarget.style.color = '#0A0A0A'; }}
                onMouseLeave={e => { if (i < path.length - 1) e.currentTarget.style.color = '#9CA3AF'; }}
              >
                {p.short || p.label}
              </button>
              {i < path.length - 1 && (
                <span style={{ fontSize: 11, color: '#D1CFC8', fontFamily: MONO_STACK }}>/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Top section: 3D + page header side by side */}
        <div style={{
          maxWidth: 1320, margin: '0 auto',
          padding: '1.5rem 3rem 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Left: heading + description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <button onClick={goBack} style={{
              fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none',
              cursor: 'pointer', letterSpacing: '0.08em', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0,
              fontFamily: MONO_STACK, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#144BB8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
            >← BACK</button>

            <p style={{ fontFamily: MONO_STACK, fontSize: 11, color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>
              {node.short || node.id.toUpperCase()}
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#0A0A0A', marginBottom: '1.25rem' }}>
              {node.label}
            </h1>
            <p style={{ display: 'block', fontSize: 15, lineHeight: 1.85, color: '#6B7280', fontWeight: 400, marginBottom: '1.5rem' }}>
              {node.description}
            </p>

            {/* Algorithm/tag pills */}
            {node.algorithms && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                {node.algorithms.map(a => (
                  <span key={a} style={{
                    fontFamily: MONO_STACK,
                    fontSize: 10, padding: '0.25rem 0.625rem',
                    border: '1px solid rgba(20,75,184,0.25)',
                    borderRadius: 3, color: '#144BB8',
                    background: 'rgba(20,75,184,0.05)',
                    letterSpacing: '0.04em',
                  }}>{a}</span>
                ))}
              </div>
            )}

            {/* Meta tags */}
            {node.details && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {node.details.map(d => (
                  <span key={d} style={{
                    fontFamily: MONO_STACK,
                    fontSize: 10, padding: '0.25rem 0.625rem',
                    border: '1px solid rgba(0,0,0,0.09)',
                    borderRadius: 3, color: '#888', background: 'rgba(0,0,0,0.02)',
                    letterSpacing: '0.04em',
                  }}>{d}</span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            style={{ height: 400, position: 'relative' }}
          >
            <Suspense fallback={
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: MONO_STACK, fontSize: 11, color: '#9CA3AF', letterSpacing: '0.1em' }}>LOADING 3D...</span>
              </div>
            }>
              <ThreeScene color={node.color || '#144BB8'} type={sceneType} index={nodeIndex} layers={slabLayers} nodeId={node.id} />
            </Suspense>

            {/* Callout labels from details */}
            {node.details && node.details.slice(0, 3).map((d, i) => {
              const positions = [
                { top: '15%', left: '2%' },
                { top: '48%', right: '2%' },
                { bottom: '18%', left: '2%' },
              ];
              return (
                <div key={d} style={{ position: 'absolute', ...positions[i], display: 'flex', alignItems: 'center', gap: '0.4rem', pointerEvents: 'none' }}>
                  <div style={{ width: 20, height: 1, background: 'rgba(0,0,0,0.14)' }} />
                  <span style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Full technical description */}
        {node.longDescription && (
          <div style={{ maxWidth: 1320, margin: '0 auto', padding: '2.5rem 3rem 0' }}>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '2rem' }}>
              <p style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>OVERVIEW</p>
              <p style={{ display: 'block', fontSize: 14.5, lineHeight: 1.9, color: '#374151', maxWidth: 880, fontWeight: 400 }}>
                {node.longDescription}
              </p>
            </div>
          </div>
        )}

        {/* Technical Details Table */}
        {node.techDetails && node.techDetails.length > 0 && (
          <div style={{ maxWidth: 1320, margin: '0 auto', padding: '2.5rem 3rem 0' }}>
            <p style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>TECHNICAL SPECIFICATIONS</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {node.techDetails.map((td) => (
                <div key={td.label} style={{
                  padding: '1rem 1.25rem',
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '0.75rem',
                  alignItems: 'start',
                }}>
                  <span style={{ fontFamily: MONO_STACK, fontSize: 10.5, color: '#6B7280', letterSpacing: '0.04em', fontWeight: 500, lineHeight: 1.5 }}>{td.label}</span>
                  <span style={{ display: 'block', fontSize: 13, color: '#111827', lineHeight: 1.6, fontWeight: 400 }}>{td.content}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-component cards */}
        {hasChildren && (
          <div style={{ maxWidth: 1320, margin: '0 auto', padding: '2.5rem 3rem 4rem' }}>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.75rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <p style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                SUB-COMPONENTS
              </p>
              <span style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#D1CFC8' }}>
                {children.length} ITEMS
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: children.length === 1 ? '1fr' : children.length === 2 ? '1fr 1fr' : children.length <= 4 ? '1fr 1fr' : 'repeat(3, 1fr)',
                gap: '1rem',
              }}
            >
              {children.map((child, i) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                  onClick={() => handleClick(child.id)}
                  style={{
                    padding: '1.5rem 1.75rem',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
                  }}
                  whileHover={{
                    borderColor: node.color || '#144BB8',
                    background: '#ffffff',
                    boxShadow: `0 4px 24px ${(node.color || '#144BB8')}12`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                    <span style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#C4C4C4', letterSpacing: '0.06em' }}>
                      {child.short}
                    </span>
                    <span style={{ fontSize: 14, color: node.color || '#144BB8', opacity: 0.7, lineHeight: 1 }}>→</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: '#0A0A0A', marginBottom: '0.5rem' }}>{child.label}</h3>
                  <p style={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.65, fontWeight: 400 }}>
                    {child.description.slice(0, 110)}…
                  </p>
                  {child.algorithms && (
                    <div style={{ marginTop: '0.875rem', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {child.algorithms.slice(0, 3).map(a => (
                        <span key={a} style={{
                          fontFamily: MONO_STACK,
                          fontSize: 9.5, padding: '0.15rem 0.5rem',
                          border: '1px solid rgba(20,75,184,0.2)',
                          borderRadius: 2, color: '#144BB8', opacity: 0.8,
                        }}>{a}</span>
                      ))}
                    </div>
                  )}
                  {child.children && child.children.length > 0 && (
                    <div style={{ fontFamily: MONO_STACK, fontSize: 10, color: '#C4C4C4', marginTop: '0.75rem', letterSpacing: '0.06em' }}>
                      {child.children.length} sub-components ↓
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Leaf node */}
        {!hasChildren && (
          <div style={{ maxWidth: 1320, margin: '2rem auto 4rem', padding: '0 3rem' }}>
            <div style={{ fontFamily: MONO_STACK, fontSize: 11, color: '#C4C4C4', letterSpacing: '0.08em', textTransform: 'uppercase', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
              ↳ Terminal component — no further sub-components
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default NodePage;
