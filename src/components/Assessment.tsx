import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { questions, Answer } from "@/types/assessment";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentProps {
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

export function Assessment({ onComplete, onBack }: AssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | number | string[]>("");
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});

  const question = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  const handleAnswer = (value: string | number | string[]) => {
    setCurrentAnswer(value);
  };

  const handleMultiSelect = (option: string) => {
    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
    if (current.includes(option)) {
      setCurrentAnswer(current.filter(o => o !== option));
    } else {
      setCurrentAnswer([...current, option]);
    }
  };

  const handleSliderChange = (option: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [option]: value }));
  };

  const handleNext = () => {
    let finalAnswer = currentAnswer;
    
    if (question.type === 'slider') {
      finalAnswer = JSON.stringify(sliderValues);
    }

    const newAnswer: Answer = {
      questionId: question.id,
      value: finalAnswer
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== question.id), newAnswer];
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentAnswer("");
      setSliderValues({});
    } else {
      onComplete(updatedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prevAnswer = answers.find(a => a.questionId === questions[currentStep - 1].id);
      if (prevAnswer) {
        if (questions[currentStep - 1].type === 'slider') {
          try {
            setSliderValues(JSON.parse(prevAnswer.value as string));
            setCurrentAnswer("");
          } catch {
            setCurrentAnswer(prevAnswer.value);
          }
        } else {
          setCurrentAnswer(prevAnswer.value);
        }
      }
    }
  };

  const isAnswerValid = () => {
    if (question.type === 'slider') {
      return Object.keys(sliderValues).length > 0;
    }
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.length > 0;
    }
    return currentAnswer !== "";
  };

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Career Compass</span>
          </div>
          <div className="w-20" />
        </header>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border/50"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {question.title}
              </h2>
              <p className="text-muted-foreground mb-8">{question.description}</p>

              {/* Radio Options */}
              {question.type === 'radio' && question.options && (
                <div className="grid gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all duration-200",
                        currentAnswer === option
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/30 hover:bg-secondary/50 text-foreground"
                      )}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Multi-select Options */}
              {question.type === 'multiselect' && question.options && (
                <div className="grid grid-cols-2 gap-3">
                  {question.options.map((option) => {
                    const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => handleMultiSelect(option)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border hover:border-primary/30 hover:bg-secondary/50 text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                          )}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium text-sm">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Text Input */}
              {question.type === 'text' && (
                <textarea
                  value={currentAnswer as string}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full h-32 p-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none transition-colors"
                />
              )}

              {/* Slider */}
              {question.type === 'slider' && question.options && (
                <div className="space-y-6">
                  {question.options.map((option) => (
                    <div key={option}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-foreground">{option}</span>
                        <span className="text-primary font-bold">{sliderValues[option] || 5}</span>
                      </div>
                      <input
                        type="range"
                        min={question.min}
                        max={question.max}
                        value={sliderValues[option] || 5}
                        onChange={(e) => handleSliderChange(option, parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Low priority</span>
                        <span>High priority</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-10">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="hero"
                  onClick={handleNext}
                  disabled={!isAnswerValid()}
                  className="gap-2"
                >
                  {currentStep === questions.length - 1 ? "Get Results" : "Continue"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
