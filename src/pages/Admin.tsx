import { useState, useEffect } from "react";
import { Equipment } from "@/types/equipment";
import { AdminPasswordDialog } from "@/components/AdminPasswordDialog";
import { EquipmentForm } from "@/components/EquipmentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(true);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    if (authenticated) {
      loadEquipments();
    }
  }, [authenticated]);

  const loadEquipments = () => {
    const stored = localStorage.getItem("equipments");
    if (stored) {
      setEquipments(JSON.parse(stored));
    }
  };

  const saveEquipments = (newEquipments: Equipment[]) => {
    localStorage.setItem("equipments", JSON.stringify(newEquipments));
    setEquipments(newEquipments);
  };

  const handleSave = (equipment: Equipment) => {
    if (equipment.id) {
      // Edit existing
      const updated = equipments.map((eq) =>
        eq.id === equipment.id ? equipment : eq
      );
      saveEquipments(updated);
      toast.success("Equipamento atualizado!");
    } else {
      // Add new
      const newEquipment = {
        ...equipment,
        id: Date.now().toString(),
      };
      saveEquipments([...equipments, newEquipment]);
      toast.success("Equipamento adicionado!");
    }
    setShowForm(false);
    setEditingEquipment(null);
  };

  const handleEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este equipamento?")) {
      const updated = equipments.filter((eq) => eq.id !== id);
      saveEquipments(updated);
      toast.success("Equipamento excluído!");
    }
  };

  const handleAddNew = () => {
    setEditingEquipment(null);
    setShowForm(true);
  };

  if (!authenticated) {
    return (
      <AdminPasswordDialog
        open={showPasswordDialog}
        onSuccess={() => {
          setAuthenticated(true);
          setShowPasswordDialog(false);
        }}
        onCancel={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/favicon.png" alt="MUNDONET Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">
                  Painel Admin
                </h1>
                <p className="text-sm text-muted-foreground">Gerenciar equipamentos</p>
              </div>
            </div>

            <Button
              onClick={handleAddNew}
              className="bg-gradient-primary hover:opacity-90 gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Equipamentos Cadastrados</h2>
          <p className="text-muted-foreground">
            Total: {equipments.length} equipamento{equipments.length !== 1 ? "s" : ""}
          </p>
        </div>

        {equipments.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground text-lg mb-4">
              Nenhum equipamento cadastrado
            </p>
            <Button onClick={handleAddNew} className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Equipamento
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {equipments.map((equipment) => (
              <div
                key={equipment.id}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={equipment.imgUrl}
                    alt={equipment.modelo}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 truncate">{equipment.modelo}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span>{equipment.velocidade} Mbps</span>
                    <span>•</span>
                    <span>{equipment.portasLan} Portas</span>
                    <span>•</span>
                    <span>{equipment.categoria}</span>
                    <span>•</span>
                    <span className={equipment.mesh === "sim" ? "text-success" : "text-destructive"}>
                      Mesh: {equipment.mesh === "sim" ? "Sim" : "Não"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={() => handleEdit(equipment)}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(equipment.id!)}
                    variant="outline"
                    size="icon"
                    className="rounded-full text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Equipment Form */}
      <EquipmentForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingEquipment(null);
        }}
        onSave={handleSave}
        equipment={editingEquipment}
      />
    </div>
  );
};

export default Admin;
