// VIEW: Transactions page - Full transaction management
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import TransactionList from '@/components/financial/TransactionList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Transactions = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState('all');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transações</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <Link to="/add">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="income">Receitas</SelectItem>
                    <SelectItem value="expense">Despesas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="cat_salary">Salário</SelectItem>
                    <SelectItem value="cat_food">Alimentação</SelectItem>
                    <SelectItem value="cat_transport">Transporte</SelectItem>
                    <SelectItem value="cat_housing">Moradia</SelectItem>
                    <SelectItem value="cat_health">Saúde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {(filterType !== 'all' || filterCategory !== 'all' || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Filtros ativos:</span>
            {filterType !== 'all' && (
              <Badge variant="secondary">
                Tipo: {filterType === 'income' ? 'Receitas' : 'Despesas'}
              </Badge>
            )}
            {filterCategory !== 'all' && (
              <Badge variant="secondary">
                Categoria: {filterCategory}
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary">
                Busca: "{searchTerm}"
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterType('all');
                setFilterCategory('all');
                setSearchTerm('');
              }}
              className="h-6 px-2"
            >
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Transaction List */}
        <TransactionList 
          refreshTrigger={refreshTrigger}
          showActions={true}
        />
      </div>
    </div>
  );
};

export default Transactions;