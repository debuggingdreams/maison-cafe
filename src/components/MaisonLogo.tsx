import React from 'react';

interface MaisonLogoProps {
  className?: string;
  light?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MaisonLogo: React.FC<MaisonLogoProps> = ({ className = '', light = false, size = 'md' }) => {
  const textColor = light ? '#FAF8F5' : '#1C1917';
  
  const heightMap = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
    xl: 'h-24'
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${heightMap[size]} ${className}`}>
      <svg
        viewBox="0 0 160 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto drop-shadow-xs"
        aria-label="Mai son Logo"
      >
        <g>
          {/* Top Line: "Mai" Serif Typography matching image plaque */}
          <text
            x="80"
            y="56"
            textAnchor="middle"
            fill={textColor}
            style={{
              fontFamily: "'Bodoni Moda', 'Italiana', 'Didot', 'Playfair Display', serif",
              fontWeight: 800,
              fontSize: '58px',
              letterSpacing: '-0.03em',
            }}
          >
            Mai
          </text>

          {/* Bottom Line: "son" Serif Typography matching image plaque */}
          <text
            x="80"
            y="108"
            textAnchor="middle"
            fill={textColor}
            style={{
              fontFamily: "'Bodoni Moda', 'Italiana', 'Didot', 'Playfair Display', serif",
              fontWeight: 800,
              fontSize: '58px',
              letterSpacing: '-0.03em',
            }}
          >
            son
          </text>
        </g>
      </svg>
    </div>
  );
};



