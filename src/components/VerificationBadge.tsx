
import React from 'react';
import { Badge, CheckCircle, Diamond } from 'lucide-react';
import { VerificationBadge as BadgeType, verificationBadges } from '@/types/user';
import { cn } from '@/lib/utils';

interface VerificationBadgeProps {
  type: 'blue' | 'green' | 'gold' | 'silver' | 'diamond';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const VerificationBadge = ({ 
  type, 
  size = 'md', 
  showLabel = false, 
  className 
}: VerificationBadgeProps) => {
  const badge = verificationBadges[type];
  if (!badge) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const getIcon = () => {
    switch (badge.icon) {
      case 'diamond':
        return <Diamond className={cn(sizeClasses[size], badge.color)} fill="currentColor" />;
      case 'badge':
        return <Badge className={cn(sizeClasses[size], badge.color)} fill="currentColor" />;
      default:
        return <CheckCircle className={cn(sizeClasses[size], badge.color)} fill="currentColor" />;
    }
  };

  const getBadgeEffect = () => {
    if (type === 'diamond') {
      return 'animate-pulse drop-shadow-lg';
    }
    if (type === 'gold') {
      return 'drop-shadow-md';
    }
    return '';
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className={cn('relative', getBadgeEffect())}>
        {badge.gradient && (
          <div className={cn(
            'absolute inset-0 rounded-full blur-sm opacity-50',
            `bg-gradient-to-r ${badge.gradient}`
          )} />
        )}
        {getIcon()}
      </div>
      {showLabel && (
        <span className={cn('text-xs font-medium', badge.color)}>
          {badge.description}
        </span>
      )}
    </div>
  );
};

export default VerificationBadge;
