import { Equipment } from "@/types/equipment";
import { Wifi, Network } from "lucide-react";

interface EquipmentCardProps {
  equipment: Equipment;
  onClick: () => void;
}

export const EquipmentCard = ({ equipment, onClick }: EquipmentCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
      
      {/* Image container */}
      <div className="relative aspect-square bg-muted flex items-center justify-center p-6 overflow-hidden">
        <img
          src={equipment.imgUrl}
          alt={equipment.modelo}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Mesh badge */}
        {equipment.mesh === 'sim' && (
          <div className="absolute top-3 right-3 bg-success/20 backdrop-blur-sm text-success px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-success/30">
            <Wifi className="w-3 h-3" />
            Mesh
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
            {equipment.modelo}
          </h3>
          <p className="text-sm text-muted-foreground">{equipment.categoria}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Velocidade</p>
            <p className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">
              {equipment.velocidade}
            </p>
            <p className="text-xs text-muted-foreground">Mbps</p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Network className="w-4 h-4" />
              <span className="text-sm font-semibold">{equipment.portasLan} Portas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};
