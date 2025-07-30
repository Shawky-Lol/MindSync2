// Pulse Check Logic for determining user archetypes
export const calculateArchetype = (answers) => {
  // Initialize scores for each archetype
  const scores = {
    'balanced-seeker': 0,
    'conscious-connector': 0,
    'productivity-power-user': 0,
    'distracted-drifter': 0,
    'overwhelmed-escapist': 0
  };

  // Question 1: Daily phone usage
  const usage = answers[1] || 0;
  if (usage <= 1) scores['balanced-seeker'] += 3;
  else if (usage <= 2) scores['balanced-seeker'] += 2;
  else if (usage <= 3) scores['productivity-power-user'] += 2;
  else if (usage <= 4) scores['distracted-drifter'] += 2;
  else scores['overwhelmed-escapist'] += 3;

  // Question 2: Social media feelings
  const socialFeelings = answers[2] || 0;
  if (socialFeelings <= 1) scores['balanced-seeker'] += 2;
  else if (socialFeelings <= 2) scores['conscious-connector'] += 1;
  else if (socialFeelings <= 3) scores['conscious-connector'] += 2;
  else if (socialFeelings <= 4) scores['distracted-drifter'] += 2;
  else scores['overwhelmed-escapist'] += 3;

  // Question 3: What you miss doing
  const missedActivities = answers[3] || 0;
  if (missedActivities === 0) scores['balanced-seeker'] += 2; // Reading
  else if (missedActivities === 1) scores['balanced-seeker'] += 2; // Outdoor activities
  else if (missedActivities === 2) scores['conscious-connector'] += 2; // Face-to-face conversations
  else if (missedActivities === 3) scores['productivity-power-user'] += 1; // Creative hobbies
  else scores['balanced-seeker'] += 1; // Physical exercise

  // Question 4: Checking frequency
  const checkingFreq = answers[4] || 0;
  if (checkingFreq <= 1) scores['balanced-seeker'] += 3;
  else if (checkingFreq <= 2) scores['productivity-power-user'] += 1;
  else if (checkingFreq <= 3) scores['distracted-drifter'] += 2;
  else if (checkingFreq <= 4) scores['distracted-drifter'] += 3;
  else scores['overwhelmed-escapist'] += 2;

  // Question 5: When you reach for phone
  const triggers = answers[5] || 0;
  if (triggers === 0) scores['productivity-power-user'] += 2; // Wake up
  else if (triggers === 1) scores['conscious-connector'] += 1; // During meals
  else if (triggers === 2) scores['distracted-drifter'] += 3; // When bored
  else if (triggers === 3) scores['overwhelmed-escapist'] += 3; // When anxious
  else scores['conscious-connector'] += 2; // When with others

  // Question 6: Sleep impact
  const sleepImpact = answers[6] || 0;
  if (sleepImpact === 0) scores['balanced-seeker'] += 3;
  else if (sleepImpact <= 2) scores['productivity-power-user'] += 1;
  else if (sleepImpact <= 3) scores['distracted-drifter'] += 2;
  else scores['overwhelmed-escapist'] += 3;

  // Question 7: Emotional triggers
  const emotionalTriggers = answers[7] || 0;
  if (emotionalTriggers === 0) scores['distracted-drifter'] += 3; // Boredom
  else if (emotionalTriggers === 1) scores['overwhelmed-escapist'] += 3; // Anxiety
  else if (emotionalTriggers === 2) scores['overwhelmed-escapist'] += 2; // Loneliness
  else if (emotionalTriggers === 3) scores['conscious-connector'] += 3; // FOMO
  else scores['distracted-drifter'] += 2; // Habit

  // Question 8: Battery dies feeling
  const batteryAnxiety = answers[8] || 0;
  if (batteryAnxiety === 0) scores['balanced-seeker'] += 3;
  else if (batteryAnxiety <= 2) scores['productivity-power-user'] += 1;
  else if (batteryAnxiety <= 3) scores['conscious-connector'] += 2;
  else scores['overwhelmed-escapist'] += 3;

  // Question 9: Most used apps
  const appTypes = answers[9] || 0;
  if (appTypes === 0) scores['conscious-connector'] += 3; // Social media
  else if (appTypes === 1) scores['productivity-power-user'] += 2; // News/info
  else if (appTypes === 2) scores['distracted-drifter'] += 3; // Games
  else if (appTypes === 3) scores['distracted-drifter'] += 2; // Video streaming
  else scores['conscious-connector'] += 2; // Messaging

  // Question 10: Phone-free meals
  const phoneFreeEating = answers[10] || 0;
  if (phoneFreeEating <= 1) scores['balanced-seeker'] += 3;
  else if (phoneFreeEating <= 2) scores['productivity-power-user'] += 1;
  else if (phoneFreeEating <= 3) scores['distracted-drifter'] += 2;
  else scores['overwhelmed-escapist'] += 2;

  // Question 11: Limiting phone use
  const limitingDifficulty = answers[11] || 0;
  if (limitingDifficulty <= 1) scores['balanced-seeker'] += 3;
  else if (limitingDifficulty <= 2) scores['productivity-power-user'] += 1;
  else if (limitingDifficulty <= 3) scores['distracted-drifter'] += 2;
  else scores['overwhelmed-escapist'] += 3;

  // Question 12: Attention span changes
  const attentionSpan = answers[12] || 0;
  if (attentionSpan <= 1) scores['balanced-seeker'] += 2;
  else if (attentionSpan <= 2) scores['productivity-power-user'] += 1;
  else if (attentionSpan <= 3) scores['distracted-drifter'] += 2;
  else scores['overwhelmed-escapist'] += 3;

  // Question 13: Feelings about habits
  const habitConcern = answers[13] || 0;
  if (habitConcern <= 1) scores['balanced-seeker'] += 3;
  else if (habitConcern <= 2) scores['productivity-power-user'] += 1;
  else if (habitConcern <= 3) scores['conscious-connector'] += 1;
  else scores['overwhelmed-escapist'] += 3;

  // Question 14: Motivation to change
  const motivation = answers[14] || 0;
  if (motivation === 0) scores['conscious-connector'] += 2; // Better relationships
  else if (motivation === 1) scores['productivity-power-user'] += 2; // Improved focus
  else if (motivation === 2) scores['overwhelmed-escapist'] += 2; // Better sleep
  else if (motivation === 3) scores['balanced-seeker'] += 2; // More free time
  else scores['overwhelmed-escapist'] += 2; // Reduced anxiety

  // Question 15: Readiness to change
  const readiness = answers[15] || 0;
  if (readiness <= 1) scores['balanced-seeker'] += 2;
  else if (readiness <= 2) scores['productivity-power-user'] += 1;
  else if (readiness <= 3) scores['distracted-drifter'] += 1;
  else scores['overwhelmed-escapist'] += 2;

  // Find the archetype with the highest score
  const maxScore = Math.max(...Object.values(scores));
  const archetype = Object.keys(scores).find(key => scores[key] === maxScore);

  return {
    archetype,
    scores,
    confidence: Math.round((maxScore / 45) * 100) // Normalize to percentage
  };
};

