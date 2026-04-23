import { GoogleGenerativeAI } from "@google/generative-ai"
import { AIProvider, ParsedJobData } from "./types"

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  async parseJobEmail(content: string): Promise<ParsedJobData | null> {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      })
      
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
      const cleanText = text.replace(/```json|```/g, "").trim()
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
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
    const analysis = await this.analyzeApplication(applicationData)
    return analysis.summary
  }

  async analyzeApplication(applicationData: any): Promise<{ summary: string, sentiment: number, velocity: string }> {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      })
      
      const emailContext = applicationData.emails?.map((e: any) => `Subject: ${e.subject}\nSnippet: ${e.bodySnippet}`).join("\n\n")
      
      const prompt = `
        Analyze the job application progress for ${applicationData.role} at ${applicationData.company}.
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
        }
      `
      
      const result = await model.generateContent(prompt)
      const cleanText = text.replace(/```json|```/g, "").trim()
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      return {
        summary: `Application at ${applicationData.company} is currently in ${applicationData.status} stage.`,
        sentiment: 50,
        velocity: "Normal"
      }
    } catch (error) {
      console.error("Gemini analysis error:", error)
      return {
        summary: "Unable to generate intelligence report at this time.",
        sentiment: 0,
        velocity: "N/A"
      }
    }
  }
}
