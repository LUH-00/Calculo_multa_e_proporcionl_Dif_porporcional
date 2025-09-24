import { ContractFineCalculator } from "@/components/ContractFineCalculator";
import { ProportionalCalculator } from "@/components/ProportionalCalculator";
import { ProportionalDifferenceCalculator } from "@/components/ProportionalDifferenceCalculator";
import { InfoModal } from "@/components/InfoModal";

const Index = () => {
  return (
    <>
      {/* Animated Background */}
      <div className="cyber-stars"></div>
      
      <div className="min-h-screen bg-gradient-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block cyber-glass rounded-2xl px-8 py-4 border border-glass-border mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-cyber bg-clip-text text-transparent">CALCULADORA</span>{" "}
                <span className="text-secondary">AVANÇADA</span>
              </h1>
              <p className="text-muted-foreground mt-2">Sistema moderno de cálculos de planos</p>
            </div>
            
            <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full glow-primary"></div>
          </div>

          {/* Calculator Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ContractFineCalculator />
            <ProportionalCalculator />
          </div>

          {/* Wide Calculator Card */}
          <div className="grid grid-cols-1 gap-8">
            <ProportionalDifferenceCalculator />
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center">
            <div className="cyber-glass rounded-xl p-6 border border-glass-border">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm">
                  © 2025 Todos Direitos Reservados à{" "}
                  <span className="text-primary font-semibold">LUAN VINICIUS</span> 🤓
                </p>
                <a
                  href="https://api.whatsapp.com/send/?phone=98999707891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contato
                </a>
              </div>
            </div>
          </footer>
        </div>

        {/* Info Modal */}
        <InfoModal />
      </div>
    </>
  );
};

export default Index;
