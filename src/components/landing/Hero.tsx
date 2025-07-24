import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Smartphone } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <TrendingUp className="w-4 h-4" />
            Controle Financeiro Inteligente
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Gerencie suas
            <br />
            <span className="text-primary">Finanças</span> com
            <br />
            Inteligência
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transforme sua relação com o dinheiro. Controle gastos, defina metas e alcance a liberdade financeira com nossa plataforma intuitiva.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="group">
              Começar Gratuitamente
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Ver Demonstração
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">100% Seguro</h3>
              <p className="text-muted-foreground text-center">Seus dados protegidos com criptografia de nível bancário</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
              <Smartphone className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multiplataforma</h3>
              <p className="text-muted-foreground text-center">Acesse de qualquer dispositivo, a qualquer hora</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Relatórios Inteligentes</h3>
              <p className="text-muted-foreground text-center">Insights automáticos para melhorar suas finanças</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};