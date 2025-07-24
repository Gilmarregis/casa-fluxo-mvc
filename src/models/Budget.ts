// MODEL: Budget entity
export interface Budget {
  id: string;
  name: string;
  totalLimit: number;
  categoryLimits: { [categoryId: string]: number };
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetCreateInput {
  name: string;
  totalLimit: number;
  categoryLimits?: { [categoryId: string]: number };
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: Date;
  endDate: Date;
}

export interface BudgetUpdateInput {
  name?: string;
  totalLimit?: number;
  categoryLimits?: { [categoryId: string]: number };
  period?: 'monthly' | 'weekly' | 'yearly';
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
}

export class BudgetModel {
  static validateName(name: string): boolean {
    return name.trim().length > 0 && name.length <= 100;
  }

  static validateLimit(limit: number): boolean {
    return limit > 0 && Number.isFinite(limit);
  }

  static validateDateRange(startDate: Date, endDate: Date): boolean {
    return startDate < endDate;
  }

  static createId(): string {
    return `budget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static create(input: BudgetCreateInput): Budget {
    const now = new Date();
    
    if (!this.validateName(input.name)) {
      throw new Error('Invalid budget name');
    }
    
    if (!this.validateLimit(input.totalLimit)) {
      throw new Error('Invalid total limit');
    }
    
    if (!this.validateDateRange(input.startDate, input.endDate)) {
      throw new Error('Invalid date range');
    }

    return {
      id: this.createId(),
      name: input.name.trim(),
      totalLimit: input.totalLimit,
      categoryLimits: input.categoryLimits || {},
      period: input.period,
      startDate: input.startDate,
      endDate: input.endDate,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
  }

  static update(budget: Budget, updates: BudgetUpdateInput): Budget {
    const updatedBudget = { ...budget };
    
    if (updates.name !== undefined) {
      if (!this.validateName(updates.name)) {
        throw new Error('Invalid budget name');
      }
      updatedBudget.name = updates.name.trim();
    }
    
    if (updates.totalLimit !== undefined) {
      if (!this.validateLimit(updates.totalLimit)) {
        throw new Error('Invalid total limit');
      }
      updatedBudget.totalLimit = updates.totalLimit;
    }
    
    if (updates.categoryLimits !== undefined) {
      updatedBudget.categoryLimits = updates.categoryLimits;
    }
    
    if (updates.period !== undefined) {
      updatedBudget.period = updates.period;
    }
    
    if (updates.startDate !== undefined && updates.endDate !== undefined) {
      if (!this.validateDateRange(updates.startDate, updates.endDate)) {
        throw new Error('Invalid date range');
      }
      updatedBudget.startDate = updates.startDate;
      updatedBudget.endDate = updates.endDate;
    }
    
    if (updates.isActive !== undefined) {
      updatedBudget.isActive = updates.isActive;
    }
    
    updatedBudget.updatedAt = new Date();
    
    return updatedBudget;
  }

  static isWithinPeriod(budget: Budget, date: Date): boolean {
    return date >= budget.startDate && date <= budget.endDate;
  }
}