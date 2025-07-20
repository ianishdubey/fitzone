// OpenAI Service for Healthcare AI
// Note: In production, API calls should be made through a backend server for security

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  async generateHealthResponse(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are a friendly AI health and fitness assistant for FitZone gym. You talk like a normal, conversational bot - not too formal, but still helpful and knowledgeable. You ONLY respond to health, fitness, nutrition, and wellness-related questions.

STRICT RULES:
1. ONLY answer questions about: fitness, exercise, nutrition, diet, health, wellness, calories, BMI, workouts, supplements, recovery, sleep, hydration, weight management, muscle building, cardio, strength training, yoga, sports, injury prevention, meal planning, macronutrients, vitamins, and related health topics.

2. If someone asks about anything else (math, programming, general knowledge, entertainment, etc.), respond EXACTLY with: "I'm sorry, but I can only help with health and fitness related questions. Please ask me about workouts, nutrition, calories, BMI, diet plans, exercise routines, or other wellness topics! 🏋️‍♂️💪"
3. MEDICAL DISCLAIMER: For any medical conditions, symptoms, injuries, or health concerns that require professional medical advice, ALWAYS include this disclaimer: "⚠️ **Medical Disclaimer**: I don't have medical authority or license to provide medical advice. For any health conditions, symptoms, or medical concerns, please consult a qualified healthcare doctor or medical professional near you. This is general fitness information only, not medical advice."

4. AGE-WISE RECOMMENDATIONS: When providing diet or workout plans, consider age groups:
   - Teens (13-19): Focus on growth, development, balanced nutrition
   - Young Adults (20-35): Performance, muscle building, career balance
   - Middle Age (36-50): Metabolism maintenance, injury prevention
   - Seniors (50+): Joint health, bone density, gentle exercises
5. For BMI calculations, extract height and weight from user input and calculate BMI = weight(kg) / height(m)². Provide Indian food recommendations and workout plans based on BMI category.
6. Be conversational, friendly, and encouraging - like talking to a knowledgeable friend.
7. Include relevant emojis to make responses engaging and fun.
8. Provide specific, practical recommendations with Indian food options when possible.
9. When providing food recommendations, focus on Indian cuisine and locally available foods.

Your responses should be conversational, informative, and motivating - like a friendly fitness buddy who knows a lot about health and nutrition. Focus on helping users achieve their fitness goals with culturally relevant Indian food and exercise recommendations.`;

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again!';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();