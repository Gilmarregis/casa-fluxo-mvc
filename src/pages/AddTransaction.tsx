// VIEW: Add Transaction page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TransactionForm from '@/components/financial/TransactionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionAdded, setTransactionAdded] = useState(false);

  const handleTransactionAdded = () => {
    setTransactionAdded(true);
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Adicionar Transação</h1>
            <p className="text-muted-foreground mt-1">
              Registre uma nova receita ou despesa
            </p>
          </div>
        </div>

        {/* Transaction Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {transactionAdded ? (
              <div className="text-center py-8">
                <div className="text-success text-6xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Transação Adicionada!
                </h2>
                <p className="text-muted-foreground">
                  Redirecionando para o dashboard...
                </p>
              </div>
            ) : (
              <TransactionForm onTransactionAdded={handleTransactionAdded} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;