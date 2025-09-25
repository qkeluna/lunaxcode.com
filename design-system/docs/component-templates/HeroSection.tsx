import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary?: {
    text: string;
    onClick: () => void;
  };
  ctaSecondary?: {
    text: string;
    onClick: () => void;
  };
  variant?: 'dark' | 'light';
  align?: 'left' | 'center';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  variant = 'dark',
  align = 'center',
}) => {
  return (
    <section
      className={`hero hero--${variant} hero--${align}`}
      style={{
        background: variant === 'dark' ? 'var(--bg-primary)' : '#ffffff',
        padding: 'var(--section-padding-lg) var(--container-padding)',
        textAlign: align,
      }}
    >
      <div className="hero__content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          className="hero__title"
          style={{
            fontSize: 'var(--text-display)',
            lineHeight: 'var(--leading-display)',
            fontWeight: 'var(--weight-bold)',
            color: variant === 'dark' ? 'var(--text-primary)' : '#000000',
            marginBottom: 'var(--space-6)',
          }}
        >
          {title}
        </h1>

        <p
          className="hero__subtitle"
          style={{
            fontSize: 'var(--text-body-lg)',
            lineHeight: 'var(--leading-body)',
            color: variant === 'dark' ? 'var(--text-secondary)' : '#666666',
            marginBottom: 'var(--space-10)',
            maxWidth: '800px',
            margin: align === 'center' ? '0 auto var(--space-10)' : '0 0 var(--space-10)',
          }}
        >
          {subtitle}
        </p>

        {(ctaPrimary || ctaSecondary) && (
          <div
            className="hero__cta"
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: align === 'center' ? 'center' : 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {ctaPrimary && (
              <button
                onClick={ctaPrimary.onClick}
                className="btn btn-primary"
                style={{
                  background: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                  padding: 'var(--btn-primary-padding)',
                  borderRadius: 'var(--btn-primary-radius)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--weight-semibold)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition-base)',
                }}
              >
                {ctaPrimary.text}
              </button>
            )}

            {ctaSecondary && (
              <button
                onClick={ctaSecondary.onClick}
                className="btn btn-secondary"
                style={{
                  background: 'transparent',
                  color: variant === 'dark' ? 'var(--text-primary)' : '#000000',
                  padding: 'var(--btn-secondary-padding)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--btn-secondary-radius)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--weight-semibold)',
                  cursor: 'pointer',
                  transition: 'var(--transition-base)',
                }}
              >
                {ctaSecondary.text}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;