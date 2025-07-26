import { Check, Crown, Zap, Star, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const plans = [
    {
      id: 'free',
      name: 'Iniciante',
      description: 'Perfeito para começar sua jornada financeira',
      price: 'R$ 0',
      originalPrice: null,
      period: '/mês',
      icon: <Zap className="w-5 h-5" />,
      features: [
        'Até 50 transações por mês',
        'Categorias básicas pré-definidas',
        '1 orçamento ativo',
        'Relatórios mensais simples',
        'Suporte por email em 48h'
      ],
      popular: false,
      buttonText: 'Começar Grátis',
      savings: null,
      testimonial: "Consegui organizar minhas contas em 1 semana!" 
    },
    {
      id: 'pro',
      name: 'Profissional',
      description: 'Para quem quer REALMENTE economizar dinheiro',
      price: 'R$ 19',
      originalPrice: 'R$ 39',
      period: '/mês',
      icon: <TrendingUp className="w-5 h-5" />,
      features: [
        'Transações ILIMITADAS',
        'Categorias personalizadas',
        'Orçamentos ilimitados + alertas inteligentes',
        'Relatórios avançados com insights de IA',
        'Exportação para Excel/PDF',
        'Metas financeiras automáticas',
        'Análise de gastos desnecessários',
        'Suporte prioritário em 12h'
      ],
      popular: true,
      buttonText: 'Economizar R$ 500+ por mês',
      savings: 'Economize até R$ 6.000 por ano',
      testimonial: "Economizei R$ 800 no primeiro mês!" 
    },
    {
      id: 'premium',
      name: 'Família',
      description: 'Para famílias que querem controle total',
      price: 'R$ 39',
      originalPrice: 'R$ 79',
      period: '/mês',
      icon: <Crown className="w-5 h-5" />,
      features: [
        'TUDO do plano Profissional',
        'Até 5 membros da família',
        'Orçamentos compartilhados',
        'Análise de investimentos automática',
        'Consultoria financeira mensal (R$ 200 de valor)',
        'API para contadores',
        'Backup automático em nuvem',
        'Suporte VIP 24/7 + WhatsApp direto'
      ],
      popular: false,
      buttonText: 'Controle Familiar Total',
      savings: 'Economize R$ 480 por ano',
      testimonial: "Nossa família economiza R$ 1.200 por mês!"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <Badge className="mb-3 px-3 py-1 text-xs">
            <Star className="w-3 h-3 mr-1" />
            +10.000 famílias economizando
          </Badge>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Escolha seu plano
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            <strong>Tire ou devolvemos seu dinheiro</strong>
          </p>

          <div className="inline-flex items-center bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">
            ⏰ <strong>50% OFF</strong> até domingo!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'ring-2 ring-primary shadow-2xl scale-105 bg-gradient-to-br from-card to-primary/5' 
                  : 'hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 text-sm font-bold shadow-lg">
                    🔥 MAIS ESCOLHIDO
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-3">
                <div className={`w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {plan.icon}
                </div>
                
                <CardTitle className="text-lg mb-1">{plan.name}</CardTitle>
                <CardDescription className="text-sm mb-3">{plan.description}</CardDescription>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl md:text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  
                  {plan.savings && (
                    <Badge variant="secondary" className="text-xs">
                      💰 {plan.savings}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <ul className="space-y-2">
                  {plan.features.slice(0, 5).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className={`w-full text-sm py-4 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg transform hover:scale-105 transition-all duration-200' 
                      : ''
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSelectPlan(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Social Proof & Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 rounded-lg bg-card border">
            <Shield className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold mb-1 text-sm">Garantia 30 dias</h3>
            <p className="text-xs text-muted-foreground">
              100% do valor de volta
            </p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-card border">
            <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-semibold mb-1 text-sm">⭐ 4.9/5 estrelas</h3>
            <p className="text-xs text-muted-foreground">
              +2.000 avaliações
            </p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-card border">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1 text-sm">R$ 2.3M economizados</h3>
            <p className="text-xs text-muted-foreground">
              Total pelos usuários
            </p>
          </div>
        </div>

        <div className="text-center mt-6 p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-lg">
          <p className="text-muted-foreground text-sm">
            💳 PIX, cartão e boleto • 🔒 Pagamento seguro • 📞 Suporte português • 🚀 Ative em 2min
          </p>
        </div>
      </div>
    </section>
  );
}