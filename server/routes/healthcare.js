const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Healthcare AI chat endpoint
router.post('/chat', [
  body('message').trim().isLength({ min: 1 }).withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { message } = req.body;

    // Simple health-related response logic
    // In production, this would integrate with OpenAI or similar AI service
    const response = generateHealthResponse(message);

    res.json({
      response,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Healthcare chat error:', error);
    res.status(500).json({ message: 'Server error processing your health query' });
  }
});

// Simple health response generator (fallback)
function generateHealthResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('bmi') || lowerMessage.includes('body mass index')) {
    return `To calculate your BMI, I need your height and weight. BMI = weight(kg) / height(m)². 

**BMI Categories:**
- Underweight: Below 18.5
- Normal: 18.5-24.9
- Overweight: 25-29.9
- Obese: 30 and above

Please provide your height and weight for a personalized calculation! 📊`;
  }
  
  if (lowerMessage.includes('calorie') || lowerMessage.includes('diet')) {
    return `Great question about calories! 🔥

**Daily Calorie Needs (General estimates):**
- Sedentary women: 1,600-2,000 calories
- Active women: 2,000-2,400 calories
- Sedentary men: 2,000-2,500 calories
- Active men: 2,500-3,000 calories

**For weight loss:** Create a 500-750 calorie deficit per day
**For weight gain:** Create a 300-500 calorie surplus per day

Would you like specific meal recommendations? 🍽️`;
  }
  
  if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
    return `Awesome! Let me help you with workout guidance! 💪

**Beginner Workout Plan:**
- 3-4 days per week
- 30-45 minutes per session
- Mix of cardio and strength training

**Sample Weekly Schedule:**
- Monday: Upper body strength
- Tuesday: Cardio (30 min)
- Wednesday: Lower body strength
- Thursday: Rest or light yoga
- Friday: Full body workout
- Weekend: Active recovery

What's your current fitness level? I can provide more specific recommendations! 🏋️‍♂️`;
  }
  
  return `Hello! I'm your FitZone AI Health Assistant! 🏥💪

I can help you with:
- **Fitness & Exercise:** Workout routines, training tips
- **Nutrition:** Meal planning, calorie guidance
- **Health Metrics:** BMI calculations, progress tracking
- **Wellness:** Recovery, sleep, hydration tips

What would you like to know about your health and fitness journey? 😊`;
}

module.exports = router;