import { ArrowRight, BarChart3, DollarSign, PieChart, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              🚀 Mais de 10.000 famílias já controlam suas finanças conosco
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Pare de se preocupar
              </span>
              <br />
              <span className="text-foreground">com dinheiro</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <strong>Transforme suas finanças em 30 dias</strong> ou devolvemos seu dinheiro. 
              O único app que realmente faz você economizar dinheiro, não só organizar.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={onGetStarted}
            >
              <DollarSign className="mr-2 w-5 h-5" />
              Economize R$ 500+ por mês
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="text-sm text-muted-foreground">
              ✓ Grátis por 14 dias • ✓ Sem cartão de crédito
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60">
            <div className="text-sm">⭐⭐⭐⭐⭐ 4.9/5 no Google Play</div>
            <div className="text-sm">📱 +50k downloads</div>
            <div className="text-sm">💰 R$ 2,3M economizados pelos usuários</div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Economize 23% mais</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Nossos usuários economizam em média <strong>R$ 547 por mês</strong> 
                  usando nossas análises inteligentes e alertas automáticos.
                </p>
                <div className="text-sm text-primary font-semibold">Resultado comprovado →</div>
              </div>
            </div>
            
            <div className="group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">100% Seguro</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  <strong>Criptografia bancária</strong> protege seus dados. 
                  Nunca acessamos sua conta, apenas organizamos o que você permite.
                </p>
                <div className="text-sm text-secondary font-semibold">Privacidade total →</div>
              </div>
            </div>
            
            <div className="group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Setup em 5 minutos</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  <strong>Sem complicação:</strong> conecte suas contas, 
                  defina suas metas e comece a economizar hoje mesmo.
                </p>
                <div className="text-sm text-accent font-semibold">Comece agora →</div>
              </div>
            </div>
          </div>

          {/* Urgency CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              ⏰ Oferta especial: Economize R$ 600 no primeiro ano
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Últimas <strong>48 horas</strong> para garantir desconto de 50% 
              no plano anual. Depois volta ao preço normal.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-12 py-6"
              onClick={onGetStarted}
            >
              Garantir desconto agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}