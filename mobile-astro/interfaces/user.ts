export interface User {
  _id: string;
  name: string;
  email: string;
  zodiacSignCode?: string;
  birthDate?: Date;
  role: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  zodiacSign?: string;
  birthDate?: Date;
  role: string;
}

export interface UserToken {
  _id: string;
  name: string;
  token: string;
  id?: string;
  sub?: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}
