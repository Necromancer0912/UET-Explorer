const TECH_STACK = "'Space Grotesk', 'Orbitron', 'Sora', 'JetBrains Mono', sans-serif";
const MONO_STACK = "'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', ui-monospace, monospace";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: '1.75rem',
        borderTop: '1px solid rgba(10,10,10,0.12)',
        background: 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '2.4rem 3rem 2.2rem',
          display: 'grid',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div>
            <p
              style={{
                fontFamily: MONO_STACK,
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#6B7280',
                marginBottom: '0.4rem',
              }}
            >
              UET Explorer
            </p>
            <p
              style={{
                fontFamily: TECH_STACK,
                fontSize: 'clamp(1.05rem, 2vw, 1.45rem)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: '#0F172A',
                lineHeight: 1.25,
                maxWidth: 640,
              }}
            >
              Made with love by Necromancer0912
            </p>
          </div>

          <a
            href="https://github.com/Necromancer0912"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: TECH_STACK,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#111827',
              border: '1px solid rgba(0,0,0,0.25)',
              background: 'transparent',
              borderRadius: 8,
              padding: '0.7rem 1rem',
              transition: 'all 0.22s ease',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            }}
          >
            Visit GitHub Profile
          </a>
        </div>

        <a
          href="https://github.com/Necromancer0912"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            textAlign: 'left',
            fontFamily: TECH_STACK,
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
            fontWeight: 700,
            color: '#111827',
            letterSpacing: '0.035em',
            lineHeight: 1.4,
            textDecorationLine: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationColor: '#1D4ED8',
            textUnderlineOffset: '8px',
            textDecorationThickness: '2px',
            transition: 'transform 0.28s ease, color 0.28s ease, text-decoration-color 0.28s ease',
            textShadow: '0 10px 20px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.color = '#111827';
            e.currentTarget.style.textDecorationColor = '#1D4ED8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = '#111827';
            e.currentTarget.style.textDecorationColor = '#1D4ED8';
          }}
        >
          crafted for Ultra Ethernet exploration and NIC modeling
        </a>
      </div>
    </footer>
  );
};

export default Footer;
