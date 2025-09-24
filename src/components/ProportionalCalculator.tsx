import { useState } from 'react';
import { Calculator as CalcIcon, Calendar } from 'lucide-react';
import { CalculatorCard } from './CalculatorCard';
import { PlanSelect } from './PlanSelect';
import { DateRangeSelector } from './DateRangeSelector';
import { ResultDisplay } from './ResultDisplay';
import { Button } from '@/components/ui/button';
import { ALL_PLANS } from '@/types/plans';
import { calculateProportionalByDate } from '@/utils/calculations';
import { CalculationResult, DateRange } from '@/types/plans';

export function ProportionalCalculator() {
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const plan = ALL_PLANS.find(p => p.id === selectedPlanId);
    if (!plan || !startDate || !endDate || days <= 0) {
      setResult(null);
      return;
    }

    const dateRange: DateRange = {
      startDate,
      endDate,
      days
    };

    const calculationResult = calculateProportionalByDate(plan, dateRange);
    setResult(calculationResult);
  };

  return (
    <CalculatorCard title="Proporcional" icon={CalcIcon}>
      <div className="space-y-6">
        <PlanSelect
          value={selectedPlanId}
          onValueChange={setSelectedPlanId}
          placeholder="Selecione um plano"
        />

        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onDaysChange={setDays}
        />

        <Button
          onClick={handleCalculate}
          disabled={!selectedPlanId || !startDate || !endDate || days <= 0}
          className="w-full cyber-button-effect bg-gradient-cyber text-primary-foreground hover:shadow-cyber"
        >
          <CalcIcon className="w-4 h-4 mr-2" />
          Calcular Proporcional
        </Button>

        <ResultDisplay result={result} title="Valor Proporcional" />
      </div>
    </CalculatorCard>
  );
}