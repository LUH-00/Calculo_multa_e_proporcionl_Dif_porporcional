import { Equipment } from "@/types/equipment";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Wifi, Network, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EquipmentModalProps {
  equipment: Equipment | null;
  open: boolean;
  onClose: () => void;
}

export const EquipmentModal = ({ equipment, open, onClose }: EquipmentModalProps) => {
  if (!equipment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 bg-card border-border overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary z-10" />
        
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="bg-muted p-8 flex items-center justify-center min-h-[400px]">
            <img
              src={equipment.imgUrl}
              alt={equipment.modelo}
              className="w-full h-full object-contain max-h-[500px]"
            />
          </div>

          {/* Details side */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-black mb-2">{equipment.modelo}</h2>
              <p className="text-muted-foreground text-lg">{equipment.categoria}</p>
            </div>

            <div className="space-y-4">
              {/* Speed */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Gauge className="w-4 h-4" />
                  <span className="text-sm font-semibold">Velocidade</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent">
                    {equipment.velocidade}
                  </span>
                  <span className="text-xl text-muted-foreground">Mbps</span>
                </div>
              </div>

              {/* Ports */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Network className="w-4 h-4" />
                  <span className="text-sm font-semibold">Portas LAN</span>
                </div>
                <p className="text-3xl font-black">{equipment.portasLan}</p>
              </div>

              {/* Mesh */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-semibold">Suporte Mesh</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                  equipment.mesh === 'sim' 
                    ? 'bg-success/20 text-success border border-success/30' 
                    : 'bg-destructive/20 text-destructive border border-destructive/30'
                }`}>
                  {equipment.mesh === 'sim' ? 'Sim' : 'Não'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
