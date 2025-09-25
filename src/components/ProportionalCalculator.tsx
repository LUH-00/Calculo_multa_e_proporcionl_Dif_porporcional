import { useState } from 'react';
import { Calculator as CalcIcon, Calendar, AlertCircle } from 'lucide-react';
import { CalculatorCard } from './CalculatorCard';
import { PlanSelect } from './PlanSelect';
import { DateRangeSelector } from './DateRangeSelector';
import { ResultDisplay } from './ResultDisplay';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ALL_PLANS } from '@/types/plans';
import { calculateProportionalByDate } from '@/utils/calculations';
import { CalculationResult, DateRange } from '@/types/plans';

export function ProportionalCalculator() {
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    
    const plan = ALL_PLANS.find(p => p.id === selectedPlanId);
    
    if (!plan) {
      setError('Por favor, selecione um plano válido.');
      setResult(null);
      return;
    }
    
    if (!startDate || !endDate) {
      setError('Por favor, selecione as datas de início e fim.');
      setResult(null);
      return;
    }
    
    if (days <= 0) {
      setError('O período deve ter pelo menos 1 dia.');
      setResult(null);
      return;
    }

    const dateRange: DateRange = {
      startDate,
      endDate,
      days
    };

    try {
      const calculationResult = calculateProportionalByDate(plan, dateRange);
      setResult(calculationResult);
    } catch (err) {
      setError('Erro ao calcular o valor proporcional. Verifique as datas.');
      setResult(null);
    }
  };

  return (
    <CalculatorCard title="Proporcional" icon={CalcIcon}>
      <div className="space-y-6">
        <PlanSelect
          value={selectedPlanId}
          onValueChange={(value) => {
            setSelectedPlanId(value);
            setError('');
          }}
          placeholder="Selecione um plano"
        />

        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => {
            setStartDate(date);
            setError('');
          }}
          onEndDateChange={(date) => {
            setEndDate(date);
            setError('');
          }}
          onDaysChange={(days) => {
            setDays(days);
            setError('');
          }}
        />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
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