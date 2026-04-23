export interface ParsedJobData {
  company: string
  role: string
  status: "APPLIED" | "IN_REVIEW" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN"
  location?: string
  stage?: string
  interviewDate?: string
  confidence: number
}

export interface AIProvider {
  parseJobEmail(emailContent: string): Promise<ParsedJobData | null>
}
