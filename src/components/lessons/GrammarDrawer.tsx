import React, { useState } from 'react';
import { X, BookOpen, AlertCircle, CheckCircle, Volume2 } from 'lucide-react';
import { a1GrammarRules, GrammarRule } from '../../data/grammarData';
import { AudioButton } from '../ui/AudioButton';

interface GrammarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRuleId?: string;
}

export const GrammarDrawer: React.FC<GrammarDrawerProps> = ({
  isOpen,
  onClose,
  selectedRuleId,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    selectedRuleId || a1GrammarRules[0].id
  );

  if (!isOpen) return null;

  const currentRule = a1GrammarRules.find((r) => r.id === activeTabId) || a1GrammarRules[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EAE8E4] overflow-hidden flex flex-col max-h-[90vh] z-50 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE8E4] flex items-center justify-between bg-[#FBF9F5]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#006D30]/10 text-[#006D30] flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1B1C1A]">Caderno de Regras & Exemplos (A1)</h2>
              <p className="text-xs text-[#76777D]">Estruturas consolidadas do Quadro Europeu para iniciantes</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#76777D] hover:bg-[#EAE8E4] transition-colors"
            aria-label="Fechar guia"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-[#F5F3EF] border-b border-[#EAE8E4] overflow-x-auto">
          {a1GrammarRules.map((rule) => {
            const isActive = rule.id === currentRule.id;
            return (
              <button
                key={rule.id}
                type="button"
                onClick={() => setActiveTabId(rule.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#131B2E] text-white shadow-sm font-bold'
                    : 'bg-white text-[#45464D] hover:bg-[#EAE8E4]'
                }`}
              >
                {rule.topic}
              </button>
            );
          })}
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status & Summary */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1B1C1A]">{currentRule.topic}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#92F5A4]/40 text-[#006D30]">
                {currentRule.status}
              </span>
            </div>
            <p className="text-sm text-[#45464D] leading-relaxed bg-[#FBF9F5] p-3.5 rounded-xl border border-[#EAE8E4]">
              {currentRule.explanation}
            </p>
          </div>

          {/* Examples list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#76777D]">
              Exemplos com Áudio & Tradução:
            </h4>
            <div className="space-y-2.5">
              {currentRule.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1B1C1A]">"{ex.en}"</span>
                      {ex.note && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E4E2DE] text-[#45464D] font-medium">
                          {ex.note}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#006D30] font-medium">{ex.pt}</p>
                  </div>
                  <AudioButton text={ex.en} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          {currentRule.commonMistakes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#BA1A1A] flex items-center gap-1.5">
                <AlertCircle size={15} />
                Erros Comuns de Falantes de Português:
              </h4>
              <div className="space-y-2">
                {currentRule.commonMistakes.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FFDAD6]/20 border border-[#BA1A1A]/20 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-[#BA1A1A] line-through font-semibold">
                        ❌ "{m.wrong}"
                      </div>
                      <span className="hidden sm:inline text-[#76777D]">→</span>
                      <div className="flex items-center gap-1.5 text-[#006D30] font-bold">
                        <CheckCircle size={14} />
                        "{m.correct}"
                      </div>
                    </div>
                    <p className="text-xs text-[#45464D] leading-relaxed">{m.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FBF9F5] border-t border-[#EAE8E4] flex items-center justify-between">
          <span className="text-xs text-[#76777D]">Dica: Pratique a escuta ativa repetindo as frases em voz alta.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#131B2E] text-white text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
