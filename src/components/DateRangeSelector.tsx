import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { calculateDateDifference } from '@/utils/calculations';

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onDaysChange: (days: number) => void;
}

export function DateRangeSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onDaysChange
}: DateRangeSelectorProps) {
  const [calculatedDays, setCalculatedDays] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const days = calculateDateDifference(startDate, endDate);
      setCalculatedDays(days);
      onDaysChange(days);
    } else {
      setCalculatedDays(0);
      onDaysChange(0);
    }
  }, [startDate, endDate, onDaysChange]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            Data Inicial
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="cyber-glass border-glass-border bg-input text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            Data Final
          </label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="cyber-glass border-glass-border bg-input text-foreground"
          />
        </div>
      </div>

      {calculatedDays > 0 && (
        <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-primary text-primary-foreground">
          <Clock className="w-4 h-4" />
          <span className="font-semibold">
            {calculatedDays} {calculatedDays === 1 ? 'dia' : 'dias'} calculado{calculatedDays === 1 ? '' : 's'}
          </span>
        </div>
      )}
    </div>
  );
}