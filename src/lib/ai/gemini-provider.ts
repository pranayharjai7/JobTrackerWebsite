import { GoogleGenerativeAI } from "@google/generative-ai"
import { AIProvider, ParsedJobData } from "./types"

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  async parseJobEmail(content: string): Promise<ParsedJobData | null> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      
      const prompt = `
        You are an expert at parsing job-related emails. 
        Analyze the following email content and extract the job details in JSON format.
        
        Rules:
        1. Normalize company names (e.g., "Google LLC" -> "Google").
        2. Identify the application stage: APPLIED, IN_REVIEW, INTERVIEW, OFFER, REJECTED.
        3. Provide a confidence score (0-1).
        
        Email Content:
        """
        ${content}
        """
        
        Expected JSON format:
        {
          "company": "Company Name",
          "role": "Job Title",
          "status": "APPLIED | IN_REVIEW | INTERVIEW | OFFER | REJECTED",
          "location": "Remote | City, Country | null",
          "confidence": 0.95
        }
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Extract JSON from the response text (handling potential markdown blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      return null
    } catch (error) {
      console.error("Gemini parsing error:", error)
      return null
    }
  }

  async generateSummary(applicationData: any): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const prompt = `
        Summarize the current progress for this job application at ${applicationData.company} for the role of ${applicationData.role}.
        Current status: ${applicationData.status}.
        Provide a concise "at-a-glance" report (max 3 sentences).
      `
      const result = await model.generateContent(prompt)
      return result.response.text().trim()
    } catch (error) {
      console.error("Gemini summary error:", error)
      return "Unable to generate summary."
    }
  }
}
