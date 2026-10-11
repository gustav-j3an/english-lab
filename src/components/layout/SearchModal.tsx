import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { a1Modules, initialVocabulary } from '../../data/initialData';
import { a1GrammarRules } from '../../data/grammarData';
import { NavTab } from './Sidebar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab, extra?: { lessonId?: string; wordId?: string; grammarId?: string }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter lessons
  const filteredLessons = a1Modules
    .flatMap((m) => m.units)
    .filter(
      (u) =>
        !q ||
        u.title.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q)
    )
    .slice(0, 4);

  // Filter vocabulary
  const filteredVocab = initialVocabulary
    .filter(
      (v) =>
        !q ||
        v.word.toLowerCase().includes(q) ||
        v.translation.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
    )
    .slice(0, 4);

  // Filter grammar rules
  const filteredGrammar = a1GrammarRules
    .filter(
      (g) =>
        !q ||
        g.topic.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.explanation.toLowerCase().includes(q)
    )
    .slice(0, 3);

  const hasResults =
    filteredLessons.length > 0 || filteredVocab.length > 0 || filteredGrammar.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EAE8E4] overflow-hidden flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#EAE8E4] gap-3">
          <Search size={20} className="text-[#76777D]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por lições, palavras em inglês ou regras gramaticais..."
            className="flex-1 text-sm sm:text-base text-[#1B1C1A] placeholder:text-[#76777D] outline-none bg-transparent"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#76777D] hover:bg-[#F5F3EF]"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#76777D] hover:text-[#1B1C1A] px-2 py-1 rounded bg-[#F5F3EF]"
          >
            ESC
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-5">
          {/* Lessons Section */}
          {filteredLessons.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-[#76777D] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#006D30]" />
                Lições e Módulos
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredLessons.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      onNavigate('aprender', { lessonId: l.id });
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F3EF] text-left transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#1B1C1A] group-hover:text-[#006D30]">
                        {l.title}
                      </span>
                      <span className="text-xs text-[#45464D] line-clamp-1">{l.description}</span>
                    </div>
                    <ArrowRight size={15} className="text-[#76777D] group-hover:text-[#006D30] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vocabulary Section */}
          {filteredVocab.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-[#76777D] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#006D30]" />
                Vocabulário & Expressões
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredVocab.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      onNavigate('vocabulario', { wordId: v.id });
                      onClose();
                    }}
                    className="flex flex-col p-2.5 rounded-xl border border-[#EAE8E4] hover:border-[#006D30] hover:bg-[#F5F3EF] text-left transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#1B1C1A]">{v.word}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E4E2DE] text-[#45464D] font-semibold">
                        {v.level}
                      </span>
                    </div>
                    <span className="text-xs text-[#006D30] font-medium">{v.translation}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Grammar Rules Section */}
          {filteredGrammar.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-[#76777D] uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle size={14} className="text-[#006D30]" />
                Gramática & Dicas
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredGrammar.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      onNavigate('aprender', { grammarId: g.id });
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F3EF] text-left transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#1B1C1A] group-hover:text-[#006D30]">
                        {g.topic}
                      </span>
                      <span className="text-xs text-[#45464D] line-clamp-1">{g.summary}</span>
                    </div>
                    <ArrowRight size={15} className="text-[#76777D] group-hover:text-[#006D30] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!hasResults && (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-2">
              <Search size={32} className="text-[#C6C6CD]" />
              <p className="text-sm font-semibold text-[#1B1C1A]">Nenhum resultado encontrado para "{query}"</p>
              <p className="text-xs text-[#76777D]">Tente pesquisar por termos como "coffee", "present simple", "directions" ou "verb to be".</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#F5F3EF] border-t border-[#EAE8E4] flex items-center justify-between text-[11px] text-[#76777D]">
          <span>Navegue com setas ou clique no resultado desejado</span>
          <span>English Lab Search v1</span>
        </div>
      </div>
    </div>
  );
};
