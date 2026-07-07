# AIRIS Pre-orientation Chatbot

## Project Overview

The AIRIS Pre-orientation Chatbot is an interactive application designed to assist new students during their pre-orientation phase. It provides a conversational interface to answer common questions, guide users through processes, and offer support, leveraging AI capabilities for dynamic and intelligent responses.

## Features

-   **Interactive Chat Interface**: A user-friendly chat window for seamless communication.
-   **Dynamic Prompt Management**: Users can customize and manage system prompts to tailor the chatbot's behavior.
-   **Conversation History**: Stores and retrieves past conversations for continuity.
-   **Real-time AI Responses**: Integrates with the Groq API for fast and relevant AI-generated replies.
-   **User Analytics**: Tracks key metrics like message count and latency to monitor usage and performance.
-   **Scalable Architecture**: Designed for easy expansion with new features and AI models.

## Architecture

The project follows a clean, scalable, and maintainable architecture with a clear separation of concerns. A detailed breakdown of the high-level architecture, tech stack, project structure, folder responsibilities, database design, and data flows can be found in the [`architecture.md`](./architecture.md) file.

Key architectural principles include:
-   **Layered Design**: Distinct layers for frontend, API routes, business logic (services), and data access.
-   **Single Responsibility Principle**: Each component and service is designed to have one specific responsibility.
-   **Conversation-Centric Data Model**: The `Conversation` entity is central to the database design, allowing for robust management of chat interactions and future features.

## Tech Stack

-   **Frontend**: Next.js (App Router), React (JSX), CSS Modules
-   **Backend**: Next.js API Routes, JavaScript
-   **ORM**: Prisma
-   **Database**: PostgreSQL
-   **AI Integration**: Groq API
-   **Deployment**: Vercel

## Getting Started

### Prerequisites

Ensure you have the following installed:
-   Node.js (v18 or higher)
-   npm or Yarn
-   Git

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/divyanshj25604-arch/Pre-orientation-chatbot-airis.git
    cd Pre-orientation-chatbot-airis
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory of the project and populate it with your environment variables. Refer to the [`env.example`](./.env.example) file for required variables.
    ```env
    DATABASE_URL="your_postgresql_database_url"
    GROQ_API_KEY="your_groq_api_key"
    NEXT_PUBLIC_APP_NAME="AIRIS Prompt Lab"
    NEXT_PUBLIC_MAX_PROMPT=3000
    NEXT_PUBLIC_MAX_MESSAGE=1000
    ```

4.  **Database Setup**:
    Apply Prisma migrations to set up your PostgreSQL database schema:
    ```bash
    npx prisma migrate dev --name init
    ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000`.

## Project Structure

```text
airis-chatbot/
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── components/           # Pure UI React components
├── hooks/                # Custom React hooks for frontend logic
├── services/             # Business logic layer
├── lib/                  # Project-wide utilities and clients
├── utils/                # Small reusable helper functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── .env                  # Environment variables (local)
├── .env.example          # Example environment variables
├── architecture.md       # Detailed project architecture documentation
├── context.md            # Project context for LLM understanding
├── package.json          # Project dependencies
└── README.md             # Project README
```

## Contributing

Contributions are welcome! Please refer to the `architecture.md` for a deeper understanding of the project structure and design principles before making changes.

## License

[Specify your license here, e.g., MIT License]
