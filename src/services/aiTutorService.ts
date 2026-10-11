import { ChatMessage } from '../types';

export interface TutorResponse {
  message: string;
  correctionTip?: {
    original: string;
    suggested: string;
    explanation: string;
    ruleTitle: string;
  };
  suggestedNextReplies?: string[];
  isDemo: boolean;
}

export const aiTutorService = {
  isConfigured(): boolean {
    // Front-end service check: configured if server endpoint exists or demo mode active
    return false; // Returns false to explicitly declare demonstrative mode
  },

  async generateTutorReply(
    userText: string,
    scenarioId: string,
    _history: ChatMessage[]
  ): Promise<TutorResponse> {
    // Artificial slight latency to mirror conversational turn (500-800ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const lower = userText.toLowerCase().trim();

    // Check for common Brazilian learner patterns (e.g., "I want coffee")
    if (lower.includes('i want') && (lower.includes('coffee') || lower.includes('drink') || lower.includes('water'))) {
      return {
        message:
          'Great start, Beatriz! In English, when ordering at a coffee shop, we usually make it more polite. For example: "I\'d like a coffee, please." or "Can I have a coffee, please?" What kind of coffee would you like: an espresso, an iced latte, or a cappuccino?',
        correctionTip: {
          original: userText,
          suggested: "I'd like a coffee, please.",
          ruleTitle: 'Dica de Cortesia no Cotidiano',
          explanation:
            'No dia a dia em países anglófonos, "I want" soa muito direto ou até autoritário ao atendente. "I would like" (ou na fala fluida contraída "I\'d like") é a fórmula perfeita de cordialidade!',
        },
        suggestedNextReplies: [
          "I'd like a cappuccino, please.",
          "Can I have an iced latte, please?",
          "How much is an espresso?",
        ],
        isDemo: true,
      };
    }

    if (lower.includes("i'd like") || lower.includes('can i have') || lower.includes('could i have')) {
      if (lower.includes('cappuccino') || lower.includes('latte') || lower.includes('coffee') || lower.includes('tea')) {
        return {
          message:
            'Excellent! Perfect polite phrasing! That will be $4.50. Would you like that for here or to go? ☕',
          suggestedNextReplies: ['For here, please!', 'To go, please.', 'Can I pay with credit card?'],
          isDemo: true,
        };
      }
      return {
        message:
          'Sure thing! That sounds delicious. Would you like anything else to eat with that, like a croissant or a blueberry muffin?',
        suggestedNextReplies: ['A croissant, please!', "No, that's all, thank you.", 'How much is the muffin?'],
        isDemo: true,
      };
    }

    if (lower.includes('for here') || lower.includes('to go') || lower.includes('takeaway')) {
      return {
        message:
          'Got it! Your order is being prepared right now. You can tap your card or pay with cash whenever you are ready! Total is $4.50.',
        suggestedNextReplies: ['Here is my card.', 'Can I get a receipt?', 'Thank you so much!'],
        isDemo: true,
      };
    }

    if (lower.includes('card') || lower.includes('cash') || lower.includes('pay') || lower.includes('dollars')) {
      return {
        message:
          'Payment approved! Here is your coffee and your receipt. Have a wonderful and productive day! ☕✨',
        suggestedNextReplies: ['Thank you, you too!', 'Have a great day!', 'See you next time!'],
        isDemo: true,
      };
    }

    if (lower.includes('thank') || lower.includes('bye') || lower.includes('have a great')) {
      return {
        message:
          'You did an outstanding job practicing today! You maintained great fluency and natural rhythm. Ready for our next scenario?',
        suggestedNextReplies: ['Restart scenario', 'Try another topic', 'Go to dashboard'],
        isDemo: true,
      };
    }

    // Default polite contextual response depending on scenario
    if (scenarioId === 'scenario-intro') {
      return {
        message:
          'Nice to meet you! Telling people about your background is a great way to start conversations. What do you like most about your routine?',
        suggestedNextReplies: [
          'I really enjoy drinking coffee in the morning.',
          'I like learning new languages.',
          'I love spending time with family.',
        ],
        isDemo: true,
      };
    }

    return {
      message:
        'Great phrase! You communicated your idea clearly. Would you like to practice ordering another item, or should we review how to ask for the bill?',
      suggestedNextReplies: [
        'How much is it in total?',
        "Can I get the receipt, please?",
        "That's all for today, thank you!",
      ],
      isDemo: true,
    };
  },
};
