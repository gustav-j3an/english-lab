import React from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Flame,
  Award,
  TrendingUp,
  PlayCircle,
  BookOpen,
  ArrowRight,
  Headphones,
  Mic,
  MessageSquare,
  Sparkles,
  Zap,
  Lightbulb,
  Check,
  Lock,
} from 'lucide-react';
import { User } from '../../types';
import { AudioButton } from '../../components/ui/AudioButton';

interface DashboardViewProps {
  user: User;
  onStartLesson: () => void;
  onOpenConversation: (scenarioId?: string) => void;
  onOpenVocabularyReview: () => void;
  onOpenGrammarGuide: () => void;
  onNavigateToLearn: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onStartLesson,
  onOpenConversation,
  onOpenVocabularyReview,
  onOpenGrammarGuide,
  onNavigateToLearn,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
      {/* 1. Header / Welcome Banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAE8E4] text-[#45464D] text-[10px] font-bold uppercase tracking-wider">
              Painel de Estudos
            </span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#006D30]" />
            <span className="text-xs text-[#76777D]">Sincronizado localmente</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
            Bem-vinda de volta, {user.name.split(' ')[0]}! ☕
          </h1>
          <p className="text-sm sm:text-base text-[#45464D] max-w-xl">
            Você está no caminho certo para a fluência. Meta diária:{' '}
            <strong className="text-[#1B1C1A] font-semibold">75% concluída</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToLearn}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1B1C1A] shadow-xs hover:bg-[#F5F3EF] border border-[#EAE8E4] transition-all text-xs sm:text-sm font-semibold"
          >
            <Calendar size={17} className="text-[#76777D] group-hover:text-[#1B1C1A]" />
            <span>Ver roteiro do curso</span>
          </button>
        </div>
      </section>

      {/* 2. Key Daily Habit & Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Minutos Hoje */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#45464D] font-medium">Minutos Hoje</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
              <Clock size={17} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{user.todayMinutes}</span>
              <span className="text-sm text-[#76777D]">/ {user.dailyGoalMinutes} min</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#EAE8E4] overflow-hidden">
              <div
                className="h-full bg-[#006D30] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (user.todayMinutes / user.dailyGoalMinutes) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#006D30] text-xs font-semibold">
            <TrendingUp size={14} />
            <span>+4 min que ontem</span>
          </div>
        </div>

        {/* Card 2: Meta Diária */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#45464D] font-medium">Meta Diária</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{user.todayCompletedTasks}</span>
              <span className="text-sm text-[#76777D]">de {user.dailyGoalLessons} concluídas</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <div className="h-1.5 rounded-full bg-[#006D30]" />
              <div className="h-1.5 rounded-full bg-[#006D30]" />
              <div className="h-1.5 rounded-full bg-[#006D30]" />
              <div className="h-1.5 rounded-full bg-[#EAE8E4]" />
            </div>
          </div>
          <span className="text-[11px] text-[#45464D] font-medium">
            Falta apenas 1 sessão de speaking
          </span>
        </div>

        {/* Card 3: Sequência de Dias */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#45464D] font-medium">Sequência Atual</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#D97706]">
              <Flame size={17} className="fill-[#D97706]" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{user.streakDays}</span>
              <span className="text-sm text-[#76777D]">dias seguidos</span>
            </div>
            <p className="text-[11px] text-[#45464D]">Ritmo de retenção alto</p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#F5F3EF] w-fit text-[11px] font-semibold text-[#1B1C1A]">
            <Award size={13} className="text-[#D97706]" />
            <span>Melhor marca: 14 dias</span>
          </div>
        </div>

        {/* Card 4: Lições Concluídas */}
        <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#45464D] font-medium">Lições A1</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
              <Award size={17} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{user.completedLessonsCount}</span>
              <span className="text-sm text-[#76777D]">finalizadas</span>
            </div>
            <p className="text-[11px] text-[#45464D]">Módulo fundamental</p>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[11px] font-bold w-fit">
            <Check size={13} />
            <span>{user.overallAccuracy}% de precisão</span>
          </div>
        </div>
      </section>

      {/* 3. Hero Highlight Card: "Ordering at a Coffee Shop & Daily Routines" */}
      <section className="p-6 md:p-8 rounded-3xl bg-white border border-[#EAE8E4] shadow-xs relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#B1F661]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full bg-[#EAE8E4] text-[10px] font-bold uppercase tracking-wide text-[#1B1C1A]">
                Nível A1 • Módulo 02 • Unidade 04
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#006D30] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006D30] animate-pulse" />
                Próximo objetivo sugerido
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1B1C1A] tracking-tight">
                Ordering at a Coffee Shop & Daily Routines
              </h2>
              <p className="text-sm sm:text-base text-[#45464D] leading-relaxed">
                Fazendo pedidos em cafeterias e descrevendo sua rotina matinal em inglês de forma natural.
              </p>
            </div>

            {/* Metadata specs */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#45464D] font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={16} className="text-[#1B1C1A]" />
                12 minutos estimados
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={16} className="text-[#1B1C1A]" />
                15 novos vocábulos
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Headphones size={16} className="text-[#1B1C1A]" />
                1 simulação de áudio imersiva
              </span>
            </div>

            {/* Unit Progress bar */}
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1B1C1A]">Progresso da Unidade 04</span>
                <span className="font-bold text-[#1B1C1A]">60%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EAE8E4] overflow-hidden">
                <div
                  className="h-full bg-[#006D30] rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <button
              type="button"
              onClick={onStartLesson}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B1F661] text-[#0F2000] hover:bg-[#96D947] transition-all shadow-xs active:scale-[0.99] text-sm font-bold"
            >
              <PlayCircle size={20} className="fill-[#0F2000] text-[#B1F661]" />
              <span>Continuar aprendendo</span>
            </button>
            <button
              type="button"
              onClick={onOpenGrammarGuide}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] transition-all text-xs sm:text-sm font-semibold border border-[#E4E2DE]"
            >
              <BookOpen size={17} />
              <span>Revisar teoria gramatical</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Main 12-Column Grid (8 Left / 4 Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (8 Columns) */}
        <section className="lg:col-span-8 flex flex-col gap-8">
          {/* CEFR Learning Track Card */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-[#1B1C1A]">Sua Trilha de Evolução</h2>
                <p className="text-xs text-[#76777D]">
                  Quadro Europeu Comum de Referência para Línguas (CEFR)
                </p>
              </div>
              <span className="text-xs font-bold text-[#006D30]">Nível A1 em progresso</span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Level A1 - In Progress */}
              <div className="p-6 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#92F5A4]/40 text-[#006D30] flex items-center justify-center text-xl font-bold">
                      A1
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#1B1C1A]">Iniciante Fundamental</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold uppercase">
                          Em andamento (72%)
                        </span>
                      </div>
                      <span className="text-xs text-[#45464D]">
                        Fundamentos cotidianos, rotinas, saudações e frases essenciais.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onNavigateToLearn}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-bold transition-all shrink-0 border border-[#E4E2DE]"
                  >
                    <span>Acessar Módulo</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* Submodules breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#F5F3EF] flex flex-col gap-1 border border-[#EAE8E4]/60">
                    <span className="text-[11px] text-[#76777D]">Módulo 01: Saudações</span>
                    <div className="flex items-center justify-between text-xs font-bold text-[#006D30]">
                      <span>100% Concluído</span>
                      <CheckCircle2 size={15} />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F5F3EF] flex flex-col gap-1 border border-[#EAE8E4]/60">
                    <span className="text-[11px] text-[#76777D]">Módulo 02: Rotinas Diárias</span>
                    <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                      <span>Unidade 4 / 6</span>
                      <span className="text-[#006D30]">60%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F5F3EF] flex flex-col gap-1 border border-[#EAE8E4]/60">
                    <span className="text-[11px] text-[#76777D]">Módulo 03: Viagens e Cidade</span>
                    <div className="flex items-center justify-between text-xs font-bold text-[#76777D]">
                      <span>Não iniciado</span>
                      <Lock size={15} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Level A2 - Unlocked */}
              <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#EAE8E4] text-[#1B1C1A] text-xl font-bold flex items-center justify-center">
                    A2
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1B1C1A]">Elementar / Pré-Intermediário</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E4E2DE] text-[#45464D] text-[10px] font-semibold uppercase">
                        Destravado (15%)
                      </span>
                    </div>
                    <span className="text-xs text-[#45464D]">
                      Comunicação direta sobre tarefas rotineiras e passados simples.
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <span className="text-[11px] text-[#76777D] font-semibold">Liberado em 2 lições</span>
                  <div className="w-24 h-1.5 rounded-full bg-[#EAE8E4] overflow-hidden">
                    <div className="h-full bg-[#45464D] rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>

