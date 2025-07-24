import { User, AuthCredentials, RegisterData, AuthResponse } from '../models/User';

export class AuthController {
  private static readonly STORAGE_KEY = 'financial_auth';
  private static readonly USERS_KEY = 'financial_users';

  static async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const users = this.getUsers();
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    // Em uma aplicação real, você verificaria a senha hash
    const token = this.generateToken();
    
    const authData = { user, token };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
    
    return authData;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    const users = this.getUsers();
    
    if (users.find(u => u.email === data.email)) {
      throw new Error('Email já está em uso');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      plan: data.plan || 'free',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    const token = this.generateToken();
    const authData = { user: newUser, token };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
    
    return authData;
  }

  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getCurrentUser(): User | null {
    const authData = localStorage.getItem(this.STORAGE_KEY);
    if (!authData) return null;
    
    try {
      const { user } = JSON.parse(authData);
      return user;
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private static getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private static generateToken(): string {
    return crypto.randomUUID();
  }
}