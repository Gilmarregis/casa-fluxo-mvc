// MODEL: Transaction entity
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionCreateInput {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export interface TransactionUpdateInput {
  type?: 'income' | 'expense';
  amount?: number;
  description?: string;
  category?: string;
  date?: Date;
}

export class TransactionModel {
  static validateAmount(amount: number): boolean {
    return amount > 0 && Number.isFinite(amount);
  }

  static validateDescription(description: string): boolean {
    return description.trim().length > 0 && description.length <= 255;
  }

  static validateCategory(category: string): boolean {
    return category.trim().length > 0;
  }

  static createId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static create(input: TransactionCreateInput): Transaction {
    const now = new Date();
    
    if (!this.validateAmount(input.amount)) {
      throw new Error('Invalid amount');
    }
    
    if (!this.validateDescription(input.description)) {
      throw new Error('Invalid description');
    }
    
    if (!this.validateCategory(input.category)) {
      throw new Error('Invalid category');
    }

    return {
      id: this.createId(),
      type: input.type,
      amount: input.amount,
      description: input.description.trim(),
      category: input.category.trim(),
      date: input.date,
      createdAt: now,
      updatedAt: now
    };
  }

  static update(transaction: Transaction, updates: TransactionUpdateInput): Transaction {
    const updatedTransaction = { ...transaction };
    
    if (updates.amount !== undefined) {
      if (!this.validateAmount(updates.amount)) {
        throw new Error('Invalid amount');
      }
      updatedTransaction.amount = updates.amount;
    }
    
    if (updates.description !== undefined) {
      if (!this.validateDescription(updates.description)) {
        throw new Error('Invalid description');
      }
      updatedTransaction.description = updates.description.trim();
    }
    
    if (updates.category !== undefined) {
      if (!this.validateCategory(updates.category)) {
        throw new Error('Invalid category');
      }
      updatedTransaction.category = updates.category.trim();
    }
    
    if (updates.type !== undefined) {
      updatedTransaction.type = updates.type;
    }
    
    if (updates.date !== undefined) {
      updatedTransaction.date = updates.date;
    }
    
    updatedTransaction.updatedAt = new Date();
    
    return updatedTransaction;
  }
}