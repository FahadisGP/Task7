import { useState } from "react";
import { Landing } from "@/components/Landing";
import { Assessment } from "@/components/Assessment";
import { Loading } from "@/components/Loading";
import { Results } from "@/components/Results";
import { Answer, AssessmentResult } from "@/types/assessment";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AppState = 'landing' | 'assessment' | 'loading' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStartAssessment = () => {
    setAppState('assessment');
  };

  const handleAssessmentComplete = async (answers: Answer[]) => {
    setAppState('loading');
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-career', {
        body: { answers }
      });

      if (error) {
        console.error('Error calling AI:', error);
        toast.error('Failed to analyze your profile. Please try again.');
        setAppState('assessment');
        return;
      }

      if (data.error) {
        console.error('AI error:', data.error);
        toast.error(data.error);
        setAppState('assessment');
        return;
      }

      setResult(data as AssessmentResult);
      setAppState('results');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
      setAppState('assessment');
    }
  };

  const handleRetake = () => {
    setResult(null);
    setAppState('landing');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  return (
    <>
      {appState === 'landing' && (
        <Landing onStart={handleStartAssessment} />
      )}
      {appState === 'assessment' && (
        <Assessment 
          onComplete={handleAssessmentComplete} 
          onBack={handleBackToLanding}
        />
      )}
      {appState === 'loading' && (
        <Loading />
      )}
      {appState === 'results' && result && (
        <Results result={result} onRetake={handleRetake} />
      )}
    </>
  );
};

export default Index;
