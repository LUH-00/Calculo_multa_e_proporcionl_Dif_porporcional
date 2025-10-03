import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface AdminPasswordDialogProps {
  open: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminPasswordDialog = ({ open, onSuccess, onCancel }: AdminPasswordDialogProps) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "mundonet") {
      onSuccess();
      setPassword("");
      toast.success("Acesso autorizado!");
    } else {
      toast.error("Senha incorreta!");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Acesso Administrativo
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted border-border"
              autoFocus
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              Confirmar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