export const getInsights = (answers, archetype) => {
  const insights = {
    dailyUsage: getUsageInsight(answers[1]),
    primaryTrigger: getTriggerInsight(answers[7]),
    socialImpact: getSocialInsight(answers[2]),
    sleepImpact: getSleepInsight(answers[6]),
    strengths: getStrengths(archetype),
    challenges: getChallenges(archetype),
    recommendations: getRecommendations(archetype)
  };

  return insights;
};

const getUsageInsight = (usage) => {
  const levels = [
    "You have excellent digital boundaries with minimal daily usage.",
    "You maintain healthy digital habits with moderate usage.",
    "Your usage is above average but still manageable.",
    "Your usage indicates potential for improvement.",
    "Your high usage suggests significant impact on daily life."
  ];
  return levels[usage] || levels[2];
};

const getTriggerInsight = (trigger) => {
  const triggers = [
    "Boredom is your primary trigger - consider engaging offline activities.",
    "Anxiety drives your usage - explore stress management techniques.",
    "Loneliness motivates your digital connection - focus on in-person relationships.",
    "FOMO influences your behavior - practice mindful social media consumption.",
    "Habitual use dominates - work on breaking automatic patterns."
  ];
  return triggers[trigger] || triggers[4];
};

const getSocialInsight = (feeling) => {
  const feelings = [
    "Social media energizes you - you're using it positively.",
    "You have a neutral relationship with social platforms.",
    "Social media sometimes drains you - consider usage patterns.",
    "You often feel drained after social media use.",
    "Social media significantly impacts your emotional well-being."
  ];
  return feelings[feeling] || feelings[2];
};

const getSleepInsight = (impact) => {
  const impacts = [
    "Your digital habits don't interfere with sleep.",
    "Minor sleep disruption from device use.",
    "Moderate impact on your sleep quality.",
    "Significant sleep disruption from digital habits.",
    "Severe sleep interference requiring immediate attention."
  ];
  return impacts[impact] || impacts[2];
};

const getStrengths = (archetype) => {
  const strengths = {
    'balanced-seeker': ['Mindful awareness', 'Healthy boundaries', 'Growth mindset'],
    'conscious-connector': ['Strong social awareness', 'Empathetic nature', 'Value relationships'],
    'productivity-power-user': ['Goal-oriented', 'Efficient', 'Achievement-focused'],
    'distracted-drifter': ['Curious nature', 'Adaptable', 'Open to change'],
    'overwhelmed-escapist': ['Self-aware', 'Seeking improvement', 'Resilient']
  };
  return strengths[archetype] || strengths['balanced-seeker'];
};

const getChallenges = (archetype) => {
  const challenges = {
    'balanced-seeker': ['Perfectionism', 'Over-optimization'],
    'conscious-connector': ['FOMO', 'Social pressure', 'Boundary setting'],
    'productivity-power-user': ['Digital fatigue', 'Work-life balance', 'Burnout risk'],
    'distracted-drifter': ['Mindless scrolling', 'Habit formation', 'Focus issues'],
    'overwhelmed-escapist': ['Emotional regulation', 'Coping mechanisms', 'Digital dependency']
  };
  return challenges[archetype] || challenges['distracted-drifter'];
};

const getRecommendations = (archetype) => {
  const recommendations = {
    'balanced-seeker': [
      'Explore advanced mindfulness techniques',
      'Share your knowledge with others',
      'Set new personal growth goals'
    ],
    'conscious-connector': [
      'Practice digital sabbaths',
      'Curate your social feeds mindfully',
      'Schedule regular offline social time'
    ],
    'productivity-power-user': [
      'Implement the Pomodoro technique',
      'Use focus apps during work',
      'Schedule mandatory break times'
    ],
    'distracted-drifter': [
      'Use app timers and limits',
      'Create phone-free zones',
      'Develop new hobbies and interests'
    ],
    'overwhelmed-escapist': [
      'Practice self-compassion',
      'Seek support when needed',
      'Start with small, manageable changes'
    ]
  };
  return recommendations[archetype] || recommendations['balanced-seeker'];
};

