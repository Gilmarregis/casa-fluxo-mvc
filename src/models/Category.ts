// MODEL: Category entity
export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  createdAt: Date;
}

export const DEFAULT_CATEGORIES: Category[] = [
  // Income Categories
  {
    id: 'cat_salary',
    name: 'Salário',
    type: 'income',
    color: '#16a34a',
    icon: 'Banknote',
    createdAt: new Date()
  },
  {
    id: 'cat_freelance',
    name: 'Freelance',
    type: 'income',
    color: '#059669',
    icon: 'Laptop',
    createdAt: new Date()
  },
  {
    id: 'cat_investment',
    name: 'Investimentos',
    type: 'income',
    color: '#0d9488',
    icon: 'TrendingUp',
    createdAt: new Date()
  },
  
  // Expense Categories
  {
    id: 'cat_food',
    name: 'Alimentação',
    type: 'expense',
    color: '#dc2626',
    icon: 'UtensilsCrossed',
    createdAt: new Date()
  },
  {
    id: 'cat_transport',
    name: 'Transporte',
    type: 'expense',
    color: '#ea580c',
    icon: 'Car',
    createdAt: new Date()
  },
  {
    id: 'cat_housing',
    name: 'Moradia',
    type: 'expense',
    color: '#d97706',
    icon: 'Home',
    createdAt: new Date()
  },
  {
    id: 'cat_health',
    name: 'Saúde',
    type: 'expense',
    color: '#c026d3',
    icon: 'Heart',
    createdAt: new Date()
  },
  {
    id: 'cat_entertainment',
    name: 'Entretenimento',
    type: 'expense',
    color: '#7c3aed',
    icon: 'Gamepad2',
    createdAt: new Date()
  },
  {
    id: 'cat_education',
    name: 'Educação',
    type: 'expense',
    color: '#2563eb',
    icon: 'GraduationCap',
    createdAt: new Date()
  },
  {
    id: 'cat_shopping',
    name: 'Compras',
    type: 'expense',
    color: '#0891b2',
    icon: 'ShoppingBag',
    createdAt: new Date()
  }
];

export class CategoryModel {
  static getDefaultCategories(): Category[] {
    return DEFAULT_CATEGORIES;
  }

  static getCategoriesByType(type: 'income' | 'expense'): Category[] {
    return DEFAULT_CATEGORIES.filter(category => category.type === type);
  }

  static getCategoryById(id: string): Category | undefined {
    return DEFAULT_CATEGORIES.find(category => category.id === id);
  }

  static getCategoryByName(name: string): Category | undefined {
    return DEFAULT_CATEGORIES.find(category => 
      category.name.toLowerCase() === name.toLowerCase()
    );
  }
}