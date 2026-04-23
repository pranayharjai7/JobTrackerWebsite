# JobTrack: Premium AI-Powered Job Application Tracker

![JobTrack Banner](https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop)

**JobTrack** is a high-end, production-ready SaaS platform designed to automate the job search experience. By leveraging the power of **Gemini AI** and seamless **Gmail integration**, JobTrack eliminates manual data entry, providing job seekers with a premium, data-rich dashboard to manage their career journey.

## ✨ Key Features

### 🤖 AI Extraction Engine
- **Automated Parsing**: Uses **Gemini 1.5 Flash** (with OpenRouter fallback) to scan your inbox and extract job details from complex recruiter emails.
- **Precision Data**: Extracts Company Name, Role, Application Stage, and Key Dates with high accuracy.
- **Intelligence Reports**: Generates AI-driven summaries and interview preparation tips for every application.

### 📧 Multi-Account Gmail Sync
- **Unified Inbox**: Connect multiple Google accounts simultaneously to track applications across different personal and professional emails.
- **Background Pipeline**: Securely refreshes tokens and synchronizes data without user intervention.
- **Privacy First**: Only job-related metadata is extracted; full email bodies are never stored on our servers.

### 📊 Executive Dashboard (Dual View)
- **List View**: A sleek, card-based interface for managing active applications with status badges and quick actions.
- **Journey Mode**: A vertical, chronological timeline visualizing the entire lifecycle of every application—from "Applied" to "Offer."
- **Activity Heatmap**: A 90-day frequency tracker to visualize your job search momentum and consistency.

### 💎 Premium Aesthetics
- **Modern Dark Mode**: Deep HSL-based palette designed for long sessions and high visual clarity.
- **Glassmorphism**: Elegant UI components with subtle blurs, borders, and depth effects.
- **Smooth Animations**: Powered by Framer Motion for a fluid, responsive user experience.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS Layers
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Prisma](https://www.prisma.io/) with Neon PostgreSQL
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth
- **AI**: [@google/generative-ai](https://ai.google.dev/) (Gemini)
- **APIs**: Google Gmail API v1

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- A Google Cloud Console project with Gmail API enabled
- A PostgreSQL database (Neon recommended)

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your_postgresql_url"

# Authentication
NEXTAUTH_SECRET="your_secret"
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"

# AI Provider
GOOGLE_GEMINI_API_KEY="your_gemini_key"
OPENROUTER_API_KEY="optional_fallback_key"
```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pranayharjai7/JobTrackerWebsite.git
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Sync database:
   ```bash
   npx prisma db push
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

## 📈 Roadmap
- [ ] Automated Follow-up Email Drafting
- [ ] Interview Scheduling with Google Calendar
- [ ] Mobile Companion App (Android/WearOS)
- [ ] Export Data to PDF/CSV

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ for the modern job seeker.
