export interface FAQItem {
  question: string;
  answer: string;
  category: 'Metodologia' | 'CEFR' | 'Pronúncia' | 'Prática';
}

export const faqList: FAQItem[] = [
  {
    category: 'Metodologia',
    question: 'Por que o English Lab prioriza frases inteiras em vez de listas de palavras soltas?',
    answer:
      'Estudos em aquisição de segunda língua mostram que memorizar palavras isoladas gera travamento na hora de falar: o cérebro precisa traduzir palavra por palavra e depois montar a gramática. Ao aprender expressões completas (chunks) em diálogos contextuais, seu cérebro acessa a frase pronta de forma natural e sem hesitação.',
  },
  {
    category: 'Metodologia',
    question: 'Como funciona a Repetição Espaçada (SRS)?',
    answer:
      'A curva do esquecimento de Ebbinghaus demonstra que esquecemos até 70% do conteúdo novo em poucos dias se não revisarmos. O algoritmo de repetição espaçada agenda cada termo para o momento exato em que ele está prestes a ser esquecido, transferindo o vocabulário da memória de curto prazo para a de longo prazo com o menor esforço.',
  },
  {
    category: 'CEFR',
    question: 'O que significam os níveis A1 até C2 do CEFR?',
    answer:
      'O Quadro Europeu Comum de Referência (CEFR) é o padrão internacional de proficiência linguística: A1 (Iniciante - necessidades imediatas e cumprimentos), A2 (Básico/Elementar - rotinas e tarefas simples), B1 (Intermediário independente - viagens e opiniões), B2 (Independente superior - fluência espontânea em trabalho e conversas sociais), C1 (Avançado/Eficaz - domínio acadêmico e corporativo) e C2 (Maestria plena).',
  },
  {
    category: 'Pronúncia',
    question: 'Devo treinar sotaque americano ou britânico?',
    answer:
      'Ambos são amplamente aceitos no mundo todo. O mais importante não é eliminar seu sotaque brasileiro, mas garantir clareza fonética, ritmo natural e correta acentuação das sílabas (stress). No English Lab você pode alternar livremente entre a voz americana e britânica nas configurações.',
  },
  {
    category: 'Prática',
    question: 'Tenho vergonha de falar e errar. Como o Tutor IA ajuda?',
    answer:
      'Nosso tutor de conversação foi projetado exatamente como um santuário sem julgamentos. Você pode errar à vontade, testar frases incompletas e receber correções acolhedoras explicadas em português com alternativas polidas para o dia a dia.',
  },
  {
    category: 'Prática',
    question: 'Os meus dados e progresso são salvos?',
    answer:
      'Nesta versão inicial, todas as suas preferências, lições concluídas, palavras salvas e histórico são persistidos localmente no seu navegador através de localStorage. Você pode exportar seus dados a qualquer momento ou reiniciar a demonstração nas configurações.',
  },
];
