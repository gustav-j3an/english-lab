import {
  User,
  UserPreferences,
  VocabularyItem,
  CourseModule,
} from '../types';
import {
  initialUser,
  defaultPreferences,
  initialVocabulary,
  a1Modules,
} from '../data/initialData';

const STORAGE_KEYS = {
  USER: 'english_lab_user_v1',
  PREFERENCES: 'english_lab_prefs_v1',
  VOCABULARY: 'english_lab_vocab_v1',
  MODULES: 'english_lab_modules_v1',
};

export const storageService = {
  getUser(): User {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Erro ao ler usuário do localStorage', e);
    }
    return initialUser;
  },

  saveUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('Erro ao salvar usuário', e);
    }
  },

  getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Erro ao ler preferências', e);
    }
    return defaultPreferences;
  },

  savePreferences(prefs: UserPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.warn('Erro ao salvar preferências', e);
    }
  },

  getVocabulary(): VocabularyItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Erro ao ler vocabulário', e);
    }
    return initialVocabulary;
  },

  saveVocabulary(vocab: VocabularyItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocab));
    } catch (e) {
      console.warn('Erro ao salvar vocabulário', e);
    }
  },

  getModules(): CourseModule[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MODULES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Erro ao ler módulos', e);
    }
    return a1Modules;
  },

  saveModules(modules: CourseModule[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(modules));
    } catch (e) {
      console.warn('Erro ao salvar módulos', e);
    }
  },

  resetAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
      localStorage.removeItem(STORAGE_KEYS.VOCABULARY);
      localStorage.removeItem(STORAGE_KEYS.MODULES);
    } catch (e) {
      console.warn('Erro ao resetar dados', e);
    }
  },

  exportBackupJson(): string {
    const backup = {
      user: this.getUser(),
      preferences: this.getPreferences(),
      vocabulary: this.getVocabulary(),
      modules: this.getModules(),
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    return JSON.stringify(backup, null, 2);
  },
};
