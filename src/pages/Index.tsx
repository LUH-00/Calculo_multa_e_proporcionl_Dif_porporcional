import { useState, useEffect } from "react";
import { Equipment } from "@/types/equipment";
import { EquipmentCard } from "@/components/EquipmentCard";
import { EquipmentModal } from "@/components/EquipmentModal";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialEquipments: Equipment[] = [
  { id: "1", modelo: "ZTE H3601PE", velocidade: 800, portasLan: 4, categoria: "Roteador", mesh: "sim", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_821247-MLB85865584278_062025-F.webp" },
  { id: "2", modelo: "ZTE H199A", velocidade: 500, portasLan: 4, categoria: "Roteador", mesh: "sim", imgUrl: "https://cdnmda.modestodistribuidora.com.br/media/catalog/product/cache/73bf675a1ab8bb63d55fc1aa67d79e3b/0/2/024206_-_roteador_ac1200_zte_-_2.webp" },
  { id: "3", modelo: "Huawei AX3", velocidade: 600, portasLan: 4, categoria: "Roteador", mesh: "sim", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_828381-MLA45341663535_032021-F.webp" },
  { id: "4", modelo: "Huawei WS5200", velocidade: 500, portasLan: 4, categoria: "Roteador", mesh: "sim", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_722300-MLB51698448219_092022-F.webp" },
  { id: "5", modelo: "Intelbras RG 1200", velocidade: 200, portasLan: 4, categoria: "Roteador", mesh: "nao", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_626166-MLA84408573906_052025-F.webp" },
  { id: "6", modelo: "Huawei EG8145X6-10", velocidade: 600, portasLan: 4, categoria: "ONU", mesh: "sim", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_826506-MLB77467203043_072024-F.webp" },
  { id: "7", modelo: "Fiberhome HG6145F", velocidade: 600, portasLan: 4, categoria: "ONU", mesh: "sim", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_734368-MLU79346494571_092024-F.webp" },
  { id: "8", modelo: "Fiberhome HG6145F3", velocidade: 600, portasLan: 4, categoria: "ONU", mesh: "sim", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_927685-MLB86155977502_062025-F.webp" },
  { id: "9", modelo: "Fiberhome HG6143D", velocidade: 500, portasLan: 4, categoria: "ONU", mesh: "nao", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_831190-MLU77954904176_082024-F.webp" },
  { id: "10", modelo: "Tenda AC7 1200", velocidade: 400, portasLan: 4, categoria: "Roteador", mesh: "nao", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_629075-MLB84833085672_052025-F.webp" },
  { id: "11", modelo: "Huawei EG8145V5", velocidade: 600, portasLan: 4, categoria: "ONU", mesh: "nao", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_932841-MLU73377078661_122023-F.webp" },
  { id: "12", modelo: "Tenda AC10", velocidade: 200, portasLan: 4, categoria: "Roteador", mesh: "nao", imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_629075-MLB84833085672_052025-F.webp" },
];

const Index = () => {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem("equipments");
    if (stored) {
      const parsed = JSON.parse(stored);
      setEquipments(parsed);
      setFilteredEquipments(parsed);
    } else {
      setEquipments(initialEquipments);
      setFilteredEquipments(initialEquipments);
      localStorage.setItem("equipments", JSON.stringify(initialEquipments));
    }
  }, []);

  useEffect(() => {
    let filtered = equipments;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((eq) =>
        eq.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterValue !== "all") {
      switch (filterValue) {
        case "mesh":
          filtered = filtered.filter((eq) => eq.mesh === "sim");
          break;
        case "no-mesh":
          filtered = filtered.filter((eq) => eq.mesh === "nao");
          break;
        case "high-speed":
          filtered = filtered.filter((eq) => eq.velocidade > 500);
          break;
        case "low-speed":
          filtered = filtered.filter((eq) => eq.velocidade <= 500);
          break;
      }
    }

    setFilteredEquipments(filtered);
  }, [searchTerm, filterValue, equipments]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/favicon.png" alt="MUNDONET Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">
                  MUNDONET
                </h1>
                <p className="text-sm text-muted-foreground">Luan Vinicius</p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/admin")}
              variant="outline"
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar equipamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-full sm:w-[250px] bg-card border-border">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os equipamentos</SelectItem>
                <SelectItem value="mesh">Com Mesh</SelectItem>
                <SelectItem value="no-mesh">Sem Mesh</SelectItem>
                <SelectItem value="high-speed">Alta velocidade (&gt;500Mbps)</SelectItem>
                <SelectItem value="low-speed">Baixa velocidade (≤500Mbps)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">
              {filteredEquipments.length} equipamento{filteredEquipments.length !== 1 ? "s" : ""} encontrado{filteredEquipments.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Equipment Grid */}
        {filteredEquipments.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Nenhum equipamento encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipments.map((equipment) => (
              <EquipmentCard
                key={equipment.id}
                equipment={equipment}
                onClick={() => setSelectedEquipment(equipment)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Equipment Modal */}
      <EquipmentModal
        equipment={selectedEquipment}
        open={!!selectedEquipment}
        onClose={() => setSelectedEquipment(null)}
      />
    </div>
  );
};

export default Index;
