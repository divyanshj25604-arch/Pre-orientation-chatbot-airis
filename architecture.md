# Pre-orientation Chatbot AIRIS Architecture

This document outlines the high-level architecture, tech stack, project structure, and design decisions for the AIRIS Pre-orientation Chatbot. The architecture is designed to be clean, scalable, and maintainable, ensuring a clear separation of concerns.

## High-Level Architecture

The application follows a modern web architecture with a clear separation between the frontend, backend API, service layer, and database.

```text
Browser
   │
Next.js Frontend (React)
   │
fetch() API Requests
   │
────────────────────────────────────────────────────
   │
Next.js API Routes
   │
────────────────────────────────────────────────────
   │
Service Layer
   │
   ├─ UserService
   ├─ PromptService
   ├─ ChatService
   ├─ AnalyticsService (now ChatMetricService)
   │
   └─ ConversationService
         │
         └─ MessageService
   │
────────────────────────────────────────────────────
   │
Prisma ORM
   │
────────────────────────────────────────────────────
   │
PostgreSQL Database (Supabase)        Groq API
```

Every component in this architecture has a single responsibility, ensuring that the system remains modular and easy to test.

## Tech Stack

The project utilizes a modern JavaScript/TypeScript stack optimized for performance and developer experience.

| Layer | Technology | Description |
|-------|------------|-------------|
| **Frontend** | Next.js (App Router), React (JSX), CSS Modules | Handles UI rendering, state management, and user interactions. |
| **Backend** | Next.js API Routes, JavaScript | Serves as the API layer, handling requests from the frontend. |
| **ORM** | Prisma | Manages database schema and provides a type-safe query builder. |
| **Database** | PostgreSQL (Supabase) | Relational database for storing users, conversations, and messages. |
| **AI Integration** | Groq API | Powers the chatbot's conversational capabilities. |
| **Deployment** | Vercel | Hosting platform optimized for Next.js applications. |

## Project Structure

The repository is organized into specific directories, each with a distinct purpose.

```text
airis-chatbot/
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── components/           # Pure UI React components
├── hooks/                # Custom React hooks for frontend logic
├── services/             # Business logic layer
├── lib/                  # Project-wide utilities and clients
├── utils/                # Small reusable helper functions
├── prisma/               # Database schema, migrations, and configuration
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Responsibility of Every Folder

### `app/`
Contains only Next.js specific files: `page.jsx`, `layout.jsx`, `globals.css`, and API routes under `app/api/`. No business logic or complex UI components should reside directly here.

API routes map one-to-one to services:
- `api/user/route.js` → `userService`
- `api/prompt/route.js` → `promptService`
- `api/chat/route.js` → `chatService`
- `api/conversation/route.js` → `conversationService`
- `api/analytics/route.js` → `analyticsService` (now `chatMetricService`)

### `components/`
Contains pure UI components: `NameModal`, `Navbar`, `Sidebar`, `PromptEditor`, `ChatWindow`, `MessageBubble`, `ChatInput`, `LoadingSpinner`, `EmptyState`, `ConfirmResetModal`. These components:
- Never call Prisma directly.
- Never call the Groq API directly.
- Never access the database.
- Only receive props, display UI, and raise events.

### `hooks/`
Contains frontend logic and state management:
- `useChat()`: sends messages via `fetch("/api/chat")`.
- `usePrompt()`: manages prompt editing and debounced saves via `fetch("/api/prompt")`.
- `useUser()`: manages user identity, UUID lookup, and `fetch("/api/user")`.

Components should use these hooks rather than writing `fetch` requests directly.

### `services/`
The core business logic of the application. This is where the actual work happens, separated from the API routing layer.

- **`userService`**: Responsible for creating, finding, and updating users.
- **`promptService`**: Manages saving, loading, and updating system prompts. In the current simplified design, the `systemPrompt` is stored directly within the `Conversation` entity. When the prompt changes, it triggers the archiving of the current conversation and the creation of a new one.
- **`conversationService`**: Handles creating, retrieving, and archiving conversations.
- **`messageService`**: Manages saving, loading, and deleting individual messages within a conversation.
- **`chatService`**: The "brain" of the application. It orchestrates the AI request workflow:
  1. Receive request
  2. Validate user
  3. Get active conversation
  4. Load previous messages
  5. Append current message
  6. Call Groq API
  7. Store assistant reply
  8. Update metrics (via `chatMetricService`)
  9. Return response
- **`analyticsService` (now `chatMetricService`)**: Handles statistics such as response time, token usage, and other per-chat metrics. It does not interact with the AI directly.

### `lib/`
Contains project-wide utilities that initialize external clients or provide core functionality:
- `prisma.js`: Creates and exports the Prisma Client.
- `groq.js`: Creates and exports the Groq Client.
- `uuid.js`: Handles UUID generation.

### `utils/`
Contains small, reusable helper functions that don't depend on external services:
- `debounce.js`: debounce utility used by `usePrompt()` for save delays.
- `validators.js`: input validation (e.g. `validatePrompt()`, message length checks).
- `constants.js`: shared constants (max lengths, roles, statuses).
- `helpers.js`: misc helpers (`trimWhitespace()`, `formatDate()`, etc).

## Database Design

The database schema is designed around the `Conversation` as the central entity.

### Entities

- **User**: `id`, `uuid`, `name`, `createdAt`
- **Conversation**: `id`, `userId`, `systemPrompt`, `status` (ACTIVE, ARCHIVED), `createdAt`
- **Message**: `id`, `conversationId`, `role` (USER, ASSISTANT), `content`, `createdAt`
- **ChatMetric** (formerly Analytics): `id`, `conversationId`, `responseTimeMs`, `promptTokens`, `completionTokens`, `totalTokens`, `createdAt`

### Entity Relationships

```text
User
 │
 └── Conversation
         │
         ├── Messages
         └── ChatMetric
