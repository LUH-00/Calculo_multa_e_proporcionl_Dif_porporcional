import { useState } from 'react';
import { FileText, Calculator, Calendar } from 'lucide-react';
import { CalculatorCard } from './CalculatorCard';
import { PlanSelect } from './PlanSelect';
import { ResultDisplay } from './ResultDisplay';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ALL_PLANS } from '@/types/plans';
import { calculateContractFine } from '@/utils/calculations';
import { CalculationResult } from '@/types/plans';

export function ContractFineCalculator() {
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [remainingMonths, setRemainingMonths] = useState(1);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const plan = ALL_PLANS.find(p => p.id === selectedPlanId);
    if (!plan || remainingMonths < 1 || remainingMonths > 12) {
      setResult(null);
      return;
    }

    const calculationResult = calculateContractFine(plan, remainingMonths);
    setResult(calculationResult);
  };

  return (
    <CalculatorCard title="Multa Contratual" icon={FileText}>
      <div className="space-y-6">
        <PlanSelect
          value={selectedPlanId}
          onValueChange={setSelectedPlanId}
          placeholder="Selecione um plano"
        />

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            Meses Restantes
          </label>
          <Input
            type="number"
            min="1"
            max="12"
            value={remainingMonths}
            onChange={(e) => setRemainingMonths(parseInt(e.target.value) || 1)}
            className="cyber-glass border-glass-border bg-input text-foreground"
            placeholder="Digite os meses restantes"
          />
        </div>

        <Button
          onClick={handleCalculate}
          disabled={!selectedPlanId}
          className="w-full cyber-button-effect bg-gradient-cyber text-primary-foreground hover:shadow-cyber"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calcular Multa
        </Button>

        <ResultDisplay result={result} title="Valor da Multa" />
      </div>
    </CalculatorCard>
  );
}