export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type SkillCategory = 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  currentLevel: CEFRLevel;
  streakDays: number;
  totalStudyMinutes: number;
  completedLessonsCount: number;
  overallAccuracy: number;
  xpPoints: number;
  dailyGoalMinutes: number;
  dailyGoalLessons: number;
  todayMinutes: number;
  todayCompletedTasks: number;
}

export interface LessonExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface LessonExercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'reorder-words';
  scenario: string;
  prompt: string;
  audioText?: string;
  options?: LessonExerciseOption[];
  blankSentence?: {
    before: string;
    blankWord: string;
    after: string;
  };
  wordBank?: string[];
  explanation: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  partOfSpeech: string;
  contextUsage: string;
  exampleSentenceEn: string;
  exampleSentencePt: string;
  category: string;
  level: CEFRLevel;
  isFavorite: boolean;
  masteryLevel: 'new' | 'learning' | 'mastered';
  retentionPercent: number;
  reviewCount: number;
  nextReviewDate?: string;
}

export interface LessonUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'available' | 'locked';
  progressPercent: number;
  estimatedMinutes: number;
  vocabularyCount: number;
  isCurrent?: boolean;
  accuracyPercent?: number;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progressPercent: number;
  units: LessonUnit[];
}

export interface CEFRTrack {
  level: CEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  status: 'completed' | 'in-progress' | 'unlocked' | 'locked';
  progressPercent: number;
  modulesCount: number;
  totalLessons: number;
  completedLessons: number;
  unlockRequirement?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'tutor' | 'user';
  text: string;
  timestamp: string;
  audioAvailable?: boolean;
  correctionTip?: {
    original: string;
    suggested: string;
    explanation: string;
    ruleTitle: string;
  };
}

export interface ConversationScenario {
  id: string;
  title: string;
  level: CEFRLevel;
  durationMinutes: number;
  description: string;
  iconName: string;
  initialPrompt: string;
  learningGoal: string;
  suggestedReplies: string[];
  usefulExpressions: {
    phrase: string;
    translation: string;
    isHighFreq?: boolean;
  }[];
  sessionVocab: {
    word: string;
    phonetic: string;
    meaning: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progressText?: string;
  level: CEFRLevel;
}

export interface StudyActivity {
  id: string;
  title: string;
  dateDescription: string;
  scoreDescription: string;
  type: 'grammar' | 'listening' | 'speaking' | 'conversation';
  completed: boolean;
}

export interface UserPreferences {
  speechRate: number; // 0.8, 1.0, 1.2
  accent: 'US' | 'UK';
  showTranslationsByDefault: boolean;
  dailyGoalMinutes: number;
  dailyGoalLessons: number;
  soundEffects: boolean;
  darkMode: boolean;
}
