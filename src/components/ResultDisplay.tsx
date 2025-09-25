import { CalculationResult } from '@/types/plans';
import { formatCurrency } from '@/utils/calculations';
import { TrendingUp, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ResultDisplayProps {
  result: CalculationResult | null;
  title?: string;
  className?: string;
}

export function ResultDisplay({ result, title = "Resultado", className = "" }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  
  if (!result || result.amount === 0) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatCurrency(result.amount));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };
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
        
        <div className="flex items-center justify-center gap-2">
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(result.amount)}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0 hover:bg-primary/10"
            title="Copiar valor"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground hover:text-primary" />
            )}
          </Button>
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