import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar",
    features: [
      "Até 50 transações por mês",
      "3 categorias personalizadas",
      "Relatórios básicos",
      "Suporte por email"
    ],
    popular: false,
    plan: "free" as const
  },
  {
    name: "Pro",
    price: "R$ 19",
    period: "/mês",
    description: "Para usuários avançados",
    features: [
      "Transações ilimitadas",
      "Categorias ilimitadas",
      "Relatórios avançados",
      "Metas e orçamentos",
      "Exportação de dados",
      "Suporte prioritário"
    ],
    popular: true,
    plan: "pro" as const
  },
  {
    name: "Premium",
    price: "R$ 39",
    period: "/mês",
    description: "Para famílias e pequenas empresas",
    features: [
      "Tudo do plano Pro",
      "Múltiplas contas",
      "Compartilhamento familiar",
      "IA para insights financeiros",
      "Consultoria financeira",
      "Suporte 24/7"
    ],
    popular: false,
    plan: "premium" as const
  }
];

interface PricingProps {
  onSelectPlan?: (plan: string) => void;
}

export const Pricing = ({ onSelectPlan }: PricingProps) => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Escolha o Plano
            <span className="text-primary"> Ideal</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comece gratuitamente e evolua conforme suas necessidades crescem
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Mais Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => onSelectPlan?.(plan.plan)}
                >
                  {plan.name === "Gratuito" ? "Começar Grátis" : "Escolher Plano"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Todos os planos incluem 30 dias de garantia. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};