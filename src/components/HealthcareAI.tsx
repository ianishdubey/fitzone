import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Heart, Activity } from 'lucide-react';
import { openaiService } from '../services/openaiService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const HealthcareAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your FitZone AI Health Assistant 🏥💪 I'm here to help you with fitness, nutrition, health, and wellness questions. Ask me about calories, BMI, workout routines, diet plans, and more!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isHealthFitnessQuery = (query: string): boolean => {
    const healthKeywords = [
      'fitness', 'health', 'workout', 'exercise', 'diet', 'nutrition', 'calories', 'bmi', 
      'weight', 'muscle', 'cardio', 'strength', 'protein', 'carbs', 'fat', 'vitamin',
      'supplement', 'gym', 'training', 'running', 'walking', 'yoga', 'pilates',
      'metabolism', 'deficit', 'surplus', 'macros', 'hydration', 'sleep', 'recovery',
      'injury', 'pain', 'stretch', 'flexibility', 'endurance', 'stamina', 'heart rate',
      'blood pressure', 'cholesterol', 'diabetes', 'obesity', 'lean', 'bulk', 'cut',
      'reps', 'sets', 'form', 'technique', 'equipment', 'treadmill', 'weights',
      'bodybuilding', 'powerlifting', 'crossfit', 'hiit', 'tabata', 'circuit',
      'meal', 'food', 'eating', 'hunger', 'appetite', 'portion', 'serving',
      'organic', 'natural', 'healthy', 'unhealthy', 'junk', 'processed'
    ];
    
    const lowerQuery = query.toLowerCase();
    return healthKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Check if the query is health/fitness related
    if (!isHealthFitnessQuery(userMessage)) {
      return "I'm sorry, but I can only help with health and fitness related questions. Please ask me about workouts, nutrition, calories, BMI, diet plans, exercise routines, or other wellness topics! 🏋️‍♂️💪";
    }

    try {
      // Try to use OpenAI API first, fallback to simulated responses
      try {
        const response = await openaiService.generateHealthResponse(userMessage);
        return response;
      } catch (apiError) {
        console.log('OpenAI API not available, using fallback responses');
        const response = await simulateHealthcareAI(userMessage);
        return response;
      }
    } catch (error) {
      return "I'm having trouble processing your request right now. Please try again in a moment! 🤖";
    }
  };

  const simulateHealthcareAI = async (query: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerQuery = query.toLowerCase();
    
    // Medical condition check
    const medicalKeywords = ['pain', 'injury', 'hurt', 'sick', 'disease', 'condition', 'symptom', 'medicine', 'medication', 'doctor', 'treatment', 'diagnosis'];
    const hasMedicalQuery = medicalKeywords.some(keyword => lowerQuery.includes(keyword));
    
    if (hasMedicalQuery) {
      return `⚠️ **Medical Disclaimer**: Hey! I don't have medical authority or license to provide medical advice. For any health conditions, symptoms, or medical concerns, please consult a qualified healthcare doctor or medical professional near you. 

I can help with general fitness, nutrition, and wellness tips, but anything medical needs a real doctor's attention! 👨‍⚕️

Is there anything about fitness, workouts, or nutrition I can help you with instead? 💪`;
    }

    // Age-wise recommendations check
    const ageMatch = query.match(/(\d+)\s*(?:years?\s*old|age)/i);
    let ageGroup = '';
    let ageAdvice = '';
    
    if (ageMatch) {
      const age = parseInt(ageMatch[1]);
      if (age >= 13 && age <= 19) {
        ageGroup = 'Teen (13-19)';
        ageAdvice = `
**🧒 Teen Nutrition Focus:**
- **Growth Support**: Extra protein for development
- **Energy Foods**: Complex carbs for active lifestyle
- **Calcium Rich**: Milk, paneer, til for bone growth
- **Avoid**: Junk food, excessive sugar

**💪 Teen Workout Plan:**
- Bodyweight exercises (push-ups, squats)
- Sports activities (cricket, football, badminton)
- Light weight training (with supervision)
- Focus on form over heavy weights`;
      } else if (age >= 20 && age <= 35) {
        ageGroup = 'Young Adult (20-35)';
        ageAdvice = `
**🚀 Young Adult Nutrition:**
- **Performance Focus**: High protein for muscle building
- **Balanced Macros**: 30% protein, 40% carbs, 30% fats
- **Pre/Post Workout**: Banana + protein shake
- **Career Balance**: Meal prep for busy schedule

**🏋️‍♂️ Young Adult Workout:**
- Strength training 4-5x/week
- HIIT for fat loss
- Progressive overload
- Mix of compound movements`;
      } else if (age >= 36 && age <= 50) {
        ageGroup = 'Middle Age (36-50)';
        ageAdvice = `
**⚖️ Middle Age Nutrition:**
- **Metabolism Support**: Smaller, frequent meals
- **Anti-inflammatory**: Turmeric, ginger, green tea
- **Portion Control**: Mindful eating
- **Hydration**: 3-4 liters water daily

**🧘‍♂️ Middle Age Workout:**
- Strength training 3x/week
- Low-impact cardio
- Flexibility and mobility work
- Joint-friendly exercises`;
      } else if (age >= 50) {
        ageGroup = 'Senior (50+)';
        ageAdvice = `
**👴 Senior Nutrition:**
- **Bone Health**: Calcium, Vitamin D rich foods
- **Easy Digestion**: Soft dal, khichdi, fruits
- **Heart Health**: Omega-3, nuts, fish
- **Gentle Portions**: Smaller, nutrient-dense meals

**🚶‍♂️ Senior Workout:**
- Walking 30 minutes daily
- Chair exercises
- Gentle yoga and stretching
- Balance and coordination work

⚠️ **Important**: Please consult your doctor before starting any new exercise program.`;
      }
    }

    // BMI Calculator with height and weight
    if (lowerQuery.includes('bmi') || lowerQuery.includes('body mass index')) {
      // Extract height and weight from the query
      const heightMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:cm|centimeter|meter|m|feet|ft|inch|in)/i);
      const weightMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilogram|pound|lb|lbs)/i);
      
      if (heightMatch && weightMatch) {
        let height = parseFloat(heightMatch[1]);
        let weight = parseFloat(weightMatch[1]);
        
        // Convert height to meters if needed
        if (lowerQuery.includes('cm') || lowerQuery.includes('centimeter')) {
          height = height / 100;
        } else if (lowerQuery.includes('feet') || lowerQuery.includes('ft')) {
          height = height * 0.3048;
        } else if (lowerQuery.includes('inch') || lowerQuery.includes('in')) {
          height = height * 0.0254;
        }
        
        // Convert weight to kg if needed
        if (lowerQuery.includes('pound') || lowerQuery.includes('lb')) {
          weight = weight * 0.453592;
        }
        
        const bmi = weight / (height * height);
        let category = '';
        let recommendation = '';
        let indianFoodPlan = '';
        let workoutPlan = '';
        
        if (bmi < 18.5) {
          category = 'Underweight';
          recommendation = 'You need to gain weight in a healthy way.';
          indianFoodPlan = `
**🍛 Indian Weight Gain Food Plan:**

**Breakfast:**
- Paratha with ghee + Curd
- Banana milkshake with almonds
- Poha with peanuts

**Mid-Morning:**
- Mixed nuts (almonds, walnuts, dates)
- Lassi or buttermilk

**Lunch:**
- Rice + Dal + Sabzi + Roti
- Paneer curry or chicken curry
- Curd with cucumber

**Evening Snack:**
- Samosa or pakora (occasionally)
- Fruit chaat with chaat masala
- Coconut water

**Dinner:**
- Khichdi with ghee
- Fish curry or egg curry
- Warm milk with turmeric before bed`;
          
          workoutPlan = `
**💪 Weight Gain Workout Plan:**

**3-4 days/week:**
- Squats: 3 sets x 8-10 reps
- Push-ups: 3 sets x 5-8 reps
- Lunges: 3 sets x 8 each leg
- Planks: 3 sets x 30 seconds
- Light cardio: 15-20 minutes

**Focus:** Strength training to build muscle mass`;
        } else if (bmi >= 18.5 && bmi < 25) {
          category = 'Normal Weight';
          recommendation = 'Great! Maintain your current weight with balanced nutrition.';
          indianFoodPlan = `
**🥗 Indian Maintenance Food Plan:**

**Breakfast:**
- Upma or oats with vegetables
- Green tea or black coffee
- 1 fruit (apple/banana)

**Mid-Morning:**
- Handful of nuts or sprouts

**Lunch:**
- 1 roti + brown rice (small portion)
- Dal + vegetable curry
- Salad with lemon

**Evening Snack:**
- Roasted chana or makhana
- Green tea

**Dinner:**
- Light dal + 1 roti
- Steamed vegetables
- Curd (small bowl)`;
          
          workoutPlan = `
**🏃‍♂️ Maintenance Workout Plan:**

**5 days/week:**
- Cardio: 30 minutes (walking/cycling)
- Strength training: 3 days/week
- Yoga: 2 days/week
- Core exercises: Daily 10 minutes

**Focus:** Overall fitness and health maintenance`;
        } else if (bmi >= 25 && bmi < 30) {
          category = 'Overweight';
          recommendation = 'Focus on gradual weight loss through diet and exercise.';
          indianFoodPlan = `
**🥬 Indian Weight Loss Food Plan:**

**Breakfast:**
- Vegetable daliya or oats
- Green tea
- 1 small fruit

**Mid-Morning:**
- Cucumber or carrot sticks
- Buttermilk (without sugar)

**Lunch:**
- 1 small roti + lots of vegetables
- Dal (small portion)
- Large salad with lemon

**Evening Snack:**
- Roasted makhana or green tea
- Sprouts chaat

**Dinner:**
- Clear vegetable soup
- Grilled paneer or chicken
- Steamed vegetables`;
          
          workoutPlan = `
**🔥 Weight Loss Workout Plan:**

**6 days/week:**
- Cardio: 45 minutes (brisk walking/cycling)
- Strength training: 3 days/week
- HIIT: 2 days/week (20 minutes)
- Yoga: 1 day/week

**Focus:** Fat burning and muscle preservation`;
        } else {
          category = 'Obese';
          recommendation = 'I recommend consulting a healthcare professional for a comprehensive weight loss plan.';
          indianFoodPlan = `
**🥒 Indian Therapeutic Food Plan:**

**Breakfast:**
- Vegetable upma (small portion)
- Green tea

**Mid-Morning:**
- Cucumber water or lemon water

**Lunch:**
- Large salad + 1 small roti
- Clear dal
- Steamed vegetables

**Evening Snack:**
- Green tea or herbal tea
- Roasted chana (small portion)

**Dinner:**
- Clear soup
- Boiled vegetables
- Curd (fat-free)

**⚠️ Please consult a nutritionist for personalized guidance**`;
          
          workoutPlan = `
**🚶‍♂️ Gentle Start Workout Plan:**

**Start with:**
- Walking: 20-30 minutes daily
- Light stretching: 10 minutes
- Water aerobics (if available)
- Gradually increase intensity

**⚠️ Please consult a doctor before starting any exercise program**`;
        }
        
        let bmiResponse = `Hey! Let me calculate your BMI for you! 📊

**Your BMI Results:**

**Height:** ${height.toFixed(2)} meters
**Weight:** ${weight.toFixed(1)} kg
**BMI:** ${bmi.toFixed(1)}
**Category:** ${category} ${category === 'Normal Weight' ? '🎉' : category === 'Underweight' ? '📈' : '📉'}

**What this means:** ${recommendation}

${indianFoodPlan}

${workoutPlan}

**💡 General Tips:**
- 💧 **Stay Hydrated**: 8-10 glasses of water daily
- 😴 **Good Sleep**: 7-8 hours for recovery
- 🧘‍♀️ **Manage Stress**: Try meditation or yoga
- 📱 **Track Progress**: Take weekly measurements

${ageAdvice}

Hope this helps! Let me know if you want more specific advice! 😊`;

        if (category === 'Obese') {
          bmiResponse += `\n\n⚠️ **Medical Disclaimer**: For obesity management, please consult a qualified healthcare doctor or nutritionist near you for personalized medical guidance.`;
        }

        return bmiResponse;
      } else {
        return `Hey! I'd love to help you calculate your BMI! 📊

Just tell me your height and weight like this:

**Examples:**
- "My height is 170 cm and weight is 65 kg"
- "I am 5 feet 6 inches tall and weigh 60 kg"
- "Height 1.75 meters, weight 70 kg"

**What I'll give you:**
✅ Your exact BMI calculation
🍛 Personalized Indian food plan
💪 Workout recommendations
📊 Health category assessment

Ready when you are! 😊`;
      }
    }
    
    // Calorie Information
    if (lowerQuery.includes('calorie') || lowerQuery.includes('deficit') || lowerQuery.includes('surplus')) {
      return `Hey! Let me break down calories for you! 🔥

**Daily Calorie Needs (General estimates):**
- Sedentary women: 1,600-2,000 calories
- Active women: 2,000-2,400 calories
- Sedentary men: 2,000-2,500 calories
- Active men: 2,500-3,000 calories

**Weight Goals:**
📉 **Weight Loss:** 500-750 calorie deficit/day (lose 0.5-0.75 kg/week)
📈 **Weight Gain:** 300-500 calorie surplus/day (gain 0.25-0.5 kg/week)

**🍛 High-Calorie Indian Foods:**
- Ghee (1 tbsp = 120 calories)
- Almonds (10 pieces = 70 calories)
- Paratha (1 medium = 300 calories)
- Rice (1 cup cooked = 200 calories)
- Dal (1 cup = 230 calories)

**🥗 Low-Calorie Indian Foods:**
- Cucumber (1 cup = 16 calories)
- Tomato (1 medium = 22 calories)
- Spinach (1 cup = 7 calories)
- Buttermilk (1 glass = 60 calories)
- Green tea (1 cup = 2 calories)

Want me to create a personalized calorie plan for you? Just tell me your age, activity level, and goals! 😊`;
    }
    
    // Workout Information
    if (lowerQuery.includes('workout') || lowerQuery.includes('exercise') || lowerQuery.includes('training')) {
      return `Awesome! Let me share some great workout ideas! 💪

**🏠 Desi Home Workout (Perfect for beginners!):**
- 5-10 min warm-up
- 20-30 min strength training
- 15-20 min cardio
- 5-10 min cool-down/stretching

**🇮🇳 Traditional Indian Exercises:**
- Surya Namaskars: 5-10 rounds
- Dand (Indian Push-ups): 3 sets x 5-15 reps
- Baithak (Indian Squats): 3 sets x 10-20 reps
- Chakrasana (Wheel Pose): Hold for 30 seconds
- Pranayama: 10 minutes breathing exercises
- Walking/Jogging in park: 30 minutes

**💪 Modern Strength Training:**
- Squats: 3 sets x 8-12 reps
- Push-ups: 3 sets x 5-15 reps
- Lunges: 3 sets x 10 reps each leg
- Plank: 3 sets x 30-60 seconds

**Cardio Options:**
- Walking: 30-45 minutes
- Cycling: 20-30 minutes
- Swimming: 20-30 minutes
- HIIT: 15-20 minutes

**⚡ Pro Tip:** Rest 48 hours between training same muscle groups!

What's your fitness level? I can suggest something more specific! 😊`;
    }
    
    // Nutrition Information
    if (lowerQuery.includes('nutrition') || lowerQuery.includes('diet') || lowerQuery.includes('protein') || lowerQuery.includes('carbs')) {
      return `Great question! Let me break down nutrition for you! 🥗

**Macronutrient Distribution:**
- Protein: 20-30% of calories (0.8-1.2g per kg body weight)
- Carbohydrates: 45-65% of calories
- Fats: 20-35% of calories

**High-Protein Foods:**
- Dal (moong, masoor, chana): 24g per cup
- Paneer: 14g per 100g
- Chicken: 25g per 100g
- Fish: 20g per 100g
- Eggs: 6g per egg
- Curd: 11g per cup
- Almonds: 6g per 28g

**Indian Complex Carbs:**
- Brown rice, quinoa
- Roti (whole wheat)
- Oats, daliya
- Sweet potato, shakarkandi
- Fruits: banana, apple, papaya

**🥜 Healthy Fats (Indian style):**
- Ghee (in moderation)
- Coconut oil, mustard oil
- Nuts: almonds, walnuts
- Seeds: flax, chia, sesame

**Hydration:** Aim for 8-10 glasses of water daily! 💧`;
    }
    
    // Weight Loss
    if (lowerQuery.includes('weight loss') || lowerQuery.includes('lose weight') || lowerQuery.includes('fat loss')) {
      return `Let's talk weight loss! Here's what actually works: ⚖️

**The Formula:** Calories In < Calories Out

**Sustainable Approach:**
1. **Create a moderate deficit:** 500-750 calories/day
2. **Combine diet + exercise:** 70% diet, 30% exercise
3. **Aim for 0.5-1 kg loss per week**

**🍽️ Indian Weight Loss Foods:**
- Green vegetables: palak, methi, lauki
- Sprouts: moong, chana sprouts
- Fruits: apple, papaya, guava
- Spices: turmeric, ginger, cinnamon
- Drinks: green tea, jeera water, lemon water

**Avoid/Limit:**
- Fried foods: samosa, pakora, puri
- Sweets: laddu, barfi, gulab jamun
- Refined foods: white rice, maida products
- Sugary drinks: cold drinks, packaged juices

**💡 Smart Diet Tips:**
- Eat protein with every meal
- Fill half your plate with vegetables
- Choose whole foods over processed
- Practice portion control

**Exercise Plan:**
- 3-4 strength training sessions/week
- 2-3 cardio sessions/week
- Daily walks (10,000+ steps)

**Track Progress:**
- Weekly weigh-ins
- Body measurements
- Progress photos
- How clothes fit
- Weekly weigh-ins (same time, same day)

Remember: Slow and steady wins the race! 🐢
Remember: Consistency beats perfection! 🎯`;
    }
    
    // Default health response
    return `🏥 **General Health Tips:**

I'm here to help with your health and fitness journey! Here are some areas I can assist with:
Hey there! I'm your friendly fitness buddy! 🤗 Here's how I can help:

**Fitness & Exercise:**
- Workout routines and planning
- Exercise form and techniques
- Training frequency and intensity

**Nutrition & Diet:**
- Calorie calculations and meal planning
- Macronutrient breakdowns
- Healthy food recommendations

**Health Metrics:**
- BMI calculations and interpretations
- Body composition guidance
- Progress tracking methods

**Wellness:**
- Sleep and recovery tips
- Hydration guidelines
- Stress management through fitness

**🎯 Popular Questions:**
- "Calculate my BMI" (just tell me height & weight!)
- "Best workout for beginners"
- "How many calories should I eat?"
- "Indian diet plan for weight loss"

What would you like to chat about? I'm here to help! 😊💪`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble right now. Please try again! 🤖",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          <div className="relative">
            <Bot className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
              <Heart className="w-2 h-2 text-white" />
            </div>
          </div>
        </button>
      )}

      {/* AI Chat Interface */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">FitZone AI Health Assistant</h3>
                <p className="text-xs opacity-90">🏥 Health & Fitness Expert</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 h-[480px] space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {!message.isUser && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-medium text-blue-600">AI Health Assistant</span>
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                      <div className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-blue-500" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about fitness, nutrition, calories, BMI..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-3 h-3" />
                    <span>Fitness</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>Health</span>
                  </div>
                  <span>•</span>
                  <span>Nutrition</span>
                  <span>•</span>
                  <span>Wellness</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HealthcareAI;