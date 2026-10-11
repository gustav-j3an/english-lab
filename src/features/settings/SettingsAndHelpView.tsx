import React, { useState } from 'react';
import {
  Settings,
  HelpCircle,
  Volume2,
  Clock,
  Globe,
  Database,
  RotateCcw,
  Download,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { UserPreferences, User } from '../../types';
import { faqList } from '../../data/faqData';
import { storageService } from '../../services/storageService';

interface SettingsAndHelpViewProps {
  user: User;
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: UserPreferences) => void;
  onResetData: () => void;
  defaultTab?: 'configuracoes' | 'ajuda';
}

export const SettingsAndHelpView: React.FC<SettingsAndHelpViewProps> = ({
  user,
  preferences,
  onUpdatePreferences,
  onResetData,
  defaultTab = 'configuracoes',
}) => {
  const [activeSection, setActiveSection] = useState<'configuracoes' | 'ajuda'>(defaultTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const handleUpdate = (patch: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...patch };
    onUpdatePreferences(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = storageService.exportBackupJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english_lab_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE8E4] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE8E4] text-[#45464D] text-[10px] font-bold uppercase tracking-wider mb-2">
            <span>Preferências & Suporte Pedagógico</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1B1C1A]">Configurações e Ajuda</h1>
          <p className="text-sm text-[#45464D] mt-1">
            Personalize seu ritmo de aprendizado, preferências de áudio e consulte o guia para destravar no inglês.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-[#EAE8E4]">
          <button
            type="button"
            onClick={() => setActiveSection('configuracoes')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'configuracoes'
                ? 'bg-white text-[#1B1C1A] shadow-xs'
                : 'text-[#45464D] hover:text-[#1B1C1A]'
            }`}
          >
            <Settings size={15} />
            <span>Configurações</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('ajuda')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'ajuda'
                ? 'bg-white text-[#1B1C1A] shadow-xs'
                : 'text-[#45464D] hover:text-[#1B1C1A]'
            }`}
          >
            <HelpCircle size={15} />
            <span>Ajuda & FAQ</span>
          </button>
        </div>
      </header>

      {savedToast && (
        <div className="p-3 bg-[#92F5A4]/40 border border-[#006D30]/30 rounded-xl text-xs text-[#006D30] font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <Check size={16} />
          <span>Preferências salvas localmente com sucesso!</span>
        </div>
      )}

      {/* SECTION: CONFIGURAÇÕES */}
      {activeSection === 'configuracoes' && (
        <div className="space-y-6">
          {/* Card: Metas Diárias */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                <Clock size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1B1C1A]">Meta Diária de Estudos</h2>
                <p className="text-xs text-[#76777D]">Defina o tempo diário para consolidar o hábito</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[15, 25, 40, 60].map((min) => (
                <button
                  key={min}
                  type="button"
                  onClick={() => handleUpdate({ dailyGoalMinutes: min })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    preferences.dailyGoalMinutes === min
                      ? 'border-[#006D30] bg-[#92F5A4]/25 shadow-xs font-bold text-[#006D30]'
                      : 'border-[#EAE8E4] bg-[#F5F3EF] hover:bg-white text-[#1B1C1A]'
                  }`}
                >
                  <span className="text-lg font-bold block">{min} min</span>
                  <span className="text-[10px] text-[#76777D]">
                    {min === 25 ? 'Recomendado' : 'Por dia'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Card: Preferências de Áudio & Fala */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                <Volume2 size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1B1C1A]">Pronúncia e Áudio Nativo</h2>
                <p className="text-xs text-[#76777D]">
                  Configure velocidade de fala e sotaque padrão do sintetizador
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Accent selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1B1C1A] block">Sotaque Preferencial</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdate({ accent: 'US' })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      preferences.accent === 'US'
                        ? 'border-[#006D30] bg-[#92F5A4]/25 text-[#006D30]'
                        : 'border-[#EAE8E4] bg-[#F5F3EF] text-[#45464D]'
                    }`}
                  >
                    🇺🇸 Americano (US)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdate({ accent: 'UK' })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      preferences.accent === 'UK'
                        ? 'border-[#006D30] bg-[#92F5A4]/25 text-[#006D30]'
                        : 'border-[#EAE8E4] bg-[#F5F3EF] text-[#45464D]'
                    }`}
                  >
                    🇬🇧 Britânico (UK)
                  </button>
                </div>
              </div>

              {/* Speed selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1B1C1A] block">Velocidade da Voz</label>
                <div className="grid grid-cols-3 gap-2">
                  {[0.8, 1.0, 1.2].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleUpdate({ speechRate: rate })}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        preferences.speechRate === rate
                          ? 'border-[#006D30] bg-[#92F5A4]/25 text-[#006D30]'
                          : 'border-[#EAE8E4] bg-[#F5F3EF] text-[#45464D]'
                      }`}
                    >
                      {rate === 0.8 ? '0.8x Lento' : rate === 1.0 ? '1.0x Normal' : '1.2x Rápido'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card: Dados & Persistência Local */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] flex items-center justify-center text-[#1B1C1A]">
                <Database size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1B1C1A]">Dados Locais & Backup</h2>
                <p className="text-xs text-[#76777D]">
                  Seus dados estão preservados no navegador através de LocalStorage
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F3EF] border border-[#EAE8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#1B1C1A]">Exportar arquivo de backup</span>
                <p className="text-xs text-[#76777D]">
                  Faça o download do progresso completo e do vocabulário em formato JSON.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadBackup}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE8E4] text-[#1B1C1A] text-xs font-bold hover:bg-[#EAE8E4] transition-colors flex items-center gap-2 shrink-0 shadow-xs"
              >
                <Download size={15} />
                <span>Exportar JSON</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#FFDAD6]/20 border border-[#BA1A1A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#BA1A1A]">Redefinir Dados de Demonstração</span>
                <p className="text-xs text-[#45464D]">
                  Restaura o estado inicial do curso, vocabulário e histórico.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Tem certeza que deseja restaurar os dados iniciais demonstrativos?')) {
                    onResetData();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#BA1A1A] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0"
              >
                <RotateCcw size={14} />
                <span>Resetar Dados</span>
              </button>
            </div>
          </div>

          {/* Card: Arquitetura & Exportação para VS Code */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B1C1A]">
              <Terminal size={17} className="text-[#006D30]" />
              <span>Preparado para Clonagem e Desenvolvimento no VS Code</span>
            </div>
            <p className="text-xs text-[#45464D] leading-relaxed">
              O projeto foi arquitetado com separação estrita de camadas (`types/`, `data/`, `services/`, `features/`, `components/`), permitindo exportar diretamente para seu repositório no GitHub e continuar evoluindo com backend Node/Express e banco de dados.
            </p>
          </div>
        </div>
      )}

      {/* SECTION: AJUDA & FAQ */}
      {activeSection === 'ajuda' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EAE8E4] shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#006D30] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={18} />
              <span>Metodologia Imersiva para Brasileiros</span>
            </div>
            <h2 className="text-xl font-bold text-[#1B1C1A]">Perguntas Frequentes (FAQ)</h2>
            <p className="text-xs text-[#45464D]">
              Entenda como destravar na conversação, como funciona o CEFR e como tirar o máximo proveito da plataforma.
            </p>
          </div>

          <div className="space-y-3">
            {faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EAE8E4] bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F5F3EF]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-[#EAE8E4] text-[10px] font-bold text-[#45464D] shrink-0">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#1B1C1A]">{item.question}</h3>
                    </div>
                    {isOpen ? <ChevronUp size={18} className="text-[#76777D]" /> : <ChevronDown size={18} className="text-[#76777D]" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#45464D] leading-relaxed border-t border-[#F5F3EF]">
                      <p className="bg-[#F5F3EF] p-4 rounded-xl">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sanctuary note */}
          <div className="p-5 rounded-2xl bg-[#92F5A4]/25 border border-[#006D30]/20 flex items-start gap-3">
            <Info size={20} className="text-[#006D30] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[#1B1C1A]">Dica de Ouro para Prática</h4>
              <p className="text-xs text-[#45464D] leading-relaxed">
                Estudar 15 a 20 minutos todos os dias gera um resultado até 5 vezes maior do que estudar 3 horas apenas uma vez na semana. A consistência diária constrói as conexões neurais da fala automática.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
