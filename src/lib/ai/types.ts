export interface ParsedJobData {
  company: string
  role: string
  status: "APPLIED" | "IN_REVIEW" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN"
  location?: string
  stage?: string
  interviewDate?: string
  confidence: number
}

export interface AIAnalysis {
  summary: string
  sentiment: number
  velocity: string
}

export interface AIProvider {
  parseJobEmail(emailContent: string): Promise<ParsedJobData | null>
  generateSummary?(applicationData: any): Promise<string>
  analyzeApplication?(applicationData: any): Promise<AIAnalysis>
  suggestFilters?(data: any): Promise<string[]>
}
