export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private readonly USERS_KEY = 'securebank_users';
  private readonly TOKEN_KEY = 'securebank_token';

  // Récupérer tous les utilisateurs
  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Sauvegarder les utilisateurs
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Générer un ID unique
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Générer un token JWT simple
  private generateToken(userId: string): string {
    const payload = {
      userId,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 heures
    };
    return btoa(JSON.stringify(payload));
  }

  // Inscription
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    const users = this.getUsers();
    
    // Vérifier si l'email existe déjà
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Un compte avec cet email existe déjà');
    }

    // Créer le nouvel utilisateur
    const newUser: User = {
      id: this.generateId(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date().toISOString(),
    };

    // Sauvegarder l'utilisateur avec le mot de passe hashé
    const userWithPassword = {
      ...newUser,
      password: await this.hashPassword(userData.password),
    };

    users.push(userWithPassword);
    this.saveUsers(users);

    // Générer le token
    const token = this.generateToken(newUser.id);
    localStorage.setItem(this.TOKEN_KEY, token);

    return {
      user: newUser,
      token,
    };
  }

  // Connexion
  async login(email: string, password: string): Promise<AuthResponse> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Générer le token
    const token = this.generateToken(user.id);
    localStorage.setItem(this.TOKEN_KEY, token);

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  // Récupérer l'utilisateur actuel
  getCurrentUser(): User | null {
    if (!this.isAuthenticated()) return null;

    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token));
      const users = this.getUsers();
      const user = users.find(u => u.id === payload.userId);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    } catch {
      return null;
    }

    return null;
  }

  // Hash du mot de passe (simulation simple)
  private async hashPassword(password: string): Promise<string> {
    // Dans un vrai projet, utilisez bcrypt ou une autre méthode sécurisée
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'securebank_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Vérification du mot de passe
  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const hashedInput = await this.hashPassword(password);
    return hashedInput === hashedPassword;
  }
}

export const authService = new AuthService();

