import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
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
  const [startDateObj, setStartDateObj] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [endDateObj, setEndDateObj] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );

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

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDateObj(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      onStartDateChange(dateString);
    } else {
      onStartDateChange('');
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDateObj(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      onEndDateChange(dateString);
    } else {
      onEndDateChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarIcon className="w-4 h-4 text-primary" />
            Data Inicial
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal cyber-glass border-glass-border bg-input text-foreground",
                  !startDateObj && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDateObj ? format(startDateObj, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0 cyber-glass border-glass-border bg-card" 
              align="start"
            >
              <Calendar
                mode="single"
                selected={startDateObj}
                onSelect={handleStartDateSelect}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarIcon className="w-4 h-4 text-primary" />
            Data Final
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal cyber-glass border-glass-border bg-input text-foreground",
                  !endDateObj && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDateObj ? format(endDateObj, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0 cyber-glass border-glass-border bg-card" 
              align="start"
            >
              <Calendar
                mode="single"
                selected={endDateObj}
                onSelect={handleEndDateSelect}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
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