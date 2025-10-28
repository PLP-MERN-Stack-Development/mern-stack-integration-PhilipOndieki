const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const Post = require('../models/post');
const Category = require('../models/category');
const User = require('../models/user');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Post.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.create([
      { name: 'Mindfulness', description: 'Practices for present moment awareness' },
      { name: 'Meditation', description: 'Guided meditation techniques and tips' },
      { name: 'Mental Health', description: 'Insights on emotional wellbeing' },
      { name: 'Wellness', description: 'Holistic health and lifestyle' },
      { name: 'Stress Relief', description: 'Techniques for managing stress' },
      { name: 'Sleep', description: 'Better sleep and relaxation methods' }
    ]);
    console.log('Categories created:', categories.length);

    // Create sample user
    const user = await User.create({
      clerkUserId: 'sample_user_123',
      username: 'mindful_admin',
      email: 'admin@mindfulhaven.com',
      firstName: 'Sarah',
      lastName: 'Chen'
    });
    console.log('Sample user created');

    // Sample blog posts
    const posts = [
      {
        title: '5 Simple Mindfulness Exercises to Start Your Day',
        content: `Starting your day with mindfulness can transform your entire experience. Here are five simple exercises that take less than 10 minutes:

1. Morning Breath Awareness
Begin by sitting comfortably and taking five deep breaths. Notice the sensation of air entering and leaving your nostrils. This simple practice grounds you in the present moment.

2. Gratitude Practice
Before checking your phone, think of three things you're grateful for. They can be as simple as a comfortable bed or the smell of coffee.

3. Body Scan
Spend 2 minutes mentally scanning your body from head to toe, noticing any tension or sensations without judgment.

4. Mindful Stretching
Do 3-5 gentle stretches, paying attention to how your body feels with each movement.

5. Intention Setting
Set one clear intention for the day. What quality do you want to embody? Patience? Kindness? Focus?

Remember, consistency matters more than duration. Even 5 minutes daily can create lasting change in your mental clarity and emotional wellbeing.`,
        author: user._id,
        category: categories[0]._id,
        tags: ['morning routine', 'mindfulness', 'beginner'],
        isPublished: true
      },
      {
        title: 'Understanding Meditation: A Beginner\'s Guide',
        content: `Meditation isn't about stopping your thoughts or achieving a blank mind. It's about developing awareness and compassion for yourself and your experience.

What is Meditation?
At its core, meditation is the practice of training your attention and awareness. It's like going to the gym for your mind.

Common Misconceptions:
- You don't need to sit cross-legged
- Your mind will wander (and that's okay!)
- You don't need special equipment
- Even 5 minutes counts

Getting Started:
1. Find a quiet space where you won't be disturbed
2. Sit in a comfortable position
3. Set a timer for 5-10 minutes
4. Focus on your breath
5. When your mind wanders, gently bring it back

Types of Meditation:
- Breath awareness
- Body scan
- Loving-kindness
- Visualization
- Walking meditation

The key is finding what works for YOU. There's no "perfect" way to meditate. The practice itself is what matters.

Start small, be patient with yourself, and remember: every moment of awareness is a success.`,
        author: user._id,
        category: categories[1]._id,
        tags: ['meditation', 'beginner', 'guide'],
        isPublished: true
      },
      {
        title: 'The Science Behind Mindfulness and Mental Health',
        content: `Research increasingly shows that mindfulness practices have profound effects on mental health and brain structure.

Neuroplasticity and Mindfulness:
Studies using fMRI scans show that regular meditation practice actually changes brain structure. The prefrontal cortex (responsible for decision-making) becomes thicker, while the amygdala (our stress center) becomes less reactive.

Key Research Findings:
- 8 weeks of mindfulness practice reduces anxiety by 60%
- Regular meditation increases gray matter density
- Stress hormone (cortisol) levels decrease significantly
- Immune system function improves

Mental Health Benefits:
1. Reduced symptoms of depression
2. Lower anxiety levels
3. Improved emotional regulation
4. Better focus and concentration
5. Enhanced self-awareness

The Default Mode Network:
Mindfulness quiets the "default mode network" - the part of our brain that constantly worries about the past and future. This leads to reduced rumination and increased present-moment awareness.

Clinical Applications:
Many therapists now incorporate mindfulness-based therapies like:
- MBSR (Mindfulness-Based Stress Reduction)
- MBCT (Mindfulness-Based Cognitive Therapy)
- DBT (Dialectical Behavior Therapy)

The Evidence is Clear:
Mindfulness isn't just a trend - it's a scientifically-backed tool for improving mental health and overall wellbeing.`,
        author: user._id,
        category: categories[2]._id,
        tags: ['science', 'mental health', 'research'],
        isPublished: true
      },
      {
        title: 'Creating a Sustainable Wellness Routine',
        content: `Building a wellness routine that lasts requires more than willpower - it needs strategy, flexibility, and self-compassion.

Start Small:
The biggest mistake people make is trying to overhaul their entire life at once. Instead:
- Choose ONE habit to focus on
- Make it ridiculously easy (2 minutes to start)
- Build consistency first, intensity later

The Four Pillars of Wellness:
1. Physical Health (movement, nutrition, sleep)
2. Mental Health (mindfulness, therapy, journaling)
3. Social Connection (relationships, community)
4. Purpose (meaningful work, values alignment)

Building Your Routine:
Morning: 5 minutes of meditation or stretching
Midday: Brief walk or breathing exercise
Evening: Gratitude practice or journaling

Tracking Progress:
Use a simple habit tracker or journal. Celebrate small wins. Be kind to yourself on off days.

Sustainability Secrets:
- Link new habits to existing ones
- Prepare your environment for success
- Have a backup plan for busy days
- Focus on how you FEEL, not just what you do

Remember: A sustainable routine feels good, not punishing. If it doesn't bring you peace, adjust it.`,
        author: user._id,
        category: categories[3]._id,
        tags: ['wellness', 'habits', 'routine'],
        isPublished: true
      },
      {
        title: 'Quick Stress Relief Techniques for Busy Days',
        content: `When stress hits and you only have a few minutes, these techniques can help reset your nervous system.

The 4-7-8 Breath (2 minutes):
- Inhale for 4 counts
- Hold for 7 counts
- Exhale for 8 counts
- Repeat 4 times

This activates your parasympathetic nervous system, telling your body it's safe to relax.

Progressive Muscle Relaxation (5 minutes):
Tense and release each muscle group:
- Face and jaw
- Shoulders and neck
- Arms and hands
- Chest and stomach
- Legs and feet

The 5-4-3-2-1 Grounding Method (3 minutes):
Name:
- 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

Hand Massage (2 minutes):
Massage one hand with the other, applying gentle pressure to each finger and the palm. This simple act can be surprisingly calming.

Cold Water Reset (1 minute):
Splash cold water on your face or hold an ice cube. This triggers the "dive response" that naturally calms your body.

Emergency Mantra (30 seconds):
Repeat: "This feeling is temporary. I am safe. I can handle this."

Keep These Handy:
Save these techniques in your phone notes. When stress hits, you'll have a menu of quick relief options ready to go.`,
        author: user._id,
        category: categories[4]._id,
        tags: ['stress relief', 'quick tips', 'breathing'],
        isPublished: true
      },
      {
        title: 'Mastering Sleep: A Holistic Approach',
        content: `Quality sleep is the foundation of wellness. Here's how to optimize your sleep naturally.

The Sleep Environment:
- Temperature: 65-68°F (18-20°C)
- Darkness: Use blackout curtains
- Quiet: Consider white noise
- Comfort: Invest in good bedding

The 10-3-2-1-0 Method:
- 10 hours before bed: No more caffeine
- 3 hours before: No more food or alcohol
- 2 hours before: No more work
- 1 hour before: No more screens
- 0: Times you hit snooze

Pre-Sleep Routine:
1. Dim the lights (6pm onwards)
2. Take a warm bath or shower
3. Do gentle stretching or yoga
4. Practice progressive relaxation
5. Try a sleep meditation

Natural Sleep Aids:
- Magnesium glycinate (400mg)
- L-theanine (200mg)
- Chamomile tea
- Lavender essential oil

Dealing with Racing Thoughts:
Keep a "worry journal" by your bed. Write down anything on your mind, then close the book. You've captured it - now you can let it go until morning.

Sleep Hygiene Basics:
- Same bedtime and wake time daily
- Get morning sunlight exposure
- Exercise (but not within 3 hours of bed)
- Keep bedroom for sleep only

If You Can't Sleep:
After 20 minutes, get up. Do something calming in dim light until you feel sleepy. Don't fight wakefulness in bed.

Remember: Good sleep is a skill that improves with practice. Be patient with yourself as you establish new patterns.`,
        author: user._id,
        category: categories[5]._id,
        tags: ['sleep', 'insomnia', 'rest'],
        isPublished: true
      },
      {
        title: 'The Power of Gratitude Practice',
        content: `Gratitude isn't just about being thankful - it's a powerful tool that rewires your brain for happiness.

The Science of Gratitude:
Research shows that regular gratitude practice:
- Increases dopamine and serotonin by 23%
- Improves sleep quality
- Strengthens immune system
- Reduces symptoms of depression
- Enhances relationships

Three Gratitude Practices:

1. Morning Three (2 minutes)
Before checking your phone, think of three things you're grateful for. Be specific: "I'm grateful for the warm sunlight through my window" rather than just "I'm grateful for the sun."

2. Gratitude Journal (5 minutes)
Write about one good thing that happened today in detail. How did it make you feel? Why was it meaningful?

3. Gratitude Letter (15 minutes weekly)
Write to someone who has impacted your life. You don't have to send it - the act of writing is powerful on its own.

Making it Stick:
- Link it to an existing habit
- Keep your journal visible
- Use prompts when stuck
- Share gratitude with others

Common Obstacles:
"I can't think of anything" - Start tiny. Warm water? Working electricity? A comfortable chair?

"It feels forced" - That's normal at first. Authenticity develops with practice.

"I'm going through a hard time" - Gratitude doesn't deny difficulty. It helps you find light in darkness.

Advanced Practice:
Try "obstacle gratitude" - finding the hidden gift in challenges. "I'm grateful for this difficult project because it's teaching me patience."

The Transformation:
After 30 days of consistent practice, most people report feeling noticeably happier, sleeping better, and feeling more connected to others.

Your brain is like a muscle - what you focus on grows stronger. Train it to notice the good.`,
        author: user._id,
        category: categories[0]._id,
        tags: ['gratitude', 'happiness', 'journaling'],
        isPublished: true
      },
      {
        title: 'Mindful Eating: Transform Your Relationship with Food',
        content: `Mindful eating isn't a diet - it's about bringing awareness and compassion to your eating experience.

What is Mindful Eating?
It's paying full attention to the experience of eating and drinking, both inside and outside the body. Notice colors, smells, textures, flavors, temperatures, and even the sounds of your food.

The Raisin Exercise:
Try this classic practice:
1. Hold a raisin (or any food)
2. Examine it as if you've never seen it before
3. Notice its texture, color, shape
4. Bring it to your nose - what do you smell?
5. Place it in your mouth without chewing
6. Notice the sensations
7. Slowly chew, noticing flavors and textures
8. Swallow mindfully

This simple exercise can be revolutionary.

Benefits of Mindful Eating:
- Better digestion
- Natural weight management
- Reduced emotional eating
- Greater satisfaction from less food
- Improved relationship with food

Practical Tips:
1. Eat without distractions (no phone, TV, or computer)
2. Use smaller plates
3. Chew thoroughly (20-30 times per bite)
4. Put your utensil down between bites
5. Check in with hunger midway through

The Hunger Scale:
Before eating, rate your hunger 1-10:
- 1-3: Overly hungry (avoid getting here)
- 4-6: Pleasantly hungry (ideal time to eat)
- 7-10: Not physically hungry

Stop at 7 (comfortably satisfied, not stuffed).

Emotional Eating:
Before eating, ask: "Am I physically hungry or emotionally hungry?"

If emotional: Try HALT
- Hungry?
- Angry?
- Lonely?
- Tired?

Address the real need first.

Making it a Habit:
Start with one mindful meal per day. Even just the first three bites eaten mindfully can shift your entire meal experience.

Remember: There's no "perfect" way to eat. Mindful eating is about awareness, not rules. Be gentle with yourself as you learn.`,
        author: user._id,
        category: categories[3]._id,
        tags: ['mindful eating', 'nutrition', 'awareness'],
        isPublished: true
      }
    ];

    await Post.create(posts);
    console.log('Sample posts created:', posts.length);

    console.log('\n✅ Database seeded successfully!');
    console.log(`Created:`);
    console.log(`- ${categories.length} categories`);
    console.log(`- 1 sample user`);
    console.log(`- ${posts.length} blog posts`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();