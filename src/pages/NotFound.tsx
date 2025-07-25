import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Oops! Página não encontrada
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            A página que você está procurando não existe ou foi movida. 
            Que tal voltar ao início e explorar nossas funcionalidades?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/')}
            className="px-8 py-6 text-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate(-1)}
            className="px-8 py-6 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Página Anterior
          </Button>
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            Páginas mais acessadas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="justify-start">
              📊 Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate('/transactions')} className="justify-start">
              💰 Transações
            </Button>
            <Button variant="ghost" onClick={() => navigate('/budgets')} className="justify-start">
              🎯 Orçamentos
            </Button>
            <Button variant="ghost" onClick={() => navigate('/reports')} className="justify-start">
              📈 Relatórios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
