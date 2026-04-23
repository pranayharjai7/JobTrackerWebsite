import { GeminiProvider } from "./gemini-provider"
import { OpenRouterProvider } from "./openrouter-provider"
import { AIProvider } from "./types"

export const getAIProvider = (): AIProvider => {
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY
  const openRouterKey = process.env.OPENROUTER_API_KEY

  if (geminiKey) {
    return new GeminiProvider(geminiKey)
  }

  if (openRouterKey) {
    return new OpenRouterProvider(openRouterKey)
  }

  throw new Error("No AI provider API key found (GOOGLE_GEMINI_API_KEY or OPENROUTER_API_KEY)")
}

export * from "./types"
