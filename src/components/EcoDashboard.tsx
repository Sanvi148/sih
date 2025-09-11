import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Leaf, 
  Flame, 
  Trophy, 
  BookOpen, 
  Target, 
  Star, 
  Award, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Play,
  TreePine,
  Droplets,
  Sun,
  Wind,
  Flower,
  Lock,
  Crown
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EcoDashboardProps {
  userRole: 'student' | 'teacher' | 'ngo';
  userName: string;
  onNavigateToLessons: () => void;
  onNavigateToChallenges: () => void;
}

const EcoDashboard = ({ userRole, userName, onNavigateToLessons, onNavigateToChallenges }: EcoDashboardProps) => {
  const [showFloatingElements, setShowFloatingElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFloatingElements(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const ecoPoints = 1250;
  const maxEcoPoints = 1500;
  const currentStreak = 7;
  const progressPercentage = (ecoPoints / maxEcoPoints) * 100;

  const stats = [
    { label: 'Challenges Done', value: 12, icon: Target, color: 'text-emerald-600' },
    { label: 'Lessons Learned', value: 8, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Badges Earned', value: 5, icon: Award, color: 'text-yellow-600' },
  ];

  const activeChallenges = [
    {
      id: 1,
      title: 'Water Conservation Week',
      description: 'Save 50 liters of water this week',
      progress: 75,
      status: 'active',
      daysLeft: 3,
      points: 150,
      icon: Droplets
    },
    {
      id: 2,
      title: 'Plant a Tree',
      description: 'Plant and document a new tree',
      progress: 0,
      status: 'pending',
      daysLeft: 7,
      points: 200,
      icon: TreePine
    },
    {
      id: 3,
      title: 'Solar Energy Learning',
      description: 'Complete solar energy module',
      progress: 100,
      status: 'completed',
      daysLeft: 0,
      points: 100,
      icon: Sun
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Green', points: 2450, avatar: 'AG', isCurrentUser: false },
    { rank: 2, name: 'Maya Forest', points: 2100, avatar: 'MF', isCurrentUser: false },
    { rank: 3, name: 'Sam Rivers', points: 1890, avatar: 'SR', isCurrentUser: false },
    { rank: 4, name: userName, points: ecoPoints, avatar: userName.split(' ').map(n => n[0]).join(''), isCurrentUser: true },
    { rank: 5, name: 'Jordan Leaf', points: 1180, avatar: 'JL', isCurrentUser: false },
  ];

  const badges = [
    { id: 1, name: 'Water Warrior', icon: Droplets, earned: true, description: 'Saved 100L of water' },
    { id: 2, name: 'Tree Hugger', icon: TreePine, earned: true, description: 'Planted 3 trees' },
    { id: 3, name: 'Solar Scholar', icon: Sun, earned: true, description: 'Mastered solar energy' },
    { id: 4, name: 'Wind Walker', icon: Wind, earned: true, description: 'Learned about wind power' },
    { id: 5, name: 'Flower Power', icon: Flower, earned: true, description: 'Created a garden' },
    { id: 6, name: 'Eco Master', icon: Crown, earned: false, description: 'Reach 2000 eco-points' },
    { id: 7, name: 'Green Guru', icon: Leaf, earned: false, description: 'Complete 20 challenges' },
    { id: 8, name: 'Planet Protector', icon: Trophy, earned: false, description: 'Top 3 on leaderboard' },
  ];

  // Floating nature elements
  const floatingElements = [
    { Icon: Leaf, position: { top: '5%', left: '3%' }, delay: 0.2 },
    { Icon: TreePine, position: { top: '15%', right: '5%' }, delay: 0.4 },
    { Icon: Droplets, position: { top: '50%', left: '2%' }, delay: 0.6 },
    { Icon: Sun, position: { top: '60%', right: '3%' }, delay: 0.8 },
    { Icon: Wind, position: { bottom: '20%', left: '4%' }, delay: 1.0 },
    { Icon: Flower, position: { bottom: '35%', right: '6%' }, delay: 1.2 },
  ];

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 3, -3, 0],
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

  const CircularProgress = ({ percentage, points, maxPoints }: { percentage: number, points: number, maxPoints: number }) => {
    const radius = 80;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="rgb(209 213 219)"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-20"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(16 185 129)" />
              <stop offset="50%" stopColor="rgb(34 197 94)" />
              <stop offset="100%" stopColor="rgb(20 184 166)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute text-center">
          <div className="text-2xl text-emerald-800 mb-1">{points}</div>
          <div className="text-sm text-emerald-600">/ {maxPoints}</div>
          <div className="text-xs text-slate-600 mt-1">Eco Points</div>
        </div>
      </div>
    );
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
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Leaf className="text-emerald-600" size={32} />
            </motion.div>
            <div>
              <h1 className="text-emerald-800 mb-0">Welcome back, {userName}!</h1>
              <p className="text-emerald-700">Ready to make a difference today?</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200">
              <Flame className="text-orange-500" size={20} />
              <span className="text-emerald-800">{currentStreak} day streak!</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress and Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Circular Progress */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                  <CardContent className="p-6 text-center">
                    <CircularProgress 
                      percentage={progressPercentage} 
                      points={ecoPoints} 
                      maxPoints={maxEcoPoints} 
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Cards */}
              {stats.map((stat, index) => (
                <motion.div key={stat.label} variants={itemVariants}>
                  <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 h-full">
                    <CardContent className="p-6 text-center">
                      <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
                      <div className="text-2xl text-slate-800 mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Active Challenges */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-800">
                    <Target size={24} />
                    Active Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeChallenges.map((challenge) => {
                    const Icon = challenge.icon;
                    return (
                      <div key={challenge.id} className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-emerald-100">
                            <Icon className="text-emerald-600" size={20} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-slate-800">{challenge.title}</h4>
                              <div className="flex items-center gap-2">
                                {challenge.status === 'completed' && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle size={12} className="mr-1" />
                                    Completed
                                  </Badge>
                                )}
                                {challenge.status === 'active' && (
                                  <Badge className="bg-blue-100 text-blue-800">
                                    <Clock size={12} className="mr-1" />
                                    {challenge.daysLeft} days left
                                  </Badge>
                                )}
                                {challenge.status === 'pending' && (
                                  <Badge className="bg-slate-100 text-slate-800">
                                    <Play size={12} className="mr-1" />
                                    Start Now
                                  </Badge>
                                )}
                                <span className="text-emerald-600">+{challenge.points} pts</span>
                              </div>
                            </div>
                            
                            <p className="text-slate-600 text-sm mb-3">{challenge.description}</p>
                            
                            <div className="flex items-center gap-2">
                              <Progress value={challenge.progress} className="flex-1 h-2" />
                              <span className="text-sm text-slate-600 w-12">{challenge.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  className="h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  onClick={onNavigateToLessons}
                >
                  <BookOpen className="mr-2" size={20} />
                  Continue Learning
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 border-emerald-200 hover:bg-emerald-50"
                  onClick={onNavigateToChallenges}
                >
                  <Target className="mr-2 text-emerald-600" size={20} />
                  Browse Challenges
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-800">
                    <Trophy size={24} />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        user.isCurrentUser 
                          ? 'bg-emerald-100 border border-emerald-200' 
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-slate-400 text-white' :
                        user.rank === 3 ? 'bg-amber-600 text-white' :
                        'bg-slate-300 text-slate-700'
                      }`}>
                        {user.rank}
                      </div>
                      
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className={`text-sm ${user.isCurrentUser ? 'text-emerald-800' : 'text-slate-800'}`}>
                          {user.name} {user.isCurrentUser && '(You)'}
                        </div>
                        <div className="text-xs text-slate-600">{user.points} points</div>
                      </div>
                      
                      {user.rank <= 3 && (
                        <Crown className="text-yellow-500" size={16} />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Badge Collection */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-800">
                    <Award size={24} />
                    Badge Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-3">
                    {badges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <motion.div
                          key={badge.id}
                          className={`relative p-3 rounded-lg border-2 transition-all ${
                            badge.earned 
                              ? 'bg-emerald-100 border-emerald-300' 
                              : 'bg-slate-100 border-slate-200 opacity-60'
                          }`}
                          whileHover={badge.earned ? { scale: 1.05 } : {}}
                          title={badge.description}
                        >
                          <Icon 
                            className={badge.earned ? 'text-emerald-600' : 'text-slate-400'} 
                            size={24} 
                          />
                          {!badge.earned && (
                            <Lock 
                              className="absolute top-1 right-1 text-slate-400" 
                              size={12} 
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                      View All Badges
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcoDashboard;