import { Plan, ALL_PLANS } from '@/types/plans';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wifi } from 'lucide-react';

interface PlanSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  filterType?: 'comercial' | 'renovacao' | 'all';
}

export function PlanSelect({ 
  value, 
  onValueChange, 
  placeholder = "Selecione um plano",
  filterType = 'all' 
}: PlanSelectProps) {
  const filteredPlans = filterType === 'all' 
    ? ALL_PLANS 
    : ALL_PLANS.filter(plan => plan.type === filterType);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Wifi className="w-4 h-4 text-primary" />
        Plano
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="cyber-glass border-glass-border bg-input text-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="cyber-glass border-glass-border bg-card">
          {filteredPlans.map((plan) => (
            <SelectItem 
              key={plan.id} 
              value={plan.id}
              className="text-card-foreground hover:bg-glass hover:text-primary focus:bg-glass focus:text-primary"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{plan.name}</span>
                <span className="text-xs text-muted-foreground">
                  De R$ {plan.originalPrice.toFixed(2)} por R$ {plan.discountPrice.toFixed(2)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}