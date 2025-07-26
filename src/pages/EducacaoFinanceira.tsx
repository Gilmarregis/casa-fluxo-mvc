import { useState } from "react";
import { BookOpen, Play, CheckCircle, Clock, TrendingUp, DollarSign, PiggyBank, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Sessao {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  concluida: boolean;
  progresso: number;
  icon: React.ReactNode;
  conteudo: {
    topicos: string[];
    dicas: string[];
    exemplo: string;
  };
}

export default function EducacaoFinanceira() {
  const [sessaoAtiva, setSessaoAtiva] = useState<string | null>(null);

  const sessoes: Sessao[] = [
    {
      id: '1',
      titulo: 'Orçamento Pessoal: Primeiros Passos',
      descricao: 'Aprenda a criar e gerenciar seu primeiro orçamento pessoal',
      duracao: '15 min',
      nivel: 'Iniciante',
      concluida: true,
      progresso: 100,
      icon: <PiggyBank className="w-5 h-5" />,
      conteudo: {
        topicos: [
          'O que é um orçamento e por que é importante',
          'Regra 50-30-20: necessidades, desejos e poupança',
          'Como calcular sua renda líquida',
          'Identificando gastos fixos e variáveis',
          'Criando categorias de gastos'
        ],
        dicas: [
          'Anote TODOS os gastos por uma semana para ter uma base real',
          'Comece com metas pequenas e alcançáveis',
          'Revise seu orçamento mensalmente',
          'Use aplicativos para facilitar o controle'
        ],
        exemplo: 'Maria ganha R$ 3.000. Ela destina R$ 1.500 para necessidades, R$ 900 para desejos e R$ 600 para poupança e investimentos.'
      }
    },
    {
      id: '2',
      titulo: 'Eliminando Dívidas: Estratégias Eficazes',
      descricao: 'Métodos comprovados para sair das dívidas rapidamente',
      duracao: '20 min',
      nivel: 'Iniciante',
      concluida: false,
      progresso: 60,
      icon: <TrendingUp className="w-5 h-5" />,
      conteudo: {
        topicos: [
          'Listando todas as suas dívidas',
          'Método Bola de Neve vs Avalanche',
          'Negociação com credores',
          'Renda extra para quitar dívidas',
          'Como evitar novas dívidas'
        ],
        dicas: [
          'Negocie sempre à vista para obter descontos',
          'Priorize dívidas com juros mais altos',
          'Corte gastos supérfluos temporariamente',
          'Considere uma renda extra'
        ],
        exemplo: 'João tinha R$ 15.000 em dívidas. Usando o método avalanche, pagou primeiro o cartão (45% a.a.) e economizou R$ 3.000 em juros.'
      }
    },
    {
      id: '3',
      titulo: 'Reserva de Emergência: Sua Proteção Financeira',
      descricao: 'Como construir uma reserva que te protege de imprevistos',
      duracao: '18 min',
      nivel: 'Intermediário',
      concluida: false,
      progresso: 0,
      icon: <Shield className="w-5 h-5" />,
      conteudo: {
        topicos: [
          'Quanto guardar na reserva de emergência',
          'Onde investir a reserva (liquidez é prioridade)',
          'Como poupar para a reserva mensalmente',
          'Quando usar a reserva de emergência',
          'Recompondo a reserva após uso'
        ],
        dicas: [
          'Meta: 6 meses de gastos essenciais',
          'Invista em produtos com liquidez diária',
          'Automatize a poupança da reserva',
          'Use apenas para emergências reais'
        ],
        exemplo: 'Ana gasta R$ 2.500/mês essenciais. Sua reserva ideal é R$ 15.000, guardada na poupança e CDB com liquidez diária.'
      }
    },
    {
      id: '4',
      titulo: 'Investimentos para Iniciantes',
      descricao: 'Primeiros passos no mundo dos investimentos',
      duracao: '25 min',
      nivel: 'Intermediário',
      concluida: false,
      progresso: 0,
      icon: <DollarSign className="w-5 h-5" />,
      conteudo: {
        topicos: [
          'Renda fixa vs Renda variável',
          'Tesouro Direto: seu primeiro investimento',
          'CDBs, LCIs e LCAs',
          'Fundos de investimento básicos',
          'Diversificação da carteira'
        ],
        dicas: [
          'Comece pelo Tesouro Direto',
          'Diversifique sempre seus investimentos',
          'Estude antes de investir',
          'Tenha objetivos claros para cada investimento'
        ],
        exemplo: 'Pedro divide R$ 1.000/mês: R$ 500 Tesouro Selic, R$ 300 CDB 100% CDI, R$ 200 fundo multimercado conservador.'
      }
    },
    {
      id: '5',
      titulo: 'Planejamento de Aposentadoria',
      descricao: 'Como garantir uma aposentadoria confortável',
      duracao: '30 min',
      nivel: 'Avançado',
      concluida: false,
      progresso: 0,
      icon: <Target className="w-5 h-5" />,
      conteudo: {
        topicos: [
          'Calculando quanto você precisa para se aposentar',
          'INSS vs Previdência Privada',
          'Investimentos de longo prazo',
          'Planejamento tributário na aposentadoria',
          'Estratégias de saque na aposentadoria'
        ],
        dicas: [
          'Comece a planejar o quanto antes',
          'Use simuladores de aposentadoria',
          'Considere inflação no planejamento',
          'Diversifique as fontes de renda'
        ],
        exemplo: 'Carlos, 30 anos, quer se aposentar aos 60 com R$ 10.000/mês. Precisa investir R$ 800/mês em renda variável por 30 anos.'
      }
    }
  ];

  const progressoGeral = Math.round(
    sessoes.reduce((acc, sessao) => acc + sessao.progresso, 0) / sessoes.length
  );

  const sessoesCompletas = sessoes.filter(s => s.concluida).length;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Educação Financeira</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{sessoesCompletas}</p>
                  <p className="text-sm text-muted-foreground">Sessões Completas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{progressoGeral}%</p>
                  <p className="text-sm text-muted-foreground">Progresso Geral</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{sessoes.length}</p>
                  <p className="text-sm text-muted-foreground">Sessões Disponíveis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Progress value={progressoGeral} className="h-3" />
      </div>

      {/* Sessões */}
      <Tabs value={sessaoAtiva || "lista"} onValueChange={setSessaoAtiva}>
        <TabsList className="mb-6">
          <TabsTrigger value="lista">📚 Todas as Sessões</TabsTrigger>
          {sessaoAtiva && sessaoAtiva !== "lista" && (
            <TabsTrigger value={sessaoAtiva}>
              📖 {sessoes.find(s => s.id === sessaoAtiva)?.titulo}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="lista">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessoes.map((sessao) => (
              <Card key={sessao.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {sessao.icon}
                      <Badge variant={
                        sessao.nivel === 'Iniciante' ? 'secondary' : 
                        sessao.nivel === 'Intermediário' ? 'default' : 'destructive'
                      }>
                        {sessao.nivel}
                      </Badge>
                    </div>
                    {sessao.concluida && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  
                  <CardTitle className="text-lg">{sessao.titulo}</CardTitle>
                  <CardDescription>{sessao.descricao}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {sessao.duracao}
                      </span>
                      <span>{sessao.progresso}% completo</span>
                    </div>
                    
                    <Progress value={sessao.progresso} className="h-2" />
                    
                    <Button 
                      className="w-full" 
                      variant={sessao.concluida ? "outline" : "default"}
                      onClick={() => setSessaoAtiva(sessao.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {sessao.concluida ? 'Revisar' : sessao.progresso > 0 ? 'Continuar' : 'Começar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {sessoes.map((sessao) => (
          <TabsContent key={sessao.id} value={sessao.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      {sessao.icon}
                      {sessao.titulo}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {sessao.descricao}
                    </CardDescription>
                  </div>
                  <Badge variant={
                    sessao.nivel === 'Iniciante' ? 'secondary' : 
                    sessao.nivel === 'Intermediário' ? 'default' : 'destructive'
                  }>
                    {sessao.nivel} • {sessao.duracao}
                  </Badge>
                </div>
                <Progress value={sessao.progresso} className="h-3 mt-4" />
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Tópicos */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">📚 O que você vai aprender:</h3>
                  <ul className="space-y-2">
                    {sessao.conteudo.topicos.map((topico, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{topico}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dicas */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">💡 Dicas importantes:</h3>
                  <div className="grid gap-3">
                    {sessao.conteudo.dicas.map((dica, index) => (
                      <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-sm">{dica}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exemplo Prático */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">📊 Exemplo prático:</h3>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm">{sessao.conteudo.exemplo}</p>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      // Simular progresso
                      console.log('Sessão concluída:', sessao.titulo);
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Concluída
                  </Button>
                  <Button variant="outline" onClick={() => setSessaoAtiva("lista")}>
                    Voltar à Lista
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}