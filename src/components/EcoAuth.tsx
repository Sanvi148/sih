import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Leaf, Mail, ArrowLeft, GraduationCap, Users, Heart, TreePine, Droplets, Sun, Wind, Flower } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EcoAuthProps {
  onBack: () => void;
  onAuthSuccess: (role: 'student' | 'teacher' | 'ngo', name: string) => void;
}

type Role = 'student' | 'teacher' | 'ngo';

const EcoAuth = ({ onBack, onAuthSuccess }: EcoAuthProps) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showFloatingElements, setShowFloatingElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFloatingElements(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const roles = [
    {
      id: 'student' as Role,
      title: 'Student',
      description: 'Learn sustainable practices and join a community of eco-conscious learners',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      id: 'teacher' as Role,
      title: 'Teacher',
      description: 'Educate and inspire the next generation with environmental knowledge',
      icon: Users,
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'ngo' as Role,
      title: 'NGO',
      description: 'Connect with communities and drive impactful environmental initiatives',
      icon: Heart,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600'
    }
  ];

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  // Floating nature elements for environmental feel
  const floatingElements = [
    { Icon: Leaf, position: { top: '10%', left: '5%' }, delay: 0.2 },
    { Icon: TreePine, position: { top: '20%', right: '8%' }, delay: 0.4 },
    { Icon: Droplets, position: { top: '60%', left: '3%' }, delay: 0.6 },
    { Icon: Sun, position: { top: '70%', right: '5%' }, delay: 0.8 },
    { Icon: Wind, position: { bottom: '15%', left: '7%' }, delay: 1.0 },
    { Icon: Flower, position: { bottom: '25%', right: '10%' }, delay: 1.2 },
  ];

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    console.log('Google login for role:', selectedRole);
    if (selectedRole) {
      // Mock successful login
      const userName = selectedRole === 'student' ? 'Alex Student' : 
                      selectedRole === 'teacher' ? 'Dr. Green' : 'EcoOrg Leader';
      onAuthSuccess(selectedRole, userName);
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email login:', { email, password, role: selectedRole, isLogin });
    if (selectedRole) {
      // Mock successful login
      const userName = selectedRole === 'student' ? 'Alex Student' : 
                      selectedRole === 'teacher' ? 'Dr. Green' : 'EcoOrg Leader';
      onAuthSuccess(selectedRole, userName);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
      {/* Environmental Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1696250863507-262618217c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMGdyZWVuJTIwbmF0dXJlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTcxNjI4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Forest background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/40 via-green-50/20 to-transparent" />
      </div>

      {/* Floating Nature Elements */}
      {showFloatingElements && floatingElements.map(({ Icon, position, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-emerald-600/30 pointer-events-none hidden md:block"
          style={position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 1 }}
        >
          <motion.div variants={floatVariants} animate="animate">
            <Icon size={32} />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/50"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-600" size={24} />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">EcoSplash</span>
          </div>
        </motion.div>

        {!selectedRole ? (
          /* Role Selection */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Leaf className="text-emerald-600" size={32} />
                </motion.div>
                <h1 className="text-emerald-800 mb-0">Choose Your Role</h1>
              </div>
              <p className="text-emerald-700 max-w-2xl mx-auto">
                Join our community of environmental champions. Select your role to get personalized content and connect with like-minded individuals.
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mt-4" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={role.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <Card className={`h-full transition-all duration-300 hover:shadow-lg ${role.borderColor} border-2 bg-gradient-to-br ${role.bgGradient} backdrop-blur-sm`}>
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${role.gradient} flex items-center justify-center`}>
                          <Icon className="text-white" size={28} />
                        </div>
                        
                        <h3 className={`mb-4 ${role.textColor}`}>{role.title}</h3>
                        <p className="text-slate-700 flex-grow leading-relaxed">
                          {role.description}
                        </p>
                        
                        <div className="mt-6">
                          <div className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${role.gradient} text-white transition-all duration-300 hover:shadow-md`}>
                            Select {role.title}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Login Form */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              {selectedRoleData && (
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${selectedRoleData.gradient} flex items-center justify-center`}>
                  <selectedRoleData.icon className="text-white" size={32} />
                </div>
              )}
              
              <h1 className="text-emerald-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </h1>
              <p className="text-emerald-700">
                {isLogin ? 'Sign in' : 'Sign up'} as a {selectedRoleData?.title}
              </p>
            </motion.div>

            <Card className="border-2 border-emerald-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-8">
                <motion.div variants={itemVariants}>
                  {/* Google Login */}
                  <Button
                    variant="outline"
                    className="w-full mb-6 h-12 border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-emerald-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-emerald-600">or</span>
                    </div>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                  </form>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-emerald-700 hover:text-emerald-800 underline transition-colors"
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                    >
                      Change Role
                    </button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcoAuth;