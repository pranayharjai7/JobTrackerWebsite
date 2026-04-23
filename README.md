# JobTrack

JobTrack is a professional-grade, SaaS-style job application tracker designed to help you organize and automate your job search process. Built with Next.js, Prisma, and Tailwind CSS, it features automated Gmail synchronization and AI-driven email parsing.

## Features

-   **Dashboard Analytics**: Visualize your application funnel with real-time stats.
-   **Automated Tracking**: Connect your Gmail to automatically scan for job-related emails.
-   **AI Parsing**: Uses GPT-4o Mini via OpenRouter to intelligently extract company names, roles, and status updates from emails.
-   **Application Management**: Manually add or update job applications with custom statuses and events.
-   **Danger Zone**: Easily clear all tracked data or delete your account with built-in safeguards.

## Tech Stack

-   **Framework**: [Next.js 14+](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Google Provider)
-   **AI**: [OpenRouter](https://openrouter.ai/) (GPT-4o Mini)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd JobTrackerWebsite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Copy the `.env.example` file to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

### 4. Database Setup
Push the schema to your database:
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

Personal Project - All Rights Reserved.
