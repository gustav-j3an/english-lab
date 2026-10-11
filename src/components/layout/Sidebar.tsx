import React from 'react';
import {
  Home,
  BookOpen,
  MessageSquare,
  Sparkles,
  BarChart3,
  Settings,
  HelpCircle,
  GraduationCap,
  X,
} from 'lucide-react';

export type NavTab =
  | 'inicio'
  | 'aprender'
  | 'conversacao'
  | 'vocabulario'
  | 'progresso'
  | 'configuracoes'
  | 'ajuda';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const mainNavItems = [
    { id: 'inicio' as NavTab, label: 'Início', icon: Home },
    { id: 'aprender' as NavTab, label: 'Aprender', icon: BookOpen },
    { id: 'conversacao' as NavTab, label: 'Conversação', icon: MessageSquare },
    { id: 'vocabulario' as NavTab, label: 'Vocabulário', icon: Sparkles },
    { id: 'progresso' as NavTab, label: 'Progresso', icon: BarChart3 },
  ];

  const bottomNavItems = [
    { id: 'configuracoes' as NavTab, label: 'Configurações', icon: Settings },
    { id: 'ajuda' as NavTab, label: 'Ajuda', icon: HelpCircle },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full py-6 px-4">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Brand Lockup */}
        <div className="flex items-center justify-between px-3">
          <button
            type="button"
            onClick={() => {
              onSelectTab('inicio');
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#006D30] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#1B1C1A]">English Lab</span>
              <span className="text-[10px] text-[#45464D] uppercase tracking-wider font-semibold">Learning Platform</span>
            </div>
          </button>
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#45464D] hover:bg-[#EAE8E4]"
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Current Level Pill Box */}
        <div className="px-3 py-2.5 rounded-xl bg-[#EAE8E4]/60 border border-[#E4E2DE] flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wider text-[#45464D] font-bold">Nível Atual</span>
            <span className="text-xs font-semibold text-[#1B1C1A]">A1 Iniciante</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#E4E2DE] text-[10px] font-bold text-[#45464D]">
            CEFR A1
          </span>
        </div>

        {/* Primary Navigation Links */}
        <nav className="flex flex-col gap-1.5" aria-label="Navegação Principal">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#131B2E] text-white shadow-sm font-bold'
                    : 'text-[#45464D] hover:bg-[#EAE8E4] hover:text-[#1B1C1A]'
                }`}
              >
                <Icon size={19} className={isActive ? 'text-[#B1F661]' : 'text-[#76777D]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation Links */}
      <div className="flex flex-col gap-1 pt-4 border-t border-[#EAE8E4]">
        <nav className="flex flex-col gap-1" aria-label="Configurações e Ajuda">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#EAE8E4] text-[#1B1C1A] font-bold'
                    : 'text-[#45464D] hover:bg-[#EAE8E4] hover:text-[#1B1C1A]'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-[#1B1C1A]' : 'text-[#76777D]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-[#F5F3EF]/95 backdrop-blur-xl border-r border-[#EAE8E4] z-40 flex-col shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85vw] h-full bg-[#FBF9F5] shadow-2xl z-50 flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
