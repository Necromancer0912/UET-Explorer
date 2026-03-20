const MONO_STACK = 'JetBrains Mono, IBM Plex Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const SPEC_LINKS = [
  {
    title: 'UET Specification v1.0.2',
    description: 'Authoritative overview and publication context from the Ultra Ethernet Consortium.',
    href: 'https://ultraethernet.org/uec-specification/',
    cta: 'Open Specification',
    image: '/illustrations/26.png',
  },
  {
    title: 'Ultra Ethernet Website',
    description: 'Explore consortium updates, architecture material, and ecosystem resources.',
    href: 'https://ultraethernet.org/',
    cta: 'Visit Website',
    image: '/illustrations/27.png',
  },
];

const SpecificationLinks = () => {
  return (
    <section
      style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 3rem 4rem',
      }}
    >
      <div
        style={{
          border: '1px solid rgba(20,75,184,0.16)',
          borderRadius: 10,
            background: 'rgba(255,255,255,0.86)',
          padding: '1.5rem',
        }}
      >
        <p
          style={{
            fontFamily: MONO_STACK,
            fontSize: 11,
            color: '#6B7280',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Specification Resources
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.875rem',
          }}
        >
          {SPEC_LINKS.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: '1px solid rgba(10,10,10,0.08)',
                borderRadius: 8,
                padding: '1rem 1rem 0.9rem',
                background: 'rgba(255,255,255,0.8)',
                transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#144BB8';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(20,75,184,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.borderColor = 'rgba(10,10,10,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  border: '1px solid rgba(20,75,184,0.14)',
                  borderRadius: 6,
                  background: 'rgba(20,75,184,0.03)',
                  padding: '0.45rem',
                  marginBottom: '0.8rem',
                  height: 128,
                }}
              >
                <img
                  src={link.image}
                  alt={link.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: '#0A0A0A',
                  fontWeight: 600,
                  marginBottom: '0.45rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.title}
              </p>
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.65,
                  color: '#6B7280',
                  marginBottom: '0.8rem',
                }}
              >
                {link.description}
              </p>
              <span
                style={{
                  fontFamily: MONO_STACK,
                  fontSize: 10,
                  color: '#144BB8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {link.cta} ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecificationLinks;
