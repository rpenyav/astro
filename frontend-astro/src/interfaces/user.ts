export interface User {
  id: string;
  name: string;
  email: string;
  zodiacSign?: string;
  birthDate?: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}
