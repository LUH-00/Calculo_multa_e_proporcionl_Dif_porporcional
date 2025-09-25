import { useState } from 'react';
import { GitCompare, Calculator, AlertCircle } from 'lucide-react';
import { CalculatorCard } from './CalculatorCard';
import { PlanSelect } from './PlanSelect';
import { DateRangeSelector } from './DateRangeSelector';
import { ResultDisplay } from './ResultDisplay';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ALL_PLANS } from '@/types/plans';
import { calculateProportionalDifferenceByDate, formatCurrency } from '@/utils/calculations';
import { CalculationResult, DateRange } from '@/types/plans';

export function ProportionalDifferenceCalculator() {
  // Primeiro período
  const [selectedPlanId1, setSelectedPlanId1] = useState('');
  const [startDate1, setStartDate1] = useState('');
  const [endDate1, setEndDate1] = useState('');
  const [days1, setDays1] = useState(0);

  // Segundo período
  const [selectedPlanId2, setSelectedPlanId2] = useState('');
  const [startDate2, setStartDate2] = useState('');
  const [endDate2, setEndDate2] = useState('');
  const [days2, setDays2] = useState(0);

  const [results, setResults] = useState<{
    period1: CalculationResult;
    period2: CalculationResult;
    total: number;
  } | null>(null);
  
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    
    const plan1 = ALL_PLANS.find(p => p.id === selectedPlanId1);
    const plan2 = ALL_PLANS.find(p => p.id === selectedPlanId2);
    
    if (!plan1 || !plan2) {
      setError('Por favor, selecione os planos para ambos os períodos.');
      setResults(null);
      return;
    }
    
    if (!startDate1 || !endDate1 || !startDate2 || !endDate2) {
      setError('Por favor, selecione as datas para ambos os períodos.');
      setResults(null);
      return;
    }
    
    if (days1 <= 0 || days2 <= 0) {
      setError('Ambos os períodos devem ter pelo menos 1 dia.');
      setResults(null);
      return;
    }

    const dateRange1: DateRange = { startDate: startDate1, endDate: endDate1, days: days1 };
    const dateRange2: DateRange = { startDate: startDate2, endDate: endDate2, days: days2 };

    try {
      const calculationResults = calculateProportionalDifferenceByDate(plan1, dateRange1, plan2, dateRange2);
      setResults(calculationResults);
    } catch (err) {
      setError('Erro ao calcular a diferença proporcional. Verifique os dados.');
      setResults(null);
    }
  };

  const canCalculate = selectedPlanId1 && selectedPlanId2 && startDate1 && endDate1 && startDate2 && endDate2 && days1 > 0 && days2 > 0;

  return (
    <CalculatorCard title="Diferença Proporcional" icon={GitCompare} className="md:col-span-2">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primeiro Período */}
          <div className="cyber-glass rounded-xl p-4 border border-glass-border">
            <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                1
              </div>
              Primeiro Período
            </div>
            
            <div className="space-y-4">
              <PlanSelect
                value={selectedPlanId1}
                onValueChange={(value) => {
                  setSelectedPlanId1(value);
                  setError('');
                }}
                placeholder="Selecione o plano"
              />
              
              <DateRangeSelector
                startDate={startDate1}
                endDate={endDate1}
                onStartDateChange={(date) => {
                  setStartDate1(date);
                  setError('');
                }}
                onEndDateChange={(date) => {
                  setEndDate1(date);
                  setError('');
                }}
                onDaysChange={(days) => {
                  setDays1(days);
                  setError('');
                }}
              />
            </div>
          </div>

          {/* Segundo Período */}
          <div className="cyber-glass rounded-xl p-4 border border-glass-border">
            <div className="flex items-center gap-2 mb-4 text-secondary font-semibold">
              <div className="w-6 h-6 rounded-full bg-gradient-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold">
                2
              </div>
              Segundo Período
            </div>
            
            <div className="space-y-4">
              <PlanSelect
                value={selectedPlanId2}
                onValueChange={(value) => {
                  setSelectedPlanId2(value);
                  setError('');
                }}
                placeholder="Selecione o plano"
              />
              
              <DateRangeSelector
                startDate={startDate2}
                endDate={endDate2}
                onStartDateChange={(date) => {
                  setStartDate2(date);
                  setError('');
                }}
                onEndDateChange={(date) => {
                  setEndDate2(date);
                  setError('');
                }}
                onDaysChange={(days) => {
                  setDays2(days);
                  setError('');
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="w-full cyber-button-effect bg-gradient-cyber text-primary-foreground hover:shadow-cyber"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calcular Diferença
        </Button>

        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultDisplay 
              result={results.period1} 
              title="1º Período" 
            />
            <ResultDisplay 
              result={results.period2} 
              title="2º Período" 
            />
            
            <div className="md:col-span-2">
              <div className="cyber-glass rounded-xl p-4 border border-secondary bg-gradient-to-br from-card via-card to-secondary/10">
                <div className="text-center space-y-2">
                  <div className="text-secondary font-medium text-sm">TOTAL GERAL</div>
                  <div className="text-3xl font-bold text-foreground">
                    {formatCurrency(results.total)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Soma dos dois períodos
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}