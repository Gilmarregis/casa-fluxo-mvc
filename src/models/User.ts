export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
  plan?: 'free' | 'pro' | 'premium';
}

export interface AuthResponse {
  user: User;
  token: string;
}