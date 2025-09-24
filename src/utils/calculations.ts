import { Plan, CalculationResult, DateRange } from '@/types/plans';

/**
 * Calcula a diferença de dias entre duas datas
 */
export function calculateDateDifference(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calcula a diferença em milissegundos e converte para dias
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Calcula multa contratual
 * Fórmula: (Valor Total do Benefício / Meses de Fidelidade) x Meses Restantes
 */
export function calculateContractFine(plan: Plan, remainingMonths: number): CalculationResult {
  if (!plan || remainingMonths <= 0) {
    return { amount: 0 };
  }

  // Valor total do benefício (diferença entre preço original e com desconto * 12 meses)
  const totalBenefit = (plan.originalPrice - plan.discountPrice) * 12;
  
  // Multa = (Valor Total do Benefício / 12) * Meses Restantes
  const fine = (totalBenefit / 12) * remainingMonths;
  
  return {
    amount: fine,
    details: `Benefício: R$ ${totalBenefit.toFixed(2)} / 12 meses × ${remainingMonths} meses`
  };
}

/**
 * Calcula valor proporcional baseado em data
 * Fórmula: (Valor do plano / dias do mês) × dias utilizados
 */
export function calculateProportionalByDate(plan: Plan, dateRange: DateRange): CalculationResult {
  if (!plan || !dateRange.days) {
    return { amount: 0 };
  }

  // Obtém o número de dias do mês da data inicial
  const startDate = new Date(dateRange.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Valor proporcional = (preço do plano / dias do mês) × dias utilizados
  const proportionalValue = (plan.discountPrice / daysInMonth) * dateRange.days;
  
  return {
    amount: proportionalValue,
    details: `${dateRange.days} dias de ${daysInMonth} dias do mês`,
    period: getMonthName(month)
  };
}

/**
 * Calcula valor proporcional tradicional (por mês e dias)
 */
export function calculateProportional(plan: Plan, month: number, days: number): CalculationResult {
  if (!plan || days <= 0) {
    return { amount: 0 };
  }

  // Obtém número de dias no mês
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, month, 0).getDate();
  
  // Valida se os dias não excedem o mês
  if (days > daysInMonth) {
    throw new Error(`O mês selecionado tem apenas ${daysInMonth} dias`);
  }
  
  const proportionalValue = (plan.discountPrice / daysInMonth) * days;
  
  return {
    amount: proportionalValue,
    details: `${days} dias de ${daysInMonth} dias`,
    period: getMonthName(month - 1)
  };
}

/**
 * Calcula diferença proporcional entre dois períodos
 */
export function calculateProportionalDifference(
  plan1: Plan, 
  month1: number, 
  days1: number,
  plan2: Plan, 
  month2: number, 
  days2: number
): { period1: CalculationResult; period2: CalculationResult; total: number } {
  
  const period1 = calculateProportional(plan1, month1, days1);
  const period2 = calculateProportional(plan2, month2, days2);
  const total = period1.amount + period2.amount;
  
  return {
    period1,
    period2,
    total
  };
}

/**
 * Calcula diferença proporcional por data
 */
export function calculateProportionalDifferenceByDate(
  plan1: Plan,
  dateRange1: DateRange,
  plan2: Plan,
  dateRange2: DateRange
): { period1: CalculationResult; period2: CalculationResult; total: number } {
  
  const period1 = calculateProportionalByDate(plan1, dateRange1);
  const period2 = calculateProportionalByDate(plan2, dateRange2);
  const total = period1.amount + period2.amount;
  
  return {
    period1,
    period2,
    total
  };
}

/**
 * Obtém nome do mês
 */
export function getMonthName(monthIndex: number): string {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return months[monthIndex] || '';
}

/**
 * Formata valor monetário
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Formata data para exibição
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}