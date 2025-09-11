import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  ExternalLink, 
  Play, 
  FileText, 
  Award, 
  CheckCircle, 
  X, 
  Lightbulb,
  BookOpen,
  Globe,
  Youtube,
  Brain,
  Target,
  MessageCircle,
  Sparkles,
  TreePine,
  Droplets,
  Sun,
  Wind,
  Flower,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EcoAIProps {
  onBack: () => void;
  userName: string;
  lessonData: {
    id: number;
    title: string;
    category: string;
    description: string;
    topics: string[];
  };
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  resources?: Resource[];
  quiz?: Quiz;
}

interface Resource {
  type: 'youtube' | 'article' | 'website';
  title: string;
  url: string;
  description: string;
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizSession {
  questions: Quiz[];
  currentQuestionIndex: number;
  answers: (number | null)[];
  score: number;
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
}

const EcoAI = ({ onBack, userName, lessonData }: EcoAIProps) => {
  const [showFloatingElements, setShowFloatingElements] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [conversationStage, setConversationStage] = useState<'intro' | 'learning' | 'quiz' | 'completed'>('intro');
  const [learningProgress, setLearningProgress] = useState(0);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowFloatingElements(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initial AI greeting
    const initialMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hello ${userName}! 🌱 I'm EcoBot, your personal environmental learning assistant. I'm here to help you master "${lessonData.title}". 

I can:
✨ Answer your questions about ${lessonData.category.toLowerCase()}
🔗 Provide relevant resources and videos
📝 Create personalized quizzes to test your knowledge
💡 Give you practical tips and real-world examples

Ready to start learning? Ask me anything about ${lessonData.title.toLowerCase()} or type "begin lesson" to start our structured learning journey!`,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [userName, lessonData]);

  // Comprehensive topic content for structured learning
  const getTopicContent = (topicIndex: number) => {
    const topicContents = {
      'Water Conservation': [
        {
          title: "Understanding Water Scarcity",
          content: `🌊 **Water Scarcity Crisis**
          
Water is our planet's most precious resource, yet it's becoming increasingly scarce. Let's understand the basics:

**Key Facts:**
• Only 2.5% of Earth's water is freshwater
• Less than 1% is accessible for human use
• 2 billion people lack access to safely managed drinking water
• By 2025, half the world's population will live in water-stressed areas

**Main Causes:**
1. **Climate Change** - Altered precipitation patterns
2. **Population Growth** - Increasing demand
3. **Pollution** - Contamination of water sources
4. **Over-extraction** - Unsustainable use of groundwater

**Why This Matters:**
Water conservation isn't just about saving money on bills - it's about ensuring future generations have access to clean, safe water. Every drop counts!`
        },
        {
          title: "Household Water Conservation",
          content: `🏠 **Smart Water Use at Home**

Your home is where you can make the biggest impact! Here are proven strategies:

**Bathroom Conservation (70% of home water use):**
• Take shorter showers (save 5-10 gallons per minute)
• Fix leaky faucets immediately (one drip per second = 5 gallons/day)
• Install low-flow showerheads and toilets
• Turn off tap while brushing teeth

**Kitchen & Laundry:**
• Run dishwashers and washing machines only with full loads
• Use cold water for washing clothes when possible
• Install aerators on faucets
• Collect pasta/vegetable water for plants after cooling

**Outdoor Conservation:**
• Water gardens during cooler parts of the day
• Use drip irrigation systems
• Choose drought-resistant native plants
• Collect rainwater in barrels

**Smart Technology:**
• Install smart water meters
• Use water-efficient appliances (look for WaterSense labels)
• Consider greywater systems for irrigation`
        },
        {
          title: "Global Water Solutions",
          content: `🌍 **Large-Scale Water Solutions**

Beyond individual actions, understanding global solutions helps you support the right initiatives:

**Technological Innovations:**
• **Desalination** - Converting seawater to freshwater
• **Water Recycling** - Treating wastewater for reuse
• **Smart Irrigation** - Precision agriculture systems
• **Atmospheric Water Generation** - Extracting water from air

**Policy Solutions:**
• Water pricing that reflects true value
• Regulations on industrial water use
• Investment in water infrastructure
• International cooperation on shared water resources

**Community Initiatives:**
• Watershed protection programs
• Community water gardens
• Rainwater harvesting systems
• Educational campaigns

**How You Can Support:**
• Vote for politicians who prioritize water conservation
• Support organizations working on water access
• Choose products from water-conscious companies
• Participate in local watershed cleanups`
        }
      ],
      'Renewable Energy': [
        {
          title: "Understanding Renewable Energy",
          content: `⚡ **The Power of Renewable Energy**

Renewable energy is our pathway to a sustainable future. Let's explore the fundamentals:

**What is Renewable Energy?**
Energy derived from natural sources that are constantly replenished and never run out.

**Main Types:**
1. **Solar Energy** ☀️
   - Photovoltaic (PV) panels convert sunlight to electricity
   - Solar thermal for heating water/spaces
   - Fastest-growing energy source globally

2. **Wind Energy** 💨
   - Wind turbines convert wind motion to electricity
   - Onshore and offshore installations
   - Can power entire cities

3. **Hydroelectric** 🌊
   - Uses flowing water to generate electricity
   - Most established renewable technology
   - Provides 16% of world's electricity

4. **Geothermal** 🌋
   - Harnesses Earth's internal heat
   - Reliable baseload power
   - Also used for heating/cooling

5. **Biomass** 🌱
   - Organic materials for energy
   - Can be carbon-neutral when managed sustainably`
        },
        {
          title: "Benefits and Challenges",
          content: `📊 **Renewable Energy: The Complete Picture**

**Environmental Benefits:**
• **Zero Emissions** - No greenhouse gases during operation
• **Air Quality** - Reduced pollution improves health
• **Water Conservation** - Less water needed vs. fossil fuels
• **Land Use** - Can coexist with agriculture (agrivoltaics)

**Economic Advantages:**
• **Job Creation** - Renewable sector employs millions
• **Energy Independence** - Reduces reliance on imports
• **Stable Costs** - No fuel costs, predictable pricing
• **Rural Development** - New income for landowners

**Current Challenges:**
• **Intermittency** - Sun doesn't always shine, wind doesn't always blow
• **Storage** - Need better battery technology
• **Grid Integration** - Requires infrastructure updates
• **Initial Costs** - High upfront investment

**Solutions in Development:**
• Advanced battery storage systems
• Smart grid technology
• Improved energy efficiency
• Hybrid renewable systems
• Green hydrogen production`
        },
        {
          title: "Personal Renewable Energy Actions",
          content: `🏡 **Bringing Renewables Home**

**Direct Actions:**
• **Solar Installation** - Rooftop solar panels or community solar
• **Green Energy Plans** - Choose renewable electricity from your utility
• **Energy Efficiency** - Reduce overall energy demand first
• **Electric Vehicles** - Powered by clean electricity

**Supporting the Transition:**
• **Advocacy** - Support renewable energy policies
• **Investment** - Choose clean energy funds/stocks
• **Education** - Learn and share renewable energy benefits
• **Community Projects** - Support local renewable initiatives

**Financial Incentives:**
• Federal and state tax credits
• Net metering programs
• Renewable energy certificates (RECs)
• Green financing options

**Calculating Impact:**
A typical home solar system (6kW) can:
• Save $1,000+ annually on electricity
• Prevent 100,000+ lbs of CO2 over 20 years
• Increase home value by $15,000+
• Pay for itself in 6-10 years

**Getting Started:**
1. Energy audit to understand current usage
2. Research local incentives and installers
3. Get multiple quotes for solar systems
4. Consider community solar if rooftop isn't suitable
5. Switch to a green energy plan immediately`
        }
      ],
      'Waste Reduction': [
        {
          title: "The Waste Crisis",
          content: `🗑️ **Understanding Our Waste Problem**

We're drowning in waste, but understanding the problem is the first step to solutions:

**Staggering Statistics:**
• 2 billion tons of waste generated globally each year
• Average American produces 4.5 lbs of waste daily
• Only 32% of waste is recycled or composted
• Great Pacific Garbage Patch is twice the size of Texas

**Types of Waste:**
1. **Organic Waste** (30%) - Food scraps, yard waste
2. **Paper & Cardboard** (25%) - Often recyclable
3. **Plastics** (13%) - Major environmental concern
4. **Metals** (9%) - Highly recyclable
5. **Glass** (5%) - Infinitely recyclable
6. **Electronics** (Growing) - Toxic when improperly disposed

**Environmental Impact:**
• **Greenhouse Gases** - Landfills produce methane
• **Pollution** - Toxins leach into soil and water
• **Wildlife Harm** - Animals mistake plastic for food
• **Resource Depletion** - Linear "take-make-waste" model

**Economic Cost:**
• $200+ billion annually in waste management
• Lost resources worth $1 trillion globally
• Job creation potential in recycling/reuse industries`
        },
        {
          title: "The 5 R's Strategy",
          content: `♻️ **Master the 5 R's of Waste Reduction**

**1. REFUSE** 🚫
*Don't take what you don't need*
• Decline single-use items (straws, bags, utensils)
• Say no to freebies and promotional items
• Refuse excessive packaging
• Skip printed receipts when possible

**2. REDUCE** ⬇️
*Minimize what you consume*
• Buy only what you need
• Choose quality over quantity
• Opt for digital instead of physical
• Minimize packaging by buying in bulk
• Choose reusable over disposable

**3. REUSE** 🔄
*Find new purposes for items*
• Repurpose glass jars for storage
• Turn old t-shirts into cleaning rags
• Use both sides of paper
• Transform containers into planters
• Donate items instead of throwing away

**4. RECYCLE** ♻️
*Process materials into new products*
• Learn your local recycling rules
• Clean containers before recycling
• Separate materials correctly
• Recycle electronics at special centers
• Compost organic waste

**5. ROT** 🌱
*Compost organic materials*
• Food scraps become nutrient-rich soil
• Yard waste returns to the earth
• Reduces methane from landfills
• Creates free fertilizer for gardens`
        },
        {
          title: "Zero Waste Lifestyle",
          content: `🌟 **Moving Toward Zero Waste**

**What is Zero Waste?**
A lifestyle that aims to eliminate waste sent to landfills, incinerators, and the ocean through conscious consumption and circular thinking.

**Zero Waste Swaps:**
• **Plastic bags** → Reusable cloth bags
• **Disposable water bottles** → Stainless steel bottles
• **Paper towels** → Washable cloths
• **Plastic wrap** → Beeswax wraps or glass containers
• **Disposable coffee cups** → Reusable travel mugs
• **Fast fashion** → Quality, timeless pieces

**Zero Waste Kitchen:**
• Meal planning to reduce food waste
• Bulk buying with reusable containers
• Composting all organic waste
• Using every part of vegetables (stems, leaves)
• Storing food properly to extend life

**Bathroom Zero Waste:**
• Shampoo bars instead of plastic bottles
• Bamboo toothbrushes
• Reusable cotton pads
• Menstrual cups or reusable pads
• DIY natural cleaning products

**Beyond Personal Actions:**
• **Circular Economy** - Design out waste from the start
• **Extended Producer Responsibility** - Manufacturers responsible for product lifecycle
• **Community Initiatives** - Tool libraries, repair cafes, swap meets
• **Policy Advocacy** - Support legislation reducing single-use plastics

**Starting Your Journey:**
Begin with small changes and gradually adopt more zero waste practices. Remember: Progress, not perfection!`
        }
      ]
    };

    const categoryContent = topicContents[lessonData.category as keyof typeof topicContents];
    return categoryContent ? categoryContent[topicIndex] : null;
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added with a slight delay
    const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        const scrollElement = scrollContainerRef.current;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    };
    
    // Use setTimeout to ensure content is rendered before scrolling
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Generate comprehensive 10+ question quiz
  const generateComprehensiveQuiz = (): Quiz[] => {
    const quizzes = {
      'Water Conservation': [
        {
          id: '1',
          question: 'What percentage of Earth\'s water is accessible freshwater for human use?',
          options: ['About 10%', 'Less than 1%', 'Around 5%', 'Approximately 2.5%'],
          correctAnswer: 1,
          explanation: 'Less than 1% of Earth\'s water is accessible freshwater for human use, making conservation critical.'
        },
        {
          id: '2',
          question: 'How much water does a leaky faucet that drips once per second waste per day?',
          options: ['1 gallon', '3 gallons', '5 gallons', '10 gallons'],
          correctAnswer: 2,
          explanation: 'A faucet dripping once per second wastes about 5 gallons per day, or 1,825 gallons per year!'
        },
        {
          id: '3',
          question: 'What percentage of home water use typically occurs in the bathroom?',
          options: ['50%', '60%', '70%', '80%'],
          correctAnswer: 2,
          explanation: 'About 70% of home water use occurs in the bathroom, making it the best place to focus conservation efforts.'
        },
        {
          id: '4',
          question: 'Which is the most effective way to save water while showering?',
          options: ['Use hot water only', 'Take shorter showers', 'Leave water running between rinses', 'Use more soap'],
          correctAnswer: 1,
          explanation: 'Taking shorter showers can save 5-10 gallons per minute reduced, making it highly effective.'
        },
        {
          id: '5',
          question: 'What does WaterSense label indicate?',
          options: ['Higher water pressure', 'Water-efficient products', 'Expensive appliances', 'Luxury features'],
          correctAnswer: 1,
          explanation: 'WaterSense labels indicate EPA-certified water-efficient products that can reduce water use by 20% or more.'
        },
        {
          id: '6',
          question: 'When is the best time to water your garden to minimize waste?',
          options: ['Midday when it\'s hottest', 'Early morning or evening', 'Only at night', 'Any time is fine'],
          correctAnswer: 1,
          explanation: 'Watering during cooler parts of the day reduces evaporation, ensuring more water reaches plant roots.'
        },
        {
          id: '7',
          question: 'What is greywater?',
          options: ['Dirty rainwater', 'Water from sinks and showers', 'Contaminated groundwater', 'Ocean water'],
          correctAnswer: 1,
          explanation: 'Greywater is gently used water from sinks, showers, and washing machines that can be recycled for irrigation.'
        },
        {
          id: '8',
          question: 'How many people globally lack access to safely managed drinking water?',
          options: ['1 billion', '2 billion', '3 billion', '4 billion'],
          correctAnswer: 1,
          explanation: 'About 2 billion people worldwide lack access to safely managed drinking water at home.'
        },
        {
          id: '9',
          question: 'What is desalination?',
          options: ['Adding salt to water', 'Removing salt from seawater', 'Cleaning polluted water', 'Freezing water'],
          correctAnswer: 1,
          explanation: 'Desalination removes salt and minerals from seawater to produce fresh water, though it requires significant energy.'
        },
        {
          id: '10',
          question: 'Which action has the biggest water conservation impact at home?',
          options: ['Shorter showers', 'Fixing leaks', 'Full dishwasher loads', 'All equally important'],
          correctAnswer: 3,
          explanation: 'All these actions are equally important and work together to maximize water conservation impact.'
        },
        {
          id: '11',
          question: 'What percentage of the world\'s population will live in water-stressed areas by 2025?',
          options: ['25%', '33%', '50%', '66%'],
          correctAnswer: 2,
          explanation: 'By 2025, half the world\'s population is projected to live in water-stressed areas due to climate change and population growth.'
        },
        {
          id: '12',
          question: 'Which uses more water: a 5-minute shower or a full bathtub?',
          options: ['5-minute shower', 'Full bathtub', 'They use the same', 'Depends on showerhead'],
          correctAnswer: 3,
          explanation: 'It depends on your showerhead flow rate. Standard showerheads use 2.5 gallons/minute, so a 5-minute shower uses 12.5 gallons vs. 36 gallons for a tub.'
        }
      ],
      'Renewable Energy': [
        {
          id: '1',
          question: 'Which renewable energy source is growing the fastest globally?',
          options: ['Wind', 'Solar', 'Hydroelectric', 'Geothermal'],
          correctAnswer: 1,
          explanation: 'Solar energy is the fastest-growing renewable energy source, with costs dropping dramatically over the past decade.'
        },
        {
          id: '2',
          question: 'What percentage of the world\'s electricity currently comes from hydroelectric power?',
          options: ['8%', '12%', '16%', '20%'],
          correctAnswer: 2,
          explanation: 'Hydroelectric power provides about 16% of the world\'s electricity, making it the most established renewable source.'
        },
        {
          id: '3',
          question: 'What is the main challenge with solar and wind energy?',
          options: ['Too expensive', 'Intermittency', 'Takes too much space', 'Creates pollution'],
          correctAnswer: 1,
          explanation: 'Intermittency is the main challenge - the sun doesn\'t always shine and wind doesn\'t always blow when we need energy.'
        },
        {
          id: '4',
          question: 'What is agrivoltaics?',
          options: ['Solar panels on farms', 'Wind turbines in fields', 'Hydroelectric dams', 'Geothermal farming'],
          correctAnswer: 0,
          explanation: 'Agrivoltaics combines solar panels with agriculture, allowing land to be used for both energy production and farming.'
        },
        {
          id: '5',
          question: 'How much CO2 can a typical 6kW home solar system prevent over 20 years?',
          options: ['50,000 lbs', '75,000 lbs', '100,000+ lbs', '25,000 lbs'],
          correctAnswer: 2,
          explanation: 'A typical 6kW home solar system can prevent over 100,000 pounds of CO2 emissions over 20 years.'
        },
        {
          id: '6',
          question: 'What is net metering?',
          options: ['Measuring energy efficiency', 'Selling excess solar power back to the grid', 'Installing smart meters', 'Tracking carbon footprint'],
          correctAnswer: 1,
          explanation: 'Net metering allows homeowners to sell excess solar power back to the grid, often receiving credits on their utility bills.'
        },
        {
          id: '7',
          question: 'Which renewable energy source provides the most reliable baseload power?',
          options: ['Solar', 'Wind', 'Geothermal', 'Biomass'],
          correctAnswer: 2,
          explanation: 'Geothermal energy provides reliable baseload power because Earth\'s internal heat is constant and available 24/7.'
        },
        {
          id: '8',
          question: 'What is green hydrogen?',
          options: ['Hydrogen from natural gas', 'Hydrogen from renewable energy', 'Hydrogen mixed with green dye', 'Hydrogen from nuclear power'],
          correctAnswer: 1,
          explanation: 'Green hydrogen is produced using renewable energy to split water molecules, creating a clean fuel with no carbon emissions.'
        },
        {
          id: '9',
          question: 'How long does a typical home solar system take to pay for itself?',
          options: ['3-5 years', '6-10 years', '15-20 years', '25+ years'],
          correctAnswer: 1,
          explanation: 'Most home solar systems pay for themselves in 6-10 years through energy savings and incentives.'
        },
        {
          id: '10',
          question: 'What happens to wind turbines at the end of their life?',
          options: ['They\'re completely recyclable', 'Blades go to landfills', 'They last forever', 'They\'re burned for energy'],
          correctAnswer: 1,
          explanation: 'While most wind turbine components are recyclable, turbine blades are challenging to recycle and often end up in landfills.'
        },
        {
          id: '11',
          question: 'Which country generates the most electricity from renewable sources?',
          options: ['United States', 'Germany', 'China', 'Iceland'],
          correctAnswer: 2,
          explanation: 'China generates the most renewable electricity in absolute terms, though Iceland has the highest percentage from renewables.'
        },
        {
          id: '12',
          question: 'What is the capacity factor of solar panels?',
          options: ['15-25%', '30-40%', '50-60%', '70-80%'],
          correctAnswer: 0,
          explanation: 'Solar panels typically have a capacity factor of 15-25%, meaning they produce that percentage of their maximum possible output over a year.'
        }
      ],
      'Waste Reduction': [
        {
          id: '1',
          question: 'How much waste does the average American produce daily?',
          options: ['2.5 lbs', '3.5 lbs', '4.5 lbs', '5.5 lbs'],
          correctAnswer: 2,
          explanation: 'The average American produces about 4.5 pounds of waste per day, much higher than the global average.'
        },
        {
          id: '2',
          question: 'What percentage of waste is currently recycled or composted globally?',
          options: ['20%', '32%', '45%', '60%'],
          correctAnswer: 1,
          explanation: 'Only about 32% of waste is currently recycled or composted globally, leaving huge room for improvement.'
        },
        {
          id: '3',
          question: 'What is the largest component of household waste?',
          options: ['Plastics', 'Paper', 'Organic waste', 'Metals'],
          correctAnswer: 2,
          explanation: 'Organic waste (food scraps, yard waste) makes up about 30% of household waste and is easily compostable.'
        },
        {
          id: '4',
          question: 'What does the "R" in the first of the 5 R\'s stand for?',
          options: ['Recycle', 'Reduce', 'Refuse', 'Reuse'],
          correctAnswer: 2,
          explanation: 'REFUSE is the first R - don\'t take what you don\'t need. It\'s the most effective waste reduction strategy.'
        },
        {
          id: '5',
          question: 'How big is the Great Pacific Garbage Patch?',
          options: ['Size of California', 'Twice the size of Texas', 'Size of Rhode Island', 'Size of Alaska'],
          correctAnswer: 1,
          explanation: 'The Great Pacific Garbage Patch is estimated to be twice the size of Texas and continues growing.'
        },
        {
          id: '6',
          question: 'What gas do landfills primarily produce that contributes to climate change?',
          options: ['Carbon dioxide', 'Methane', 'Nitrous oxide', 'Sulfur dioxide'],
          correctAnswer: 1,
          explanation: 'Landfills produce methane, which is 25 times more potent than CO2 as a greenhouse gas.'
        },
        {
          id: '7',
          question: 'Which material can be recycled infinitely without quality loss?',
          options: ['Plastic', 'Paper', 'Glass', 'Aluminum'],
          correctAnswer: 2,
          explanation: 'Glass can be recycled infinitely without any loss in quality or purity, making it highly sustainable.'
        },
        {
          id: '8',
          question: 'What is a circular economy?',
          options: ['Round recycling bins', 'Economy based on circles', 'Eliminate waste through design', 'Recycling in circles'],
          correctAnswer: 2,
          explanation: 'A circular economy designs out waste from the start, keeping materials in use and regenerating natural systems.'
        },
        {
          id: '9',
          question: 'How much of global waste is food waste?',
          options: ['1/4', '1/3', '1/2', '2/3'],
          correctAnswer: 1,
          explanation: 'About 1/3 of all food produced globally is wasted, representing a massive opportunity for reduction.'
        },
        {
          id: '10',
          question: 'What is zero waste?',
          options: ['Producing no waste at all', 'Sending nothing to landfills', 'Using only recyclable materials', 'Eliminating all packaging'],
          correctAnswer: 1,
          explanation: 'Zero waste aims to eliminate waste sent to landfills, incinerators, and oceans through conscious consumption.'
        },
        {
          id: '11',
          question: 'Which plastic recycling number is most commonly accepted?',
          options: ['#1 (PET)', '#2 (HDPE)', '#3 (PVC)', 'All equally'],
          correctAnswer: 3,
          explanation: '#1 (PET) and #2 (HDPE) are most commonly accepted, but acceptance varies by location. Always check locally!'
        },
        {
          id: '12',
          question: 'What is upcycling?',
          options: ['Recycling upward', 'Creating something of higher value', 'Cycling up hills', 'Upgrading cycles'],
          correctAnswer: 1,
          explanation: 'Upcycling transforms waste materials into products of higher quality or value than the original.'
        }
      ]
    };

    return quizzes[lessonData.category as keyof typeof quizzes] || [];
  };

  // Start comprehensive quiz session
  const startComprehensiveQuiz = () => {
    const questions = generateComprehensiveQuiz();
    const session: QuizSession = {
      questions,
      currentQuestionIndex: 0,
      answers: new Array(questions.length).fill(null),
      score: 0,
      isCompleted: false,
      startTime: new Date()
    };
    setQuizSession(session);
    setCurrentQuiz(questions[0]);
    setConversationStage('quiz');
    
    addAIMessage(`🎯 **Comprehensive Knowledge Assessment**

I've prepared a complete quiz with ${questions.length} questions to test your understanding of ${lessonData.title}. 

This quiz covers all the key concepts we've discussed:
${lessonData.topics.map((topic, index) => `${index + 1}. ${topic}`).join('\n')}

**Instructions:**
• Take your time with each question
• Read all options carefully  
• You can't go back to previous questions
• Your score will be calculated at the end

Ready to begin? Let's start with question 1!`);
  };

  // Show comprehensive quiz results
  const showQuizFinalResults = (session: QuizSession) => {
    const percentage = Math.round((session.score / session.questions.length) * 100);
    const timeTaken = session.endTime && session.startTime ? 
      Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000) : 0;
    
    let grade = '';
    let feedback = '';
    
    if (percentage >= 90) {
      grade = 'A+';
      feedback = 'Outstanding! You have mastered this topic brilliantly! 🌟';
    } else if (percentage >= 80) {
      grade = 'A';
      feedback = 'Excellent work! You have a strong understanding of the material! 🎉';
    } else if (percentage >= 70) {
      grade = 'B';
      feedback = 'Good job! You understand most concepts well! 👍';
    } else if (percentage >= 60) {
      grade = 'C';
      feedback = 'Fair understanding. Consider reviewing the material again. 📚';
    } else {
      grade = 'D';
      feedback = 'You may want to review the material and retake the quiz. 💪';
    }

    addAIMessage(`🎯 **QUIZ COMPLETED!** 🎯

**📊 YOUR RESULTS:**
━━━━━━━━━━━━━━━━━━━━
**Score:** ${session.score}/${session.questions.length} (${percentage}%)
**Grade:** ${grade}
**Time Taken:** ${timeTaken} minutes
━━━━━━━━━━━━━━━━━━━━

**🎭 Performance Feedback:**
${feedback}

**📋 Detailed Breakdown:**
${session.questions.map((q, index) => {
  const userAnswer = session.answers[index];
  const isCorrect = userAnswer === q.correctAnswer;
  return `${index + 1}. ${isCorrect ? '✅' : '❌'} ${isCorrect ? 'Correct' : 'Incorrect'}`;
}).join('\n')}

**🏆 Achievement Unlocked:**
• Completed ${lessonData.title} Assessment
• Eco-Points Earned: ${session.score * 10}
• Knowledge Level: ${grade}

**📚 What's Next:**
${percentage >= 80 ? 
  '• Try another lesson to expand your knowledge!\n• Take on real-world eco-challenges\n• Share your knowledge with others' :
  '• Review the lesson materials again\n• Retake the quiz to improve your score\n• Ask me specific questions about topics you found challenging'
}

Great job completing the assessment, ${userName}! Keep up your environmental learning journey! 🌱`);

  // Helper function to add AI messages
  const addAIMessage = (content: string) => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  // Start structured learning with topic progression
  const startStructuredLearning = () => {
    setConversationStage('learning');
    setCurrentTopic(0);
    setLearningProgress(25);
    
    const firstTopic = getTopicContent(0);
    if (firstTopic) {
      addAIMessage(`📚 **${firstTopic.title}** 

${firstTopic.content}

━━━━━━━━━━━━━━━━━━━━

This is topic 1 of ${lessonData.topics.length}. When you're ready to continue, type "next topic" or ask me any questions about this material!`);
    }
  };

  // Progress to next topic
  const nextTopic = () => {
    const nextTopicIndex = currentTopic + 1;
    if (nextTopicIndex < lessonData.topics.length) {
      setCurrentTopic(nextTopicIndex);
      setLearningProgress(25 + (nextTopicIndex / lessonData.topics.length) * 50);
      
      const topicContent = getTopicContent(nextTopicIndex);
      if (topicContent) {
        addAIMessage(`📚 **${topicContent.title}** 

${topicContent.content}

━━━━━━━━━━━━━━━━━━━━

This is topic ${nextTopicIndex + 1} of ${lessonData.topics.length}. When you're ready to continue, type "next topic" or ask me any questions!`);
      }
    } else {
      // All topics completed, suggest quiz
      setLearningProgress(75);
      addAIMessage(`🎉 **Congratulations!** You've completed all the learning topics for ${lessonData.title}!

You've covered:
${lessonData.topics.map((topic, index) => `✅ ${topic}`).join('\n')}

**What's Next?**
Now it's time to test your knowledge! I've prepared a comprehensive quiz with 12 challenging questions that cover everything we've discussed.

Type "start quiz" when you're ready to assess your learning!`);
    }
  };
  };

