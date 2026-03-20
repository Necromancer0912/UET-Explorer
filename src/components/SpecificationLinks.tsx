const MONO_STACK = 'JetBrains Mono, IBM Plex Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const SPEC_LINKS = [
  {
    title: 'UET Specification v1.0.2',
    description: 'Authoritative overview and publication context from the Ultra Ethernet Consortium.',
    href: 'https://ultraethernet.org/uec-specification/',
    cta: 'Open Specification',
  },
  {
    title: 'Ultra Ethernet Website',
    description: 'Explore consortium updates, architecture material, and ecosystem resources.',
    href: 'https://ultraethernet.org/',
    cta: 'Visit Website',
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
          border: '1px solid rgba(10,10,10,0.14)',
          borderRadius: 10,
          background: 'transparent',
          padding: '1.5rem',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 12px 26px rgba(0,0,0,0.08)',
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
                background: 'transparent',
                transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                display: 'block',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(10,10,10,0.35)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
                e.currentTarget.style.background = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.borderColor = 'rgba(10,10,10,0.08)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'transparent';
              }}
            >
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
                  color: '#111827',
                  border: '1px solid rgba(0,0,0,0.18)',
                  background: 'rgba(0,0,0,0.03)',
                  borderRadius: 3,
                  padding: '0.2rem 0.45rem',
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
