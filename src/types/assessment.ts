export interface Question {
  id: number;
  title: string;
  description: string;
  type: 'radio' | 'text' | 'slider' | 'multiselect';
  options?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface Answer {
  questionId: number;
  value: string | number | string[];
}

export interface CareerPath {
  title: string;
  description: string;
  matchScore: number;
  icon: string;
  keySkills: string[];
}

export interface CareerPersona {
  title: string;
  summary: string;
  strengths: string[];
  workStyle: string;
}

export interface ProjectStep {
  step: number;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tools: string[];
  steps: ProjectStep[];
  deliverable: string;
}

export interface Course {
  name: string;
  platform: string;
  reason: string;
}

export interface RoadmapPhase {
  phase: 'beginner' | 'intermediate' | 'advanced';
  days: string;
  goal: string;
  skills: string[];
  courses: Course[];
  project: Project;
}

export interface DetailedRoadmap {
  careerPathTitle: string;
  personaFit: string;
  phases: RoadmapPhase[];
}

export interface SkillToFocus {
  name: string;
  importance: string;
  actionItem: string;
}

export interface AssessmentResult {
  careerPaths: CareerPath[];
  persona: CareerPersona;
  detailedRoadmaps: DetailedRoadmap[];
  skillsToFocus: SkillToFocus[];
}

export const questions: Question[] = [
  {
    id: 1,
    title: "What are your strongest skills?",
    description: "Select the skills you feel most confident about",
    type: "multiselect",
    options: [
      "Problem Solving",
      "Communication",
      "Technical/Coding",
      "Creative Design",
      "Data Analysis",
      "Leadership",
      "Writing",
      "Research"
    ]
  },
  {
    id: 2,
    title: "What activities energize you the most?",
    description: "Tell us what you enjoy doing in your daily work",
    type: "text",
    placeholder: "e.g., Building things from scratch, helping others learn, solving puzzles..."
  },
  {
    id: 3,
    title: "What's your ideal work environment?",
    description: "Choose the setting where you thrive best",
    type: "radio",
    options: [
      "Remote & Flexible",
      "Collaborative Office",
      "Fast-paced Startup",
      "Structured Corporate",
      "Creative Studio",
      "Field Work / Outdoors"
    ]
  },
  {
    id: 4,
    title: "What personality traits define you best?",
    description: "How would your colleagues describe you?",
    type: "multiselect",
    options: [
      "Analytical & Logical",
      "Empathetic & Caring",
      "Creative & Innovative",
      "Organized & Detail-oriented",
      "Adventurous & Risk-taking",
      "Patient & Methodical"
    ]
  },
  {
    id: 5,
    title: "What motivates you to succeed?",
    description: "Rate what drives you from 1 (least) to 10 (most)",
    type: "slider",
    min: 1,
    max: 10,
    options: [
      "Financial Success",
      "Making an Impact",
      "Work-Life Balance",
      "Learning & Growth"
    ]
  },
  {
    id: 6,
    title: "Where do you see yourself in 5 years?",
    description: "Describe your long-term career vision",
    type: "text",
    placeholder: "e.g., Leading a team, running my own business, becoming an expert in..."
  }
];
