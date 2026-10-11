import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Compass,
  Clock,
  Sparkles,
  RefreshCw,
  Send,
  Mic,
  Volume2,
  Lightbulb,
  Check,
  CheckCircle2,
  BookMarked,
  Flag,
  HelpCircle,
  Plus,
  Play,
  Heart,
  ChevronRight,
  Gauge,
} from 'lucide-react';
import { conversationScenarios } from '../../data/initialData';
import { ConversationScenario, ChatMessage } from '../../types';
import { aiTutorService } from '../../services/aiTutorService';
import { AudioButton } from '../../components/ui/AudioButton';
import { audioService } from '../../services/audioService';

interface ConversationViewProps {
  initialScenarioId?: string;
  onOpenNotes?: () => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  initialScenarioId,
  onOpenNotes,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario>(
    conversationScenarios.find((s) => s.id === initialScenarioId) ||
      conversationScenarios[0]
  );

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [speedRate, setSpeedRate] = useState<number>(1.0);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customTopic, setCustomTopic] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial message thread setup
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'tutor',
      text: selectedScenario.initialPrompt,
      timestamp: '10:14',
      audioAvailable: true,
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Hello Alex! I want coffee.',
      timestamp: '10:15',
    },
    {
      id: 'msg-3',
      sender: 'tutor',
      text:
        'Great start, Beatriz! In English, when ordering at a coffee shop, we usually make it more polite. For example: "I\'d like a coffee, please." or "Can I have a coffee, please?" Let\'s try again! What kind of coffee would you like: an espresso, an iced latte, or a cappuccino?',
      timestamp: '10:15',
      audioAvailable: true,
      correctionTip: {
        original: 'I want coffee.',
        suggested: "I'd like a coffee, please.",
        ruleTitle: 'Dica de Cortesia no Cotidiano',
        explanation:
          'No dia a dia em países anglófonos, "I want" soa muito direto ou até autoritário ao atendente. "I would like" (ou na fala fluida contraída "I\'d like") é a fórmula perfeita de cordialidade!',
      },
    },
    {
      id: 'msg-4',
      sender: 'user',
      text: "I'd like a cappuccino, please. How much is it?",
      timestamp: '10:16',
    },
    {
      id: 'msg-5',
      sender: 'tutor',
      text:
        'Excellent! Perfect use of "I\'d like" and "How much is it?"! That will be $4.50. For here or to go? ☕',
      timestamp: '10:16',
      audioAvailable: true,
    },
  ]);

  // Last message analysis card state
  const [lastAnalysis, setLastAnalysis] = useState({
    original: '"I want coffee."',
    recommended: '"I\'d like a coffee, please."',
    explanation:
      '"I\'d like" é a maneira cordial preferida em cafeterias e restaurantes, substituindo com delicadeza o imperativo "I want".',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSelectScenario = (scenario: ConversationScenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: `msg-init-${Date.now()}`,
        sender: 'tutor',
        text: scenario.initialPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audioAvailable: true,
      },
    ]);
  };

  const handleRestart = () => {
    setMessages([
      {
        id: `msg-init-${Date.now()}`,
        sender: 'tutor',
        text: selectedScenario.initialPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audioAvailable: true,
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await aiTutorService.generateTutorReply(
        text,
        selectedScenario.id,
        messages
      );

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audioAvailable: true,
        correctionTip: response.correctionTip,
      };

      if (response.correctionTip) {
        setLastAnalysis({
          original: `"${response.correctionTip.original}"`,
          recommended: `"${response.correctionTip.suggested}"`,
          explanation: response.correctionTip.explanation,
        });
      }

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleMic = () => {
    setIsMicActive(!isMicActive);
    if (!isMicActive) {
      // Provide simulated friendly input prompt or voice hint
      setInputText("I'd like an iced latte with oat milk, to go.");
    }
  };

  const cycleSpeed = () => {
    if (speedRate === 1.0) setSpeedRate(0.8);
    else if (speedRate === 0.8) setSpeedRate(1.2);
    else setSpeedRate(1.0);
  };

  const filteredScenarios = conversationScenarios.filter((sc) => {
    if (activeFilter === 'A1') return sc.level === 'A1';
    if (activeFilter === 'A2') return sc.level === 'A2';
    if (activeFilter === 'B1') return sc.level === 'B1';
    return true;
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* 1. Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAE8E4] pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE8E4] text-[#45464D] text-[10px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#006D30]" />
            <span>Prática Guiada • Ambiente Seguro de Aprendizagem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
            Pratique seu inglês conversando
          </h1>
          <p className="text-sm text-[#45464D]">
            Fale sem medo de errar. Receba correções pontuais, assimile vocabulário contextual e construa fluência no seu próprio ritmo.
          </p>
        </div>

        {/* Quick Session Indicator */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl shadow-xs border border-[#EAE8E4]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F5F3EF]">
            <ShieldCheck size={18} className="text-[#006D30]" />
            <span className="text-xs text-[#1B1C1A] font-semibold">Tutor AI Seguro</span>
          </div>
          <div className="h-6 w-px bg-[#EAE8E4]" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs">
            <span className="text-[#76777D] font-medium">Sessão:</span>
            <span className="font-bold text-[#006D30]">{selectedScenario.title}</span>
          </div>
        </div>
      </header>

      {/* 2. Workspace Two-Column Split (8 Cols Left / 4 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAIN COLUMN (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SCENARIOS SELECTOR */}
          <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#EAE8E4] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass size={20} className="text-[#006D30]" />
                <h2 className="text-base font-bold text-[#1B1C1A]">Escolha um cenário para praticar</h2>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'A1', label: 'Nível A1 Recomendado' },
                  { id: 'A2', label: 'Nível A2' },
                  { id: 'B1', label: 'Nível B1' },
                ].map((flt) => (
                  <button
                    key={flt.id}
                    type="button"
                    onClick={() => setActiveFilter(flt.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      activeFilter === flt.id
                        ? 'bg-[#131B2E] text-white shadow-xs font-bold'
                        : 'bg-[#F5F3EF] text-[#45464D] hover:bg-[#EAE8E4]'
                    }`}
                  >
                    {flt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 pt-1">
              {filteredScenarios.map((sc) => {
                const isActive = selectedScenario.id === sc.id;
                return (
                  <div
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between group ${
                      isActive
                        ? 'border-2 border-[#006D30] bg-white shadow-sm'
                        : 'border-[#EAE8E4] bg-[#F5F3EF] hover:bg-white'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">
                          Ativo
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[#76777D] text-xs">
                        <span className="px-2 py-0.5 rounded bg-white font-semibold text-[#1B1C1A] border border-[#EAE8E4]">
                          CEFR {sc.level}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {sc.durationMinutes} min
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1B1C1A] group-hover:text-[#006D30] transition-colors">
                        {sc.title}
                      </h3>
                      <p className="text-xs text-[#45464D] line-clamp-2">{sc.description}</p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#EAE8E4] flex items-center justify-between text-xs font-bold">
                      <span className={isActive ? 'text-[#006D30]' : 'text-[#76777D]'}>
                        {isActive ? 'Cenário em andamento' : 'Praticar este'}
                      </span>
                      {isActive ? (
                        <Play size={15} className="text-[#006D30] fill-[#006D30]" />
                      ) : (
                        <ChevronRight size={15} className="text-[#76777D]" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Custom Free Scenario Card */}
              <div
                onClick={() => setShowCustomModal(true)}
                className="p-4 rounded-xl border border-dashed border-[#C6C6CD] bg-[#F5F3EF]/60 hover:bg-[#F5F3EF] transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#76777D] group-hover:text-[#006D30] transition-colors shadow-xs">
                  <Plus size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B1C1A]">Criar Cenário Livre</p>
                  <p className="text-[11px] text-[#76777D]">Personalize seu diálogo</p>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE CHAT CONTAINER */}
          <section className="bg-white rounded-2xl shadow-xs border border-[#EAE8E4] flex flex-col overflow-hidden">
            {/* Tutor Status Bar */}
            <div className="px-6 py-4 bg-white border-b border-[#EAE8E4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#131B2E] text-white flex items-center justify-center font-bold text-base shadow-inner">
                    A
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#006D30] ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#1B1C1A]">Alex</span>
                    <span className="px-2 py-0.2 rounded-full bg-[#F5F3EF] text-[10px] text-[#45464D] font-medium">
                      English Tutor
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#006D30] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006D30]" />
                    <span>Prática simulada ativa</span>
                    <span className="text-[#76777D] font-normal text-[11px]">
                      (CEFR {selectedScenario.level} • {selectedScenario.title})
                    </span>
                  </div>
                </div>
              </div>

              {/* Speed & Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#45464D] text-xs font-semibold transition-all border border-[#E4E2DE]"
                  title="Ajustar velocidade da voz"
                >
                  <Gauge size={15} />
                  <span>{speedRate}x</span>
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#45464D] text-xs font-semibold transition-all border border-[#E4E2DE]"
                  title="Reiniciar diálogo"
                >
                  <RefreshCw size={15} />
                  <span className="hidden sm:inline">Reiniciar</span>
                </button>
              </div>
            </div>

            {/* Message Thread */}
            <div className="p-6 md:p-8 space-y-6 bg-[#FBF9F5]/40 min-h-[480px] max-h-[580px] overflow-y-auto">
              <div className="flex items-center justify-center my-1">
                <div className="px-3 py-1 rounded-full bg-[#EAE8E4] text-[#76777D] text-[11px] font-medium">
                  Hoje • Cenário: {selectedScenario.title}
                </div>
              </div>

              {messages.map((msg) => {
                const isTutor = msg.sender === 'tutor';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3.5 ${
                      isTutor ? 'max-w-[92%]' : 'ml-auto justify-end max-w-[85%]'
                    }`}
                  >
                    {isTutor && (
                      <div className="w-8 h-8 rounded-full bg-[#131B2E] text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                        A
                      </div>
                    )}

                    <div className={`space-y-1.5 ${!isTutor ? 'flex flex-col items-end' : 'w-full'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1B1C1A]">
                          {isTutor ? 'Alex' : 'Você (Beatriz)'}
                        </span>
                        <span className="text-[10px] text-[#76777D]">{msg.timestamp}</span>
                        {isTutor && msg.correctionTip && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">
                            <Sparkles size={11} /> Dica didática
                          </span>
                        )}
                      </div>

                      <div
                        className={`p-4 rounded-2xl shadow-xs space-y-2.5 ${
                          isTutor
                            ? 'bg-white border border-[#EAE8E4] text-[#1B1C1A] rounded-tl-xs'
                            : 'bg-[#131B2E] text-white rounded-tr-xs'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>

                        {/* Embedded Didactic Advice Card */}
                        {isTutor && msg.correctionTip && (
                          <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] space-y-1 text-xs">
                            <div className="flex items-center gap-1.5 text-[#006D30] font-bold">
                              <Lightbulb size={15} />
                              <span>{msg.correctionTip.ruleTitle}</span>
                            </div>
                            <p className="text-[#45464D] leading-relaxed">
                              {msg.correctionTip.explanation}
                            </p>
                          </div>
                        )}

                        {isTutor && msg.audioAvailable && (
                          <div className="pt-2 flex items-center gap-3 border-t border-[#F5F3EF]">
                            <AudioButton
                              text={msg.text}
                              rate={speedRate}
                              showLabel
                              label="Ouvir Alex"
                            />
                            <span className="text-[11px] text-[#76777D]">
                              Voz: Natural English ({speedRate}x)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isTutor && (
                      <div className="w-8 h-8 rounded-full bg-[#006D30] text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                        BL
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-[#131B2E] text-white flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-[#EAE8E4] text-xs text-[#76777D] flex items-center gap-2">
                    <span className="animate-pulse">Alex está digitando uma resposta pedagógica...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Dock */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#EAE8E4] space-y-3">
              {/* Suggested Quick Replies */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-[#76777D] flex items-center gap-1 flex-shrink-0 font-medium text-[11px]">
                  <Sparkles size={13} className="text-[#006D30]" /> Ideias de resposta:
                </span>
                {selectedScenario.suggestedReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(reply)}
                    className="px-2.5 py-1 rounded-full bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] whitespace-nowrap transition-colors text-xs font-medium border border-[#E4E2DE]"
                  >
                    "{reply}"
                  </button>
                ))}
              </div>

              {/* Text Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center gap-2"
              >
                <div className="relative flex-1 flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message in English... (ou clique nas ideias acima)"
                    className="w-full bg-[#F5F3EF] text-[#1B1C1A] placeholder:text-[#76777D] rounded-xl pl-4 pr-20 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006D30]/30 border border-[#EAE8E4] transition-all"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={toggleMic}
                      className={`p-2 rounded-lg transition-all ${
                        isMicActive
                          ? 'bg-[#92F5A4] text-[#006D30]'
                          : 'text-[#76777D] hover:text-[#006D30] hover:bg-[#EAE8E4]'
                      }`}
                      title="Microfone para fala assistida"
                    >
                      <Mic size={18} />
                    </button>
                    {inputText && (
                      <button
                        type="button"
                        onClick={() => audioService.speak(inputText)}
                        className="p-2 rounded-lg text-[#76777D] hover:text-[#1B1C1A] hover:bg-[#EAE8E4]"
                        title="Ouvir sua frase antes de enviar"
                      >
                        <Volume2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-5 py-3.5 rounded-xl bg-[#006D30] hover:bg-[#005323] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Enviar</span>
                  <Send size={16} />
                </button>
              </form>

              {/* Reassurance Pedagogic Notice */}
              <div className="flex items-center justify-between text-[11px] text-[#76777D] pt-1 px-1">
                <span className="flex items-center gap-1.5 text-[#006D30] font-medium">
                  <CheckCircle2 size={13} />
                  Você pode errar à vontade. O objetivo é aprender e destravar.
                </span>
                <span className="hidden md:inline text-[#76777D]">
                  Interface interativa preparada para API de IA generativa
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: "SEU APRENDIZADO NESTA CONVERSA" (4 Columns) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#EAE8E4] space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE8E4]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#92F5A4]/40 flex items-center justify-center text-[#006D30]">
                  <BookMarked size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1B1C1A]">Seu aprendizado nesta conversa</h3>
                  <p className="text-[11px] text-[#76777D]">Painel didático em tempo real</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#F5F3EF] text-[#45464D] text-[10px] font-bold">
                CEFR {selectedScenario.level}
              </span>
            </div>

            {/* Didactic Objective */}
            <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#76777D] font-medium">Cenário Ativo:</span>
                <span className="font-bold text-[#1B1C1A]">{selectedScenario.title}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[#76777D] font-medium">Objetivo Didático:</span>
                <p className="text-[#1B1C1A] font-semibold leading-snug">
                  {selectedScenario.learningGoal}
                </p>
              </div>
              <div className="pt-1.5 space-y-1">
                <div className="flex justify-between text-[11px] text-[#76777D]">
                  <span>Progresso do objetivo</span>
                  <span className="font-bold text-[#006D30]">75% concluído</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EAE8E4] overflow-hidden">
                  <div className="h-full bg-[#006D30] rounded-full w-3/4" />
                </div>
              </div>
            </div>

            {/* Análise da última mensagem */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[#1B1C1A]">
                <Lightbulb size={16} className="text-[#006D30]" />
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1B1C1A]">
                  Análise da sua última mensagem
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#EAE8E4] shadow-xs space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#76777D]">Você escreveu:</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#F5F3EF] text-[#45464D] text-[10px]">
                      Original
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F5F3EF] text-xs text-[#1B1C1A] line-through decoration-[#BA1A1A]/70">
                    {lastAnalysis.original}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#006D30] font-bold">Forma mais educada:</span>
                    <span className="px-2 py-0.2 rounded-full bg-[#92F5A4]/40 text-[#006D30] text-[10px] font-bold">
                      Recomendado
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#92F5A4]/25 border border-[#006D30]/30 text-xs text-[#1B1C1A] font-bold flex items-center justify-between">
                    <span>{lastAnalysis.recommended}</span>
                    <AudioButton text={lastAnalysis.recommended.replace(/"/g, '')} size="sm" />
                  </div>
                </div>

                <p className="text-xs text-[#45464D] leading-relaxed bg-[#F5F3EF] p-2.5 rounded-lg">
                  <strong className="text-[#1B1C1A]">Explicação:</strong> {lastAnalysis.explanation}
                </p>
              </div>
            </div>

            {/* Useful expressions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1B1C1A]">
                  Expressões Úteis
                </h4>
                <span className="text-[11px] text-[#006D30] font-semibold">
                  {selectedScenario.usefulExpressions.length} identificadas
                </span>
              </div>
              <div className="space-y-2">
                {selectedScenario.usefulExpressions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] transition-all flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1B1C1A]">"{item.phrase}"</span>
                        {item.isHighFreq && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#92F5A4]/40 text-[#006D30]">
                            Alta freq.
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#76777D]">{item.translation}</p>
                    </div>
                    <AudioButton text={item.phrase} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Session Vocab */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1B1C1A]">
                Vocabulário da Sessão
              </h4>
              <div className="space-y-2 text-xs">
                {selectedScenario.sessionVocab.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-[#EAE8E4] bg-white flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-[#1B1C1A]">{v.word}</span>
                      <span className="text-[#76777D] text-[10px] ml-1">{v.phonetic}</span>
                      <p className="text-[#45464D] text-[11px]">{v.meaning}</p>
                    </div>
                    <Check size={16} className="text-[#006D30]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-[#EAE8E4] space-y-2">
              <button
                type="button"
                onClick={() => {
                  alert('Anotações salvas com sucesso no seu caderno de estudos!');
                  if (onOpenNotes) onOpenNotes();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#EAE8E4] bg-white hover:bg-[#F5F3EF] text-[#1B1C1A] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <BookMarked size={16} />
                <span>Salvar anotações no caderno</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Sessão finalizada! Resumo arquivado no seu histórico de progresso.')}
                className="w-full py-2 px-4 rounded-xl text-[#76777D] hover:text-[#1B1C1A] hover:bg-[#F5F3EF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Flag size={15} />
                <span>Finalizar sessão e ver resumo</span>
              </button>
            </div>
          </div>

          {/* Motivational Safe Sanctuary Note */}
          <div className="p-4 rounded-2xl bg-[#F5F3EF] border border-[#EAE8E4] flex items-start gap-3">
            <Heart size={20} className="text-[#006D30] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#1B1C1A]">Prática 100% Livre de Julgamentos</p>
              <p className="text-xs text-[#45464D] leading-relaxed">
                O Tutor de Conversação foi calibrado para priorizar a comunicação antes da perfeição técnica. Errar faz parte do método.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Custom Scenario Builder Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#EAE8E4] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-base font-bold text-[#1B1C1A]">Criar Cenário Livre</h3>
              <p className="text-xs text-[#76777D]">
                Qual situação do dia a dia você gostaria de simular com o tutor Alex?
              </p>
            </div>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Ex: Check-in no hotel em Miami, pedindo pizza..."
              className="w-full p-3 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-xl bg-[#F5F3EF] text-[#76777D] text-xs font-semibold hover:bg-[#EAE8E4]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (customTopic.trim()) {
                    const customScenario: ConversationScenario = {
                      id: `custom-${Date.now()}`,
                      title: customTopic.trim(),
                      level: 'A2',
                      durationMinutes: 10,
                      description: `Prática focada no cenário: ${customTopic}`,
                      iconName: 'MessageSquare',
                      initialPrompt: `Hello! Let's practice about ${customTopic}. Ready to start?`,
                      learningGoal: `Conversar fluentemente sobre ${customTopic}.`,
                      suggestedReplies: ["Yes, I'm ready!", 'Can we begin?'],
                      usefulExpressions: [{ phrase: 'Excuse me', translation: 'Com licença' }],
                      sessionVocab: [{ word: 'conversation', phonetic: '/ˌkɑːn.vɚˈseɪ.ʃən/', meaning: 'conversa' }],
                    };
                    handleSelectScenario(customScenario);
                    setShowCustomModal(false);
                    setCustomTopic('');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#006D30] text-white text-xs font-bold hover:bg-[#005323]"
              >
                Criar e Começar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
