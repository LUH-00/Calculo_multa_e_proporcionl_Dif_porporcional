import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function InfoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 z-50 cyber-glass border-glass-border hover:shadow-cyber"
        >
          <Info className="w-5 h-5 text-primary" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="cyber-glass border-glass-border bg-card max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Info className="w-5 h-5" />
            Informações dos Cálculos
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Entenda como funcionam os cálculos do sistema
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Multa Contratual */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">Multa Contratual</h3>
            <div className="cyber-glass rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Fórmula:</p>
              <p className="text-muted-foreground mb-3">
                (Valor Total do Benefício ÷ Meses de Fidelidade) × Meses Restantes
              </p>
              
              <p className="font-medium mb-2">Exemplo com plano de 400M - R$ 109,90:</p>
              <div className="space-y-1 text-muted-foreground">
                <p>• Preço original: R$ 159,90</p>
                <p>• Preço com desconto: R$ 109,90</p>
                <p>• Benefício mensal: R$ 50,00</p>
                <p>• Benefício total (12 meses): R$ 600,00</p>
                <p>• Para 5 meses restantes: (600 ÷ 12) × 5 = R$ 250,00</p>
              </div>
            </div>
          </div>

          {/* Proporcional */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">Cálculo Proporcional</h3>
            <div className="cyber-glass rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Fórmula:</p>
              <p className="text-muted-foreground mb-3">
                (Valor do Plano ÷ Dias do Mês) × Dias Utilizados
              </p>
              
              <p className="font-medium mb-2">Exemplo com plano de 400M - R$ 109,90 em Janeiro (31 dias):</p>
              <div className="space-y-1 text-muted-foreground">
                <p>• Valor diário: R$ 109,90 ÷ 31 = R$ 3,55</p>
                <p>• Para 15 dias de uso: R$ 3,55 × 15 = R$ 53,23</p>
              </div>
            </div>
          </div>

          {/* Planos */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">Planos Disponíveis</h3>
            
            <div className="cyber-glass rounded-lg p-4">
              <h4 className="font-medium mb-3 text-primary">Planos Comerciais:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>• 300M: R$ 135,90 → R$ 85,00</div>
                <div>• 400M: R$ 159,90 → R$ 109,90</div>
                <div>• 500M: R$ 179,90 → R$ 119,90</div>
                <div>• 600M: R$ 189,90 → R$ 129,90</div>
                <div>• 800M: R$ 199,90 → R$ 139,90</div>
              </div>
            </div>

            <div className="cyber-glass rounded-lg p-4">
              <h4 className="font-medium mb-3 text-secondary">Planos Renovação:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>• 200M: R$ 98,00 → R$ 68,00</div>
                <div>• 500M: R$ 135,90 → R$ 85,00</div>
                <div>• 600M Opção 1: R$ 159,90 → R$ 99,90</div>
                <div>• 600M Opção 2: R$ 159,90 → R$ 109,90</div>
                <div>• 700M: R$ 179,90 → R$ 120,00</div>
                <div>• 800M: R$ 189,90 → R$ 129,90</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-glass-border pt-4 text-center">
            <p className="text-sm text-muted-foreground italic">
              "Se você não sabe fazer o Certo, Não faça o Errado"
            </p>
            <p className="text-sm font-semibold text-primary mt-2">
              - Nilson Durans
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}