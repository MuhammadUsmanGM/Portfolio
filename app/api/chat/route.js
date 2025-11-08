import { NextResponse } from 'next/server';

// Function to calculate age based on birth date (September 30, 2005)
function calculateAge() {
  const birthDate = new Date('2005-09-30');  // September 30, 2005
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If the current month is before the birth month, or if it's the same month but the day is before the birth day
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Check if we have the required environment variables
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured in environment variables');
      return NextResponse.json(
        { 
          success: false,
          error: 'Chat service is not configured properly. Please contact the site administrator to set up the API key.' 
        },
        { status: 500 }
      );
    }

    // Prepare the request to the Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text: `You are Chatty, Muhammad Usman's assistant. Your role is to provide specific information about Muhammad Usman when asked. Here's his information:

- Skills: Python, JavaScript, HTML, React, CSS, Next.js, MongoDB, Supabase, MCP servers, OpenAI Agent SDK, Git, Tailwind CSS
- GitHub: https://github.com/MuhammadUsmanGM
- LinkedIn: https://www.linkedin.com/in/muhammad-usman-099704390?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
- Portfolio: https://portfolio-o4hs.vercel.app/
- Email: muhammadusman5965etc@gmail.com
- Phone: +923256550687
- Date of Birth: September 30, 2005 (Age: ${calculateAge()})
- Location: Lahore, Pakistan
- Education: Learning AI from Panaversity Lahore at University of Management and Technology Lahore; Student of Software Engineering at Virtual University of Pakistan
- Languages: English (Professional), Urdu
- Hobbies: Developing creative projects, playing video games
- Availability: Working hours from 9 AM to 5 PM (Asia/Karachi timezone)
- Current Focus: Strengthening expertise in AI and learning about AI agents
- Soft Skills: Teamwork, Communication, Problem Solving, Public Speaking
- Certifications:
  * Model Context Protocol: Advanced Topics from Anthropic - Verification: https://verify.skilljar.com/c/dokpqm5h6tvd
  * Introduction to Model Context Protocol from Anthropic - Verification: http://verify.skilljar.com/c/hdwfvh9ighf3
  * AI for Everyone from DeepLearning.AI - Verification: https://www.coursera.org/account/accomplishments/verify/94J7EBIQJZ19

Only respond to queries about Muhammad Usman. If the user asks for specific information (like email, GitHub profile, certifications, etc.), provide only that requested information. If someone asks how to implement AI in sites, you may give a brief general answer but redirect to Muhammad Usman's expertise. Respond to greetings appropriately. Keep all responses concise and helpful. The user said: "${message}"`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      
      if (response.status === 429) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Rate limit exceeded. Please try again later.' 
          },
          { status: 429 }
        );
      } else {
        return NextResponse.json(
          { 
            success: false,
            error: `Failed to get response from Gemini API. Status: ${response.status}` 
          },
          { status: 500 }
        );
      }
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    let botResponse = 'I\'m sorry, I couldn\'t understand that. Can you please rephrase?';
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      botResponse = data.candidates[0].content.parts[0].text || botResponse;
    }

    return NextResponse.json({ 
      success: true, 
      response: botResponse 
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error in chat API' 
      },
      { status: 500 }
    );
  }
}