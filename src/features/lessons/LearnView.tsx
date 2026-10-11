import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Clock,
  Radio,
  BookOpen,
  Search,
  Lock,
  Flag,
  Lightbulb,
  ArrowRight,
  Headphones,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { CourseModule, CEFRLevel } from '../../types';

interface LearnViewProps {
  modules: CourseModule[];
  onStartLesson: (lessonId?: string) => void;
  onOpenGrammarGuide: (ruleId?: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  modules,
  onStartLesson,
  onOpenGrammarGuide,
}) => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('A1');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cefrLevels: { id: string; label: string }[] = [
    { id: 'all', label: 'Todos os níveis' },
    { id: 'A1', label: 'A1 Iniciante (Ativo)' },
    { id: 'A2', label: 'A2 Elementar' },
    { id: 'B1', label: 'B1 Intermediário' },
    { id: 'B2', label: 'B2 Independente' },
    { id: 'C1', label: 'C1 Fluência' },
  ];

  const skillCategories = [
    { id: 'all', label: 'Todas as habilidades' },
    { id: 'grammar', label: 'Gramática Prática' },
    { id: 'vocab', label: 'Vocabulário Cotidiano' },
    { id: 'listening', label: 'Escuta & Pronúncia' },
    { id: 'speaking', label: 'Conversação Real' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-10">
      {/* 1. Header & Progress Gauge */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#92F5A4]/40 w-fit text-[#006D30] text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#006D30] animate-pulse" />
            <span>Jornada de Aprendizagem • CEFR Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
            Sua jornada no inglês
          </h1>
          <p className="text-sm sm:text-base text-[#45464D] leading-relaxed">
            Avance passo a passo do básico à fluência natural. Pratique situações reais com escuta ativa, pronúncia assistida e vocabulário contextualizado para o cotidiano.
          </p>
        </div>

        {/* Circular Level Progress Gauge */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE8E4] shadow-xs flex items-center gap-4 shrink-0 min-w-[280px]">
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
              <circle
                className="text-[#EAE8E4]"
                cx="24"
                cy="24"
                fill="none"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                className="text-[#006D30]"
                cx="24"
                cy="24"
                fill="none"
                r="20"
                stroke="currentColor"
                strokeDasharray="125.6"
                strokeDashoffset="35.1"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute text-xs font-bold text-[#1B1C1A]">72%</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#76777D]">Trilha Principal</span>
              <span className="px-1.5 py-0.2 rounded bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">Ativo</span>
            </div>
            <span className="text-lg font-bold text-[#1B1C1A] leading-tight">Nível A1</span>
            <span className="text-xs text-[#76777D]">24 de 30 lições finalizadas</span>
          </div>
        </div>
      </header>

      {/* 2. Top Highlight Card: Continue where you left off */}
      <section className="relative bg-white rounded-2xl p-6 lg:p-8 border border-[#EAE8E4] shadow-xs overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#92F5A4]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EF] text-[#006D30] text-xs font-bold tracking-wider uppercase border border-[#E4E2DE]">
                <span className="w-2 h-2 rounded-full bg-[#006D30]" />
                Continue de onde parou
              </span>
              <span className="flex items-center gap-1 text-[#76777D] text-xs font-medium">
                <Clock size={15} />
                12 min restantes
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#F5F3EF] text-xs font-semibold text-[#45464D]">
                Módulo 02 • Unidade 03
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1B1C1A] leading-snug">
                Ordering at a Coffee Shop & Daily Routines
              </h2>
              <p className="text-sm text-[#45464D] leading-relaxed">
                Aprenda a fazer pedidos com naturalidade e cordialidade, tirar dúvidas sobre o cardápio e utilizar conectivos de tempo em situações cotidianas.
              </p>
            </div>

            {/* Progress & Specs */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#76777D]">
                <span>Etapa 3 de 5 da Unidade</span>
                <span className="text-[#006D30] font-bold">60% concluído</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EAE8E4] overflow-hidden">
                <div
                  className="h-full bg-[#006D30] rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
              <div className="flex items-center gap-4 text-[#76777D] text-xs pt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Headphones size={15} className="text-[#1B1C1A]" /> Áudio com falante nativo
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={15} className="text-[#1B1C1A]" /> 15 vocábulos novos
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={15} className="text-[#006D30]" /> Feedback fonético IA
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-56">
            <button
              type="button"
              onClick={() => onStartLesson('lesson-2-3')}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#B1F661] text-[#0F2000] font-bold text-sm shadow-xs hover:bg-[#96D947] active:scale-95 transition-all"
            >
              <Play size={18} className="fill-[#0F2000]" />
              <span>Continuar Lição</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenGrammarGuide('polite-requests')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-all border border-[#E4E2DE]"
            >
              <BookOpen size={16} />
              <span>Ver resumo teórico</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Filter Bar & Search */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* CEFR Level filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {cefrLevels.map((lvl) => {
              const isActive = selectedLevelFilter === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSelectedLevelFilter(lvl.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#131B2E] text-white shadow-xs font-bold'
                      : 'bg-[#F5F3EF] text-[#45464D] hover:bg-[#EAE8E4]'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tópico ou gramática..."
              className="w-full bg-white text-[#1B1C1A] placeholder:text-[#76777D] text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none border border-[#EAE8E4] focus:border-[#006D30] transition-colors"
            />
          </div>
        </div>

        {/* Skill categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[#45464D] text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider mr-1 shrink-0 text-[#76777D]">
            Habilidades:
          </span>
          {skillCategories.map((skill) => {
            const isActive = selectedSkillFilter === skill.id;
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => setSelectedSkillFilter(skill.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#EAE8E4] text-[#1B1C1A] font-bold'
                    : 'bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#45464D]'
                }`}
              >
                {skill.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. CEFR Tracks Overview (A1 to C1) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1B1C1A]">Trilhas do Quadro Comum Europeu (CEFR)</h3>
          <span className="text-xs text-[#76777D]">Padrão Internacional de Fluência</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card A1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4 relative overflow-hidden transition-all hover:-translate-y-0.5">
            <div className="h-1.5 w-full bg-[#006D30] absolute top-0 left-0" />
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#1B1C1A]">A1</span>
                <span className="px-2 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">
                  72% Concluído
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#1B1C1A]">Iniciante</h4>
              <p className="text-xs text-[#45464D]">
                Compreensão básica, cumprimentos e necessidades imediatas do dia a dia.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <div className="w-full h-1.5 bg-[#EAE8E4] rounded-full overflow-hidden">
                <div className="h-full bg-[#006D30] rounded-full" style={{ width: '72%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#76777D] font-medium">
                <span>3 Módulos</span>
                <span>24/30 Lições</span>
              </div>
              <span className="text-center py-2 px-3 rounded-lg bg-[#EAE8E4] text-xs font-bold text-[#1B1C1A]">
                Trilha em curso
              </span>
            </div>
          </div>

          {/* Card A2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4 relative overflow-hidden transition-all hover:-translate-y-0.5">
            <div className="h-1.5 w-full bg-[#79DB8D] absolute top-0 left-0" />
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#1B1C1A]">A2</span>
                <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] text-[#45464D] text-[10px] font-bold">
                  Destravado
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#1B1C1A]">Elementar</h4>
              <p className="text-xs text-[#45464D]">
                Comunicação em tarefas de rotina e trocas de informações simples.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <div className="w-full h-1.5 bg-[#EAE8E4] rounded-full overflow-hidden">
                <div className="h-full bg-[#79DB8D] rounded-full" style={{ width: '15%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#76777D] font-medium">
                <span>4 Módulos</span>
                <span>32 Lições</span>
              </div>
              <button
                type="button"
                onClick={() => alert('Módulo A2 liberado! Conclua o Módulo 02 para avançar.')}
                className="py-2 px-3 rounded-lg bg-[#F5F3EF] hover:bg-[#EAE8E4] text-xs font-bold text-[#1B1C1A] transition-colors"
              >
                Ver Nível A2
              </button>
            </div>
          </div>

          {/* Card B1 */}
          <div className="bg-white/60 rounded-2xl p-5 border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4 opacity-80">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#76777D]">B1</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#76777D]">
                  <Lock size={12} /> Bloqueado
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#76777D]">Intermediário</h4>
              <p className="text-xs text-[#76777D]">
                Lida com a maioria das situações de viagem e descreve experiências e ambições.
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <div className="py-2 px-3 rounded-lg bg-[#F5F3EF] text-center text-[11px] text-[#76777D] font-medium">
                Complete o A2 para destravar
              </div>
            </div>
          </div>

          {/* Card B2 */}
          <div className="bg-white/60 rounded-2xl p-5 border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4 opacity-80">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#76777D]">B2</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#76777D]">
                  <Lock size={12} /> Bloqueado
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#76777D]">Independente</h4>
              <p className="text-xs text-[#76777D]">
                Compreensão de ideias complexas e conversação fluida e espontânea.
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <div className="py-2 px-3 rounded-lg bg-[#F5F3EF] text-center text-[11px] text-[#76777D] font-medium">
                Requer Nível B1
              </div>
            </div>
          </div>

          {/* Card C1 */}
          <div className="bg-white/60 rounded-2xl p-5 border border-[#EAE8E4] shadow-xs flex flex-col justify-between gap-4 opacity-80">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#76777D]">C1</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#76777D]">
                  <Lock size={12} /> Bloqueado
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#76777D]">Domínio Eficaz</h4>
              <p className="text-xs text-[#76777D]">
                Expressão flexível para propósitos sociais, acadêmicos e profissionais avançados.
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <div className="py-2 px-3 rounded-lg bg-[#F5F3EF] text-center text-[11px] text-[#76777D] font-medium">
                Requer Nível B2
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Detailed Modules Breakdown for Level A1 + Right Support Column */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Column: 3 Modules */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006D30]">
                Grade Curricular Detalhada
              </span>
              <h3 className="text-2xl font-bold text-[#1B1C1A]">Módulos do Nível A1</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#F5F3EF] text-xs font-semibold text-[#45464D] border border-[#E4E2DE]">
              3 Módulos • 11 Lições Totais
            </span>
          </div>

          {/* MÓDULO 01 (100% Concluído) */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAE8E4] shadow-xs flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#92F5A4]/40 flex items-center justify-center text-[#006D30] font-bold text-xl">
                  01
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#76777D] uppercase tracking-wider">Módulo 01</span>
                  <h4 className="text-lg font-bold text-[#1B1C1A]">Fundamentos & Apresentações Pessoais</h4>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-xs font-bold shrink-0">
                <CheckCircle2 size={16} />
                <span>Concluído 100%</span>
              </div>
            </div>
            <p className="text-xs text-[#45464D]">
              Domínio dos primeiros cumprimentos, apresentação de si mesmo, profissões, cidades de origem e dados de contato essenciais.
            </p>

            <div className="flex flex-col gap-2.5 pt-2">
              {modules[0]?.units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-[#006D30] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#1B1C1A]">{unit.title}</span>
                      <span className="text-xs text-[#45464D]">{unit.description}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#006D30] px-2.5 py-1 rounded-md bg-[#92F5A4]/40 shrink-0">
                    100%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MÓDULO 02 (Em Andamento - 60%) */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAE8E4] shadow-xs flex flex-col gap-5 relative overflow-hidden">
            <div className="h-1.5 w-full bg-[#92F5A4] absolute top-0 left-0">
              <div className="h-full bg-[#006D30]" style={{ width: '60%' }} />
            </div>

            <div className="flex items-start justify-between gap-4 pt-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#131B2E] text-white flex items-center justify-center font-bold text-xl">
                  02
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#006D30] uppercase tracking-wider">Módulo Atual</span>
                  <h4 className="text-lg font-bold text-[#1B1C1A]">Rotina Diária & Vida Urbana</h4>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-xs font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#006D30]" />
                <span>Em Andamento • 60%</span>
              </div>
            </div>
            <p className="text-xs text-[#45464D]">
              Construção de frases com o presente simples, horários, compras em cafés e perguntas comuns no espaço urbano.
            </p>

            <div className="flex flex-col gap-2.5 pt-2">
              {/* Unit 2.1 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#006D30] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1B1C1A]">Lição 2.1: Morning Routines & Daily Habits</span>
                    <span className="text-xs text-[#45464D]">Verbos do cotidiano: wake up, brush teeth, have breakfast.</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#006D30] px-2.5 py-1 rounded-md bg-[#92F5A4]/40 shrink-0">
                  100%
                </span>
              </div>

              {/* Unit 2.2 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#006D30] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1B1C1A]">Lição 2.2: Telling the Time & Scheduling</span>
                    <span className="text-xs text-[#45464D]">Como perguntar e dizer horas ("quarter to", "half past").</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#006D30] px-2.5 py-1 rounded-md bg-[#92F5A4]/40 shrink-0">
                  100%
                </span>
              </div>

              {/* Unit 2.3 (Current Focus) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#92F5A4]/25 border border-[#006D30]/30 shadow-xs gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#006D30] text-white flex items-center justify-center shrink-0">
                    <Play size={16} className="fill-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1B1C1A]">Lição 2.3: Ordering at a Coffee Shop</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#006D30] text-white text-[10px] font-bold uppercase tracking-wider">
                        Você está aqui
                      </span>
                    </div>
                    <span className="text-xs text-[#45464D]">
                      Fazer pedidos com gentileza: "Can I get a...", tamanhos, leites e pagamentos.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onStartLesson('lesson-2-3')}
                  className="px-4 py-2 rounded-lg bg-[#006D30] text-white text-xs font-bold shadow-xs hover:bg-[#005323] active:scale-95 transition-all shrink-0 self-end sm:self-auto"
                >
                  Continuar
                </button>
              </div>

              {/* Unit 2.4 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F3EF]/70 opacity-90">
                <div className="flex items-center gap-3">
                  <Radio size={20} className="text-[#76777D] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#1B1C1A]">Lição 2.4: Asking for Directions in the Street</span>
                    <span className="text-xs text-[#76777D]">Turn left, go straight on, next to, opposite the station.</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#76777D] shrink-0">A seguir</span>
              </div>

              {/* Unit 2.5 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F3EF]/70 opacity-90">
                <div className="flex items-center gap-3">
                  <Radio size={20} className="text-[#76777D] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#1B1C1A]">Lição 2.5: Everyday Basic Questions (Who, What, Where)</span>
                    <span className="text-xs text-[#76777D]">Consolidação de Wh- questions no dia a dia.</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#76777D] shrink-0">Não iniciada</span>
              </div>
            </div>
          </div>

          {/* MÓDULO 03 (Bloqueado / Não iniciado) */}
          <div className="bg-white/80 rounded-2xl p-6 border border-[#EAE8E4] shadow-xs flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EAE8E4] flex items-center justify-center font-bold text-xl text-[#76777D]">
                  03
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#76777D] uppercase tracking-wider">Módulo 03</span>
                  <h4 className="text-lg font-bold text-[#1B1C1A]">Viagens, Compras & Restaurantes</h4>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EF] text-[#76777D] text-xs font-semibold shrink-0">
                <Lock size={15} />
                <span>Não iniciado • 0%</span>
              </div>
            </div>
            <p className="text-xs text-[#45464D]">
              Vocabulário indispensável para sobrevivência no exterior: check-in hoteleiro, supermercados e jantares fora.
            </p>

            <div className="flex flex-col gap-2.5 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F3EF]/70">
                <div className="flex items-center gap-3">
                  <Radio size={20} className="text-[#76777D] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#1B1C1A]">Lição 3.1: At the Supermarket & Grocery Shopping</span>
                    <span className="text-xs text-[#76777D]">Alimentos essenciais, quantidades (some, any) e preços.</span>
                  </div>
                </div>
                <span className="text-xs text-[#76777D] shrink-0">3 lições restantes</span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F3EF]/70">
                <div className="flex items-center gap-3">
                  <Radio size={20} className="text-[#76777D] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#1B1C1A]">Lição 3.2: Booking a Hotel & Check-in Basics</span>
                    <span className="text-xs text-[#76777D]">Como confirmar reservas e solicitar a chave.</span>
                  </div>
                </div>
                <span className="text-xs text-[#76777D] shrink-0">Bloqueada</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Side Rail */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Card: Guia Gramatical A1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAE8E4] shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                <BookOpen size={20} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-[#1B1C1A]">Guia Gramatical A1</h4>
                <span className="text-xs text-[#76777D]">Estruturas essenciais consolidadas</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-[#F5F3EF] flex flex-col gap-1 border border-[#EAE8E4]/60">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <span>1. Verb to Be</span>
                  <span className="text-[#006D30]">Dominado</span>
                </div>
                <span className="text-xs text-[#45464D]">
                  I am, You are, He/She is. Perguntas invertidas e contrações (I'm, aren't).
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F5F3EF] flex flex-col gap-1 border border-[#EAE8E4]/60">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <span>2. Present Simple</span>
                  <span className="text-[#006D30]">Em prática</span>
                </div>
                <span className="text-xs text-[#45464D]">
                  Ações rotineiras, 3ª pessoa com "-s", auxiliares Do / Does.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F5F3EF] flex flex-col gap-1 border border-[#EAE8E4]/60">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B1C1A]">
                  <span>3. Wh- Questions</span>
                  <span className="text-[#76777D]">Próximo tópico</span>
                </div>
                <span className="text-xs text-[#45464D]">
                  Who, Where, When, Why e What time para perguntas cotidianas.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenGrammarGuide()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-xs font-bold text-[#1B1C1A] transition-colors flex items-center justify-center gap-2 border border-[#E4E2DE]"
            >
              <span>Abrir Caderno de Regras & Exemplos</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Card: Checkpoint de Fluência */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAE8E4] shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#92F5A4]/40 flex items-center justify-center text-[#006D30]">
                <Flag size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#006D30]">
                  Checkpoint de Fluência
                </span>
                <h4 className="text-base font-bold text-[#1B1C1A]">Simulado de Revisão A1</h4>
              </div>
            </div>
            <p className="text-xs text-[#45464D] leading-relaxed">
              Ao concluir a Lição 2.5, você liberará o teste prático com áudio nativo e IA avaliativa para fixar 100% dos conceitos antes de avançar para restaurantes e viagens.
            </p>
            <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4]/60 flex items-center gap-3">
              <Clock size={22} className="text-[#006D30] shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1B1C1A]">Duração estimada: 20 minutos</span>
                <span className="text-[11px] text-[#76777D]">15 questões interativas de listening + 5 faladas</span>
              </div>
            </div>
          </div>

          {/* Pedagocical Note */}
          <div className="bg-[#F5F3EF] rounded-2xl p-5 border border-[#EAE8E4] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#006D30] text-xs font-bold uppercase tracking-wider">
              <Lightbulb size={16} />
              <span>Método Comunicativo English Lab</span>
            </div>
            <p className="text-xs text-[#45464D] leading-relaxed">
              Não tente memorizar listas isoladas de palavras. Nossos exercícios utilizam repetição espaçada em diálogos práticos para que seu cérebro assimile a estrutura de forma espontânea.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};
