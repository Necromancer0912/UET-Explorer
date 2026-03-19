import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sections that exist on the landing page
  const isHome = location.pathname === '/';

  const handleNavLink = (target: string) => {
    if (isHome) {
      // Smooth scroll to section
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Navigate home first, then scroll after transition
      navigate('/', { state: { scrollTo: target } });
    }
  };

  const navItems = [
    { label: 'Architecture', id: 'section-architecture' },
    { label: 'Layers', id: 'section-layers' },
    { label: 'Specification', id: 'section-spec' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 2.5rem', height: 56,
      background: 'rgba(245,244,240,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <Link
        to="/"
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontWeight: 600, fontSize: 13,
          letterSpacing: '0.06em', color: '#0A0A0A',
          textTransform: 'uppercase',
        }}
      >
        UET Explorer
      </Link>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavLink(item.id)}
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 12, color: '#6B7280',
              cursor: 'pointer', letterSpacing: '0.05em',
              background: 'none', border: 'none', padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0A0A0A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
