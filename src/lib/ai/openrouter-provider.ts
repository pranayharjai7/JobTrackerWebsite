import { AIProvider, ParsedJobData } from "./types"

const MODELS = [
  "openai/gpt-4o-mini",
  "anthropic/claude-3-haiku",
  "google/gemini-pro",
]

export class OpenRouterProvider implements AIProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async parseJobEmail(emailContent: string): Promise<ParsedJobData | null> {
    for (const model of MODELS) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
            "X-Title": "JobTrack",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "system",
                content: `Extract job application info from email. 
                Return JSON only. 
                Fields: company, role, status (one of: APPLIED, IN_REVIEW, INTERVIEW, OFFER, REJECTED, WITHDRAWN), location, stage, interviewDate (ISO format if possible), confidence (0-1).
                
                Status detection keywords:
                - application received -> APPLIED
                - under review -> IN_REVIEW
                - interview invitation -> INTERVIEW
                - offer -> OFFER
                - rejection -> REJECTED`,
              },
              {
                role: "user",
                content: emailContent,
              },
            ],
            response_format: { type: "json_object" },
          }),
        })

        if (!response.ok) {
          console.warn(`OpenRouter model ${model} failed: ${response.statusText}`)
          continue
        }

        const data = await response.json()
        const content = data.choices[0].message.content
        return JSON.parse(content) as ParsedJobData
      } catch (error) {
        console.error(`Error with model ${model}:`, error)
        continue
      }
    }

    return null
  }
  async generateSummary(applicationData: any): Promise<string> {
    const analysis = await this.analyzeApplication(applicationData)
    return analysis.summary
  }

  async analyzeApplication(applicationData: any): Promise<{ summary: string, sentiment: number, velocity: string }> {
    const emailContext = applicationData.emails?.map((e: any) => `Subject: ${e.subject}\nSnippet: ${e.bodySnippet}`).join("\n\n")

    for (const model of MODELS) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
            "X-Title": "JobTrack",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "system",
                content: `Analyze the job application progress for ${applicationData.role} at ${applicationData.company}.
                Current status: ${applicationData.status}.
                
                Emails Context:
                ${emailContext || "No emails found."}
                
                Tasks:
                1. Summarize the current state in 2-3 professional sentences.
                2. Estimate the sentiment of the employer (0-100 score).
                3. Determine the "Response Velocity" (Fast, Normal, Slow, or N/A).
                
                Return ONLY a JSON object in this format:
                {
                  "summary": "...",
                  "sentiment": 85,
                  "velocity": "Fast"
                }`,
              },
            ],
            response_format: { type: "json_object" },
          }),
        })

        if (!response.ok) {
          console.warn(`OpenRouter model ${model} for analysis failed: ${response.statusText}`)
          continue
        }

        const data = await response.json()
        const content = data.choices[0].message.content
        return JSON.parse(content)
      } catch (error) {
        console.error(`Error with model ${model} during analysis:`, error)
        continue
      }
    }

    return {
      summary: `Application at ${applicationData.company} is currently in ${applicationData.status} stage.`,
      sentiment: 50,
      velocity: "Normal"
    }
  }
}
