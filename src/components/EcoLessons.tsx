import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Leaf, 
  Droplets, 
  Zap, 
  Recycle, 
  TreePine, 
  ArrowLeft, 
  Filter, 
  Search,
  Star,
  Play,
  Clock,
  Award,
  CheckCircle,
  BookOpen,
  Users,
  ChevronRight,
  Sun,
  Wind,
  Flower,
  Bot,
  MessageCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EcoLessonsProps {
  onBack: () => void;
  userName: string;
  onNavigateToAI: (lessonData: any) => void;
}

const EcoLessons = ({ onBack, userName, onNavigateToAI }: EcoLessonsProps) => {
  const [showFloatingElements, setShowFloatingElements] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowFloatingElements(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'water', name: 'Water', icon: Droplets, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'energy', name: 'Energy', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { id: 'waste', name: 'Waste', icon: Recycle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 'nature', name: 'Nature', icon: TreePine, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  ];

  const lessons = [
    {
      id: 1,
      title: 'Water Conservation Basics',
      description: 'Learn fundamental techniques to save water in daily life',
      category: 'water',
      difficulty: 'beginner',
      duration: '15 min',
      points: 50,
      progress: 100,
      status: 'completed',
      rating: 4.8,
      students: 1250,
      image: 'https://images.unsplash.com/photo-1666413767635-78c79a06b4db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGNvbnNlcnZhdGlvbiUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTcxNjMzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      topics: ['Household water saving', 'Leak detection', 'Greywater systems']
    },
    {
      id: 2,
      title: 'Solar Energy Fundamentals',
      description: 'Understanding how solar power works and its benefits',
      category: 'energy',
      difficulty: 'intermediate',
      duration: '25 min',
      points: 100,
      progress: 60,
      status: 'in-progress',
      rating: 4.9,
      students: 980,
      image: 'https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NTcwNzAzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      topics: ['Photovoltaic cells', 'Energy storage', 'Grid connection']
    },
    {
      id: 3,
      title: 'Composting Made Simple',
      description: 'Turn your kitchen waste into nutrient-rich soil',
      category: 'waste',
      difficulty: 'beginner',
      duration: '20 min',
      points: 75,
      progress: 0,
      status: 'not-started',
      rating: 4.7,
      students: 1450,
      topics: ['Composting basics', 'What to compost', 'Troubleshooting']
    },
    {
      id: 4,
      title: 'Biodiversity Conservation',
      description: 'Protecting ecosystems and wildlife habitats',
      category: 'nature',
      difficulty: 'advanced',
      duration: '35 min',
      points: 150,
      progress: 25,
      status: 'in-progress',
      rating: 4.9,
      students: 750,
      topics: ['Ecosystem balance', 'Species protection', 'Habitat restoration']
    },
    {
      id: 5,
      title: 'Wind Energy Systems',
      description: 'Exploring wind power technology and applications',
      category: 'energy',
      difficulty: 'intermediate',
      duration: '30 min',
      points: 120,
      progress: 0,
      status: 'not-started',
      rating: 4.6,
      students: 680,
      topics: ['Wind turbines', 'Wind patterns', 'Offshore wind']
    },
    {
      id: 6,
      title: 'Zero Waste Lifestyle',
      description: 'Strategies to minimize waste in everyday life',
      category: 'waste',
      difficulty: 'advanced',
      duration: '40 min',
      points: 180,
      progress: 0,
      status: 'not-started',
      rating: 4.8,
      students: 920,
      topics: ['Reduce, reuse, recycle', 'Sustainable shopping', 'DIY alternatives']
    }
  ];

  // Filter lessons based on selected filters and search
  const filteredLessons = lessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  // Statistics
  const completedLessons = lessons.filter(l => l.status === 'completed').length;
  const inProgressLessons = lessons.filter(l => l.status === 'in-progress').length;
  const totalPoints = lessons.filter(l => l.status === 'completed').reduce((sum, l) => sum + l.points, 0);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-600" size={20} />;
      case 'in-progress': return <Play className="text-blue-600" size={20} />;
      case 'not-started': return <BookOpen className="text-slate-600" size={20} />;
      default: return <BookOpen className="text-slate-600" size={20} />;
    }
  };

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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
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
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <BookOpen className="text-emerald-600" size={32} />
              </motion.div>
              <div>
                <h1 className="text-emerald-800 mb-0">Interactive Lessons</h1>
                <p className="text-emerald-700">Learn sustainable practices at your own pace</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-4 text-center">
                <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
                <div className="text-xl text-slate-800">{completedLessons}</div>
                <div className="text-sm text-slate-600">Completed</div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-4 text-center">
                <Play className="text-blue-600 mx-auto mb-2" size={24} />
                <div className="text-xl text-slate-800">{inProgressLessons}</div>
                <div className="text-sm text-slate-600">In Progress</div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-4 text-center">
                <Award className="text-yellow-600 mx-auto mb-2" size={24} />
                <div className="text-xl text-slate-800">{totalPoints}</div>
                <div className="text-sm text-slate-600">Points Earned</div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-4 text-center">
                <BookOpen className="text-emerald-600 mx-auto mb-2" size={24} />
                <div className="text-xl text-slate-800">{lessons.length}</div>
                <div className="text-sm text-slate-600">Total Lessons</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
              />
            </div>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 border-emerald-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-48 border-emerald-200">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'border-emerald-200 hover:bg-emerald-50'
            }
          >
            All Categories
          </Button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'border-emerald-200 hover:bg-emerald-50'
                }
              >
                <Icon size={16} className="mr-2" />
                {category.name}
              </Button>
            );
          })}
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredLessons.map((lesson, index) => {
            const categoryData = categories.find(c => c.id === lesson.category);
            const Icon = categoryData?.icon || BookOpen;
            
            return (
              <motion.div
                key={lesson.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="cursor-pointer"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 h-full hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    {lesson.image && (
                      <ImageWithFallback
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <div className={`p-2 rounded-lg ${categoryData?.bgColor || 'bg-slate-100'}`}>
                        <Icon className={categoryData?.color || 'text-slate-600'} size={20} />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-slate-800">{lesson.title}</h3>
                      {getStatusIcon(lesson.status)}
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {lesson.description}
                    </p>
                    
                    {lesson.progress > 0 && lesson.status !== 'completed' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span className="text-emerald-600">{lesson.progress}%</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {lesson.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {lesson.students}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500" />
                          {lesson.rating}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <Award size={14} />
                        +{lesson.points} pts
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Topics</div>
                      <div className="flex flex-wrap gap-2">
                        {lesson.topics.slice(0, 2).map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {lesson.topics.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{lesson.topics.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <div className="px-6 pb-6 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                      {lesson.status === 'completed' ? 'Review' : 
                       lesson.status === 'in-progress' ? 'Continue' : 'Start Lesson'}
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={() => onNavigateToAI({
                        id: lesson.id,
                        title: lesson.title,
                        category: lesson.category,
                        description: lesson.description,
                        topics: lesson.topics
                      })}
                    >
                      <Bot size={16} className="mr-2" />
                      Chat with AI Tutor
                      <MessageCircle size={16} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredLessons.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="text-slate-400 mx-auto mb-4" size={48} />
            <h3 className="text-slate-600 mb-2">No lessons found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcoLessons;