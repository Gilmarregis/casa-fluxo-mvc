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
    <section className="py-20 px-4 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Mais de 10.000 famílias já economizam conosco
          </Badge>
          
          <h2 className="text-3xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pare de perder dinheiro
            </span>
            <br />
            <span className="text-foreground">Comece a economizar hoje</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <strong>Garantia de 30 dias:</strong> Se você não economizar pelo menos 
            3x o valor pago, devolvemos 100% do seu dinheiro.
          </p>

          <div className="inline-flex items-center bg-green-500/10 text-green-600 px-6 py-3 rounded-full font-semibold">
            ⏰ Oferta especial: <strong>50% OFF</strong> válida até domingo!
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
              
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {plan.icon}
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base mb-4">{plan.description}</CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  
                  {plan.savings && (
                    <Badge variant="secondary" className="text-sm">
                      💰 {plan.savings}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pb-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.testimonial && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                    <p className="text-sm italic text-muted-foreground">
                      "{plan.testimonial}"
                    </p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">Usuário verificado</span>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className={`w-full text-base py-6 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg transform hover:scale-105 transition-all duration-200' 
                      : ''
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => onSelectPlan(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Social Proof & Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 rounded-lg bg-card border">
            <Shield className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <h3 className="font-semibold mb-2">Garantia de 30 dias</h3>
            <p className="text-sm text-muted-foreground">
              Não funcionou? Devolvemos 100% do valor
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border">
            <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
            <h3 className="font-semibold mb-2">⭐ 4.9/5 estrelas</h3>
            <p className="text-sm text-muted-foreground">
              Mais de 2.000 avaliações positivas
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">R$ 2.3M economizados</h3>
            <p className="text-sm text-muted-foreground">
              Total poupado por nossos usuários
            </p>
          </div>
        </div>

        <div className="text-center mt-12 p-6 bg-gradient-to-r from-muted/50 to-transparent rounded-lg">
          <p className="text-muted-foreground text-lg">
            💳 Aceitamos PIX, cartão e boleto • 🔒 Pagamento 100% seguro (SSL) • 
            📞 Suporte especializado em português • 🚀 Ative em menos de 2 minutos
          </p>
        </div>
      </div>
    </section>
  );
}