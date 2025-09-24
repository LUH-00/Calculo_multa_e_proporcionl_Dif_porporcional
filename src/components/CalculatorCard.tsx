import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function CalculatorCard({ title, icon: Icon, children, className = "" }: CalculatorCardProps) {
  return (
    <div className={`
      cyber-glass rounded-2xl p-6 hover-lift glow-primary
      shadow-card border border-glass-border
      transition-all duration-500 group
      ${className}
    `}>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-glass-border">
        <div className="p-2 rounded-lg bg-gradient-cyber">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h2>
      </div>
      
      {children}
    </div>
  );
}