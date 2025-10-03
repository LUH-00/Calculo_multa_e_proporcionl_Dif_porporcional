import { useState, useEffect } from "react";
import { Equipment } from "@/types/equipment";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Plus, Edit } from "lucide-react";

interface EquipmentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (equipment: Equipment) => void;
  equipment?: Equipment | null;
}

export const EquipmentForm = ({ open, onClose, onSave, equipment }: EquipmentFormProps) => {
  const [formData, setFormData] = useState<Omit<Equipment, 'id'>>({
    modelo: "",
    velocidade: 0,
    portasLan: 4,
    categoria: "Roteador",
    mesh: "nao",
    imgUrl: "",
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        modelo: equipment.modelo,
        velocidade: equipment.velocidade,
        portasLan: equipment.portasLan,
        categoria: equipment.categoria,
        mesh: equipment.mesh,
        imgUrl: equipment.imgUrl,
      });
    } else {
      setFormData({
        modelo: "",
        velocidade: 0,
        portasLan: 4,
        categoria: "Roteador",
        mesh: "nao",
        imgUrl: "",
      });
    }
  }, [equipment, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: equipment?.id,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {equipment ? <Edit className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
            {equipment ? "Editar Equipamento" : "Adicionar Equipamento"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input
                id="modelo"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                placeholder="Ex: ZTE H3601PE"
                required
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="velocidade">Velocidade (Mbps)</Label>
              <Input
                id="velocidade"
                type="number"
                value={formData.velocidade}
                onChange={(e) => setFormData({ ...formData, velocidade: Number(e.target.value) })}
                placeholder="800"
                required
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="portasLan">Portas LAN</Label>
              <Input
                id="portasLan"
                type="number"
                value={formData.portasLan}
                onChange={(e) => setFormData({ ...formData, portasLan: Number(e.target.value) })}
                placeholder="4"
                required
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => setFormData({ ...formData, categoria: value })}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Roteador">Roteador</SelectItem>
                  <SelectItem value="Repetidor">Repetidor</SelectItem>
                  <SelectItem value="ONU">ONU</SelectItem>
                  <SelectItem value="Modem">Modem</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mesh">Suporte Mesh</Label>
              <Select
                value={formData.mesh}
                onValueChange={(value: 'sim' | 'nao') => setFormData({ ...formData, mesh: value })}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="imgUrl">URL da Imagem</Label>
              <Input
                id="imgUrl"
                type="url"
                value={formData.imgUrl}
                onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
                required
                className="bg-muted border-border"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