  // Mock AI responses based on lesson content
  const getAIResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    const category = lessonData.category.toLowerCase();
    
    // Predefined responses based on lesson category and common questions
    const responses = {
      water: {
        basics: "Water conservation is crucial for our planet! 💧 Here are key concepts:\n\n• **Household Conservation**: Simple changes like fixing leaks, shorter showers, and efficient appliances can save thousands of gallons annually.\n• **Greywater Systems**: Reusing water from sinks and showers for irrigation.\n• **Rainwater Harvesting**: Collecting rainwater for non-drinking purposes.\n\nWould you like me to explain any of these concepts in more detail?",
        resources: [
          {
            type: 'youtube' as const,
            title: 'Water Conservation Techniques',
            url: 'https://youtube.com/watch?v=example1',
            description: 'Comprehensive guide to saving water at home'
          },
          {
            type: 'article' as const,
            title: 'EPA Water Conservation Guide',
            url: 'https://epa.gov/watersense',
            description: 'Official government resource on water efficiency'
          }
        ]
      },
      energy: {
        basics: "Solar energy is the future! ☀️ Let me break down the fundamentals:\n\n• **Photovoltaic Effect**: How solar panels convert sunlight to electricity\n• **Energy Storage**: Battery systems for consistent power supply\n• **Grid Integration**: Connecting solar systems to the electrical grid\n• **Efficiency Factors**: Weather, positioning, and maintenance impacts\n\nWhat specific aspect would you like to explore deeper?",
        resources: [
          {
            type: 'youtube' as const,
            title: 'How Solar Panels Work',
            url: 'https://youtube.com/watch?v=example2',
            description: 'Animated explanation of photovoltaic technology'
          },
          {
            type: 'website' as const,
            title: 'Solar Power World',
            url: 'https://solarpowerworldonline.com',
            description: 'Latest news and innovations in solar technology'
          }
        ]
      },
      waste: {
        basics: "Waste management is about the 3 R's and more! ♻️\n\n• **Reduce**: Minimize consumption and packaging\n• **Reuse**: Find new purposes for items before discarding\n• **Recycle**: Process materials into new products\n• **Composting**: Natural decomposition of organic waste\n• **Circular Economy**: Designing out waste from the start\n\nWhich area interests you most?",
        resources: [
          {
            type: 'youtube' as const,
            title: 'Zero Waste Lifestyle Guide',
            url: 'https://youtube.com/watch?v=example3',
            description: 'Practical steps to minimize waste production'
          },
          {
            type: 'article' as const,
            title: 'Recycling Dos and Don\'ts',
            url: 'https://earth911.com',
            description: 'Complete guide to proper recycling practices'
          }
        ]
      },
      nature: {
        basics: "Biodiversity is the foundation of healthy ecosystems! 🌿\n\n• **Species Diversity**: Variety of different organisms\n• **Genetic Diversity**: Variation within species populations\n• **Ecosystem Diversity**: Different habitats and communities\n• **Keystone Species**: Animals/plants crucial for ecosystem balance\n• **Conservation Strategies**: Protected areas, restoration, sustainable practices\n\nWhat would you like to learn more about?",
        resources: [
          {
            type: 'youtube' as const,
            title: 'Biodiversity Explained',
            url: 'https://youtube.com/watch?v=example4',
            description: 'Understanding ecosystem relationships and conservation'
          },
          {
            type: 'website' as const,
            title: 'World Wildlife Fund',
            url: 'https://worldwildlife.org',
            description: 'Global conservation organization resources'
          }
        ]
      }
    };

