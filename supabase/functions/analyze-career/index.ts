import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Received answers:', JSON.stringify(answers));

    const systemPrompt = `You are an expert career counselor and AI career advisor with 20+ years of mentorship experience. Based on the user's assessment answers, provide highly personalized, detailed, and actionable career recommendations.

You MUST respond with ONLY a valid JSON object (no markdown, no code blocks, no extra text) in this exact format:
{
  "careerPaths": [
    {
      "title": "Career Title",
      "description": "Brief 2-3 sentence description of why this career suits them",
      "matchScore": 95,
      "icon": "code",
      "keySkills": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ],
  "persona": {
    "title": "The [Adjective] [Noun]",
    "summary": "2-3 sentence summary of their career personality",
    "strengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4"],
    "workStyle": "Description of their ideal work style"
  },
  "detailedRoadmaps": [
    {
      "careerPathTitle": "Same as career path title",
      "personaFit": "1-2 sentences explaining why this path fits the user's persona",
      "phases": [
        {
          "phase": "beginner",
          "days": "Days 1-30",
          "goal": "Clear, specific learning objective for this phase",
          "skills": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3", "Specific Skill 4"],
          "courses": [
            {
              "name": "Course Name",
              "platform": "Platform Name (Coursera/Udemy/YouTube/etc)",
              "reason": "Why this course is perfect for beginners in this field"
            }
          ],
          "project": {
            "title": "Specific Project Name",
            "description": "Detailed description of what they will build (be specific, not generic)",
            "tools": ["Tool 1", "Tool 2", "Tool 3"],
            "steps": [
              {"step": 1, "description": "Detailed first step"},
              {"step": 2, "description": "Detailed second step"},
              {"step": 3, "description": "Detailed third step"},
              {"step": 4, "description": "Detailed fourth step"},
              {"step": 5, "description": "Detailed fifth step"}
            ],
            "deliverable": "Portfolio-ready output description"
          }
        },
        {
          "phase": "intermediate",
          "days": "Days 31-60",
          "goal": "Intermediate learning objective",
          "skills": ["Intermediate Skill 1", "Intermediate Skill 2", "Intermediate Skill 3", "Intermediate Skill 4"],
          "courses": [
            {
              "name": "Intermediate Course",
              "platform": "Platform",
              "reason": "Why this advances their learning"
            }
          ],
          "project": {
            "title": "Intermediate Project",
            "description": "More complex project description",
            "tools": ["Tool 1", "Tool 2", "Tool 3"],
            "steps": [
              {"step": 1, "description": "Step 1"},
              {"step": 2, "description": "Step 2"},
              {"step": 3, "description": "Step 3"},
              {"step": 4, "description": "Step 4"},
              {"step": 5, "description": "Step 5"},
              {"step": 6, "description": "Step 6"}
            ],
            "deliverable": "Portfolio-ready output"
          }
        },
        {
          "phase": "advanced",
          "days": "Days 61-90",
          "goal": "Advanced mastery objective",
          "skills": ["Advanced Skill 1", "Advanced Skill 2", "Advanced Skill 3", "Advanced Skill 4"],
          "courses": [
            {
              "name": "Advanced Course",
              "platform": "Platform",
              "reason": "Why this completes their foundation"
            }
          ],
          "project": {
            "title": "Capstone Project",
            "description": "Professional-grade project description",
            "tools": ["Tool 1", "Tool 2", "Tool 3", "Tool 4"],
            "steps": [
              {"step": 1, "description": "Step 1"},
              {"step": 2, "description": "Step 2"},
              {"step": 3, "description": "Step 3"},
              {"step": 4, "description": "Step 4"},
              {"step": 5, "description": "Step 5"},
              {"step": 6, "description": "Step 6"},
              {"step": 7, "description": "Step 7"}
            ],
            "deliverable": "Professional portfolio piece"
          }
        }
      ]
    }
  ],
  "skillsToFocus": [
    {
      "name": "Skill Name",
      "importance": "Critical",
      "actionItem": "Specific action to develop this skill"
    }
  ]
}

CRITICAL GUIDELINES:
- Provide exactly 3 career paths with matchScore between 75-98
- Provide exactly 4 strengths in the persona
- Provide EXACTLY 3 detailedRoadmaps (one for EACH career path)
- Each roadmap MUST have exactly 3 phases: beginner, intermediate, advanced
- Each phase MUST have 4 skills, 2-3 courses, and 1 detailed project
- Projects MUST be specific and practical, NOT generic (e.g., "Build a personal portfolio with ReactJS featuring 3 pages, responsive design, and a contact form using Formspree" NOT just "build a website")
- Each project MUST have 5-7 detailed steps
- Courses must be real courses from real platforms (Coursera, Udemy, LinkedIn Learning, YouTube channels, freeCodeCamp, etc.)
- Provide exactly 4 skills to focus on with importance levels: Critical, High, or Medium
- For icon field, use one of: "code", "palette", "users", "chart", "book", "briefcase"
- Make everything specific, actionable, and encouraging
- Think like a real mentor creating a personalized learning plan`;

    const userPrompt = `Analyze these career assessment answers and provide highly personalized, detailed, and actionable recommendations with complete 90-day roadmaps for each career path:

${answers.map((a: { questionId: number; value: string | number | string[] }) => {
  const questionTitles = [
    "Strongest Skills",
    "Energizing Activities", 
    "Ideal Work Environment",
    "Personality Traits",
    "Motivation Drivers",
    "5-Year Vision"
  ];
  return `${questionTitles[a.questionId - 1]}: ${typeof a.value === 'object' ? JSON.stringify(a.value) : a.value}`;
}).join('\n')}

Remember: Each of the 3 career paths needs its own complete 90-day roadmap with beginner, intermediate, and advanced phases. Projects must be specific and practical with step-by-step instructions.

Provide your career analysis as a JSON object.`;

    console.log('Sending request to AI gateway...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required, please add funds.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');
    
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON response
    let result;
    try {
      // Clean the content - remove markdown code blocks if present
      let cleanContent = content.trim();
      
      // Remove markdown code block markers
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      
      cleanContent = cleanContent.trim();
      
      // Find the first { and last } to extract JSON object
      const firstBrace = cleanContent.indexOf('{');
      const lastBrace = cleanContent.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanContent = cleanContent.slice(firstBrace, lastBrace + 1);
      }
      
      result = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse career analysis');
    }

    console.log('Successfully parsed result');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-career function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
