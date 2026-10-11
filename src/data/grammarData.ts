export interface GrammarRule {
  id: string;
  topic: string;
  level: string;
  status: 'Dominado' | 'Em prática' | 'Próximo tópico';
  summary: string;
  explanation: string;
  examples: {
    en: string;
    pt: string;
    note?: string;
  }[];
  commonMistakes: {
    wrong: string;
    correct: string;
    why: string;
  }[];
}

export const a1GrammarRules: GrammarRule[] = [
  {
    id: 'verb-to-be',
    topic: '1. Verb to Be',
    level: 'A1',
    status: 'Dominado',
    summary: "I am, You are, He/She is. Perguntas invertidas e contrações naturais (I'm, aren't).",
    explanation:
      'O verbo "to be" significa "ser" ou "estar", dependendo do contexto. Ao contrário do português, o inglês não tem verbos diferentes para essas duas ideias. Em conversas naturais, nativos quase sempre usam contrações.',
    examples: [
      { en: "I'm a student from São Paulo.", pt: 'Eu sou um estudante de São Paulo.', note: 'Contração de I am' },
      { en: 'She is not here right now.', pt: 'Ela não está aqui agora.' },
      { en: 'Are you ready to order?', pt: 'Você está pronto para pedir?', note: 'Inversão do verbo para pergunta' },
    ],
    commonMistakes: [
      {
        wrong: 'I have 25 years old.',
        correct: 'I am 25 years old.',
        why: 'Em inglês, idade é um estado do ser ("to be"), não uma posse ("have").',
      },
    ],
  },
  {
    id: 'present-simple',
    topic: '2. Present Simple',
    level: 'A1',
    status: 'Em prática',
    summary: 'Ações rotineiras, terceira pessoa com "-s", auxiliares Do / Does e Don\'t / Doesn\'t.',
    explanation:
      'Usado para hábitos, fatos e rotinas diárias. Atenção especial à 3ª pessoa do singular (he, she, it), onde o verbo recebe "-s" ou "-es", e perguntas usam o auxiliar "Does".',
    examples: [
      { en: 'I drink coffee every morning.', pt: 'Eu bebo café todas as manhãs.' },
      { en: 'She lives in Seattle.', pt: 'Ela mora em Seattle.', note: 'Regra do -s para he/she/it' },
      { en: "Do you like black tea? - No, I don't.", pt: 'Você gosta de chá preto? - Não, não gosto.' },
    ],
    commonMistakes: [
      {
        wrong: 'He live in London.',
        correct: 'He lives in London.',
        why: 'A terceira pessoa no Present Simple sempre exige a terminação em -s.',
      },
    ],
  },
  {
    id: 'wh-questions',
    topic: '3. Wh- Questions',
    level: 'A1',
    status: 'Próximo tópico',
    summary: 'Who (quem), Where (onde), When (quando), Why (por que) e What time (que horas).',
    explanation:
      'Palavras interrogativas essenciais para obter informações específicas. A estrutura típica é: Wh- Word + Auxiliar (do/does/is/are) + Sujeito + Verbo Principal.',
    examples: [
      { en: 'Where is the nearest subway station?', pt: 'Onde fica a estação de metrô mais próxima?' },
      { en: 'What time does the café open?', pt: 'Que horas a cafeteria abre?' },
      { en: 'How much is this iced coffee?', pt: 'Quanto custa este café gelado?' },
    ],
    commonMistakes: [
      {
        wrong: 'Where you work?',
        correct: 'Where do you work?',
        why: 'No inglês, perguntas no presente simples exigem o verbo auxiliar "do" antes do sujeito.',
      },
    ],
  },
  {
    id: 'polite-requests',
    topic: "4. Polite Requests ('Would like' & 'Could')",
    level: 'A1-A2',
    status: 'Em prática',
    summary: 'Fazendo pedidos com gentileza em serviços, cafeterias e hotéis.',
    explanation:
      'Em inglês falado, usar "I want" ao atendente pode soar rude ou exigente. O padrão cortês é "I\'d like" (I would like) ou "Could I have... / Can I get...".',
    examples: [
      { en: "I'd like a medium latte, please.", pt: 'Eu gostaria de um latte médio, por favor.' },
      { en: 'Could I have the check, please?', pt: 'Poderia me trazer a conta, por favor?' },
    ],
    commonMistakes: [
      {
        wrong: 'Give me a coffee.',
        correct: "I'd like a coffee, please.",
        why: 'Evite imperativos em balcões de atendimento para manter o tom amigável e respeitoso.',
      },
    ],
  },
];
