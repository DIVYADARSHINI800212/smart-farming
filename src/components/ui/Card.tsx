import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'flat' | 'glow';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const variantStyles = {
    default: 'bg-white border border-[#E6F0EB] shadow-card hover:shadow-card-hover transition-all duration-200',
    flat: 'bg-white/80 backdrop-blur-sm border border-soft-green/30 shadow-subtle',
    glow: 'bg-white border border-agri-green/30 shadow-glow-green',
  };

  return (
    <div 
      className={`rounded-xl p-5 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, icon, className = '' }) => {
  return (
    <div className={`flex items-start justify-between pb-3 mb-3 border-b border-gray-100 ${className}`}>
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className="p-2 rounded-lg bg-soft-green/25 text-agri-green">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold text-deep-green tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
