import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { uetTree } from '../data/uetTree';
import type { UETNode } from '../data/uetTree';

const MONO_STACK = 'JetBrains Mono, IBM Plex Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

interface MindTreeNodeProps {
  node: UETNode;
  depth: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onNavigate: (id: string) => void;
}

const DEPTH_COLORS = ['#1F2937', '#374151', '#6B7280', '#9CA3AF'];
const DEPTH_BACKGROUNDS = ['rgba(31,41,55,0.08)', 'rgba(55,65,81,0.06)', 'rgba(107,114,128,0.04)', 'rgba(156,163,175,0.02)'];

const MindTreeNode = ({
  node,
  depth,
  expandedIds,
  onToggle,
  onNavigate,
}: MindTreeNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isRoot = depth === 0;

  const depthColor = DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];
  const depthBackground = DEPTH_BACKGROUNDS[Math.min(depth, DEPTH_BACKGROUNDS.length - 1)];
  const paddingLeft = isRoot ? 0 : depth * 28;
  const connectorStyle = !isRoot ? {
    position: 'absolute' as const,
    left: `${depth * 28 - 14}px`,
    top: 0,
    width: '14px',
    height: '100%',
    borderLeft: `1px solid ${DEPTH_COLORS[Math.min(depth - 1, DEPTH_COLORS.length - 1)]}20`,
    borderBottom: `1px solid ${DEPTH_COLORS[Math.min(depth - 1, DEPTH_COLORS.length - 1)]}20`,
  } : undefined;

  return (
    <div style={{ position: 'relative', marginBottom: isRoot ? '1.5rem' : '0.625rem' }}>
      {connectorStyle && <div style={connectorStyle} />}

      <div
        style={{
          paddingLeft: `${paddingLeft}px`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Expand/Collapse Toggle */}
        {hasChildren && (
          <motion.button
            whileHover={{ scale: 1.15 }}
            onClick={() => onToggle(node.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              color: depthColor,
              transition: 'transform 0.2s',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 14,
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                display: 'inline-block',
                fontWeight: 'bold',
              }}
            >
              ├
            </span>
          </motion.button>
        )}

        {!hasChildren && <div style={{ width: '20px', flexShrink: 0 }} />}

        {/* Node Card */}
        <motion.div
          layout
          onClick={() => onNavigate(node.id)}
          style={{
            padding: isRoot ? '1.25rem 1.25rem' : '0.65rem 1rem',
            borderRadius: isRoot ? 8 : 6,
            border: `1.5px solid ${depthColor}${isRoot ? '30' : '20'}`,
            background: isRoot ? `${depthColor}08` : depthBackground,
            cursor: 'pointer',
            flex: 1,
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
          whileHover={{
            borderColor: depthColor,
            background: `${depthColor}15`,
            boxShadow: `0 6px 16px ${depthColor}20`,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                fontFamily: MONO_STACK,
                fontSize: isRoot ? 14 : 12,
                fontWeight: isRoot ? 700 : 600,
                color: '#0A0A0A',
                margin: 0,
                letterSpacing: '-0.01em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {node.label}
            </p>
            {!isRoot && (
              <p
                style={{
                  fontFamily: MONO_STACK,
                  fontSize: 10.5,
                  color: '#6B7280',
                  margin: '0.2rem 0 0',
                  letterSpacing: '0.01em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {node.description.slice(0, isRoot ? 80 : 50)}…
              </p>
            )}
          </div>

          {/* Child count badge */}
          {hasChildren && (
            <span
              style={{
                fontFamily: MONO_STACK,
                fontSize: isRoot ? 11 : 9,
                color: depthColor,
                opacity: 0.8,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                background: `${depthColor}15`,
                padding: isRoot ? '0.3rem 0.6rem' : '0.2rem 0.4rem',
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              {node.children!.length}
            </span>
          )}
        </motion.div>
      </div>

      {/* Nested Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', marginTop: '0.25rem' }}
          >
            {node.children!.map((child) => (
              <MindTreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                expandedIds={expandedIds}
                onToggle={onToggle}
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MindTreeViewer = () => {
  const navigate = useNavigate();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['uet']));

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleNavigate = useCallback(
    (id: string) => {
      if (id !== 'uet') {
        navigate(`/node/${id}`);
      }
    },
    [navigate]
  );

  return (
    <section
      id="section-hierarchy"
      style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 3rem 5rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          borderTop: '1px solid rgba(0,0,0,0.07)',
          paddingTop: '2.5rem',
          marginBottom: '2rem',
        }}
      >
        <p
          style={{
            fontFamily: MONO_STACK,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
            marginBottom: '0.75rem',
            fontWeight: 600,
          }}
        >
          COMPONENT HIERARCHY
        </p>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: '0.75rem' }}>
          Architecture Explorer
        </h2>
        <p
          style={{
            fontSize: 14,
            color: '#6B7280',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}
        >
          Interactive tree view of UET components organized by layer. Expand/collapse groups to explore structure, or click any component name to view detailed specifications.
        </p>
      </div>

      {/* Tree Container */}
      <div
        style={{
          padding: '1.75rem',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <MindTreeNode
          node={uetTree}
          depth={0}
          expandedIds={expandedIds}
          onToggle={handleToggle}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem 1.5rem',
          borderRadius: 6,
          background: 'rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.10)',
        }}
      >
        <p
          style={{
            fontFamily: MONO_STACK,
            fontSize: 11,
            color: '#6B7280',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
            fontWeight: 600,
          }}
        >
          Navigation Tips
        </p>
        <ul
          style={{
            fontFamily: MONO_STACK,
            fontSize: 11,
            color: '#6B7280',
            lineHeight: 1.8,
            margin: 0,
            paddingLeft: '1.5rem',
            listStyle: 'disc',
          }}
        >
          <li>
            Click{' '}
            <span style={{ color: '#1F2937', fontWeight: 600 }}>├</span> to expand/collapse component groups
          </li>
          <li>
            Click component name to jump to detailed specifications and technical documentation
          </li>
          <li>
            Depth-coded shades: darker blacks = higher-level layers, lighter = sub-components
          </li>
          <li>
            Badge counts show number of child components per group
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MindTreeViewer;
