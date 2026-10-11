import React, { useState } from 'react';
import {
  Bookmark,
  BellRing,
  Award,
  Sparkles,
  Play,
  Star,
  Volume2,
  Eye,
  EyeOff,
  CheckCircle2,
  Info,
  ArrowRight,
  Briefcase,
  Plane,
  Utensils,
  MessageCircle,
  LayoutGrid,
  List,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  FileDown,
  Layers,
} from 'lucide-react';
import { VocabularyItem, CEFRLevel } from '../../types';
import { AudioButton } from '../../components/ui/AudioButton';
import { AddWordModal } from './AddWordModal';
import { audioService } from '../../services/audioService';

interface VocabularyViewProps {
  vocabulary: VocabularyItem[];
  onUpdateVocabulary: (updatedList: VocabularyItem[]) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  vocabulary,
  onUpdateVocabulary,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCefrFilter, setSelectedCefrFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  // Flashcard review state
  const reviewQueue = vocabulary.filter((v) => v.masteryLevel !== 'mastered');
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);
  const [showMeaning, setShowMeaning] = useState<boolean>(true);
  const [reviewCompletedNotice, setReviewCompletedNotice] = useState<string | null>(null);

  // Add word modal
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Details modal
  const [detailsItem, setDetailsItem] = useState<VocabularyItem | null>(null);

  const activeReviewCard =
    reviewQueue.length > 0 ? reviewQueue[currentReviewIndex % reviewQueue.length] : vocabulary[0];

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = vocabulary.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v));
    onUpdateVocabulary(updated);
  };

  const handleReviewRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!activeReviewCard) return;

    let newRetention = activeReviewCard.retentionPercent;
    let newMastery = activeReviewCard.masteryLevel;
    const newCount = activeReviewCard.reviewCount + 1;

    if (rating === 'again') {
      newRetention = Math.max(10, newRetention - 15);
      newMastery = 'learning';
    } else if (rating === 'hard') {
      newRetention = Math.min(90, newRetention + 10);
      newMastery = 'learning';
    } else if (rating === 'good') {
      newRetention = Math.min(95, newRetention + 20);
      newMastery = newCount >= 5 ? 'mastered' : 'learning';
    } else if (rating === 'easy') {
      newRetention = 100;
      newMastery = 'mastered';
    }

    const updated = vocabulary.map((v) =>
      v.id === activeReviewCard.id
        ? {
            ...v,
            retentionPercent: newRetention,
            masteryLevel: newMastery,
            reviewCount: newCount,
          }
        : v
    );

    onUpdateVocabulary(updated);
    setReviewCompletedNotice(`Avaliado como "${rating.toUpperCase()}". Intervalo atualizado!`);
    setTimeout(() => setReviewCompletedNotice(null), 2500);

    // Advance to next card
    if (reviewQueue.length > 1) {
      setCurrentReviewIndex((prev) => (prev + 1) % reviewQueue.length);
    }
  };

  const handleAddWord = (newWord: VocabularyItem) => {
    onUpdateVocabulary([newWord, ...vocabulary]);
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(vocabulary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'english_lab_vocabulario.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered vocabulary list
  const filteredVocabulary = vocabulary.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCefr =
      selectedCefrFilter === 'all' || item.level === selectedCefrFilter;

    const matchesCat =
      selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;

    const matchesStatus =
      selectedStatusFilter === 'all' ||
      (selectedStatusFilter === 'mastered' && item.masteryLevel === 'mastered') ||
      (selectedStatusFilter === 'learning' && item.masteryLevel === 'learning') ||
      (selectedStatusFilter === 'favorite' && item.isFavorite);

    return matchesSearch && matchesCefr && matchesCat && matchesStatus;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-10">
      {/* 1. Header with Metrics */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE8E4] text-[#45464D] text-[10px] font-bold uppercase tracking-wider w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006D30]" />
              <span>Sistema de Retenção • Repetição Espaçada Demonstrativa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
              Seu vocabulário em inglês
            </h1>
            <p className="text-sm sm:text-base text-[#45464D]">
              Aprenda novas palavras, revise no momento certo e use o inglês com mais confiança.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1B1C1A] text-xs sm:text-sm font-semibold shadow-xs hover:bg-[#F5F3EF] border border-[#EAE8E4] transition-all"
            >
              <FileDown size={17} />
              <span>Exportar caderno</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006D30] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#005323] transition-all"
            >
              <Plus size={17} />
              <span>Adicionar termo</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464D] font-medium">Palavras salvas</span>
              <div className="w-9 h-9 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                <Bookmark size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
                {vocabulary.length}
              </span>
              <span className="text-xs text-[#76777D]">termos ativos</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#EAE8E4] flex items-center justify-between text-[11px] text-[#76777D]">
              <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] font-semibold text-[#1B1C1A]">
                Total acumulado
              </span>
              <span>Amostra demonstrativa</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464D] font-medium">Para revisar hoje</span>
              <div className="w-9 h-9 rounded-xl bg-[#92F5A4]/40 flex items-center justify-center text-[#006D30]">
                <BellRing size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
                {reviewQueue.length}
              </span>
              <span className="text-xs text-[#76777D]">cards pendentes</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#EAE8E4] flex items-center justify-between text-[11px] text-[#76777D]">
              <span className="px-2 py-0.5 rounded-full bg-[#92F5A4]/40 text-[#006D30] font-bold">
                Meta do dia (8 feitas)
              </span>
              <span className="text-[#006D30] font-medium">Sessão ativa</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464D] font-medium">Palavras dominadas</span>
              <div className="w-9 h-9 rounded-xl bg-[#B1F661]/30 flex items-center justify-center text-[#0F2000]">
                <Award size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-[#1B1C1A] tracking-tight">
                {vocabulary.filter((v) => v.masteryLevel === 'mastered').length}
              </span>
              <span className="text-xs text-[#76777D]">retenção sólida</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#EAE8E4] flex items-center justify-between text-[11px] text-[#76777D]">
              <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] font-bold text-[#1B1C1A]">
                Nível de retenção: 92%
              </span>
              <span>Memória de longo prazo</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Área de Revisão Inteligente (Interactive Spaced Repetition Flashcard) */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-[#006D30]" />
              <h2 className="text-2xl font-bold text-[#1B1C1A] tracking-tight">Revisão inteligente</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#45464D] mt-0.5">
              Prática diária de repetição espaçada para fixação na memória de longo prazo
            </p>
          </div>

          <button
            type="button"
            onClick={() => audioService.speak(activeReviewCard.word)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#131B2E] text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-90 transition-all self-start sm:self-auto"
          >
            <Play size={16} className="fill-white" />
            <span>Ouvir termo ativo ({activeReviewCard.word})</span>
          </button>
        </div>

        {/* Central Flashcard */}
        <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white border border-[#EAE8E4] p-6 sm:p-8 shadow-xs flex flex-col gap-6 relative">
          {reviewCompletedNotice && (
            <div className="absolute top-4 right-6 bg-[#92F5A4]/90 text-[#006D30] px-3 py-1 rounded-full text-xs font-bold animate-in fade-in duration-150">
              {reviewCompletedNotice}
            </div>
          )}

          {/* Top Bar of card */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#EAE8E4]">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-[#F5F3EF] text-xs font-bold text-[#45464D]">
                Card {(currentReviewIndex % reviewQueue.length) + 1} de {reviewQueue.length} pendentes
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#EAE8E4] text-xs font-semibold text-[#1B1C1A]">
                Nível {activeReviewCard.level}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#F5F3EF] text-xs font-medium text-[#45464D] border border-[#E4E2DE]">
                {activeReviewCard.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleFavorite(activeReviewCard.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  activeReviewCard.isFavorite
                    ? 'bg-[#FEF3C7] text-[#D97706]'
                    : 'bg-[#F5F3EF] text-[#76777D] hover:bg-[#EAE8E4]'
                }`}
                aria-label="Favoritar termo"
              >
                <Star size={18} className={activeReviewCard.isFavorite ? 'fill-[#D97706]' : ''} />
              </button>
              <AudioButton text={activeReviewCard.word} showLabel label="Ouvir pronúncia" />
            </div>
          </div>

          {/* Front of Card */}
          <div className="flex flex-col items-center text-center py-4 gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#F5F3EF] text-xs font-medium text-[#76777D] uppercase tracking-wider">
              {activeReviewCard.partOfSpeech}
            </span>
            <h3 className="text-4xl font-bold text-[#1B1C1A] tracking-tight mt-1">
              {activeReviewCard.word}
            </h3>
            <span className="text-base text-[#76777D] font-mono">
              {activeReviewCard.phonetic}
            </span>
          </div>

          {/* Meaning & Example */}
          <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#F5F3EF] border border-[#EAE8E4]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B1C1A]">
                Significado em português
              </span>
              <button
                type="button"
                onClick={() => setShowMeaning(!showMeaning)}
                className="text-xs font-semibold text-[#76777D] hover:text-[#1B1C1A] flex items-center gap-1"
              >
                {showMeaning ? (
                  <>
                    <EyeOff size={14} /> <span>Ocultar resposta</span>
                  </>
                ) : (
                  <>
                    <Eye size={14} /> <span>Revelar resposta</span>
                  </>
                )}
              </button>
            </div>

            {showMeaning ? (
              <div className="space-y-3">
                <p className="text-lg font-bold text-[#1B1C1A]">
                  {activeReviewCard.translation}
                </p>
                <div className="pt-2 border-t border-[#EAE8E4]/60 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#76777D]">
                    Exemplo prático contextualizado:
                  </span>
                  <p className="text-sm text-[#1B1C1A] italic">
                    "{activeReviewCard.exampleSentenceEn}"
                  </p>
                  <p className="text-xs text-[#76777D]">
                    Tradução: "{activeReviewCard.exampleSentencePt}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-[#76777D] italic">
                Pense no significado e clique em "Revelar resposta" antes de se autoavaliar.
              </div>
            )}
          </div>

          {/* Self-Rating 4 Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <span className="font-bold text-[#1B1C1A]">Como foi lembrar desta palavra?</span>
              <span className="text-[#76777D]">
                Sua avaliação calibra os intervalos da próxima revisão demonstrativa
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handleReviewRating('again')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FFDAD6]/40 hover:bg-[#FFDAD6] text-[#BA1A1A] transition-all text-center border border-[#BA1A1A]/20"
              >
                <span className="text-xs font-bold">Errei</span>
                <span className="text-[10px] opacity-80 mt-0.5">+10 min</span>
              </button>

              <button
                type="button"
                onClick={() => handleReviewRating('hard')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] transition-all text-center border border-[#EAE8E4]"
              >
                <span className="text-xs font-bold">Difícil</span>
                <span className="text-[10px] text-[#76777D] mt-0.5">+1 dia</span>
              </button>

              <button
                type="button"
                onClick={() => handleReviewRating('good')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] transition-all text-center border border-[#EAE8E4]"
              >
                <span className="text-xs font-bold">Bom</span>
                <span className="text-[10px] text-[#76777D] mt-0.5">+3 dias</span>
              </button>

              <button
                type="button"
                onClick={() => handleReviewRating('easy')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#92F5A4]/40 hover:bg-[#92F5A4] text-[#006D30] shadow-xs transition-all text-center border border-[#006D30]/30"
              >
                <span className="text-xs font-bold flex items-center gap-1">
                  Fácil <CheckCircle2 size={13} />
                </span>
                <span className="text-[10px] font-semibold mt-0.5">+6 dias</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1 text-center text-xs text-[#76777D]">
            <Info size={14} />
            <span>
              Protótipo didático para estudo de interface. Algoritmo real de repetição espaçada integrado ao progresso local.
            </span>
          </div>
        </div>
      </section>

      {/* 3. Coleções Temáticas em Destaque */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={20} className="text-[#1B1C1A]" />
            <h2 className="text-2xl font-bold text-[#1B1C1A] tracking-tight">
              Coleções temáticas em destaque
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedCategoryFilter('all')}
            className="text-xs font-bold text-[#006D30] hover:underline flex items-center gap-1"
          >
            <span>Ver todas as coleções</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Collection 1 */}
          <div
            onClick={() => setSelectedCategoryFilter('Trabalho')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A] group-hover:bg-[#131B2E] group-hover:text-white transition-colors">
                <Briefcase size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-[#1B1C1A]">Inglês para o trabalho</h3>
                <p className="text-xs text-[#76777D]">
                  42 termos essenciais para reuniões, e-mails executivos e negociações.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE8E4] flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] text-[10px] font-semibold text-[#45464D]">
                Nível A2–B2
              </span>
              <ChevronRight size={16} className="text-[#76777D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Collection 2 */}
          <div
            onClick={() => setSelectedCategoryFilter('Viagens')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A] group-hover:bg-[#131B2E] group-hover:text-white transition-colors">
                <Plane size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-[#1B1C1A]">Viagens internacionais</h3>
                <p className="text-xs text-[#76777D]">
                  36 palavras para aeroportos, alfândega, reservas e pedidos de direções.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE8E4] flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] text-[10px] font-semibold text-[#45464D]">
                Nível A1–B1
              </span>
              <ChevronRight size={16} className="text-[#76777D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Collection 3 */}
          <div
            onClick={() => setSelectedCategoryFilter('Alimentação')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A] group-hover:bg-[#131B2E] group-hover:text-white transition-colors">
                <Utensils size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-[#1B1C1A]">Restaurantes e cafés</h3>
                <p className="text-xs text-[#76777D]">
                  28 expressões para pedidos, pagamento de contas e cardápio.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE8E4] flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] text-[10px] font-semibold text-[#45464D]">
                Nível A1–A2
              </span>
              <ChevronRight size={16} className="text-[#76777D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Collection 4 */}
          <div
            onClick={() => setSelectedCategoryFilter('Cotidiano')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A] group-hover:bg-[#131B2E] group-hover:text-white transition-colors">
                <MessageCircle size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-[#1B1C1A]">Conversas do cotidiano</h3>
                <p className="text-xs text-[#76777D]">
                  50 expressões idiomáticas e phrasal verbs comuns para papos casuais.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE8E4] flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] text-[10px] font-semibold text-[#45464D]">
                Nível A2–B1
              </span>
              <ChevronRight size={16} className="text-[#76777D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Minha Biblioteca de Palavras */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[#1B1C1A] tracking-tight">Minha biblioteca</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAE8E4] text-xs font-semibold text-[#45464D]">
              {filteredVocabulary.length} palavras exibidas
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F5F3EF] p-1 rounded-xl border border-[#EAE8E4]">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid' ? 'bg-white text-[#1B1C1A] shadow-xs' : 'text-[#76777D]'
              }`}
            >
              <LayoutGrid size={15} />
              <span>Cartões</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'list' ? 'bg-white text-[#1B1C1A] shadow-xs' : 'text-[#76777D]'
              }`}
            >
              <List size={15} />
              <span>Lista</span>
            </button>
          </div>
        </div>

        {/* Controls, Filters & Search */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#76777D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por termo em inglês ou tradução em português..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs sm:text-sm text-[#1B1C1A] outline-none focus:border-[#006D30]"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs font-semibold text-[#1B1C1A] outline-none cursor-pointer"
              >
                <option value="all">Tema: Todos os temas</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Viagens">Viagens</option>
                <option value="Cotidiano">Cotidiano</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Conversação">Conversação</option>
              </select>

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs font-semibold text-[#1B1C1A] outline-none cursor-pointer"
              >
                <option value="all">Status: Todas</option>
                <option value="mastered">Dominadas</option>
                <option value="learning">Em aprendizado</option>
                <option value="favorite">Apenas Favoritas ⭐</option>
              </select>
            </div>
          </div>

          {/* CEFR Level Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#EAE8E4]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#76777D] mr-1">
              Nível CEFR:
            </span>
            {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => {
              const count =
                lvl === 'all'
                  ? vocabulary.length
                  : vocabulary.filter((v) => v.level === lvl).length;
              const isActive = selectedCefrFilter === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedCefrFilter(lvl)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#131B2E] text-white font-bold shadow-xs'
                      : 'bg-[#F5F3EF] text-[#45464D] hover:bg-[#EAE8E4]'
                  }`}
                >
                  {lvl === 'all' ? `Todos (${count})` : `${lvl} (${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Library Cards or Table */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVocabulary.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#EAE8E4] text-xs font-bold text-[#1B1C1A]">
                        {item.level}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#F5F3EF] text-xs text-[#76777D]">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AudioButton text={item.word} size="sm" />
                      <button
                        type="button"
                        onClick={(e) => handleToggleFavorite(item.id, e)}
                        className={`p-1.5 rounded-full hover:bg-[#F5F3EF] transition-colors ${
                          item.isFavorite ? 'text-[#D97706]' : 'text-[#76777D]'
                        }`}
                        aria-label="Favorito"
                      >
                        <Star size={17} className={item.isFavorite ? 'fill-[#D97706]' : ''} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1B1C1A]">{item.word}</h3>
                    <p className="text-sm text-[#006D30] font-semibold">{item.translation}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F5F3EF] flex flex-col gap-1 text-xs">
                    <p className="text-[#1B1C1A] italic">“{item.exampleSentenceEn}”</p>
                    <p className="text-[#76777D]">{item.exampleSentencePt}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE8E4] flex items-center justify-between text-xs">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold ${
                      item.masteryLevel === 'mastered'
                        ? 'bg-[#92F5A4]/40 text-[#006D30]'
                        : item.masteryLevel === 'learning'
                        ? 'bg-[#EAE8E4] text-[#1B1C1A]'
                        : 'bg-[#F5F3EF] text-[#76777D]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.masteryLevel === 'mastered'
                          ? 'bg-[#006D30]'
                          : item.masteryLevel === 'learning'
                          ? 'bg-[#D97706]'
                          : 'bg-[#76777D]'
                      }`}
                    />
                    {item.masteryLevel === 'mastered'
                      ? `Dominada (${item.retentionPercent}%)`
                      : item.masteryLevel === 'learning'
                      ? `Em aprendizado (${item.retentionPercent}%)`
                      : 'Nova'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setDetailsItem(item)}
                    className="font-semibold text-[#006D30] hover:underline flex items-center gap-0.5"
                  >
                    <span>Detalhes</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table / List View */
          <div className="bg-white rounded-2xl border border-[#EAE8E4] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F3EF] text-[#76777D] uppercase font-bold border-b border-[#EAE8E4]">
                  <tr>
                    <th className="py-3 px-4">Termo em Inglês</th>
                    <th className="py-3 px-4">Tradução</th>
                    <th className="py-3 px-4">Nível</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE8E4]">
                  {filteredVocabulary.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FBF9F5] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#1B1C1A]">
                        <div className="flex items-center gap-2">
                          <span>{item.word}</span>
                          <span className="text-[#76777D] font-mono text-[11px]">{item.phonetic}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#006D30] font-medium">{item.translation}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#EAE8E4] font-semibold">{item.level}</span>
                      </td>
                      <td className="py-3 px-4 text-[#45464D]">{item.category}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#1B1C1A]">{item.retentionPercent}%</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <AudioButton text={item.word} size="sm" />
                          <button
                            type="button"
                            onClick={() => handleToggleFavorite(item.id)}
                            className={`p-1.5 rounded-full ${item.isFavorite ? 'text-[#D97706]' : 'text-[#76777D]'}`}
                          >
                            <Star size={15} className={item.isFavorite ? 'fill-[#D97706]' : ''} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredVocabulary.length === 0 && (
          <div className="py-12 bg-white rounded-2xl border border-[#EAE8E4] text-center flex flex-col items-center justify-center gap-2">
            <Search size={32} className="text-[#C6C6CD]" />
            <p className="text-sm font-bold text-[#1B1C1A]">Nenhuma palavra encontrada</p>
            <p className="text-xs text-[#76777D]">
              Tente redefinir os filtros ou clique em "Adicionar termo" para cadastrar novas palavras.
            </p>
          </div>
        )}
      </section>

      {/* 5. Footer & Legend */}
      <footer className="p-6 rounded-2xl bg-[#F5F3EF] border border-[#EAE8E4] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Info size={18} className="text-[#1B1C1A]" />
            <span className="text-xs font-bold text-[#1B1C1A]">Legenda de ciclos de retenção</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap text-xs text-[#45464D]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#76777D]" />
              <span>Nova (0 revisões)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
              <span>Em aprendizado (1 a 4 revisões)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006D30]" />
              <span>Dominada (&gt; 5 revisões corretas)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportJson}
            className="px-4 py-2 rounded-xl bg-white border border-[#EAE8E4] text-[#1B1C1A] text-xs font-bold shadow-xs hover:bg-[#EAE8E4] transition-colors"
          >
            Exportar Anki (.json)
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 380, behavior: 'smooth' })}
            className="px-4 py-2 rounded-xl bg-[#131B2E] text-white text-xs font-bold shadow-xs hover:opacity-90 transition-colors"
          >
            Praticar com Flashcards
          </button>
        </div>
      </footer>

      {/* Add Word Modal */}
      <AddWordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWord={handleAddWord}
      />

      {/* Details Modal */}
      {detailsItem && (
        <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE8E4] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#76777D] tracking-wider">
                  {detailsItem.partOfSpeech} • {detailsItem.category}
                </span>
                <h3 className="text-2xl font-bold text-[#1B1C1A] mt-0.5">{detailsItem.word}</h3>
                <p className="text-xs font-mono text-[#006D30]">{detailsItem.phonetic}</p>
              </div>
              <AudioButton text={detailsItem.word} />
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F3EF] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#76777D]">Tradução:</span>
              <p className="text-sm font-bold text-[#1B1C1A]">{detailsItem.translation}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase text-[#76777D]">Exemplo de uso:</span>
              <p className="text-xs text-[#1B1C1A] italic">"{detailsItem.exampleSentenceEn}"</p>
              <p className="text-xs text-[#76777D]">"{detailsItem.exampleSentencePt}"</p>
            </div>

            <div className="pt-2 border-t border-[#EAE8E4] flex items-center justify-between text-xs">
              <span className="text-[#76777D]">Revisões: {detailsItem.reviewCount}</span>
              <button
                type="button"
                onClick={() => setDetailsItem(null)}
                className="px-4 py-2 rounded-xl bg-[#131B2E] text-white text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
