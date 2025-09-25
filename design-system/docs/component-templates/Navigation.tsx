import React, { useState } from 'react';

interface NavigationProps {
  logo: React.ReactNode;
  links: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
  ctaButton?: {
    text: string;
    onClick: () => void;
  };
  loginButton?: {
    text: string;
    onClick: () => void;
  };
}

export const Navigation: React.FC<NavigationProps> = ({
  logo,
  links,
  ctaButton,
  loginButton,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="navigation"
      style={{
        position: 'sticky',
        top: 0,
        height: 'var(--nav-height)',
        background: 'var(--nav-bg)',
        backdropFilter: 'var(--nav-backdrop)',
        borderBottom: 'var(--nav-border)',
        padding: 'var(--nav-padding)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
      }}
    >
      <div className="navigation__logo" style={{ display: 'flex', alignItems: 'center' }}>
        {logo}
      </div>

      <div
        className="navigation__links"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-8)',
        }}
      >
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`navigation__link ${link.active ? 'navigation__link--active' : ''}`}
            style={{
              fontSize: '15px',
              fontWeight: 'var(--weight-medium)',
              color: link.active ? 'var(--accent-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = link.active ? 'var(--accent-primary)' : 'var(--text-secondary)';
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div
        className="navigation__actions"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}
      >
        {loginButton && (
          <button
            onClick={loginButton.onClick}
            className="btn btn-ghost"
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              padding: '8px 16px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 'var(--weight-medium)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}
          >
            {loginButton.text}
          </button>
        )}

        {ctaButton && (
          <button
            onClick={ctaButton.onClick}
            className="btn btn-primary"
            style={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              fontSize: '15px',
              fontWeight: 'var(--weight-semibold)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-base)',
            }}
          >
            {ctaButton.text}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;