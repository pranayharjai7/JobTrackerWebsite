import { OpenRouterProvider } from "./openrouter-provider"
import { AIProvider } from "./types"

export const getAIProvider = (): AIProvider => {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not defined")
  }
  return new OpenRouterProvider(apiKey)
}

export * from "./types"
