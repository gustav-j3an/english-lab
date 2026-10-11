import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  TrendingUp,
  Flame,
  Award,
  Download,
  Calendar,
  Lock,
  Headphones,
  BookOpen,
  Sparkles,
  Edit3,
  Mic,
  Trophy,
  ArrowRight,
  MessageSquare,
  FileText,
  Info,
} from 'lucide-react';
import { User, Achievement } from '../../types';
import { achievementsList } from '../../data/initialData';

interface ProgressViewProps {
  user: User;
  onNavigateToConversation: () => void;
  onNavigateToLearn: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  onNavigateToConversation,
  onNavigateToLearn,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const handleDownloadReport = () => {
    window.print();
  };

  // Metrics adjusted by period
  const periodMetrics = {
    '7d': {
      studyTime: user.totalStudyMinutes,
      lessons: 14,
      accuracy: user.overallAccuracy,
      trendTime: '+18%',
      trendAccuracy: '+2.5%',
    },
    '30d': {
      studyTime: user.totalStudyMinutes * 3.8,
      lessons: 42,
      accuracy: 92,
      trendTime: '+24%',
      trendAccuracy: '+4.0%',
    },
    '90d': {
      studyTime: user.totalStudyMinutes * 10.5,
      lessons: 110,
      accuracy: 91,
      trendTime: '+30%',
      trendAccuracy: '+5.5%',
    },
  }[selectedPeriod];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8 print:p-0">
      {/* 1. Header & Period Selector */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold uppercase tracking-wider">
              Métricas & Evolução Pedagógica • Demonstração
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#76777D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006D30]" />
              Sincronizado localmente
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
            Seu progresso no inglês
          </h1>
          <p className="text-sm sm:text-base text-[#45464D]">
            Acompanhe sua evolução, celebre suas conquistas e descubra o próximo passo ideal na sua trilha fluente.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <div className="inline-flex p-1 rounded-xl bg-[#EAE8E4]" role="tablist">
            <button
              type="button"
              onClick={() => setSelectedPeriod('7d')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPeriod === '7d'
                  ? 'bg-white text-[#1B1C1A] shadow-xs font-bold'
                  : 'text-[#45464D] hover:text-[#1B1C1A]'
              }`}
            >
              Últimos 7 dias
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod('30d')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPeriod === '30d'
                  ? 'bg-white text-[#1B1C1A] shadow-xs font-bold'
                  : 'text-[#45464D] hover:text-[#1B1C1A]'
              }`}
            >
              Últimos 30 dias
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod('90d')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPeriod === '90d'
                  ? 'bg-white text-[#1B1C1A] shadow-xs font-bold'
                  : 'text-[#45464D] hover:text-[#1B1C1A]'
              }`}
            >
              Últimos 90 dias
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#1B1C1A] text-xs font-bold hover:bg-[#F5F3EF] shadow-xs border border-[#EAE8E4] transition-all"
          >
            <Download size={15} />
            <span>Baixar relatório (PDF)</span>
          </button>
        </div>
      </header>

      {/* 2. Key Metrics 4-Column Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tempo de Estudo */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
              <Clock size={20} />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#006D30] font-bold bg-[#92F5A4]/40 px-2 py-0.5 rounded-full">
              <TrendingUp size={13} /> {periodMetrics.trendTime}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#76777D] font-bold">
              Tempo de Estudo
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{periodMetrics.studyTime}</span>
              <span className="text-sm text-[#76777D]">min</span>
            </div>
            <p className="text-xs text-[#45464D] mt-1.5 flex items-center gap-1">
              <CheckCircle2 size={14} className="text-[#006D30]" />
              Meta semanal de 210 min superada
            </p>
          </div>
        </div>

        {/* Lições Concluídas */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
              <CheckCircle2 size={20} />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#45464D] bg-[#EAE8E4] px-2 py-0.5 rounded-full font-bold">
              +{selectedPeriod === '7d' ? '4' : '12'} esta semana
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#76777D] font-bold">
              Lições Concluídas
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{periodMetrics.lessons}</span>
              <span className="text-sm text-[#76777D]">lições</span>
            </div>
            <p className="text-xs text-[#45464D] mt-1.5 flex items-center gap-1">
              Ritmo médio: 2 por dia útil
            </p>
          </div>
        </div>

        {/* Precisão Geral */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
              <Award size={20} />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#006D30] font-bold bg-[#92F5A4]/40 px-2 py-0.5 rounded-full">
              <TrendingUp size={13} /> {periodMetrics.trendAccuracy}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#76777D] font-bold">
              Precisão Geral
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{periodMetrics.accuracy}%</span>
              <span className="text-sm text-[#76777D]">acertos</span>
            </div>
            <p className="text-xs text-[#45464D] mt-1.5 flex items-center gap-1">
              Alta retenção em gramática A1
            </p>
          </div>
        </div>

        {/* Sequência de Estudos */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#D97706]">
              <Flame size={20} className="fill-[#D97706]" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#45464D] bg-[#EAE8E4] px-2 py-0.5 rounded-full font-bold">
              Recorde: 14 dias
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#76777D] font-bold">
              Sequência de Estudos
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-bold text-[#1B1C1A]">{user.streakDays}</span>
              <span className="text-sm text-[#76777D]">dias seguidos</span>
            </div>
            <p className="text-xs text-[#45464D] mt-1.5 flex items-center gap-1">
              Congelamento de streak intacto
            </p>
          </div>
        </div>
      </section>

      {/* 3. CEFR Level Journey Tracker Card */}
      <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#EAE8E4] shadow-xs flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#006D30]">
                Trilha de Fluência
              </span>
              <span className="w-1 h-1 rounded-full bg-[#76777D]" />
              <span className="text-xs text-[#76777D]">Quadro Comum Europeu de Referência (CEFR)</span>
            </div>
            <h2 className="text-xl font-bold text-[#1B1C1A]">
              Nível Atual: A1 Iniciante <span className="text-[#76777D] font-normal">(72% concluído)</span>
            </h2>
            <p className="text-xs text-[#45464D]">
              Você completou <strong>24 de 30 lições</strong> previstas neste módulo. Faltam 6 lições e 1 revisão de fala para liberar o simulado oficial A1.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToLearn}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#131B2E] text-white text-xs font-bold hover:opacity-95 shadow-xs transition-all shrink-0"
          >
            <span>Continuar aprendendo no A1</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Stepper Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* Step A1 */}
          <div className="flex flex-col gap-2">
            <div className="h-2.5 rounded-full bg-[#006D30] w-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[#B1F661] w-3/4 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1B1C1A]">A1 Iniciante</span>
              <span className="text-xs font-bold text-[#006D30]">72%</span>
            </div>
            <span className="text-[11px] text-[#76777D] hidden sm:block">Foco: Frases simples e rotina</span>
          </div>

          {/* Step A2 */}
          <div className="flex flex-col gap-2">
            <div className="h-2.5 rounded-full bg-[#EAE8E4] w-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[#006D30]/60 w-[15%] rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1B1C1A]">A2 Básico</span>
              <span className="text-xs text-[#76777D]">15%</span>
            </div>
            <span className="text-[11px] text-[#76777D] hidden sm:block">Destravado preliminarmente</span>
          </div>

          {/* Step B1 */}
          <div className="flex flex-col gap-2 opacity-50">
            <div className="h-2.5 rounded-full bg-[#EAE8E4] w-full" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#1B1C1A]">B1 Intermediário</span>
              <Lock size={12} className="text-[#76777D]" />
            </div>
            <span className="text-[11px] text-[#76777D] hidden sm:block">Conversas independentes</span>
          </div>

          {/* Step B2 */}
          <div className="flex flex-col gap-2 opacity-40">
            <div className="h-2.5 rounded-full bg-[#EAE8E4] w-full" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#1B1C1A]">B2 Independente</span>
              <Lock size={12} className="text-[#76777D]" />
            </div>
            <span className="text-[11px] text-[#76777D] hidden sm:block">Debates e fluência ampla</span>
          </div>

          {/* Step C1 */}
          <div className="flex flex-col gap-2 opacity-30">
            <div className="h-2.5 rounded-full bg-[#EAE8E4] w-full" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#1B1C1A]">C1 Avançado</span>
              <Lock size={12} className="text-[#76777D]" />
            </div>
            <span className="text-[11px] text-[#76777D] hidden sm:block">Domínio pleno de contexto</span>
          </div>
        </div>
      </section>

      {/* 4. Two-Column Analytics Layout (7 Left / 5 Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Activity Chart & Heatmap */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Daily Study Activity Chart Card */}
          <div className="bg-white p-6 md:p-7 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-[#1B1C1A]">Atividade de estudo diária</h3>
                <span className="text-xs text-[#76777D]">Minutos praticados de Segunda a Domingo</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#006D30]" />
                  <span className="text-[#76777D]">Minutos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#76777D]" />
                  <span className="text-[#76777D]">Meta (30m)</span>
                </div>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="relative w-full aspect-[16/9] max-h-64 flex flex-col justify-end">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 600 240"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#84CC16" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#84CC16" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#EAE8E4" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="#EAE8E4" strokeDasharray="4 4" />
                <line x1="0" y1="160" x2="600" y2="160" stroke="#76777D" strokeDasharray="2 2" strokeOpacity="0.6" />
                <line x1="0" y1="210" x2="600" y2="210" stroke="#EAE8E4" />

                <text x="590" y="156" fill="#76777D" fontSize="10" textAnchor="end">
                  Meta 30 min
                </text>

                {/* Area Gradient Fill */}
                <path
                  d="M 20 160 C 60 160, 70 105, 110 105 C 150 105, 160 180, 200 180 C 240 180, 250 120, 290 120 C 330 120, 340 85, 380 85 C 420 85, 430 195, 470 195 C 510 195, 520 140, 560 140 L 560 210 L 20 210 Z"
                  fill="url(#chartGradient)"
                />

                {/* Trend Stroke */}
                <path
                  d="M 20 160 C 60 160, 70 105, 110 105 C 150 105, 160 180, 200 180 C 240 180, 250 120, 290 120 C 330 120, 340 85, 380 85 C 420 85, 430 195, 470 195 C 510 195, 520 140, 560 140"
                  fill="none"
                  stroke="#006D30"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {[
                  { cx: 20, cy: 160, day: 'Seg', min: 30 },
                  { cx: 110, cy: 105, day: 'Ter', min: 45 },
                  { cx: 200, cy: 180, day: 'Qua', min: 25 },
                  { cx: 290, cy: 120, day: 'Qui', min: 40 },
                  { cx: 380, cy: 85, day: 'Sex', min: 50 },
                  { cx: 470, cy: 195, day: 'Sáb', min: 20 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r={4.5}
                    fill="#FFFFFF"
                    stroke="#006D30"
                    strokeWidth="2.5"
                  />
                ))}

                {/* Sunday (Active Highlight) */}
                <circle cx={560} cy={140} r={7} fill="#B1F661" stroke="#006D30" strokeWidth="3" />
              </svg>

              {/* Sunday Hover Floating Tooltip */}
              <div className="absolute right-2 top-8 pointer-events-none bg-[#131B2E] text-white px-3 py-2 rounded-xl shadow-md flex flex-col gap-0.5">
                <span className="text-[10px] text-[#B1F661] font-bold uppercase tracking-wide">
                  Hoje, Domingo
                </span>
                <span className="text-xs font-bold">35 min • Meta superada</span>
              </div>
            </div>

            {/* X-Axis Day Labels */}
            <div className="grid grid-cols-7 text-center text-xs text-[#76777D] font-medium pt-1">
              <div>
                <span>Seg</span>
                <p className="font-bold text-[#1B1C1A]">30m</p>
              </div>
              <div>
                <span>Ter</span>
                <p className="font-bold text-[#1B1C1A]">45m</p>
              </div>
              <div>
                <span>Qua</span>
                <p className="font-bold text-[#1B1C1A]">25m</p>
              </div>
              <div>
                <span>Qui</span>
                <p className="font-bold text-[#1B1C1A]">40m</p>
              </div>
              <div>
                <span>Sex</span>
                <p className="font-bold text-[#1B1C1A]">50m</p>
              </div>
              <div>
                <span>Sáb</span>
                <p className="font-bold text-[#1B1C1A]">20m</p>
              </div>
              <div className="text-[#006D30] font-bold">
                <span>Dom</span>
                <p className="font-bold text-[#006D30]">35m</p>
              </div>
            </div>
          </div>

          {/* Consistency Heatmap Card */}
          <div className="bg-white p-6 md:p-7 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-[#1B1C1A]">Mapa de consistência de estudo</h3>
                <span className="text-xs text-[#76777D]">48 dias ativos nos últimos 3 meses</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EAE8E4] text-xs font-semibold text-[#45464D]">
                Frequência: 78%
              </span>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[500px] flex flex-col gap-1.5">
                <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-full">
                  {Array.from({ length: 84 }).map((_, i) => {
                    const isPerfectStreakWeek = i >= 77;
                    const intensity = isPerfectStreakWeek
                      ? 'bg-[#006D30]'
                      : i % 7 === 0
                      ? 'bg-[#EAE8E4]'
                      : i % 3 === 0
                      ? 'bg-[#006D30]'
                      : i % 2 === 0
                      ? 'bg-[#006D30]/60'
                      : 'bg-[#006D30]/30';

                    return (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-xs ${intensity} hover:scale-125 transition-transform`}
                        title={`Dia ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-1 text-xs text-[#76777D]">
              <span>Segunda a Domingo</span>
              <div className="flex items-center gap-1.5">
                <span>Menos</span>
                <div className="w-3 h-3 rounded-xs bg-[#EAE8E4]" />
                <div className="w-3 h-3 rounded-xs bg-[#006D30]/30" />
                <div className="w-3 h-3 rounded-xs bg-[#006D30]/60" />
                <div className="w-3 h-3 rounded-xs bg-[#006D30]" />
                <span>Mais</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Precision */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Desempenho por Habilidade */}
          <div className="bg-white p-6 md:p-7 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1B1C1A]">Desempenho por habilidade</h3>
              <Award size={20} className="text-[#76777D]" />
            </div>

            <div className="flex flex-col gap-4">
              {/* Listening: 92% */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#006D30]">🎧</span>
                    <span>Listening (Audição)</span>
                  </div>
                  <span>92%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EAE8E4] overflow-hidden">
                  <div className="h-full rounded-full bg-[#006D30]" style={{ width: '92%' }} />
                </div>
                <span className="text-[11px] text-[#76777D]">
                  Alta acurácia em áudio nativo com pronúncia pausada
                </span>
              </div>

              {/* Reading: 88% */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} className="text-[#006D30]" />
                    <span>Reading (Leitura)</span>
                  </div>
                  <span>88%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EAE8E4] overflow-hidden">
                  <div className="h-full rounded-full bg-[#006D30]" style={{ width: '88%' }} />
                </div>
                <span className="text-[11px] text-[#76777D]">
                  Ótima compreensão de diálogos cotidianos e cartazes
                </span>
              </div>

              {/* Vocabulary: 86% */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-[#006D30]" />
                    <span>Vocabulary (Retenção)</span>
                  </div>
                  <span>86%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EAE8E4] overflow-hidden">
                  <div className="h-full rounded-full bg-[#006D30]" style={{ width: '86%' }} />
                </div>
                <span className="text-[11px] text-[#76777D]">
                  Repetição espaçada com 148 itens memorizados
                </span>
              </div>

              {/* Writing: 78% */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <div className="flex items-center gap-2">
                    <Edit3 size={15} className="text-[#006D30]" />
                    <span>Writing (Escrita)</span>
                  </div>
                  <span>78%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EAE8E4] overflow-hidden">
                  <div className="h-full rounded-full bg-[#006D30]/80" style={{ width: '78%' }} />
                </div>
                <span className="text-[11px] text-[#76777D]">
                  Estruturas básicas consolidadas; pequenos ajustes de plural
                </span>
              </div>

              {/* Speaking: 70% */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <div className="flex items-center gap-2">
                    <Mic size={15} className="text-[#006D30]" />
                    <span>Speaking (Tutor IA)</span>
                  </div>
                  <span>70%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EAE8E4] overflow-hidden">
                  <div className="h-full rounded-full bg-[#006D30]/70" style={{ width: '70%' }} />
                </div>
                <span className="text-[11px] text-[#76777D]">
                  Fluência em rápida expansão; prática de entonação recomendada
                </span>
              </div>
            </div>
          </div>

          {/* Precisão por Formato */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#1B1C1A]">Precisão por formato</h3>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3.5 rounded-xl bg-[#F5F3EF] flex flex-col items-center text-center gap-1 border border-[#EAE8E4]">
                <span className="text-xl font-bold text-[#006D30]">96%</span>
                <span className="text-[10px] font-bold uppercase text-[#76777D]">Múltipla Escolha</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F3EF] flex flex-col items-center text-center gap-1 border border-[#EAE8E4]">
                <span className="text-xl font-bold text-[#006D30]">91%</span>
                <span className="text-[10px] font-bold uppercase text-[#76777D]">Completar Lacunas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F3EF] flex flex-col items-center text-center gap-1 border border-[#EAE8E4]">
                <span className="text-xl font-bold text-[#1B1C1A]">84%</span>
                <span className="text-[10px] font-bold uppercase text-[#76777D]">Pronúncia por Voz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Two-Column: Badges & Next Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Conquistas & Badges */}
        <section className="lg:col-span-6 bg-white p-6 md:p-7 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#1B1C1A]">Conquistas & Badges</h3>
              <span className="text-xs text-[#76777D]">3 de 5 insígnias desbloqueadas no nível A1</span>
            </div>
            <Trophy size={22} className="text-[#D97706]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {achievementsList.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl flex items-center gap-3 border ${
                  ach.isUnlocked
                    ? 'bg-[#F5F3EF] border-[#EAE8E4]'
                    : 'bg-[#F5F3EF]/60 border-[#EAE8E4]/60 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    ach.isUnlocked ? 'bg-[#92F5A4]/40 text-[#006D30]' : 'bg-[#EAE8E4] text-[#76777D]'
                  }`}
                >
                  <Award size={20} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#1B1C1A] truncate">{ach.title}</span>
                  <span className="text-[11px] text-[#006D30] font-medium">
                    {ach.isUnlocked ? ach.progressText || 'Desbloqueado' : 'Bloqueado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Próximo Passo Recomendado & Histórico */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Card: Próximo Passo */}
          <div className="bg-[#131B2E] text-white p-6 md:p-7 rounded-2xl shadow-xs flex flex-col justify-between gap-5 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#006D30]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#B1F661] text-[#0F2000] text-[10px] font-bold uppercase tracking-wider">
                  Próximo Passo Recomendado
                </span>
                <span className="text-white/60 text-xs">Pedagogia Adaptativa</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Pratique perguntas educadas com "Could" e "Would like"
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Com base no seu último diálogo sobre café e restaurantes, focar nestas estruturas aumentará sua naturalidade de fala em até 25% para situações do cotidiano.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1 relative z-10">
              <button
                type="button"
                onClick={onNavigateToConversation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B1F661] text-[#0F2000] text-xs font-bold hover:bg-[#96D947] transition-all shadow-xs"
              >
                <MessageSquare size={16} />
                <span>Praticar agora (Cenário Café)</span>
              </button>
              <span className="text-xs text-white/60">Duração: ~6 min</span>
            </div>
          </div>

          {/* Histórico Recente de Atividades */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#1B1C1A]">Histórico recente de atividades</h4>
              <span className="text-xs text-[#006D30] font-semibold">Atualizado hoje</span>
            </div>

            <div className="flex flex-col divide-y divide-[#EAE8E4]">
              <div className="py-2.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1B1C1A] block">
                      Conversação IA: "Ordering at a Coffee Shop"
                    </span>
                    <span className="text-[11px] text-[#76777D]">Hoje, 10:15 • 15 min de prática</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold shrink-0">
                  100% positivo
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1B1C1A] block">
                      Lição 2.3: "Coffee Shop Practice"
                    </span>
                    <span className="text-[11px] text-[#76777D]">Ontem, 16:30 • Gramática e frases</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#EAE8E4] text-[#1B1C1A] text-[10px] font-bold shrink-0">
                  Nota 10/10
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1B1C1A] block">
                      Revisão de Flashcards
                    </span>
                    <span className="text-[11px] text-[#76777D]">Ontem, 16:10 • Repetição espaçada</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#EAE8E4] text-[#76777D] text-[10px] font-semibold shrink-0">
                  12 palavras
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <footer className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#76777D] border-t border-[#EAE8E4] print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#006D30]" />
          <span>Ambiente de Aprendizagem Ativa • English Lab v1.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Critérios CEFR</span>
          <span>•</span>
          <span>Privacidade de Voz</span>
          <span>•</span>
          <span>Central de Suporte</span>
        </div>
      </footer>
    </div>
  );
};
