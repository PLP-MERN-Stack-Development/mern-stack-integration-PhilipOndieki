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
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'mern-blog'
    });
    console.log('MongoDB Connected');

    // Clear existing data
    await Post.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create categories with all required fields
    const categories = await Category.create([
      { 
        name: 'Mindfulness', 
        description: 'Practices for present moment awareness and conscious living' 
      },
      { 
        name: 'Meditation', 
        description: 'Guided meditation techniques, tips, and practices for inner peace' 
      },
      { 
        name: 'Mental Health', 
        description: 'Insights on emotional wellbeing and psychological wellness' 
      },
      { 
        name: 'Wellness', 
        description: 'Holistic health and lifestyle practices for overall wellbeing' 
      },
      { 
        name: 'Stress Relief', 
        description: 'Effective techniques and strategies for managing daily stress' 
      },
      { 
        name: 'Sleep', 
        description: 'Better sleep habits and relaxation methods for restful nights' 
      }
    ]);
    console.log('Categories created:', categories.length);

    // Create sample users with all required fields
    const users = await User.create([
      {
        clerkUserId: 'sample_user_001',
        username: 'mindful_admin',
        email: 'admin@mindfulhaven.com',
        firstName: 'Sarah',
        lastName: 'Chen',
        profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
      },
      {
        clerkUserId: 'sample_user_002',
        username: 'wellness_coach',
        email: 'coach@mindfulhaven.com',
        firstName: 'Michael',
        lastName: 'Rodriguez',
        profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
      },
      {
        clerkUserId: 'sample_user_003',
        username: 'meditation_guide',
        email: 'guide@mindfulhaven.com',
        firstName: 'Emma',
        lastName: 'Thompson',
        profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
      }
    ]);
    console.log('Sample users created:', users.length);

    // Sample blog posts with all required fields
    const posts = [
      {
        title: '5 Simple Mindfulness Exercises to Start Your Day',
        content: `Starting your day with mindfulness can transform your entire experience. Here are five simple exercises that take less than 10 minutes:

## 1. Morning Breath Awareness
Begin by sitting comfortably and taking five deep breaths. Notice the sensation of air entering and leaving your nostrils. This simple practice grounds you in the present moment and sets a calm tone for the day ahead.

## 2. Gratitude Practice
Before checking your phone, think of three things you're grateful for. They can be as simple as a comfortable bed or the smell of coffee. This rewires your brain to notice positive aspects of life.

## 3. Body Scan
Spend 2 minutes mentally scanning your body from head to toe, noticing any tension or sensations without judgment. This helps you connect with your physical self and release stored tension.

## 4. Mindful Stretching
Do 3-5 gentle stretches, paying attention to how your body feels with each movement. Notice the stretch, the release, and the energy flowing through your muscles.

## 5. Intention Setting
Set one clear intention for the day. What quality do you want to embody? Patience? Kindness? Focus? This gives your day direction and purpose.

Remember, consistency matters more than duration. Even 5 minutes daily can create lasting change in your mental clarity and emotional wellbeing. Start small, be consistent, and watch the transformation unfold.`,
        author: users[0]._id,
        category: categories[0]._id,
        featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        tags: ['morning routine', 'mindfulness', 'beginner', 'daily practice', 'meditation'],
        isPublished: true
      },
      {
        title: 'Understanding Meditation: A Beginner\'s Guide',
        content: `Meditation isn't about stopping your thoughts or achieving a blank mind. It's about developing awareness and compassion for yourself and your experience.

## What is Meditation?
At its core, meditation is the practice of training your attention and awareness. It's like going to the gym for your mind - you're strengthening your ability to focus, observe, and be present.

## Common Misconceptions
Let's clear up some myths:
- **You don't need to sit cross-legged** - Any comfortable position works
- **Your mind will wander** - And that's completely okay and normal!
- **You don't need special equipment** - Just yourself and a quiet space
- **Even 5 minutes counts** - Quality over quantity always

## Getting Started
1. **Find a quiet space** where you won't be disturbed
2. **Sit comfortably** - chair, cushion, or even lying down
3. **Set a timer** for 5-10 minutes to start
4. **Focus on your breath** - natural, easy breathing
5. **When your mind wanders**, gently bring it back (this is the practice!)

## Types of Meditation
- **Breath awareness** - Focus on the sensation of breathing
- **Body scan** - Progressive relaxation through body awareness
- **Loving-kindness** - Cultivating compassion for self and others
- **Visualization** - Using imagery for relaxation and focus
- **Walking meditation** - Mindful movement practice

The key is finding what works for YOU. There's no "perfect" way to meditate. The practice itself - showing up, sitting down, and trying - is what matters.

## Building Your Practice
Start small, be patient with yourself, and remember: every moment of awareness is a success. You're not trying to achieve anything; you're simply practicing being present with whatever arises.`,
        author: users[1]._id,
        category: categories[1]._id,
        featuredImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e',
        tags: ['meditation', 'beginner', 'guide', 'mindfulness', 'practice'],
        isPublished: true
      },
      {
        title: 'The Science Behind Mindfulness and Mental Health',
        content: `Research increasingly shows that mindfulness practices have profound effects on mental health and brain structure. Let's explore what science tells us.

## Neuroplasticity and Mindfulness
Studies using fMRI scans show that regular meditation practice actually changes brain structure:
- The **prefrontal cortex** (responsible for decision-making) becomes thicker
- The **amygdala** (our stress center) becomes less reactive
- Neural pathways strengthen, making calm responses more automatic

## Key Research Findings
Recent studies demonstrate impressive results:
- **8 weeks of mindfulness practice** reduces anxiety by 60%
- **Regular meditation** increases gray matter density in brain regions associated with learning, memory, and emotional regulation
- **Stress hormone (cortisol) levels** decrease significantly after consistent practice
- **Immune system function** improves measurably

## Mental Health Benefits
The evidence supports numerous psychological benefits:

1. **Reduced symptoms of depression** - Comparable to antidepressant effects in some studies
2. **Lower anxiety levels** - Both generalized anxiety and panic symptoms
3. **Improved emotional regulation** - Better ability to manage difficult emotions
4. **Better focus and concentration** - Enhanced cognitive performance
5. **Enhanced self-awareness** - Deeper understanding of thought patterns

## The Default Mode Network
Mindfulness quiets the "default mode network" - the part of our brain that constantly worries about the past and future. This leads to:
- Reduced rumination and overthinking
- Increased present-moment awareness
- Less mental chatter and anxiety

## Clinical Applications
Many therapists now incorporate mindfulness-based therapies:
- **MBSR** (Mindfulness-Based Stress Reduction)
- **MBCT** (Mindfulness-Based Cognitive Therapy)
- **DBT** (Dialectical Behavior Therapy)
- **ACT** (Acceptance and Commitment Therapy)

## The Evidence is Clear
Mindfulness isn't just a trend - it's a scientifically-backed tool for improving mental health and overall wellbeing. The research continues to grow, consistently showing the profound benefits of regular practice.`,
        author: users[2]._id,
        category: categories[2]._id,
        featuredImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc',
        tags: ['science', 'mental health', 'research', 'neuroscience', 'brain'],
        isPublished: true
      },
      {
        title: 'Creating a Sustainable Wellness Routine',
        content: `Building a wellness routine that lasts requires more than willpower - it needs strategy, flexibility, and self-compassion. Here's how to create habits that stick.

## Start Small
The biggest mistake people make is trying to overhaul their entire life at once. Instead:
- **Choose ONE habit** to focus on initially
- **Make it ridiculously easy** - 2 minutes to start
- **Build consistency first**, intensity later
- **Celebrate small wins** along the way

## The Four Pillars of Wellness

### 1. Physical Health
- Movement and exercise
- Nutritious eating
- Quality sleep
- Hydration

### 2. Mental Health
- Mindfulness practices
- Therapy or counseling
- Journaling
- Stress management

### 3. Social Connection
- Meaningful relationships
- Community involvement
- Quality time with loved ones
- Helping others

### 4. Purpose
- Meaningful work
- Values alignment
- Personal growth
- Contributing to something larger

## Building Your Routine

### Morning (5-10 minutes)
- 5 minutes of meditation or stretching
- Gratitude practice
- Intention setting

### Midday (5 minutes)
- Brief walk outside
- Breathing exercise
- Check-in with yourself

### Evening (10 minutes)
- Gratitude journaling
- Reflection on the day
- Relaxation practice

## Tracking Progress
Use a simple habit tracker or journal:
- Mark off each day you complete your practice
- Note how you feel
- Celebrate consistency over perfection
- Be kind to yourself on off days

## Sustainability Secrets
1. **Link new habits to existing ones** - "After I brush my teeth, I'll meditate for 2 minutes"
2. **Prepare your environment** - Set out yoga mat, have journal ready
3. **Have a backup plan** - A 1-minute version for busy days
4. **Focus on how you FEEL** - Not just what you do

## When Life Gets Busy
It's not about perfect execution - it's about showing up. Even 1 minute counts. The practice isn't about the time; it's about the intention and consistency.

Remember: A sustainable routine feels good, not punishing. If it doesn't bring you peace and energy, adjust it. You're not looking for perfection; you're building a life that supports your wellbeing.`,
        author: users[0]._id,
        category: categories[3]._id,
        featuredImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        tags: ['wellness', 'habits', 'routine', 'self-care', 'lifestyle'],
        isPublished: true
      },
      {
        title: 'Quick Stress Relief Techniques for Busy Days',
        content: `When stress hits and you only have a few minutes, these techniques can help reset your nervous system and restore calm.

## The 4-7-8 Breath (2 minutes)
This powerful breathing technique activates your parasympathetic nervous system:
1. **Inhale** through your nose for 4 counts
2. **Hold** your breath for 7 counts
3. **Exhale** through your mouth for 8 counts
4. **Repeat** 4 times

This tells your body it's safe to relax and can lower heart rate and blood pressure within minutes.

## Progressive Muscle Relaxation (5 minutes)
Systematically tense and release each muscle group:
- **Face and jaw** - Scrunch, then release
- **Shoulders and neck** - Raise to ears, then drop
- **Arms and hands** - Make fists, then open
- **Chest and stomach** - Tighten, then soften
- **Legs and feet** - Flex, then relax

## The 5-4-3-2-1 Grounding Method (3 minutes)
This technique brings you back to the present moment. Name:
- **5 things you can see** - Look around slowly
- **4 things you can touch** - Feel textures, temperatures
- **3 things you can hear** - Notice sounds near and far
- **2 things you can smell** - Fresh air, coffee, anything
- **1 thing you can taste** - Your last meal, drink of water

## Hand Massage (2 minutes)
Massage one hand with the other:
- Apply gentle pressure to each finger
- Massage the palm in circular motions
- Press the webbing between thumb and index finger
- This simple act can be surprisingly calming

## Cold Water Reset (1 minute)
The "dive response" naturally calms your body:
- Splash cold water on your face
- Hold an ice cube in your hand
- Run cold water over your wrists
- This triggers a physiological calming response

## Emergency Mantra (30 seconds)
When panic strikes, repeat:
"This feeling is temporary. I am safe. I can handle this."

Say it slowly, with each breath. The combination of words and breathing helps interrupt the stress response.

## Keep These Handy
Save these techniques in your phone notes or bookmark this article. When stress hits, you'll have a menu of quick relief options ready to go. Choose what feels right in the moment - there's no wrong choice.

Remember: You always have the power to calm yourself. These tools are always available to you.`,
        author: users[1]._id,
        category: categories[4]._id,
        featuredImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88',
        tags: ['stress relief', 'quick tips', 'breathing', 'anxiety', 'calm'],
        isPublished: true
      },
      {
        title: 'Mastering Sleep: A Holistic Approach',
        content: `Quality sleep is the foundation of wellness. Here's how to optimize your sleep naturally and wake up refreshed.

## The Sleep Environment
Create a sanctuary for rest:
- **Temperature**: 65-68°F (18-20°C) - your body needs to cool down to sleep
- **Darkness**: Use blackout curtains or an eye mask
- **Quiet**: Consider white noise or earplugs
- **Comfort**: Invest in quality bedding and pillows

## The 10-3-2-1-0 Method
A proven formula for better sleep:
- **10 hours before bed**: No more caffeine
- **3 hours before**: No more food or alcohol
- **2 hours before**: No more work or stressful activities
- **1 hour before**: No more screens
- **0**: Times you hit snooze (wake up with the first alarm)

## Pre-Sleep Routine (30-60 minutes)
Build a consistent wind-down ritual:

1. **Dim the lights** starting at 6pm if possible
2. **Take a warm bath or shower** - the temperature drop afterward signals sleep
3. **Do gentle stretching or yoga** - releases physical tension
4. **Practice progressive relaxation** - systematically relax each body part
5. **Try a sleep meditation** - guided imagery or body scan

## Natural Sleep Aids
Consider these supplements (consult your doctor first):
- **Magnesium glycinate** (400mg) - promotes relaxation
- **L-theanine** (200mg) - calms the mind
- **Chamomile tea** - traditional sleep aid
- **Lavender essential oil** - diffuse or apply to pillow

## Dealing with Racing Thoughts
The "worry journal" technique:
- Keep a journal by your bed
- Write down anything on your mind
- Close the book when done
- You've captured it - now you can let it go until morning

This simple act moves worries out of your head and onto paper.

## Sleep Hygiene Basics
The fundamentals that make everything else work:
- **Same bedtime and wake time** daily (yes, even weekends)
- **Get morning sunlight** exposure within 30 minutes of waking
- **Exercise regularly** (but not within 3 hours of bed)
- **Keep bedroom for sleep** only - no work, no TV

## If You Can't Sleep
Don't fight wakefulness:
- After 20 minutes of tossing, get up
- Do something calming in dim light
- Read something boring
- Return to bed when sleepy
- Don't check the time

## The Meditation Approach
Try this when lying awake:
1. Focus on your breath
2. Count each exhale up to 10
3. Start over at 1
4. Don't worry if you fall asleep mid-count - that's success!

## Tracking Progress
Keep a simple sleep log:
- Bedtime and wake time
- Sleep quality (1-10)
- What helped or hindered
- How you feel the next day

Look for patterns and adjust accordingly.

Remember: Good sleep is a skill that improves with practice. Be patient with yourself as you establish new patterns. Most people see significant improvement within 2-3 weeks of consistent practice.`,
        author: users[2]._id,
        category: categories[5]._id,
        featuredImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        tags: ['sleep', 'insomnia', 'rest', 'sleep hygiene', 'relaxation'],
        isPublished: true
      },
      {
        title: 'The Power of Gratitude Practice',
        content: `Gratitude isn't just about being thankful - it's a powerful tool that rewires your brain for happiness and transforms your experience of life.

## The Science of Gratitude
Research shows that regular gratitude practice:
- **Increases dopamine and serotonin** by 23% - your natural happiness chemicals
- **Improves sleep quality** - both falling asleep and sleep duration
- **Strengthens immune system** - measurable increase in immune function
- **Reduces symptoms of depression** - comparable to some therapeutic interventions
- **Enhances relationships** - both quality and satisfaction

## Three Powerful Gratitude Practices

### 1. Morning Three (2 minutes)
Before checking your phone, think of three things you're grateful for:
- Be **specific**: "I'm grateful for the warm sunlight through my window" rather than just "I'm grateful for the sun"
- Include **small things**: The comfort of your bed, hot water, a working coffee maker
- Feel it: Don't just think it - actually feel the appreciation

### 2. Gratitude Journal (5 minutes)
Write about one good thing that happened today in detail:
- What happened?
- Why was it meaningful?
- How did it make you feel?
- What does it tell you about life?

The detail is key - it strengthens the neural pathways.

### 3. Gratitude Letter (15 minutes weekly)
Write to someone who has impacted your life:
- Be specific about what they did
- Explain how it affected you
- Express your appreciation fully
- You don't have to send it - the act of writing is powerful on its own

## Making it Stick
Build gratitude into your existing routine:
- Link it to an existing habit (after morning coffee, before bed)
- Keep your journal visible and accessible
- Use prompts when stuck ("What made me smile today?")
- Share gratitude with others - it multiplies the benefit

## Common Obstacles

### "I can't think of anything"
Start tiny and basic:
- Warm water when you shower?
- Working electricity?
- A comfortable chair to sit in?
- Your ability to read this article?

The practice teaches you to notice what you usually overlook.

### "It feels forced"
That's completely normal at first. Authenticity develops with practice. Think of it like learning an instrument - awkward at first, natural with time.

### "I'm going through a hard time"
Gratitude doesn't deny difficulty. It helps you find light in darkness. Even in tough times, there are small things: a friend's support, your own resilience, a moment of peace.

## Advanced Practice
**Obstacle gratitude** - finding the hidden gift in challenges:
- "I'm grateful for this difficult project because it's teaching me patience"
- "I'm grateful for this rejection because it's redirecting me to something better"
- "I'm grateful for this struggle because it's making me stronger"

This is the most transformative level of practice.

## The Gratitude Challenge
Try this 30-day experiment:
- **Week 1**: Write 3 things daily
- **Week 2**: Add specific details
- **Week 3**: Include challenges you're grateful for
- **Week 4**: Write gratitude letters

## The Transformation
After 30 days of consistent practice, most people report:
- Feeling noticeably happier
- Sleeping better
- More positive outlook
- Better relationships
- Greater resilience
- Increased life satisfaction

## Why It Works
Your brain is like a muscle - what you focus on grows stronger. Gratitude practice trains your brain to:
- Notice positive aspects of life
- Find silver linings in difficulties
- Appreciate what you have
- Connect with others
- Live in the present moment

## Start Today
You don't need a special journal or perfect conditions. Just pause right now and think of three things you're grateful for. Feel the warmth of that appreciation. That's it - you've started.

Remember: Gratitude isn't about denying reality or toxic positivity. It's about choosing to also notice what's going right, what's working, what's beautiful. Both the difficult and the good can be true at the same time.

The more you practice, the more you'll find to be grateful for. It's a beautiful upward spiral.`,
        author: users[0]._id,
        category: categories[0]._id,
        featuredImage: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2',
        tags: ['gratitude', 'happiness', 'journaling', 'positive psychology', 'wellbeing'],
        isPublished: true
      },
      {
        title: 'Mindful Eating: Transform Your Relationship with Food',
        content: `Mindful eating isn't a diet - it's about bringing awareness and compassion to your eating experience. It can transform your relationship with food and your body.

## What is Mindful Eating?
Mindful eating is paying full attention to the experience of eating and drinking, both inside and outside the body. It means noticing:
- **Colors** of your food
- **Smells** and aromas
- **Textures** and consistency
- **Flavors** and taste profiles
- **Temperatures** - hot, cold, room temperature
- **Sounds** your food makes
- **Physical sensations** of hunger and fullness

## The Raisin Exercise
Try this classic mindfulness practice (works with any food):

1. **Hold** a raisin (or any food item)
2. **Examine** it as if you've never seen it before
3. **Notice** its texture, color, shape, ridges, variations
4. **Bring it to your nose** - what do you smell?
5. **Place it in your mouth** without chewing - feel it
6. **Notice** the sensations, flavors beginning to release
7. **Slowly chew**, noticing flavors and textures changing
8. **Swallow** mindfully, feeling it travel down

This simple 3-minute exercise can be revolutionary. It shows you how much you normally miss.

## Benefits of Mindful Eating
When practiced regularly:
- **Better digestion** - chewing thoroughly aids the digestive process
- **Natural weight management** - you eat what you need, not more
- **Reduced emotional eating** - you distinguish physical from emotional hunger
- **Greater satisfaction** from less food - quality over quantity
- **Improved relationship with food** - less guilt, more enjoyment

## Practical Tips for Daily Life

### Before Eating
- Take three deep breaths
- Check in with your hunger (see scale below)
- Set an intention to eat mindfully
- Remove distractions (no phone, TV, computer)

### While Eating
1. **Use smaller plates** - natural portion control
2. **Chew thoroughly** - aim for 20-30 times per bite
3. **Put your utensil down** between bites
4. **Eat with your non-dominant hand** - forces you to slow down
5. **Pause midway** through the meal - check your fullness

### The Hunger Scale
Rate your hunger before eating (1-10):
- **1-3**: Overly hungry, ravenous (avoid getting here)
- **4-6**: Pleasantly hungry (ideal time to eat)
- **7**: Comfortably satisfied (good place to stop)
- **8-10**: Too full, uncomfortable (learn to stop before this)

Aim to eat at 4-5 and stop at 7.

## Emotional Eating
Before eating, ask yourself: "Am I physically hungry or emotionally hungry?"

If emotional, use **HALT**:
- **H**ungry? (physically?)
- **A**ngry?
- **L**onely?
- **T**ired?

Address the real need first. Sometimes you need a nap, a call to a friend, or to process emotions - not food.

## Common Challenges

### "I don't have time"
Start with just the **first three bites** eaten mindfully. That's enough to shift your experience of the entire meal.

### "I forget to be mindful"
Set a reminder. Place a small object on your placemat. Use a special plate for mindful meals.

### "I feel guilty about past eating"
Mindful eating is about awareness, not judgment. Each meal is a new opportunity. Let go of guilt - it doesn't serve you.

## Making it a Habit
Start small:
- **Week 1**: One mindful meal per day
- **Week 2**: First three bites of every meal mindfully
- **Week 3**: One completely distraction-free meal daily
- **Week 4**: Check in with hunger/fullness at every meal

## Advanced Practices

### Mindful Meal Preparation
- Notice the colors of ingredients
- Feel the textures as you chop
- Smell the aromas as you cook
- Make it a meditation, not a chore

### Food Gratitude
Before eating, take a moment to appreciate:
- The sun, rain, and soil that grew it
- The farmers who harvested it
- The people who transported it
- The hands that prepared it

This connects you to the web of life supporting you.

### Eating with Others Mindfully
Share the practice:
- Start with a moment of silence or gratitude
- Eat the first few bites without talking
- Discuss the flavors and textures
- Make meals a shared mindful experience

## The Transformation
After a few weeks of practice, you'll notice:
- Food tastes better and more vibrant
- You naturally eat less and feel more satisfied
- Digestive issues often improve
- Emotional eating decreases
- Guilt around food dissolves
- Eating becomes pleasurable again

## Remember
There's no "perfect" way to eat. Mindful eating is about:
- **Awareness**, not rules
- **Compassion**, not judgment
- **Curiosity**, not control
- **Enjoyment**, not restriction

You're not trying to eat a certain way. You're simply bringing presence to your eating experience. That alone transforms everything.

Start with one mindful bite. Then another. Then another. That's the practice.`,
        author: users[1]._id,
        category: categories[3]._id,
        featuredImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        tags: ['mindful eating', 'nutrition', 'awareness', 'healthy eating', 'wellness'],
        isPublished: true
      }
    ];

    // Create all posts
    const createdPosts = await Post.create(posts);
    console.log('Sample posts created:', createdPosts.length);

    // Display summary
    console.log('\n✅ Database seeded successfully!');
    console.log('━'.repeat(50));
    console.log(`Created:`);
    console.log(`  • ${categories.length} categories`);
    console.log(`  • ${users.length} sample users`);
    console.log(`  • ${createdPosts.length} blog posts`);
    console.log('━'.repeat(50));
    console.log('\nCategories:');
    categories.forEach(cat => console.log(`  - ${cat.name}`));
    console.log('\nUsers:');
    users.forEach(user => console.log(`  - ${user.username} (${user.email})`));
    console.log('\nPosts:');
    createdPosts.forEach(post => console.log(`  - ${post.title}`));
    console.log('━'.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run the seed function
seedData();