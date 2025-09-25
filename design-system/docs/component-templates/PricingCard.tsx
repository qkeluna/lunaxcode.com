import React from 'react';

interface PricingCardProps {
  planName: string;
  price: number | string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  onCtaClick: () => void;
  recommended?: boolean;
  badge?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  period = 'per user / month',
  description,
  features,
  ctaText,
  onCtaClick,
  recommended = false,
  badge,
}) => {
  return (
    <div
      className={`pricing-card ${recommended ? 'pricing-card--recommended' : ''}`}
      style={{
        position: 'relative',
        background: 'var(--card-pricing-bg)',
        border: recommended ? '2px solid var(--accent-primary)' : 'var(--card-pricing-border)',
        borderRadius: 'var(--card-pricing-radius)',
        padding: 'var(--card-pricing-padding)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {(recommended || badge) && (
        <div
          className="pricing-card__badge"
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-caption)',
            fontWeight: 'var(--weight-semibold)',
            textTransform: 'uppercase',
          }}
        >
          {badge || 'Recommended'}
        </div>
      )}

      <div className="pricing-card__header" style={{ marginBottom: 'var(--space-6)' }}>
        <h3
          className="pricing-card__plan"
          style={{
            fontSize: 'var(--text-h5)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {planName}
        </h3>

        <div className="pricing-card__price" style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
          <span
            style={{
              fontSize: 'var(--text-h1)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--text-primary)',
            }}
          >
            {typeof price === 'number' ? `$${price}` : price}
          </span>
          {period && (
            <span
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
              }}
            >
              {period}
            </span>
          )}
        </div>

        <p
          className="pricing-card__description"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-secondary)',
            marginTop: 'var(--space-3)',
          }}
        >
          {description}
        </p>
      </div>

      <button
        onClick={onCtaClick}
        className="btn btn-primary"
        style={{
          width: '100%',
          background: recommended ? 'var(--accent-primary)' : 'var(--btn-primary-bg)',
          color: '#ffffff',
          padding: 'var(--btn-primary-padding)',
          borderRadius: 'var(--btn-primary-radius)',
          fontSize: 'var(--text-body)',
          fontWeight: 'var(--weight-semibold)',
          border: 'none',
          cursor: 'pointer',
          transition: 'var(--transition-base)',
          marginBottom: 'var(--space-6)',
        }}
      >
        {ctaText}
      </button>

      <ul
        className="pricing-card__features"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-2)',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <path
                d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                stroke="var(--accent-success)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;