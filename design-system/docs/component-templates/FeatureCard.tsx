import React from 'react';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'elevated';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link,
  variant = 'default',
}) => {
  return (
    <div
      className={`feature-card feature-card--${variant}`}
      style={{
        background: 'var(--card-feature-bg)',
        border: 'var(--card-feature-border)',
        borderRadius: 'var(--card-feature-radius)',
        padding: 'var(--card-feature-padding)',
        transition: 'var(--transition-base)',
        cursor: link ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--accent-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      {icon && (
        <div
          className="feature-card__icon"
          style={{
            width: '48px',
            height: '48px',
            marginBottom: 'var(--space-4)',
            color: 'var(--accent-primary)',
          }}
        >
          {icon}
        </div>
      )}

      <h3
        className="feature-card__title"
        style={{
          fontSize: 'var(--text-h4)',
          lineHeight: 'var(--leading-h4)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {title}
      </h3>

      <p
        className="feature-card__description"
        style={{
          fontSize: 'var(--text-body)',
          lineHeight: 'var(--leading-body)',
          color: 'var(--text-secondary)',
          marginBottom: link ? 'var(--space-4)' : '0',
        }}
      >
        {description}
      </p>

      {link && (
        <a
          href={link.href}
          className="feature-card__link"
          style={{
            fontSize: 'var(--text-body)',
            fontWeight: 'var(--weight-medium)',
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          {link.text}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0L6.59 1.41L12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default FeatureCard;