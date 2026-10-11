import React, { useState } from 'react';
import {
  Search,
  Flame,
  Bell,
  Menu,
  CheckCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenSearch,
  onOpenMobileMenu,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Meta do dia quase lá!',
      desc: 'Falta apenas 1 sessão de conversação para completar sua meta diária de 25 min.',
      time: 'Há 15 min',
      unread: true,
    },
    {
      id: 2,
      title: '7 dias de sequência! 🔥',
      desc: 'Parabéns pela dedicação constante. Seu ritmo de retenção de memória está em 92%.',
      time: 'Hoje, 09:30',
      unread: true,
    },
    {
      id: 3,
      title: 'Novo vocabulário revisado',
      desc: '3 novos termos do Módulo 02 foram validados com sucesso.',
      time: 'Ontem',
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#FBF9F5]/90 backdrop-blur-xl border-b border-[#EAE8E4] z-30 px-4 sm:px-8 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      {/* Left: Mobile hamburger & Global Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#45464D] hover:bg-[#EAE8E4] transition-colors"
          aria-label="Abrir menu lateral"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#45464D] hover:text-[#1B1C1A] text-xs sm:text-sm transition-all w-48 sm:w-80 md:w-96 text-left group border border-transparent hover:border-[#E4E2DE]"
          title="Buscar lições, regras e vocabulário (⌘K)"
        >
          <Search size={16} className="text-[#76777D] group-hover:text-[#1B1C1A]" />
          <span className="truncate flex-1">Buscar lições ou vocabulário...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#76777D] bg-white rounded border border-[#E4E2DE] shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Streak, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EF] border border-[#EAE8E4]">
          <Flame size={16} className="text-[#D97706] fill-[#D97706]" />
          <span className="text-xs font-bold text-[#1B1C1A] whitespace-nowrap">
            {user.streakDays} dias seguidos
          </span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
            className="relative p-2 rounded-full hover:bg-[#EAE8E4] text-[#45464D] transition-colors"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#BA1A1A] ring-2 ring-[#FBF9F5]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#EAE8E4] shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E4]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1B1C1A]">Notificações</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">
                      {unreadCount} novas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs font-semibold text-[#006D30] hover:underline"
                  >
                    Marcar lidas
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#F5F3EF] max-h-80 overflow-y-auto pt-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`py-3 flex flex-col gap-1 transition-colors ${
                      item.unread ? 'bg-[#FBF9F5]/80 -mx-2 px-2 rounded-xl' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1B1C1A]">{item.title}</span>
                      <span className="text-[10px] text-[#76777D]">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#45464D] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EAE8E4] text-center">
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-[#76777D] hover:text-[#1B1C1A]"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Lockup */}
        <div className="flex items-center gap-3 pl-1 sm:pl-2">
          <div className="relative flex items-center justify-center">
            <img
              src={user.avatarUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#E4E2DE]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006D30] ring-2 ring-[#FBF9F5]" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#1B1C1A] leading-tight">
              {user.name}
            </span>
            <span className="text-[10px] text-[#006D30] font-medium leading-tight">
              Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
