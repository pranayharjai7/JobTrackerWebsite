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
}