    // Generate quiz based on conversation stage
    const generateQuiz = (): Quiz => {
      const quizzes = {
        water: {
          id: 'water-quiz-1',
          question: 'What percentage of household water usage typically comes from bathroom activities?',
          options: ['25%', '40%', '60%', '75%'],
          correctAnswer: 2,
          explanation: 'About 60% of household water use comes from bathroom activities including showers, baths, and toilet flushing. This makes the bathroom the biggest target for water conservation efforts.'
        },
        energy: {
          id: 'energy-quiz-1',
          question: 'What is the primary advantage of solar panels over traditional fossil fuel energy?',
          options: ['Lower installation cost', 'Renewable and clean', 'Works at night', 'Requires less maintenance'],
          correctAnswer: 1,
          explanation: 'Solar energy is renewable and produces no direct emissions, making it a clean alternative to fossil fuels. While installation costs and maintenance vary, the environmental benefits are the primary advantage.'
        },
        waste: {
          id: 'waste-quiz-1',
          question: 'Which of the following takes the longest to decompose in a landfill?',
          options: ['Paper bag (1 month)', 'Aluminum can (80-100 years)', 'Plastic bottle (450 years)', 'Glass bottle (1 million years)'],
          correctAnswer: 3,
          explanation: 'Glass bottles can take up to 1 million years to decompose, making them one of the longest-lasting waste products. However, glass is 100% recyclable indefinitely without loss of quality.'
        },
        nature: {
          id: 'nature-quiz-1',
          question: 'What is a keystone species?',
          options: ['The most abundant species', 'A species that builds structures', 'A species whose impact is disproportionate to its abundance', 'The largest species in an ecosystem'],
          correctAnswer: 2,
          explanation: 'A keystone species has a disproportionately large impact on its ecosystem relative to its abundance. Examples include wolves in Yellowstone and sea otters in kelp forests.'
        }
      };
      return quizzes[category as keyof typeof quizzes] || quizzes.water;
    };

