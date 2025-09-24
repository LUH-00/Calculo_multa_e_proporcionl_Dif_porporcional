import { CalculationResult } from '@/types/plans';
import { formatCurrency } from '@/utils/calculations';
import { TrendingUp } from 'lucide-react';

interface ResultDisplayProps {
  result: CalculationResult | null;
  title?: string;
  className?: string;
}

export function ResultDisplay({ result, title = "Resultado", className = "" }: ResultDisplayProps) {
  if (!result || result.amount === 0) {
    return null;
  }

  return (
    <div className={`
      cyber-glass rounded-xl p-4 border border-glass-border
      result-animation bg-gradient-to-br from-card via-card to-primary/5
      ${className}
    `}>
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium opacity-80">{title}</span>
        </div>
        
        <div className="text-2xl font-bold text-foreground">
          {formatCurrency(result.amount)}
        </div>
        
        {result.details && (
          <div className="text-xs text-muted-foreground">
            {result.details}
          </div>
        )}
        
        {result.period && (
          <div className="text-xs text-primary font-medium">
            {result.period}
          </div>
        )}
      </div>
    </div>
  );
}