```

Instead of thinking "a user has messages," the model is structured as "a user has conversations, and conversations contain messages." This design supports starting a fresh chat whenever the system prompt changes and leaves room for future features like conversation history, exports, retries, and analytics without requiring foundational changes.

## Data Flows

### Frontend Initialization Flow
1. Open Website
2. Check `localStorage` for UUID
3. If UUID exists: Load User -> Load Active Conversation (including `systemPrompt`) -> Render UI
4. If no UUID: Show Name Modal -> `POST /api/user` -> Generate UUID -> Store UUID -> Continue

### Chat Flow
1. User types message
2. `ChatInput` component triggers `useChat()` hook
3. Hook sends `POST /api/chat`
4. API route calls `chatService`
5. Service calls Groq API
6. Service saves user and assistant messages to database
7. Service saves chat metrics to database
8. Service returns response
9. Frontend renders `MessageBubble`

### Prompt Update Flow
1. User edits prompt
2. 5-second debounce triggers
3. Hook sends `PUT /api/prompt`
4. `promptService` updates the `systemPrompt` in the active `Conversation`.
5. Service archives current conversation and creates a new one
6. Frontend clears chat UI

## Environment Variables

The application requires the following environment variables:

```env
DATABASE_URL=
GROQ_API_KEY=
NEXT_PUBLIC_APP_NAME="AIRIS Prompt Lab"
NEXT_PUBLIC_MAX_PROMPT=3000
NEXT_PUBLIC_MAX_MESSAGE=1000
```

**Security Note:** Never expose `DATABASE_URL` or `GROQ_API_KEY` to the frontend.

## Request Lifecycle

Every request follows a strict, unidirectional path:

```text
Frontend Hook
   ↓
API Route
   ↓
Service Layer
   ↓
Prisma ORM
   ↓
Database
   ↓
Groq API (if applicable)
   ↓
Service Layer
   ↓
API Route
   ↓
Frontend
```

## Why this architecture?

This architecture is chosen because it scales effectively. While the current requirements might be simple (e.g., 200 students, one chatbot), this structure allows for seamless future expansion.

Future additions such as multiple AI models, admin dashboards, analytics panels, authentication, feedback systems, persona marketplaces, and prompt versioning can be implemented by simply adding new services and routes, without needing to rewrite the existing foundation.