    // Determine response based on message content
    if (message.includes('begin lesson') || message.includes('start learning')) {
      setConversationStage('learning');
      setLearningProgress(25);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: responses[category as keyof typeof responses]?.basics || "Let's explore this topic together!",
        timestamp: new Date(),
        resources: responses[category as keyof typeof responses]?.resources || []
      };
    }

    if (message.includes('quiz') || message.includes('test') || conversationStage === 'learning') {
      setConversationStage('quiz');
      setLearningProgress(75);
      const quiz = generateQuiz();
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "Great! Let's test your understanding with a quick quiz. This will help reinforce what you've learned! 🧠",
        timestamp: new Date(),
        quiz
      };
    }

    if (message.includes('resource') || message.includes('link') || message.includes('video')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "Here are some excellent resources to deepen your understanding! 📚 These cover different aspects of the topic with various learning styles in mind.",
        timestamp: new Date(),
        resources: responses[category as keyof typeof responses]?.resources || []
      };
    }

    // Default contextual response
    const defaultResponses = [
      `That's a great question about ${category}! Based on current research and best practices, here's what I can tell you...`,
      `Interesting point! In the context of ${lessonData.title.toLowerCase()}, this relates to several key concepts...`,
      `I love your curiosity about ${category}! Let me break this down for you...`,
      `That's exactly the kind of thinking we need for environmental solutions! Here's how this connects to ${lessonData.title.toLowerCase()}...`
    ];

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] + "\n\nWould you like me to provide some specific resources or create a quiz to test your understanding?",
      timestamp: new Date()
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputMessage.toLowerCase();
    setInputMessage('');
    setIsTyping(true);

    // Handle special commands
    setTimeout(() => {
      if (messageText.includes('begin lesson') || messageText.includes('start learning')) {
        startStructuredLearning();
      } else if (messageText.includes('next topic') && conversationStage === 'learning') {
        nextTopic();
      } else if (messageText.includes('start quiz') || messageText.includes('take quiz')) {
        startComprehensiveQuiz();
      } else {
        // Regular AI response
        const aiResponse = getAIResponse(inputMessage);
        setMessages(prev => [...prev, aiResponse]);
        
        if (aiResponse.quiz) {
          setCurrentQuiz(aiResponse.quiz);
        }
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!quizSession || !currentQuiz) {
      // Fallback for single quiz mode
      setSelectedAnswer(answerIndex);
      setShowQuizResult(true);
      
      if (answerIndex === currentQuiz?.correctAnswer) {
        setLearningProgress(100);
        setConversationStage('completed');
      }
      return;
    }

    // Comprehensive quiz mode
    const updatedAnswers = [...quizSession.answers];
    updatedAnswers[quizSession.currentQuestionIndex] = answerIndex;
    
    const isCorrect = answerIndex === currentQuiz.correctAnswer;
    const newScore = quizSession.score + (isCorrect ? 1 : 0);

    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);

    setTimeout(() => {
      const nextIndex = quizSession.currentQuestionIndex + 1;
      
      if (nextIndex < quizSession.questions.length) {
        // Move to next question
        const updatedSession: QuizSession = {
          ...quizSession,
          currentQuestionIndex: nextIndex,
          answers: updatedAnswers,
          score: newScore
        };
        setQuizSession(updatedSession);
        setCurrentQuiz(quizSession.questions[nextIndex]);
        setSelectedAnswer(null);
        setShowQuizResult(false);
      } else {
        // Quiz completed
        const finalSession: QuizSession = {
          ...quizSession,
          answers: updatedAnswers,
          score: newScore,
          isCompleted: true,
          endTime: new Date()
        };
        setQuizSession(finalSession);
        setCurrentQuiz(null);
        setShowQuizResults(true);
        setConversationStage('completed');
        
        // Show final results
        showQuizFinalResults(finalSession);
      }
    }, 2000);
  };

  const closeQuiz = () => {
    setCurrentQuiz(null);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    
    const completionMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: showQuizResult && selectedAnswer === currentQuiz?.correctAnswer 
        ? "🎉 Excellent work! You've demonstrated a solid understanding of the topic. You've earned 50 eco-points! Keep up the great learning momentum. What else would you like to explore?"
        : "Good attempt! Remember, learning is a process. Would you like me to explain the concept differently or provide additional resources?",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, completionMessage]);
  };

  // Floating nature elements
  const floatingElements = [
    { Icon: Leaf, position: { top: '8%', left: '3%' }, delay: 0.2 },
    { Icon: TreePine, position: { top: '12%', right: '5%' }, delay: 0.4 },
    { Icon: Droplets, position: { top: '45%', left: '2%' }, delay: 0.6 },
    { Icon: Sun, position: { top: '55%', right: '3%' }, delay: 0.8 },
    { Icon: Wind, position: { bottom: '25%', left: '4%' }, delay: 1.0 },
    { Icon: Flower, position: { bottom: '40%', right: '6%' }, delay: 1.2 },
  ];

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 2, -2, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'water': return Droplets;
      case 'energy': return Sun;
      case 'waste': return TreePine;
      case 'nature': return Leaf;
      default: return Leaf;
    }
  };

  const CategoryIcon = getCategoryIcon(lessonData.category);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
      {/* Environmental Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1696250863507-262618217c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMGdyZWVuJTIwbmF0dXJlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTcxNjI4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Forest background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      {/* Floating Nature Elements */}
      {showFloatingElements && floatingElements.map(({ Icon, position, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-emerald-600/20 pointer-events-none hidden lg:block"
          style={position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 1 }}
        >
          <motion.div variants={floatVariants} animate="animate">
            <Icon size={28} />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/50"
            >
              <ArrowLeft size={20} />
              Back to Lessons
            </Button>
            
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="text-emerald-600" size={32} />
              </motion.div>
              <div>
                <h1 className="text-emerald-800 mb-0">EcoBot AI Tutor</h1>
                <p className="text-emerald-700">{lessonData.title}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200">
              <CategoryIcon className="text-emerald-600" size={20} />
              <span className="text-emerald-800">{lessonData.category}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200">
              <Brain className="text-purple-600" size={20} />
              <span className="text-emerald-800">Progress: {learningProgress}%</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Progress value={learningProgress} className="h-2 bg-emerald-100" />
        </motion.div>

        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 h-[600px] flex flex-col">
              <CardHeader className="border-b border-emerald-100">
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <MessageCircle size={24} />
                  Chat with EcoBot
                  <Badge className="ml-auto bg-green-100 text-green-800">
                    <Sparkles size={12} className="mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <div 
                  ref={scrollContainerRef}
                  className="flex-1 p-4 overflow-y-auto scroll-smooth"
                  style={{ maxHeight: 'calc(600px - 120px)' }}
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user' 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-white border border-emerald-200'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                          
                          {/* Resources */}
                          {message.resources && message.resources.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-sm text-slate-600 flex items-center gap-1">
                                <Globe size={14} />
                                Recommended Resources:
                              </p>
                              {message.resources.map((resource, index) => (
                                <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                  <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${
                                      resource.type === 'youtube' ? 'bg-red-100 text-red-600' :
                                      resource.type === 'article' ? 'bg-blue-100 text-blue-600' :
                                      'bg-green-100 text-green-600'
                                    }`}>
                                      {resource.type === 'youtube' ? <Youtube size={16} /> :
                                       resource.type === 'article' ? <FileText size={16} /> :
                                       <Globe size={16} />}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-slate-800 mb-1">{resource.title}</h4>
                                      <p className="text-slate-600 text-sm mb-2">{resource.description}</p>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                      >
                                        <ExternalLink size={14} className="mr-2" />
                                        Open Resource
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Quiz */}
                          {message.quiz && (
                            <div className="mt-3">
                              <Button
                                onClick={() => setCurrentQuiz(message.quiz!)}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                              >
                                <Target size={16} className="mr-2" />
                                Take Quiz
                              </Button>
                            </div>
                          )}
                          
                          <p className="text-xs text-slate-500 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <div className="bg-white border border-emerald-200 rounded-2xl px-4 py-3">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="border-t border-emerald-100 p-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Ask me anything about this topic..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Lightbulb size={20} />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-emerald-200 hover:bg-emerald-50"
                  onClick={() => startStructuredLearning()}
                >
                  <BookOpen size={16} className="mr-2" />
                  Start Structured Learning
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-emerald-200 hover:bg-emerald-50"
                  onClick={() => conversationStage === 'learning' ? nextTopic() : setInputMessage('Show me resources')}
                >
                  {conversationStage === 'learning' ? (
                    <>
                      <ChevronRight size={16} className="mr-2" />
                      Next Topic
                    </>
                  ) : (
                    <>
                      <Globe size={16} className="mr-2" />
                      Get Resources
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-emerald-200 hover:bg-emerald-50"
                  onClick={() => startComprehensiveQuiz()}
                  disabled={conversationStage === 'quiz'}
                >
                  <Target size={16} className="mr-2" />
                  {conversationStage === 'quiz' ? 'Quiz in Progress' : 'Take Comprehensive Quiz'}
                </Button>
              </CardContent>
            </Card>

            {/* Lesson Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <CategoryIcon size={20} />
                  Lesson Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="text-slate-800 mb-2">{lessonData.title}</h4>
                <p className="text-slate-600 text-sm mb-4">{lessonData.description}</p>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Topics Covered</p>
                  <div className="space-y-2">
                    {lessonData.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="text-emerald-600" size={14} />
                        <span className="text-slate-700 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Award size={20} />
                  Session Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Questions Asked</span>
                  <span className="text-slate-800">{messages.filter(m => m.type === 'user').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Progress</span>
                  <span className="text-slate-800">{learningProgress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Status</span>
                  <Badge className={
                    conversationStage === 'completed' ? 'bg-green-100 text-green-800' :
                    conversationStage === 'quiz' ? 'bg-yellow-100 text-yellow-800' :
                    conversationStage === 'learning' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }>
                    {conversationStage === 'completed' ? 'Completed' :
                     conversationStage === 'quiz' ? 'Quiz Phase' :
                     conversationStage === 'learning' ? 'Learning' : 'Getting Started'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <Dialog open={!!currentQuiz} onOpenChange={() => !showQuizResult && closeQuiz()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="text-purple-600" size={24} />
                {quizSession ? 'Comprehensive Assessment' : 'Knowledge Check'}
              </div>
              {quizSession && (
                <div className="text-sm text-slate-600">
                  Question {quizSession.currentQuestionIndex + 1} of {quizSession.questions.length}
                </div>
              )}
            </DialogTitle>
            <DialogDescription>
              {quizSession ? 
                `Answer each question carefully. Your final score will be calculated at the end.` :
                'Test your understanding of the topic with this personalized quiz question.'
              }
            </DialogDescription>
            {quizSession && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(((quizSession.currentQuestionIndex) / quizSession.questions.length) * 100)}%</span>
                </div>
                <Progress 
                  value={(quizSession.currentQuestionIndex / quizSession.questions.length) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </DialogHeader>
          
          {currentQuiz && (
            <div className="space-y-6">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-slate-800 mb-4">{currentQuiz.question}</h3>
                <div className="space-y-3">
                  {currentQuiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showQuizResult && handleQuizAnswer(index)}
                      disabled={showQuizResult}
                      className={`w-full p-3 text-left rounded-lg border transition-all ${
                        showQuizResult
                          ? index === currentQuiz.correctAnswer
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : index === selectedAnswer && index !== currentQuiz.correctAnswer
                            ? 'bg-red-100 border-red-300 text-red-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                          : selectedAnswer === index
                          ? 'bg-purple-100 border-purple-300 text-purple-800'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                        {showQuizResult && index === currentQuiz.correctAnswer && (
                          <CheckCircle className="ml-auto text-green-600" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {showQuizResult && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="text-slate-800 mb-2">Explanation:</h4>
                  <p className="text-slate-600">{currentQuiz.explanation}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                {showQuizResult && (
                  <Button
                    onClick={closeQuiz}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    Continue Learning
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EcoAI;