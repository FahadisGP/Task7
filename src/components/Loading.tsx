import { motion } from "framer-motion";
import { Compass, Sparkles, Brain, Target } from "lucide-react";

export function Loading() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Animated compass icon */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full gradient-bg rounded-full flex items-center justify-center shadow-glow">
            <Compass className="w-16 h-16 text-primary-foreground" />
          </div>
          
          {/* Orbiting icons */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-card border border-border">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-card border border-border">
              <Brain className="w-5 h-5 text-accent" />
            </div>
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 -right-6 -translate-y-1/2"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-card border border-border">
              <Target className="w-4 h-4 text-primary" />
            </div>
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-4"
        >
          Analyzing Your Profile
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8 max-w-md mx-auto"
        >
          Our AI is crafting personalized career recommendations just for you...
        </motion.p>

        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 max-w-xs mx-auto"
        >
          {[
            "Analyzing your skills & interests",
            "Matching career opportunities",
            "Building your learning roadmap"
          ].map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.3 }}
              className="flex items-center gap-3 text-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-muted-foreground">{step}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
