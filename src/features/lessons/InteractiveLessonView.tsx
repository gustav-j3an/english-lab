import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Flame,
  LogOut,
  CheckCircle,
  HelpCircle,
  Volume2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Languages,
  Mic,
  Trophy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { AudioButton } from '../../components/ui/AudioButton';
import { audioService } from '../../services/audioService';

interface InteractiveLessonViewProps {
  onBackToLearn: () => void;
  onLessonComplete: (earnedXp: number) => void;
}

type LessonTab = 'intro' | 'vocab' | 'ex1' | 'ex2' | 'dialog' | 'finish';

export const InteractiveLessonView: React.FC<InteractiveLessonViewProps> = ({
  onBackToLearn,
  onLessonComplete,
}) => {
  const [currentTab, setCurrentTab] = useState<LessonTab>('intro');
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);

  // Exercise 1 state (Multiple Choice)
  const [selectedEx1Option, setSelectedEx1Option] = useState<string | null>('B');
  const [ex1FeedbackVisible, setEx1FeedbackVisible] = useState<boolean>(true);

  // Exercise 2 state (Fill in the blanks)
  const [selectedWord, setSelectedWord] = useState<string>('to go');
  const [ex2Completed, setEx2Completed] = useState<boolean>(true);

  // Score tracking
  const [hasCompletedLesson, setHasCompletedLesson] = useState<boolean>(false);

  const tabsConfig: { id: LessonTab; label: string; number: number }[] = [
    { id: 'intro', label: '1. Visão Geral', number: 1 },
    { id: 'vocab', label: '2. Vocabulário', number: 2 },
    { id: 'ex1', label: '3. Exercício 1 (Múltipla Escolha)', number: 3 },
    { id: 'ex2', label: '4. Exercício 2 (Completar)', number: 4 },
    { id: 'dialog', label: '5. Conversação', number: 5 },
    { id: 'finish', label: '6. Conclusão', number: 6 },
  ];

  const currentTabIdx = tabsConfig.findIndex((t) => t.id === currentTab);
  const progressPercent = Math.round(((currentTabIdx + 1) / tabsConfig.length) * 100);

  const handleSelectEx1 = (opt: string) => {
    setSelectedEx1Option(opt);
    setEx1FeedbackVisible(true);
  };

  const handleSelectWord = (word: string) => {
    setSelectedWord(word);
    setEx2Completed(word === 'to go');
  };

  const handleFinish = () => {
    if (!hasCompletedLesson) {
      setHasCompletedLesson(true);
      onLessonComplete(35);
    }
    setCurrentTab('finish');
  };

  return (
    <div className="w-full flex flex-col bg-[#FBF9F5] min-h-screen">
      {/* 1. Top Integrated Workspace Header */}
      <div className="w-full bg-white border-b border-[#EAE8E4] px-4 sm:px-8 py-3.5 shadow-xs sticky top-16 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Back button & Lesson metadata */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setShowExitModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-colors border border-[#E4E2DE]"
            >
              <ArrowLeft size={15} />
              <span>Voltar para Aprender</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAE8E4] text-[#45464D] text-[10px] font-bold uppercase tracking-wider">
                Nível A1
              </span>
              <span className="text-xs text-[#76777D] hidden sm:inline">
                Módulo 02 • Lição 2.3
              </span>
            </div>
          </div>

          {/* Center: Segmented Progress Tracker */}
          <div className="flex flex-col items-center gap-1 w-full md:w-80">
            <div className="flex items-center justify-between w-full text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#76777D]">
                Etapa {currentTabIdx + 1} de 6
              </span>
              <span className="text-[10px] font-bold text-[#006D30]">
                {progressPercent}% concluído
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 w-full">
              {tabsConfig.map((t, idx) => (
                <div
                  key={t.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx <= currentTabIdx ? 'bg-[#006D30]' : 'bg-[#EAE8E4]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Duration, Streak & Exit */}
          <div className="flex items-center justify-end gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1 text-[#76777D] px-2.5 py-1 rounded-lg bg-[#F5F3EF] text-xs font-medium">
              <Clock size={14} />
              <span>~12 min</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F3EF] text-xs text-[#1B1C1A] border border-[#E4E2DE]">
              <Flame size={14} className="text-[#D97706] fill-[#D97706]" />
              <span className="font-bold">7 dias</span>
            </div>
            <button
              type="button"
              onClick={() => setShowExitModal(true)}
              className="flex items-center gap-1 text-[#45464D] hover:text-[#BA1A1A] hover:bg-[#FFDAD6]/30 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-semibold"
              title="Confirmar saída"
            >
              <LogOut size={15} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Stepper Pill Bar */}
      <div className="w-full bg-[#F5F3EF] py-2.5 px-4 sm:px-8 border-b border-[#EAE8E4] overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {tabsConfig.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'finish' && !hasCompletedLesson) {
                    handleFinish();
                  } else {
                    setCurrentTab(tab.id);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#131B2E] text-white shadow-xs font-bold'
                    : 'bg-white text-[#45464D] hover:bg-[#EAE8E4] border border-[#E4E2DE]'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Primary Workspace Content */}
      <div className="w-full px-4 sm:px-8 py-8 flex-1">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* TAB 1: INTRODUÇÃO CONTEXTUAL */}
          {currentTab === 'intro' && (
            <div className="bg-white rounded-3xl border border-[#EAE8E4] shadow-xs overflow-hidden flex flex-col md:flex-row animate-in fade-in duration-150">
              {/* Left Column Image with Fallback */}
              <div className="md:w-5/12 relative bg-[#F5F3EF] min-h-[260px] flex items-center justify-center overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdQFSTf2djz9xiQZJaVzUUZfgyfk1oy7fTiGZSJefVhTotrAcRgvL_nUtqGLJGeajyAA4k2bae4-OW5MknLTSl2J8VDsQ11H6YNS4DaPBamhcja9CE72iUKhFfPp7dPA53Dg1_LxpUI5PRBDUWqcOp1nMlXmTzhqWTRFWCpTdybDXcm5giHVZO7dpTIW9TTDZ89XjCBFRYWjBex7LebTcE_R5FeOuW59IArw8Z-GN3lfG2eoZIcE6H"
                  alt="Balcão de Cafeteria Estilo Urbano"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover min-h-[260px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[#1B1C1A] text-[10px] font-bold shadow-xs">
                    Cenário Realista • Londres & NY
                  </span>
                </div>
              </div>

              {/* Right Column Content */}
              <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">
                      Lição Interativa 2.3
                    </span>
                    <span className="text-xs text-[#76777D]">Nível A1 Iniciante</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1C1A] tracking-tight leading-snug">
                    Ordering at a Coffee Shop & Daily Routines
                  </h1>
                  <p className="text-xs sm:text-sm text-[#45464D] leading-relaxed">
                    Você acabou de entrar em um café local em Londres ou Nova York e quer pedir uma bebida e algo para comer com naturalidade, gentileza e confiança.
                  </p>
                </div>

                {/* Learning goals list */}
                <div className="bg-[#F5F3EF] rounded-2xl p-4 flex flex-col gap-2.5 border border-[#EAE8E4]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B1C1A]">
                    Objetivos Desta Sessão:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#45464D]">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#006D30] shrink-0 mt-0.5" />
                      <span>Fazer pedidos com <strong className="text-[#1B1C1A]">"I'd like"</strong> e <strong className="text-[#1B1C1A]">"Can I have"</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#006D30] shrink-0 mt-0.5" />
                      <span>Responder à pergunta: <strong className="text-[#1B1C1A]">"For here or to go?"</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#006D30] shrink-0 mt-0.5" />
                      <span>Perguntar valores usando <strong className="text-[#1B1C1A]">"How much is it?"</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#006D30] shrink-0 mt-0.5" />
                      <span>Finalizar com cortesia: <strong className="text-[#1B1C1A]">"That's all, thank you."</strong>.</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#76777D] hidden sm:inline">
                    Padrão CEFR A1 validado
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentTab('vocab')}
                    className="px-5 py-2.5 bg-[#131B2E] text-white text-xs font-bold rounded-xl shadow-xs hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    <span>Ir para Vocabulário</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOCABULÁRIO ESSENCIAL */}
          {currentTab === 'vocab' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1B1C1A]">Vocabulário Essencial da Lição</h2>
                  <p className="text-xs text-[#76777D]">
                    Pratique a pronúncia fonética e escute a gravação em ritmo nativo antes de responder aos exercícios.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EAE8E4] text-xs font-semibold text-[#45464D]">
                  5 Expressões Chave
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Vocab 1 */}
                <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#F5F3EF] text-[10px] font-bold text-[#45464D]">
                        Formal & Cortês
                      </span>
                      <AudioButton text="I'd like a coffee, please." size="sm" />
                    </div>
                    <h3 className="text-base font-bold text-[#1B1C1A] mt-1">"I'd like a coffee, please."</h3>
                    <p className="text-xs font-mono text-[#006D30]">/aɪd laɪk ə ˈkɔfi pliːz/</p>
                    <p className="text-xs font-semibold text-[#1B1C1A] pt-1">"Eu gostaria de um café, por favor."</p>
                  </div>
                  <div className="mt-4 pt-3 bg-[#F5F3EF] rounded-xl p-2.5 text-[11px] text-[#45464D]">
                    Uso prático: Forma mais elegante e usual em cafeterias.
                  </div>
                </div>

                {/* Vocab 2 */}
                <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#F5F3EF] text-[10px] font-bold text-[#45464D]">
                        Cotidiano Amigável
                      </span>
                      <AudioButton text="Can I have a sandwich?" size="sm" />
                    </div>
                    <h3 className="text-base font-bold text-[#1B1C1A] mt-1">"Can I have a sandwich?"</h3>
                    <p className="text-xs font-mono text-[#006D30]">/kæn aɪ hæv ə ˈsændwɪtʃ/</p>
                    <p className="text-xs font-semibold text-[#1B1C1A] pt-1">"Posso pedir um sanduíche?"</p>
                  </div>
                  <div className="mt-4 pt-3 bg-[#F5F3EF] rounded-xl p-2.5 text-[11px] text-[#45464D]">
                    Uso prático: Muito natural entre amigos ou locais descontraídos.
                  </div>
                </div>

                {/* Vocab 3 */}
                <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#F5F3EF] text-[10px] font-bold text-[#45464D]">
                        Preço e Valor
                      </span>
                      <AudioButton text="How much is it?" size="sm" />
                    </div>
                    <h3 className="text-base font-bold text-[#1B1C1A] mt-1">"How much is it?"</h3>
                    <p className="text-xs font-mono text-[#006D30]">/haʊ mʌtʃ ɪz ɪt/</p>
                    <p className="text-xs font-semibold text-[#1B1C1A] pt-1">"Quanto custa?"</p>
                  </div>
                  <div className="mt-4 pt-3 bg-[#F5F3EF] rounded-xl p-2.5 text-[11px] text-[#45464D]">
                    Uso prático: Para saber a conta antes de efetuar o pagamento.
                  </div>
                </div>

                {/* Vocab 4 */}
                <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">
                        Pergunta do Barista
                      </span>
                      <AudioButton text="For here or to go?" size="sm" />
                    </div>
                    <h3 className="text-base font-bold text-[#1B1C1A] mt-1">"For here or to go?"</h3>
                    <p className="text-xs font-mono text-[#006D30]">/fɔːr hɪər ɔːr tuː ɡoʊ/</p>
                    <p className="text-xs font-semibold text-[#1B1C1A] pt-1">"Para consumir aqui ou para viagem?"</p>
                  </div>
                  <div className="mt-4 pt-3 bg-[#F5F3EF] rounded-xl p-2.5 text-[11px] text-[#45464D]">
                    Uso prático: Pergunta padrão em 100% das cafeterias anglófonas.
                  </div>
                </div>

                {/* Vocab 5 */}
                <div className="bg-white p-5 rounded-2xl border border-[#EAE8E4] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#F5F3EF] text-[10px] font-bold text-[#45464D]">
                        Fechamento
                      </span>
                      <AudioButton text="That's all, thank you." size="sm" />
                    </div>
                    <h3 className="text-base font-bold text-[#1B1C1A] mt-1">"That's all, thank you."</h3>
                    <p className="text-xs font-mono text-[#006D30]">/ðæts ɔːl ˈθæŋk juː/</p>
                    <p className="text-xs font-semibold text-[#1B1C1A] pt-1">"É só isso, obrigado."</p>
                  </div>
                  <div className="mt-4 pt-3 bg-[#F5F3EF] rounded-xl p-2.5 text-[11px] text-[#45464D]">
                    Uso prático: Sinaliza ao atendente que concluiu seu pedido.
                  </div>
                </div>

                {/* Audio demo pill card */}
                <div className="bg-[#F5F3EF] p-5 rounded-2xl border border-[#EAE8E4] flex flex-col justify-center items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#006D30] shadow-xs">
                    <Volume2 size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1B1C1A]">Demonstração de Áudio Nativo</span>
                    <p className="text-[11px] text-[#76777D] mt-1">
                      Clique no ícone de som dos cartões para ouvir o ritmo de fala antes dos testes práticos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentTab('ex1')}
                    className="px-4 py-2 bg-[#131B2E] text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Começar os Exercícios
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXERCÍCIO 1 - MÚLTIPLA ESCOLHA */}
          {currentTab === 'ex1' && (
            <div className="bg-white rounded-3xl border border-[#EAE8E4] shadow-xs p-6 sm:p-8 flex flex-col gap-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-xs font-bold">
                    Exercício 1 de 2
                  </span>
                  <span className="text-xs text-[#76777D] font-semibold">Múltipla Escolha</span>
                </div>
                <AudioButton
                  text="Como você pediria um café educadamente em inglês ao atendente?"
                  showLabel
                  label="Ouvir enunciado"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#76777D] font-bold">
                  Cenário: Fazer Pedido
                </span>
                <h2 className="text-2xl font-bold text-[#1B1C1A]">
                  Como você pediria um café educadamente em inglês ao atendente?
                </h2>
                <p className="text-sm text-[#45464D]">
                  Selecione a opção mais natural e apropriada para uma situação de cafeteria.
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {/* Option A */}
                <button
                  type="button"
                  onClick={() => handleSelectEx1('A')}
                  className={`text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                    selectedEx1Option === 'A'
                      ? 'border-[#BA1A1A] bg-[#FFDAD6]/20'
                      : 'border-[#EAE8E4] hover:bg-[#F5F3EF] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#F5F3EF] flex items-center justify-center text-xs font-bold text-[#1B1C1A]">
                      A
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#1B1C1A]">"Give me one coffee now."</span>
                      <span className="text-xs text-[#76777D]">Tom muito direto e pouco polido para o balcão.</span>
                    </div>
                  </div>
                  {selectedEx1Option === 'A' && (
                    <span className="text-xs font-bold text-[#BA1A1A]">Incorreto</span>
                  )}
                </button>

                {/* Option B (Correct) */}
                <button
                  type="button"
                  onClick={() => handleSelectEx1('B')}
                  className={`text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                    selectedEx1Option === 'B'
                      ? 'border-[#006D30] bg-[#92F5A4]/25 shadow-xs'
                      : 'border-[#EAE8E4] hover:bg-[#F5F3EF] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        selectedEx1Option === 'B' ? 'bg-[#006D30] text-white' : 'bg-[#F5F3EF] text-[#1B1C1A]'
                      }`}
                    >
                      B
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1B1C1A]">"I'd like a coffee, please."</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#006D30] text-white text-[10px] font-bold">
                          Correto
                        </span>
                      </div>
                      <span className="text-xs text-[#45464D]">
                        Uso natural do modal "would like" contraído com "please".
                      </span>
                    </div>
                  </div>
                  <CheckCircle size={20} className="text-[#006D30]" />
                </button>

                {/* Option C */}
                <button
                  type="button"
                  onClick={() => handleSelectEx1('C')}
                  className={`text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                    selectedEx1Option === 'C'
                      ? 'border-[#BA1A1A] bg-[#FFDAD6]/20'
                      : 'border-[#EAE8E4] hover:bg-[#F5F3EF] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#F5F3EF] flex items-center justify-center text-xs font-bold text-[#1B1C1A]">
                      C
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#1B1C1A]">"I want drink."</span>
                      <span className="text-xs text-[#76777D]">Incompleto gramaticalmente e sem cortesia social.</span>
                    </div>
                  </div>
                  {selectedEx1Option === 'C' && (
                    <span className="text-xs font-bold text-[#BA1A1A]">Incorreto</span>
                  )}
                </button>

                {/* Option D */}
                <button
                  type="button"
                  onClick={() => handleSelectEx1('D')}
                  className={`text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                    selectedEx1Option === 'D'
                      ? 'border-[#BA1A1A] bg-[#FFDAD6]/20'
                      : 'border-[#EAE8E4] hover:bg-[#F5F3EF] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#F5F3EF] flex items-center justify-center text-xs font-bold text-[#1B1C1A]">
                      D
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#1B1C1A]">"Coffee is good."</span>
                      <span className="text-xs text-[#76777D]">Apenas uma afirmação genérica, não expressa um pedido.</span>
                    </div>
                  </div>
                  {selectedEx1Option === 'D' && (
                    <span className="text-xs font-bold text-[#BA1A1A]">Incorreto</span>
                  )}
                </button>
              </div>

              {/* Feedback box */}
              {selectedEx1Option === 'B' ? (
                <div className="p-4 rounded-2xl bg-[#92F5A4]/30 border border-[#006D30]/20 flex items-start gap-3">
                  <CheckCircle size={22} className="text-[#006D30] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-[#1B1C1A]">Explicação Gramatical:</span>
                    <p className="text-[#1B1C1A] leading-relaxed">
                      Excelente! <strong>"I'd like"</strong> é a contração de <em>"I would like"</em>, que se traduz literalmente como "Eu gostaria". No inglês diário, é a forma padrão mais polida e natural para fazer pedidos, evitando o tom impositivo de <em>"I want"</em>.
                    </p>
                  </div>
                </div>
              ) : selectedEx1Option && (
                <div className="p-4 rounded-2xl bg-[#FFDAD6]/30 border border-[#BA1A1A]/20 flex items-start gap-3">
                  <AlertCircle size={22} className="text-[#BA1A1A] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-[#BA1A1A]">Quase lá!</span>
                    <p className="text-[#45464D] leading-relaxed">
                      Para soar cordial e natural, use <strong>"I'd like a coffee, please"</strong>. Tente selecionar a opção B para ver a explicação completa.
                    </p>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('vocab')}
                  className="px-4 py-2.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-[#E4E2DE]"
                >
                  <ArrowLeft size={15} />
                  <span>Revisar Vocabulário</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('ex2')}
                  className="px-6 py-2.5 rounded-xl bg-[#131B2E] text-white text-xs font-bold hover:opacity-90 shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Continuar para Exercício 2</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: EXERCÍCIO 2 - COMPLETAR A FRASE */}
          {currentTab === 'ex2' && (
            <div className="bg-white rounded-3xl border border-[#EAE8E4] shadow-xs p-6 sm:p-8 flex flex-col gap-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-xs font-bold">
                    Exercício 2 de 2
                  </span>
                  <span className="text-xs text-[#76777D] font-semibold">
                    Completar Frase (Fill in the Blanks)
                  </span>
                </div>
                <span className="text-xs text-[#76777D] flex items-center gap-1">
                  <HelpCircle size={14} className="text-[#006D30]" />
                  Clique nas opções abaixo
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#76777D] font-bold">
                  Contexto: Diálogo no Caixa
                </span>
                <h2 className="text-2xl font-bold text-[#1B1C1A]">
                  Complete a expressão comum do atendente:
                </h2>
                <p className="text-sm text-[#45464D]">
                  Escolha a expressão correta para indicar a opção de levar o pedido para viagem.
                </p>
              </div>

              {/* Dialogue Box with Dropzone */}
              <div className="bg-[#F5F3EF] p-6 sm:p-8 rounded-2xl flex flex-col gap-4 border border-[#EAE8E4]">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#E4E2DE] text-[#1B1C1A] text-[10px] font-bold">
                    Barista
                  </span>
                  <div className="text-lg sm:text-xl text-[#1B1C1A] font-semibold flex flex-wrap items-center gap-2">
                    <span>"Would you like that for here or</span>
                    <span
                      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-xl font-bold transition-all ${
                        selectedWord === 'to go'
                          ? 'bg-white text-[#006D30] border-2 border-[#006D30] shadow-xs'
                          : 'bg-white text-[#BA1A1A] border-2 border-[#BA1A1A]'
                      }`}
                    >
                      {selectedWord}
                    </span>
                    <span>?"</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[#EAE8E4]">
                  <span className="px-2.5 py-1 rounded-md bg-[#E4E2DE] text-[#1B1C1A] text-[10px] font-bold">
                    Você (Beatriz)
                  </span>
                  <p className="text-base text-[#1B1C1A] font-medium">"To go, please."</p>
                </div>
              </div>

              {/* Word Bank Buttons */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76777D]">
                  Banco de Expressões:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['to go', 'to leave', 'to walk', 'to run'].map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => handleSelectWord(word)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        selectedWord === word
                          ? 'bg-[#006D30] text-white shadow-xs'
                          : 'bg-white border border-[#EAE8E4] hover:bg-[#F5F3EF] text-[#1B1C1A]'
                      }`}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Feedback */}
              {selectedWord === 'to go' ? (
                <div className="p-4 rounded-2xl bg-[#92F5A4]/30 border border-[#006D30]/20 flex items-start gap-3">
                  <CheckCircle size={22} className="text-[#006D30] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-[#1B1C1A]">Resposta Validada:</span>
                    <p className="text-[#1B1C1A] leading-relaxed">
                      Correto! A expressão fixa para viagem em inglês é <strong>"to go"</strong> (inglês americano) ou <strong>"takeaway"</strong> (inglês britânico). As outras opções como <em>"to leave"</em> ou <em>"to walk"</em> não são empregadas nesse contexto de consumo.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#FFDAD6]/30 border border-[#BA1A1A]/20 flex items-start gap-3">
                  <AlertCircle size={22} className="text-[#BA1A1A] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-[#BA1A1A]">Tente novamente:</span>
                    <p className="text-[#45464D]">
                      A expressão correta em cafeterias americanas para viagem é <strong>"to go"</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('ex1')}
                  className="px-4 py-2.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-[#E4E2DE]"
                >
                  <ArrowLeft size={15} />
                  <span>Exercício Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('dialog')}
                  className="px-6 py-2.5 rounded-xl bg-[#131B2E] text-white text-xs font-bold hover:opacity-90 shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Avançar para Conversação</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: PRÁTICA DE CONVERSAÇÃO GUIADA */}
          {currentTab === 'dialog' && (
            <div className="bg-white rounded-3xl border border-[#EAE8E4] shadow-xs p-6 sm:p-8 flex flex-col gap-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-xs font-bold">
                      Simulação Real
                    </span>
                    <span className="text-xs text-[#76777D] font-semibold">Roleplay no Central Brew</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#1B1C1A] mt-1">Prática de Conversação Guiada</h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTranslations(!showTranslations)}
                  className="px-3 py-1.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-[#E4E2DE]"
                >
                  <Languages size={15} />
                  <span>{showTranslations ? 'Ocultar Traduções' : 'Exibir Traduções'}</span>
                </button>
              </div>

              {/* Chat Thread */}
              <div className="flex flex-col gap-4 bg-[#F5F3EF]/60 p-4 sm:p-6 rounded-2xl border border-[#EAE8E4]">
                {/* Turn 1: Barista */}
                <div className="flex items-start gap-3 max-w-xl">
                  <div className="w-9 h-9 rounded-full bg-[#E4E2DE] flex items-center justify-center shrink-0 text-sm">
                    ☕
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1B1C1A]">Barista (Central Brew)</span>
                      <span className="text-[10px] text-[#76777D]">09:41</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-[#EAE8E4] shadow-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[#1B1C1A]">
                          "Hi there! Welcome to Central Brew. What can I get for you today?"
                        </p>
                        <AudioButton text="Hi there! Welcome to Central Brew. What can I get for you today?" size="sm" />
                      </div>
                      {showTranslations && (
                        <p className="text-xs text-[#76777D]">
                          "Olá! Bem-vindo ao Central Brew. O que posso trazer para você hoje?"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Turn 2: Beatriz */}
                <div className="flex items-start gap-3 max-w-xl self-end flex-row-reverse">
                  <div className="w-9 h-9 rounded-full bg-[#006D30] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    BL
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#76777D]">09:41</span>
                      <span className="text-xs font-bold text-[#1B1C1A]">Beatriz (Você)</span>
                    </div>
                    <div className="bg-[#131B2E] text-white p-3.5 rounded-2xl rounded-tr-none shadow-xs flex flex-col gap-1 text-right">
                      <div className="flex items-center justify-between gap-3">
                        <AudioButton text="Hello! I'd like a cappuccino and a croissant, please." size="sm" className="text-white hover:text-white" />
                        <p className="text-sm font-semibold">
                          "Hello! I'd like a cappuccino and a croissant, please."
                        </p>
                      </div>
                      {showTranslations && (
                        <p className="text-xs text-white/70">
                          "Olá! Eu gostaria de um cappuccino e um croissant, por favor."
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Turn 3: Barista */}
                <div className="flex items-start gap-3 max-w-xl">
                  <div className="w-9 h-9 rounded-full bg-[#E4E2DE] flex items-center justify-center shrink-0 text-sm">
                    ☕
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1B1C1A]">Barista</span>
                      <span className="text-[10px] text-[#76777D]">09:42</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-[#EAE8E4] shadow-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[#1B1C1A]">
                          "Sure thing! For here or to go?"
                        </p>
                        <AudioButton text="Sure thing! For here or to go?" size="sm" />
                      </div>
                      {showTranslations && (
                        <p className="text-xs text-[#76777D]">
                          "Com certeza! Para consumir aqui ou para viagem?"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Turn 4: Beatriz */}
                <div className="flex items-start gap-3 max-w-xl self-end flex-row-reverse">
                  <div className="w-9 h-9 rounded-full bg-[#006D30] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    BL
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#76777D]">09:42</span>
                      <span className="text-xs font-bold text-[#1B1C1A]">Beatriz (Você)</span>
                    </div>
                    <div className="bg-[#131B2E] text-white p-3.5 rounded-2xl rounded-tr-none shadow-xs flex flex-col gap-1 text-right">
                      <div className="flex items-center justify-between gap-3">
                        <AudioButton text="For here, please. How much is it?" size="sm" className="text-white" />
                        <p className="text-sm font-semibold">
                          "For here, please. How much is it?"
                        </p>
                      </div>
                      {showTranslations && (
                        <p className="text-xs text-white/70">
                          "Para tomar aqui, por favor. Quanto custa?"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Turn 5: Barista */}
                <div className="flex items-start gap-3 max-w-xl">
                  <div className="w-9 h-9 rounded-full bg-[#E4E2DE] flex items-center justify-center shrink-0 text-sm">
                    ☕
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1B1C1A]">Barista</span>
                      <span className="text-[10px] text-[#76777D]">09:43</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-[#EAE8E4] shadow-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[#1B1C1A]">
                          "That will be $6.50."
                        </p>
                        <AudioButton text="That will be 6 dollars and 50 cents." size="sm" />
                      </div>
                      {showTranslations && (
                        <p className="text-xs text-[#76777D]">"Fica $6,50."</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Voice practice banner */}
              <div className="bg-[#F5F3EF] p-5 rounded-2xl border border-[#EAE8E4] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#92F5A4]/40 flex items-center justify-center text-[#006D30] shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1B1C1A]">Prática de Pronúncia</span>
                      <span className="px-2 py-0.2 rounded-full bg-[#EAE8E4] text-[#45464D] text-[10px] font-semibold">
                        Áudio Nativo
                      </span>
                    </div>
                    <p className="text-xs text-[#45464D] mt-0.5">
                      Repita cada fala em voz alta para assimilar ritmo, entonação e a contração natural de "I'd like".
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => audioService.speak("Hello! I'd like a cappuccino and a croissant, please. For here, please. How much is it?")}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-bold shadow-xs transition-all flex items-center gap-2 shrink-0 border border-[#E4E2DE]"
                >
                  <Volume2 size={16} className="text-[#006D30]" />
                  <span>Ouvir Diálogo Completo</span>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('ex2')}
                  className="px-4 py-2.5 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-[#E4E2DE]"
                >
                  <ArrowLeft size={15} />
                  <span>Voltar aos Exercícios</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl bg-[#006D30] text-white text-xs font-bold hover:bg-[#005323] shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Concluir e Ver Desempenho</span>
                  <CheckCircle size={15} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: CONCLUSÃO & RESUMO DE DESEMPENHO */}
          {currentTab === 'finish' && (
            <div className="bg-white rounded-3xl border border-[#EAE8E4] shadow-md p-8 sm:p-10 flex flex-col gap-8 animate-in fade-in duration-150">
              {/* Header */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#92F5A4]/40 flex items-center justify-center text-[#006D30] shadow-xs">
                  <Trophy size={32} />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-xs font-bold uppercase tracking-wider">
                    Módulo 2 • Lição 2.3
                  </span>
                  <h2 className="text-3xl font-bold text-[#1B1C1A] mt-2">
                    Lição Concluída com Sucesso! 🎉
                  </h2>
                  <p className="text-sm text-[#45464D] max-w-lg mx-auto mt-1 leading-relaxed">
                    Você dominou as estruturas essenciais para pedir cafés, lanches e perguntar valores com naturalidade em inglês.
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#F5F3EF] p-4 rounded-2xl flex flex-col items-center text-center gap-1 border border-[#EAE8E4]">
                  <CheckCircle size={22} className="text-[#006D30]" />
                  <span className="text-2xl font-bold text-[#1B1C1A]">100%</span>
                  <span className="text-[11px] text-[#76777D]">Acertos (2/2)</span>
                </div>
                <div className="bg-[#F5F3EF] p-4 rounded-2xl flex flex-col items-center text-center gap-1 border border-[#EAE8E4]">
                  <Flame size={22} className="text-[#D97706] fill-[#D97706]" />
                  <span className="text-2xl font-bold text-[#1B1C1A]">+35 XP</span>
                  <span className="text-[11px] text-[#76777D]">Pontos Ganhos</span>
                </div>
                <div className="bg-[#F5F3EF] p-4 rounded-2xl flex flex-col items-center text-center gap-1 border border-[#EAE8E4]">
                  <Sparkles size={22} className="text-[#006D30]" />
                  <span className="text-2xl font-bold text-[#1B1C1A]">5 Novos</span>
                  <span className="text-[11px] text-[#76777D]">Termos Fixados</span>
                </div>
                <div className="bg-[#F5F3EF] p-4 rounded-2xl flex flex-col items-center text-center gap-1 border border-[#EAE8E4]">
                  <Clock size={22} className="text-[#1B1C1A]" />
                  <span className="text-2xl font-bold text-[#1B1C1A]">12 min</span>
                  <span className="text-[11px] text-[#76777D]">Tempo Estudado</span>
                </div>
              </div>

              {/* Mastered Vocabulary Checklist */}
              <div className="bg-[#F5F3EF]/70 p-6 rounded-2xl border border-[#EAE8E4] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B1C1A]">
                    Expressões Dominadas Nesta Sessão:
                  </span>
                  <span className="text-xs font-bold text-[#006D30]">5/5 Validadas</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE8E4]">
                    <Check size={16} className="text-[#006D30]" />
                    <span className="text-xs font-semibold text-[#1B1C1A]">"I'd like a coffee, please."</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE8E4]">
                    <Check size={16} className="text-[#006D30]" />
                    <span className="text-xs font-semibold text-[#1B1C1A]">"Can I have a sandwich?"</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE8E4]">
                    <Check size={16} className="text-[#006D30]" />
                    <span className="text-xs font-semibold text-[#1B1C1A]">"For here or to go?"</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE8E4]">
                    <Check size={16} className="text-[#006D30]" />
                    <span className="text-xs font-semibold text-[#1B1C1A]">"How much is it?"</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE8E4] sm:col-span-2">
                    <Check size={16} className="text-[#006D30]" />
                    <span className="text-xs font-semibold text-[#1B1C1A]">"That's all, thank you."</span>
                  </div>
                </div>
              </div>

              {/* Final CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onBackToLearn}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006D30] text-white font-bold text-xs shadow-xs hover:bg-[#005323] transition-all flex items-center justify-center gap-2"
                >
                  <span>Próxima Lição: Asking for Directions</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('ex1')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#E4E2DE]"
                >
                  <RotateCcw size={15} />
                  <span>Revisar Respostas</span>
                </button>
                <button
                  type="button"
                  onClick={onBackToLearn}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-[#F5F3EF] text-[#76777D] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#EAE8E4]"
                >
                  <span>Voltar ao Mapa de Módulos</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-[#EAE8E4] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1B1C1A]">Sair da lição?</h3>
                <p className="text-xs text-[#76777D]">Seu progresso da etapa atual será salvo automaticamente.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 rounded-xl bg-[#F5F3EF] text-[#1B1C1A] text-xs font-semibold hover:bg-[#EAE8E4] transition-colors border border-[#E4E2DE]"
              >
                Continuar Lição
              </button>
              <button
                type="button"
                onClick={onBackToLearn}
                className="px-4 py-2 rounded-xl bg-[#BA1A1A] text-white text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Sair Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
