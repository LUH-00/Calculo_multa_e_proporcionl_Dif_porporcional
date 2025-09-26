import { useState, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  const [dateError, setDateError] = useState('');
  const [startDateObj, setStartDateObj] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [endDateObj, setEndDateObj] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );

  const calculateDays = useCallback(() => {
    setDateError('');
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end < start) {
        setDateError('A data final deve ser posterior à data inicial.');
        setCalculatedDays(0);
        onDaysChange(0);
        return;
      }
      
      const days = calculateDateDifference(startDate, endDate);
      setCalculatedDays(days);
      onDaysChange(days);
    } else {
      setCalculatedDays(0);
      onDaysChange(0);
    }
  }, [startDate, endDate, onDaysChange]);

  useEffect(() => {
    calculateDays();
  }, [calculateDays]);

  const handleStartDateSelect = useCallback((date: Date | undefined) => {
    setDateError('');
    setStartDateObj(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      onStartDateChange(dateString);
    } else {
      onStartDateChange('');
    }
  }, [onStartDateChange]);

  const handleEndDateSelect = useCallback((date: Date | undefined) => {
    setDateError('');
    setEndDateObj(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      onEndDateChange(dateString);
    } else {
      onEndDateChange('');
    }
  }, [onEndDateChange]);

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
                {startDateObj ? format(startDateObj, "dd/MM/yyyy") : "Selecione a data"}
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
                disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
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
                {endDateObj ? format(endDateObj, "dd/MM/yyyy") : "Selecione a data"}
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
                disabled={(date) => date > new Date() || date < new Date('2020-01-01') || (startDateObj && date < startDateObj)}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {dateError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{dateError}</AlertDescription>
        </Alert>
      )}
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