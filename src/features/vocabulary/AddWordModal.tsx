import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { VocabularyItem, CEFRLevel } from '../../types';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (word: VocabularyItem) => void;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({
  isOpen,
  onClose,
  onAddWord,
}) => {
  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [translation, setTranslation] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('Substantivo (noun)');
  const [category, setCategory] = useState('Cotidiano');
  const [level, setLevel] = useState<CEFRLevel>('A1');
  const [exampleEn, setExampleEn] = useState('');
  const [examplePt, setExamplePt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) return;

    const newItem: VocabularyItem = {
      id: `vocab-${Date.now()}`,
      word: word.trim(),
      phonetic: phonetic.trim() ? `/${phonetic.trim()}/` : '',
      translation: translation.trim(),
      partOfSpeech,
      contextUsage: 'Adicionado manualmente pelo estudante',
      exampleSentenceEn: exampleEn.trim() || `I use "${word.trim()}" in daily conversation.`,
      exampleSentencePt: examplePt.trim() || `Eu uso "${translation.trim()}" em conversas diárias.`,
      category,
      level,
      isFavorite: false,
      masteryLevel: 'new',
      retentionPercent: 10,
      reviewCount: 0,
      nextReviewDate: 'hoje',
    };

    onAddWord(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EAE8E4] overflow-hidden flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#EAE8E4] flex items-center justify-between bg-[#FBF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#006D30]/10 text-[#006D30] flex items-center justify-center">
              <Plus size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B1C1A]">Adicionar Novo Termo</h3>
              <p className="text-xs text-[#76777D]">Cadastre vocabulário para seu ciclo de repetição</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#76777D] hover:bg-[#EAE8E4]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B1C1A]">Termo em Inglês *</label>
              <input
                type="text"
                required
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Ex: Breakthrough"
                className="w-full px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B1C1A]">Tradução em Português *</label>
              <input
                type="text"
                required
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                placeholder="Ex: Avanço, descoberta"
                className="w-full px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B1C1A]">Transcrição / IPA</label>
              <input
                type="text"
                value={phonetic}
                onChange={(e) => setPhonetic(e.target.value)}
                placeholder="Ex: ˈbreɪk.θruː"
                className="w-full px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B1C1A]">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
              >
                <option value="Trabalho">Trabalho</option>
                <option value="Viagens">Viagens</option>
                <option value="Cotidiano">Cotidiano</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Conversação">Conversação</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B1C1A]">Nível CEFR</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CEFRLevel)}
                className="w-full px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1B1C1A]">Exemplo de Frase em Inglês</label>
            <input
              type="text"
              value={exampleEn}
              onChange={(e) => setExampleEn(e.target.value)}
              placeholder="Ex: This scientific breakthrough will change medicine."
              className="w-full px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1B1C1A]">Tradução da Frase de Exemplo</label>
            <input
              type="text"
              value={examplePt}
              onChange={(e) => setExamplePt(e.target.value)}
              placeholder="Ex: Este avanço científico vai mudar a medicina."
              className="w-full px-3 py-2 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] text-xs outline-none focus:border-[#006D30]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EAE8E4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F5F3EF] text-[#76777D] text-xs font-semibold hover:bg-[#EAE8E4]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#006D30] text-white text-xs font-bold hover:bg-[#005323] transition-colors"
            >
              Salvar Termo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
