import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Chrome as Home, TriangleAlert as AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      {/* Animated Background */}
      <div className="cyber-stars"></div>
      
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <div className="cyber-glass rounded-2xl p-8 border border-glass-border max-w-md w-full text-center">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
            <h2 className="text-xl text-primary mb-4">Página não encontrada</h2>
            <p className="text-muted-foreground mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>
          
          <Link to="/">
            <Button className="w-full cyber-button-effect bg-gradient-cyber text-primary-foreground hover:shadow-cyber">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Sistema
            </Button>
          </Link>
          
          <div className="mt-6 text-xs text-muted-foreground">
            <p>Sistema de Cálculos de Planos</p>
            <p>Desenvolvido por Luan Vinicius</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;