const SIGNATURE_STACK = "'Great Vibes', 'Dancing Script', 'Segoe Script', cursive";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: '1.6rem',
        borderTop: '1px solid rgba(10,10,10,0.1)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.66) 100%)',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '2.7rem 3rem 2.6rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a
          href="https://github.com/Necromancer0912"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: SIGNATURE_STACK,
            fontSize: 'clamp(1.15rem, 2.6vw, 2.05rem)',
            color: '#0F172A',
            letterSpacing: '0.015em',
            lineHeight: 1.35,
            textDecorationLine: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationColor: '#1D4ED8',
            textUnderlineOffset: '10px',
            textDecorationThickness: '1.8px',
            transition: 'transform 0.28s ease, color 0.28s ease, text-decoration-color 0.28s ease',
            textShadow: '0 10px 24px rgba(29,78,216,0.16)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.color = '#1D4ED8';
            e.currentTarget.style.textDecorationColor = '#2563EB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = '#0F172A';
            e.currentTarget.style.textDecorationColor = '#1D4ED8';
          }}
        >
          Made with love by Necromancer0912
        </a>

      </div>
    </footer>
  );
};

export default Footer;
