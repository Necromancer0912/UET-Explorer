const MONO_STACK = 'JetBrains Mono, IBM Plex Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: '1rem',
        borderTop: '1px solid rgba(10,10,10,0.1)',
        background: 'rgba(255,255,255,0.36)',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '2.2rem 3rem 2.4rem',
          display: 'grid',
          gap: '1.2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: MONO_STACK,
                fontSize: 10,
                color: '#9CA3AF',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.45rem',
              }}
            >
              UET Documentation
            </p>
            <p style={{ fontSize: 13, color: '#1F2937', lineHeight: 1.7 }}>
              Built around the UET Specification v1.0.2 for architecture exploration and implementation study.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a
              href="https://ultraethernet.org/uec-specification/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: MONO_STACK,
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.52rem 0.8rem',
                borderRadius: 4,
                border: '1px solid rgba(20,75,184,0.35)',
                color: '#144BB8',
                background: 'rgba(255,255,255,0.7)',
              }}
            >
              UET Specification v1.0.2
            </a>

            <a
              href="https://ultraethernet.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: MONO_STACK,
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.52rem 0.8rem',
                borderRadius: 4,
                border: '1px solid rgba(10,10,10,0.16)',
                color: '#0A0A0A',
                background: 'rgba(255,255,255,0.66)',
              }}
            >
              Ultra Ethernet Website
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px dashed rgba(10,10,10,0.16)',
            paddingTop: '0.9rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: MONO_STACK,
              fontSize: 10,
              color: '#9CA3AF',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            UET Explorer Interface
          </p>
          <p
            style={{
              fontFamily: MONO_STACK,
              fontSize: 10,
              color: '#9CA3AF',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Reference: Linux Foundation + Ultra Ethernet Consortium
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
