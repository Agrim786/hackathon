export interface GroqConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

export class GroqClient {
  private config: GroqConfig;

  constructor(config: Partial<GroqConfig> = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.GROQ_API_KEY!,
      model: config.model || "llama3-70b-8192",
      baseUrl: config.baseUrl || "https://api.groq.com/openai/v1",
    };
  }

  async chatCompletion(messages: Array<{ role: string; content: string }>, options: any = {}) {
    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000,
        ...options,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async generateSuggestions(profile: any, weather: any): Promise<any[]> {
    const prompt = `You are a climate intelligence AI assistant. Based on the user profile and current weather conditions, provide 3-4 personalized climate recommendations.

User Profile:
- Age: ${profile.age}
- Gender: ${profile.gender}
- Occupation: ${profile.occupation}

Current Weather:
- Temperature: ${weather.temperature}°C (${Math.round(weather.temperature * 9/5 + 32)}°F)
- UV Index: ${weather.uvIndex}
- Rain Probability: ${weather.rainProbability}%
- Humidity: ${weather.humidity}%

Please provide practical, actionable suggestions in the following JSON format:
[
  {
    "type": "energy|health|safety|timing|general",
    "title": "Brief title",
    "content": "Detailed recommendation",
    "icon": "fas fa-icon-name"
  }
]

Focus on:
1. Health and safety recommendations
2. Energy efficiency tips
3. Optimal timing for activities
4. Occupation-specific advice`;

    const response = await this.chatCompletion([
      { role: "user", content: prompt }
    ]);

    try {
      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      throw new Error("Invalid AI response format");
    }
  }

  async simulateClimate(input: any, profile: any, weather: any): Promise<any> {
    const prompt = `Analyze the climate impact simulation scenario and provide recommendations.

Current Weather:
- Temperature: ${weather.temperature}°C
- UV Index: ${weather.uvIndex}
- Humidity: ${weather.humidity}%

Simulation Changes:
- Temperature change: ${input.temperatureChange > 0 ? '+' : ''}${input.temperatureChange}°F
- Rainfall change: ${input.rainfallChange > 0 ? '+' : ''}${input.rainfallChange}%

User Profile:
- Age: ${profile.age}
- Occupation: ${profile.occupation}

Provide a JSON response with:
{
  "impact": "Brief description of the climate impact",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "healthRisks": ["health risk 1", "health risk 2"]
}`;

    const response = await this.chatCompletion([
      { role: "user", content: prompt }
    ]);

    try {
      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error("Failed to parse simulation response:", error);
      throw new Error("Invalid simulation response format");
    }
  }
}

export const groqClient = new GroqClient();
