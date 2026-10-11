import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SearchModal } from './components/layout/SearchModal';
import { GrammarDrawer } from './components/lessons/GrammarDrawer';

// Views
import { DashboardView } from './features/dashboard/DashboardView';
import { LearnView } from './features/lessons/LearnView';
import { InteractiveLessonView } from './features/lessons/InteractiveLessonView';
import { ConversationView } from './features/conversation/ConversationView';
import { VocabularyView } from './features/vocabulary/VocabularyView';
import { ProgressView } from './features/progress/ProgressView';
import { SettingsAndHelpView } from './features/settings/SettingsAndHelpView';

// Storage & Types
import { storageService } from './services/storageService';
import { User, UserPreferences, VocabularyItem, CourseModule } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('inicio');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string | undefined>(undefined);

  // Global modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isGrammarDrawerOpen, setIsGrammarDrawerOpen] = useState<boolean>(false);
  const [selectedGrammarRuleId, setSelectedGrammarRuleId] = useState<string | undefined>(undefined);

  // Persistent State
  const [user, setUser] = useState<User>(() => storageService.getUser());
  const [preferences, setPreferences] = useState<UserPreferences>(() => storageService.getPreferences());
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(() => storageService.getVocabulary());
  const [modules, setModules] = useState<CourseModule[]>(() => storageService.getModules());

  // Sync to localStorage
  useEffect(() => {
    storageService.saveUser(user);
  }, [user]);

  useEffect(() => {
    storageService.savePreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    storageService.saveVocabulary(vocabulary);
  }, [vocabulary]);

  useEffect(() => {
    storageService.saveModules(modules);
  }, [modules]);

  // Global keyboard shortcut for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLessonComplete = (earnedXp: number) => {
    setUser((prev) => ({
      ...prev,
      xpPoints: prev.xpPoints + earnedXp,
      completedLessonsCount: prev.completedLessonsCount + 1,
      todayCompletedTasks: Math.min(prev.dailyGoalLessons, prev.todayCompletedTasks + 1),
      todayMinutes: prev.todayMinutes + 12,
      totalStudyMinutes: prev.totalStudyMinutes + 12,
    }));

    // Update Module 2 Unit 3 progress in modules
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === 'mod-2'
          ? {
              ...mod,
              units: mod.units.map((u) =>
                u.id === 'lesson-2-3'
                  ? { ...u, status: 'completed', progressPercent: 100, accuracyPercent: 100 }
                  : u
              ),
            }
          : mod
      )
    );
  };

  const handleResetData = () => {
    storageService.resetAll();
    setUser(storageService.getUser());
    setPreferences(storageService.getPreferences());
    setVocabulary(storageService.getVocabulary());
    setModules(storageService.getModules());
    setActiveLessonId(null);
    setCurrentTab('inicio');
  };

  const handleNavigateFromSearch = (
    tab: NavTab,
    extra?: { lessonId?: string; wordId?: string; grammarId?: string }
  ) => {
    if (extra?.lessonId) {
      setActiveLessonId(extra.lessonId);
      setCurrentTab('aprender');
    } else if (extra?.grammarId) {
      setSelectedGrammarRuleId(extra.grammarId);
      setIsGrammarDrawerOpen(true);
      setCurrentTab('aprender');
    } else {
      setActiveLessonId(null);
      setCurrentTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1B1C1A] flex">
      {/* Persistent Sidebar (Desktop) & Drawer (Mobile) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setActiveLessonId(null);
          setCurrentTab(tab);
        }}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Layout Area (offset 72 on desktop) */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header
          user={user}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Content Container */}
        <main className="flex-1 pt-16 w-full">
          {/* Active Lesson Mode takes precedence if user entered a lesson */}
          {activeLessonId ? (
            <InteractiveLessonView
              onBackToLearn={() => setActiveLessonId(null)}
              onLessonComplete={handleLessonComplete}
            />
          ) : (
            <>
              {currentTab === 'inicio' && (
                <DashboardView
                  user={user}
                  onStartLesson={() => {
                    setActiveLessonId('lesson-2-3');
                  }}
                  onOpenConversation={(scenarioId) => {
                    if (scenarioId) setActiveScenarioId(scenarioId);
                    setCurrentTab('conversacao');
                  }}
                  onOpenVocabularyReview={() => {
                    setCurrentTab('vocabulario');
                  }}
                  onOpenGrammarGuide={() => {
                    setSelectedGrammarRuleId('polite-requests');
                    setIsGrammarDrawerOpen(true);
                  }}
                  onNavigateToLearn={() => {
                    setCurrentTab('aprender');
                  }}
                />
              )}

              {currentTab === 'aprender' && (
                <LearnView
                  modules={modules}
                  onStartLesson={(lessonId) => {
                    setActiveLessonId(lessonId || 'lesson-2-3');
                  }}
                  onOpenGrammarGuide={(ruleId) => {
                    setSelectedGrammarRuleId(ruleId);
                    setIsGrammarDrawerOpen(true);
                  }}
                />
              )}

              {currentTab === 'conversacao' && (
                <ConversationView
                  initialScenarioId={activeScenarioId}
                  onOpenNotes={() => {
                    setSelectedGrammarRuleId('polite-requests');
                    setIsGrammarDrawerOpen(true);
                  }}
                />
              )}

              {currentTab === 'vocabulario' && (
                <VocabularyView
                  vocabulary={vocabulary}
                  onUpdateVocabulary={setVocabulary}
                />
              )}

              {currentTab === 'progresso' && (
                <ProgressView
                  user={user}
                  onNavigateToConversation={() => {
                    setActiveScenarioId('scenario-coffee');
                    setCurrentTab('conversacao');
                  }}
                  onNavigateToLearn={() => {
                    setCurrentTab('aprender');
                  }}
                />
              )}

              {currentTab === 'configuracoes' && (
                <SettingsAndHelpView
                  user={user}
                  preferences={preferences}
                  onUpdatePreferences={setPreferences}
                  onResetData={handleResetData}
                  defaultTab="configuracoes"
                />
              )}

              {currentTab === 'ajuda' && (
                <SettingsAndHelpView
                  user={user}
                  preferences={preferences}
                  onUpdatePreferences={setPreferences}
                  onResetData={handleResetData}
                  defaultTab="ajuda"
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigateFromSearch}
      />

      {/* Global Grammar Notebook Drawer */}
      <GrammarDrawer
        isOpen={isGrammarDrawerOpen}
        onClose={() => setIsGrammarDrawerOpen(false)}
        selectedRuleId={selectedGrammarRuleId}
      />
    </div>
  );
}
