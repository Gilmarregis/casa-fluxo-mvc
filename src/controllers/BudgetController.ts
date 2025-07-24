// CONTROLLER: Budget business logic
import { Budget, BudgetCreateInput, BudgetUpdateInput, BudgetModel } from '../models/Budget';
import { TransactionController } from './TransactionController';

export class BudgetController {
  private static STORAGE_KEY = 'financial_budgets';

  // Get all budgets from localStorage
  static getAll(): Budget[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const data = JSON.parse(stored);
      return data.map((item: any) => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading budgets:', error);
      return [];
    }
  }

  // Save budgets to localStorage
  private static saveToStorage(budgets: Budget[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(budgets));
    } catch (error) {
      console.error('Error saving budgets:', error);
      throw new Error('Failed to save budget');
    }
  }

  // Create new budget
  static create(input: BudgetCreateInput): Budget {
    try {
      const budget = BudgetModel.create(input);
      const budgets = this.getAll();
      budgets.push(budget);
      this.saveToStorage(budgets);
      return budget;
    } catch (error) {
      throw error;
    }
  }

  // Get budget by ID
  static getById(id: string): Budget | null {
    const budgets = this.getAll();
    return budgets.find(b => b.id === id) || null;
  }

  // Update budget
  static update(id: string, updates: BudgetUpdateInput): Budget {
    const budgets = this.getAll();
    const index = budgets.findIndex(b => b.id === id);
    
    if (index === -1) {
      throw new Error('Budget not found');
    }

    try {
      const updatedBudget = BudgetModel.update(budgets[index], updates);
      budgets[index] = updatedBudget;
      this.saveToStorage(budgets);
      return updatedBudget;
    } catch (error) {
      throw error;
    }
  }

  // Delete budget
  static delete(id: string): boolean {
    const budgets = this.getAll();
    const index = budgets.findIndex(b => b.id === id);
    
    if (index === -1) {
      return false;
    }

    budgets.splice(index, 1);
    this.saveToStorage(budgets);
    return true;
  }

  // Get active budgets
  static getActive(): Budget[] {
    return this.getAll().filter(b => b.isActive);
  }

  // Get current budget (active budget that includes current date)
  static getCurrent(): Budget | null {
    const now = new Date();
    const activeBudgets = this.getActive();
    
    return activeBudgets.find(budget => 
      BudgetModel.isWithinPeriod(budget, now)
    ) || null;
  }

  // Calculate budget usage
  static getBudgetUsage(budgetId: string): {
    totalSpent: number;
    totalLimit: number;
    percentageUsed: number;
    remainingAmount: number;
    categoryUsage: { [categoryId: string]: { spent: number; limit: number; percentage: number } };
  } {
    const budget = this.getById(budgetId);
    if (!budget) {
      throw new Error('Budget not found');
    }

    const transactions = TransactionController.getByDateRange(budget.startDate, budget.endDate);
    const expenses = transactions.filter(t => t.type === 'expense');
    
    const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);
    const percentageUsed = (totalSpent / budget.totalLimit) * 100;
    const remainingAmount = budget.totalLimit - totalSpent;

    // Calculate category usage
    const categoryUsage: { [categoryId: string]: { spent: number; limit: number; percentage: number } } = {};
    
    Object.keys(budget.categoryLimits).forEach(categoryId => {
      const categoryExpenses = expenses.filter(t => t.category === categoryId);
      const categorySpent = categoryExpenses.reduce((sum, t) => sum + t.amount, 0);
      const categoryLimit = budget.categoryLimits[categoryId];
      const categoryPercentage = categoryLimit > 0 ? (categorySpent / categoryLimit) * 100 : 0;
      
      categoryUsage[categoryId] = {
        spent: categorySpent,
        limit: categoryLimit,
        percentage: categoryPercentage
      };
    });

    return {
      totalSpent,
      totalLimit: budget.totalLimit,
      percentageUsed,
      remainingAmount,
      categoryUsage
    };
  }

  // Check if budget is exceeded
  static isBudgetExceeded(budgetId: string): boolean {
    const usage = this.getBudgetUsage(budgetId);
    return usage.percentageUsed > 100;
  }

  // Get budget alerts (budgets that are over 80% used)
  static getBudgetAlerts(): { budget: Budget; usage: number }[] {
    const activeBudgets = this.getActive();
    const alerts: { budget: Budget; usage: number }[] = [];

    activeBudgets.forEach(budget => {
      try {
        const usage = this.getBudgetUsage(budget.id);
        if (usage.percentageUsed >= 80) {
          alerts.push({
            budget,
            usage: usage.percentageUsed
          });
        }
      } catch (error) {
        console.error(`Error calculating usage for budget ${budget.id}:`, error);
      }
    });

    return alerts.sort((a, b) => b.usage - a.usage);
  }

  // Deactivate expired budgets
  static deactivateExpiredBudgets(): number {
    const now = new Date();
    const budgets = this.getAll();
    let deactivatedCount = 0;

    budgets.forEach(budget => {
      if (budget.isActive && budget.endDate < now) {
        budget.isActive = false;
        budget.updatedAt = new Date();
        deactivatedCount++;
      }
    });

    if (deactivatedCount > 0) {
      this.saveToStorage(budgets);
    }

    return deactivatedCount;
  }
}