              {/* Level B1 - Locked */}
              <div className="p-5 rounded-2xl bg-[#F5F3EF] border border-[#EAE8E4] opacity-80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#E4E2DE] text-[#76777D] text-xl font-bold flex items-center justify-center">
                    B1
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1B1C1A]">Intermediário Independente</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E4E2DE] text-[#76777D] text-[10px] font-medium">
                        <Lock size={11} /> Bloqueado
                      </span>
                    </div>
                    <span className="text-xs text-[#76777D]">
                      Discussões fluidas, viagens internacionais e opiniões estruturadas.
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#76777D] font-semibold hidden sm:inline">
                  Requer conclusão do A2
                </span>
              </div>

              {/* Levels B2 & C1 Mini Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] opacity-60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E4E2DE] text-[#76777D] text-sm font-bold flex items-center justify-center">
                      B2
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1B1C1A]">Intermediário Superior</span>
                      <span className="text-[10px] text-[#76777D]">Fluência espontânea</span>
                    </div>
                  </div>
                  <Lock size={16} className="text-[#76777D]" />
                </div>
                <div className="p-4 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] opacity-60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E4E2DE] text-[#76777D] text-sm font-bold flex items-center justify-center">
                      C1
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1B1C1A]">Domínio Operativo Eficaz</span>
                      <span className="text-[10px] text-[#76777D]">Fluência executiva</span>
                    </div>
                  </div>
                  <Lock size={16} className="text-[#76777D]" />
                </div>
              </div>
            </div>
          </div>

          {/* Atividades Recentes e Próximos Passos */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1B1C1A]">
                Atividades Recentes & Próximos Passos
              </h3>
              <span className="text-[11px] text-[#76777D] uppercase font-bold tracking-wider">
                Histórico de Sessões
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Activity 1 */}
              <div className="p-4 rounded-xl bg-white border border-[#EAE8E4] shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#006D30]">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1B1C1A]">
                      Grammar Lab: Present Simple vs. Continuous
                    </span>
                    <span className="text-xs text-[#76777D]">Concluído ontem • Duração: 14 min</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-xs font-bold shrink-0">
                  100% de acerto
                </span>
              </div>

              {/* Activity 2 */}
              <div className="p-4 rounded-xl bg-white border border-[#EAE8E4] shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#006D30]">
                    <Headphones size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1B1C1A]">
                      Listening Sprint: Airport Announcements
                    </span>
                    <span className="text-xs text-[#76777D]">Concluído há 2 dias • Áudio nativo UK</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#EAE8E4] text-[#1B1C1A] text-xs font-bold shrink-0">
                  90% de acerto
                </span>
              </div>

              {/* Activity 3 */}
              <div className="p-4 rounded-xl bg-white border border-[#EAE8E4] shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAE8E4] flex items-center justify-center text-[#1B1C1A]">
                    <Mic size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1B1C1A]">
                      Speaking Practice: Describing your hometown
                    </span>
                    <span className="text-xs text-[#76777D]">
                      Pendente para hoje • Treino de pronúncia e ritmo
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenConversation('scenario-intro')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-bold transition-all shrink-0 border border-[#E4E2DE]"
                >
                  Iniciar agora
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN (4 Columns) */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          {/* AI Conversation Tutor Card */}
          <div className="p-6 rounded-3xl bg-[#131B2E] text-white shadow-md flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#B1F661]/10 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#B1F661]">
                <MessageSquare size={22} />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-[#B1F661] uppercase tracking-wider">
                IA Interativa
              </span>
            </div>

            <div className="flex flex-col gap-1.5 relative z-10">
              <h3 className="text-xl font-bold tracking-tight text-white">Tutor de Conversação IA</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Treine pronúncia e diálogo realista em tempo real sem medo de errar. Feedback instantâneo de pronúncia e gramática.
              </p>
            </div>

            {/* Suggested scenario today */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1.5 relative z-10">
              <span className="text-[10px] text-white/60 uppercase font-bold tracking-wider">
                Cenário sugerido de hoje
              </span>
              <div className="flex items-center gap-2 text-white text-xs font-semibold">
                <span className="text-base">☕</span>
                <span>At the Café: Faça seu pedido em inglês</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10 pt-1">
              <button
                type="button"
                onClick={() => onOpenConversation('scenario-coffee')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#B1F661] text-[#0F2000] text-sm font-bold hover:bg-[#96D947] transition-all shadow-xs"
              >
                <Mic size={18} />
                <span>Praticar conversação</span>
              </button>
              <span className="text-[10px] text-center text-white/50">
                Ambiente guiado de prática livre • Sem pressão
              </span>
            </div>
          </div>

          {/* Spaced Repetition Vocabulary Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-[#1B1C1A]" />
                <h3 className="text-base font-bold text-[#1B1C1A]">Vocabulário de Hoje</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#F5F3EF] text-xs font-bold text-[#1B1C1A]">
                5 cards
              </span>
            </div>

            <p className="text-xs text-[#76777D]">
              Repetição espaçada para fixar termos no seu vocabulário de longo prazo:
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Word 1 */}
              <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4]/60 flex flex-col gap-1 hover:bg-[#EAE8E4] transition-colors">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#1B1C1A]">Reliable</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#76777D]">/ˈrɪ.laɪ.ə.bəl/</span>
                    <AudioButton text="Reliable" size="sm" />
                  </div>
                </div>
                <span className="text-xs text-[#006D30] font-medium">Confiável / Seguro</span>
              </div>

              {/* Word 2 */}
              <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4]/60 flex flex-col gap-1 hover:bg-[#EAE8E4] transition-colors">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#1B1C1A]">Schedule</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#76777D]">/ˈskedʒ.uːl/</span>
                    <AudioButton text="Schedule" size="sm" />
                  </div>
                </div>
                <span className="text-xs text-[#006D30] font-medium">Cronograma / Agendamento</span>
              </div>

              {/* Word 3 */}
              <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4]/60 flex flex-col gap-1 hover:bg-[#EAE8E4] transition-colors">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#1B1C1A]">To catch up</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#76777D]">/tə kætʃ ʌp/</span>
                    <AudioButton text="To catch up" size="sm" />
                  </div>
                </div>
                <span className="text-xs text-[#006D30] font-medium">Colocar a conversa em dia</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-[#76777D]">
                <span className="inline-flex items-center gap-1">
                  <Zap size={14} className="text-[#006D30]" />
                  12 palavras retidas esta semana
                </span>
                <span className="font-bold text-[#006D30]">92% retenção</span>
              </div>

              <button
                type="button"
                onClick={onOpenVocabularyReview}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-bold transition-all border border-[#E4E2DE]"
              >
                <Zap size={15} />
                <span>Iniciar revisão rápida (3 min)</span>
              </button>
            </div>
          </div>

          {/* Quick Pronunciation Tip Card */}
          <div className="p-5 rounded-2xl bg-[#EAE8E4]/60 border border-[#E4E2DE] flex items-start gap-3.5">
            <Lightbulb size={20} className="text-[#1B1C1A] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#1B1C1A]">Dica de Pronúncia Rápida</span>
              <p className="text-xs text-[#45464D] leading-relaxed">
                Em inglês falado americano, <strong className="text-[#1B1C1A]">"Can I get..."</strong> soa quase como um pedido contínuo. Use para soar mais natural ao pedir seu café!
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
