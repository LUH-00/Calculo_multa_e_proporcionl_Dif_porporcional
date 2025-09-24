export interface Plan {
  id: string;
  name: string;
  speed: string;
  originalPrice: number;
  discountPrice: number;
  type: 'comercial' | 'renovacao';
}

export interface CalculationResult {
  amount: number;
  details?: string;
  period?: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
  days: number;
}

// Planos Comerciais
export const COMERCIAL_PLANS: Plan[] = [
  {
    id: 'com_300',
    name: '300M',
    speed: '300M',
    originalPrice: 135.90,
    discountPrice: 85.00,
    type: 'comercial'
  },
  {
    id: 'com_400',
    name: '400M',
    speed: '400M',
    originalPrice: 159.90,
    discountPrice: 109.90,
    type: 'comercial'
  },
  {
    id: 'com_500',
    name: '500M',
    speed: '500M',
    originalPrice: 179.90,
    discountPrice: 119.90,
    type: 'comercial'
  },
  {
    id: 'com_600',
    name: '600M',
    speed: '600M',
    originalPrice: 189.90,
    discountPrice: 129.90,
    type: 'comercial'
  },
  {
    id: 'com_800',
    name: '800M',
    speed: '800M',
    originalPrice: 199.90,
    discountPrice: 139.90,
    type: 'comercial'
  }
];

// Planos Renovação  
export const RENOVACAO_PLANS: Plan[] = [
  {
    id: 'ren_200',
    name: '200M',
    speed: '200M',
    originalPrice: 98.00,
    discountPrice: 68.00,
    type: 'renovacao'
  },
  {
    id: 'ren_500',
    name: '500M',
    speed: '500M',
    originalPrice: 135.90,
    discountPrice: 85.00,
    type: 'renovacao'
  },
  {
    id: 'ren_600_1',
    name: '600M - Opção 1',
    speed: '600M',
    originalPrice: 159.90,
    discountPrice: 99.90,
    type: 'renovacao'
  },
  {
    id: 'ren_600_2',
    name: '600M - Opção 2',
    speed: '600M',
    originalPrice: 159.90,
    discountPrice: 109.90,
    type: 'renovacao'
  },
  {
    id: 'ren_700',
    name: '700M',
    speed: '700M',
    originalPrice: 179.90,
    discountPrice: 120.00,
    type: 'renovacao'
  },
  {
    id: 'ren_800',
    name: '800M',
    speed: '800M',
    originalPrice: 189.90,
    discountPrice: 129.90,
    type: 'renovacao'
  }
];

export const ALL_PLANS = [...COMERCIAL_PLANS, ...RENOVACAO_PLANS];