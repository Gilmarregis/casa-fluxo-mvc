// CONTROLLER: Transaction business logic
import { Transaction, TransactionCreateInput, TransactionUpdateInput, TransactionModel } from '../models/Transaction';

export class TransactionController {
  private static STORAGE_KEY = 'financial_transactions';

  // Get all transactions from localStorage
  static getAll(): Transaction[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const data = JSON.parse(stored);
      return data.map((item: any) => ({
        ...item,
        date: new Date(item.date),
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  }

  // Save transactions to localStorage
  private static saveToStorage(transactions: Transaction[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
      throw new Error('Failed to save transaction');
    }
  }

  // Create new transaction
  static create(input: TransactionCreateInput): Transaction {
    try {
      const transaction = TransactionModel.create(input);
      const transactions = this.getAll();
      transactions.push(transaction);
      this.saveToStorage(transactions);
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  // Get transaction by ID
  static getById(id: string): Transaction | null {
    const transactions = this.getAll();
    return transactions.find(t => t.id === id) || null;
  }

  // Update transaction
  static update(id: string, updates: TransactionUpdateInput): Transaction {
    const transactions = this.getAll();
    const index = transactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error('Transaction not found');
    }

    try {
      const updatedTransaction = TransactionModel.update(transactions[index], updates);
      transactions[index] = updatedTransaction;
      this.saveToStorage(transactions);
      return updatedTransaction;
    } catch (error) {
      throw error;
    }
  }

  // Delete transaction
  static delete(id: string): boolean {
    const transactions = this.getAll();
    const index = transactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      return false;
    }

    transactions.splice(index, 1);
    this.saveToStorage(transactions);
    return true;
  }

  // Get transactions by type
  static getByType(type: 'income' | 'expense'): Transaction[] {
    return this.getAll().filter(t => t.type === type);
  }

  // Get transactions by category
  static getByCategory(category: string): Transaction[] {
    return this.getAll().filter(t => t.category === category);
  }

  // Get transactions by date range
  static getByDateRange(startDate: Date, endDate: Date): Transaction[] {
    return this.getAll().filter(t => t.date >= startDate && t.date <= endDate);
  }

  // Get current month transactions
  static getCurrentMonth(): Transaction[] {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return this.getByDateRange(startOfMonth, endOfMonth);
  }

  // Calculate total by type
  static getTotalByType(type: 'income' | 'expense', startDate?: Date, endDate?: Date): number {
    let transactions = this.getByType(type);
    
    if (startDate && endDate) {
      transactions = transactions.filter(t => t.date >= startDate && t.date <= endDate);
    }
    
    return transactions.reduce((total, t) => total + t.amount, 0);
  }

  // Get current balance
  static getCurrentBalance(): number {
    const income = this.getTotalByType('income');
    const expenses = this.getTotalByType('expense');
    return income - expenses;
  }

  // Get monthly balance
  static getMonthlyBalance(): number {
    const currentMonth = this.getCurrentMonth();
    const income = currentMonth.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = currentMonth.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return income - expenses;
  }

  // Get expense breakdown by category
  static getExpensesByCategory(): { [category: string]: number } {
    const expenses = this.getByType('expense');
    const breakdown: { [category: string]: number } = {};
    
    expenses.forEach(expense => {
      breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.amount;
    });
    
    return breakdown;
  }

  // Get recent transactions (last 10)
  static getRecent(limit: number = 10): Transaction[] {
    return this.getAll()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}