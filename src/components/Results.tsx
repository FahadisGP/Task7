import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AssessmentResult, DetailedRoadmap, RoadmapPhase } from "@/types/assessment";
import { 
  Compass, 
  Sparkles, 
  Target, 
  TrendingUp, 
  RefreshCw, 
  Briefcase, 
  Code, 
  Palette, 
  Users, 
  BarChart, 
  BookOpen,
  Lightbulb,
  CheckCircle2,
  GraduationCap,
  Rocket,
  Trophy,
  Wrench,
  Calendar,
  ArrowRight
} from "lucide-react";

interface ResultsProps {
  result: AssessmentResult;
  onRetake: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  code: Code,
  palette: Palette,
  users: Users,
  chart: BarChart,
  book: BookOpen,
  default: Target
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || iconMap.default;
};

const phaseConfig = {
  beginner: {
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-500',
    label: '🟢 Beginner Phase',
    dotColor: 'bg-emerald-500',
  },
  intermediate: {
    icon: Rocket,
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-500',
    label: '🟡 Intermediate Phase',
    dotColor: 'bg-amber-500',
  },
  advanced: {
    icon: Trophy,
    gradient: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    textColor: 'text-violet-500',
    label: '🟣 Advanced Phase',
    dotColor: 'bg-violet-500',
  },
};

const PhaseCard = ({ phase, index }: { phase: RoadmapPhase; index: number }) => {
  const config = phaseConfig[phase.phase];
  const PhaseIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className={`rounded-2xl border ${config.borderColor} ${config.bgColor} p-6 space-y-5`}
    >
      {/* Phase Header */}
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
          <PhaseIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className={`font-bold text-lg ${config.textColor}`}>{config.label}</h4>
          <p className="text-sm text-muted-foreground">{phase.days}</p>
        </div>
      </div>

      {/* Goal */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
        <Target className={`w-5 h-5 ${config.textColor} mt-0.5 flex-shrink-0`} />
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">🎯 Learning Goal</p>
          <p className="text-foreground font-medium">{phase.goal}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> 📘 Skills to Master
        </p>
        <div className="flex flex-wrap gap-2">
          {phase.skills.map((skill, i) => (
            <span
              key={i}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4" /> 🧠 Recommended Courses
        </p>
        <div className="space-y-2">
          {phase.courses.map((course, i) => (
            <div key={i} className="p-4 rounded-xl bg-card/80 border border-border/50">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-semibold text-foreground">{course.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${config.gradient} text-white font-medium`}>
                  {course.platform}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{course.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Wrench className="w-4 h-4" /> 🏗️ Hands-On Project
        </p>
        <div className="p-5 rounded-xl bg-card border border-border/50 space-y-4">
          <div>
            <h5 className="font-bold text-foreground text-lg mb-2">{phase.project.title}</h5>
            <p className="text-muted-foreground">{phase.project.description}</p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              🔧 Tools & Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {phase.project.tools.map((tool, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg text-sm bg-secondary text-secondary-foreground font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1">
              ➤ Step-by-Step Guide
            </p>
            <div className="space-y-3">
              {phase.project.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold bg-gradient-to-br ${config.gradient} text-white shadow-md`}>
                    {step.step}
                  </div>
                  <p className="text-foreground pt-1">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverable */}
          <div className={`p-4 rounded-xl bg-gradient-to-r ${config.bgColor} border ${config.borderColor}`}>
            <p className={`text-xs font-semibold ${config.textColor} mb-1 flex items-center gap-1`}>
              <CheckCircle2 className="w-4 h-4" /> ✅ Portfolio-Ready Deliverable
            </p>
            <p className="text-foreground font-medium">{phase.project.deliverable}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RoadmapSection = ({ roadmap, index }: { roadmap: DetailedRoadmap; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.2 }}
      className="space-y-6"
    >
      {/* Career Path Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-soft">
            <Calendar className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{roadmap.careerPathTitle}</h3>
            <p className="text-muted-foreground">📆 Complete 90-Day Learning Journey</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
          <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Why This Path Fits You</p>
            <p className="text-foreground">{roadmap.personaFit}</p>
          </div>
        </div>
      </div>

      {/* Timeline Overview */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-md" />
          <span className="text-sm font-medium text-foreground">Days 1-30</span>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500 shadow-md" />
          <span className="text-sm font-medium text-foreground">Days 31-60</span>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-violet-500 shadow-md" />
          <span className="text-sm font-medium text-foreground">Days 61-90</span>
        </div>
      </div>

      {/* Phases */}
      <div className="grid gap-6">
        {roadmap.phases.map((phase, phaseIndex) => (
          <PhaseCard key={phase.phase} phase={phase} index={phaseIndex} />
        ))}
      </div>
    </motion.div>
  );
};

export function Results({ result, onRetake }: ResultsProps) {
  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-soft">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Your Career Results</span>
          </div>
        </motion.header>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section 1: Top 3 Career Paths */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your Top 3 Career Paths</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {result.careerPaths.map((career, index) => {
                const Icon = getIcon(career.icon);
                return (
                  <motion.div
                    key={career.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="group bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {career.matchScore}% Match
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{career.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{career.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {career.keySkills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Section 2: Career Persona */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your Career Persona</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold gradient-text mb-4">{result.persona.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{result.persona.summary}</p>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <p className="text-sm font-medium text-foreground mb-2">Your Work Style</p>
                    <p className="text-muted-foreground text-sm">{result.persona.workStyle}</p>
                  </div>
                </div>
                <div className="md:w-72">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Key Strengths
                  </h4>
                  <div className="space-y-3">
                    {result.persona.strengths.map((strength, index) => (
                      <motion.div
                        key={strength}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm font-medium">{strength}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Detailed 90-Day Roadmaps */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your 90-Day Learning Roadmaps</h2>
                <p className="text-muted-foreground text-sm">Detailed action plans for each career path</p>
              </div>
            </div>

            <div className="space-y-12">
              {result.detailedRoadmaps?.map((roadmap, index) => (
                <RoadmapSection key={index} roadmap={roadmap} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Section 4: Skills to Focus On */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Priority Skills to Develop</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {result.skillsToFocus.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-card rounded-xl p-5 shadow-card border border-border/50 hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-foreground">{skill.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      skill.importance === 'Critical' 
                        ? 'bg-destructive/10 text-destructive' 
                        : skill.importance === 'High'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {skill.importance}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{skill.actionItem}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Retake Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center pb-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onRetake}
              className="gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Retake Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
