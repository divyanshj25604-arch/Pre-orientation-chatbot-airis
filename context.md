# Project Context for LLM

This document provides a summary of the work completed on the `Pre-orientation-chatbot-airis` project to date, intended for an LLM to understand the current state and next steps.

## Work Completed

1.  **Architecture Documentation**: A detailed `architecture.md` file has been created and pushed to the repository. This document outlines the high-level architecture, tech stack, project structure, folder responsibilities, database design, data flows, environment variables, and the rationale behind the architectural choices.

2.  **Folder Structure Initialization**: The complete folder structure, as defined in the `architecture.md`, has been created within the repository. Empty files have been generated for all specified components, hooks, services, API routes, and utility files.

This context should enable an LLM to understand the foundational setup of the project and assist with subsequent development tasks, particularly those related to code generation or further documentation.


## Latest Development Log (9 July 2026)

### 1. Git Repository Recovery
-   **Problem**: Unrelated histories between local and GitHub repositories, leading to merge conflicts.
-   **Resolution**: Performed `git pull origin main --allow-unrelated-histories --no-rebase` and manually resolved merge commit in Vim.
-   **Duplicate Files**: Encountered and manually cleaned duplicate `.js` and `.jsx` files (e.g., `layout.js` vs `layout.jsx`, `page.js` vs `page.jsx`) due to different initial project setups.

### 2. Project Structure Cleanup
-   The project structure now strictly adheres to the defined architecture, with unnecessary duplicate files removed.

### 3. Database Design Evolution
-   **User Entity**: Stores `id`, `uuid`, `name`, `createdAt`. Key decision: User names are not unique; `uuid` is the primary identifier.
-   **Conversation Entity**: Contains `systemPrompt`, `status` (ACTIVE, ARCHIVED), `userId`, `createdAt`. Critical design decision: A conversation is tied to a single system prompt. Changes to the prompt result in archiving the old conversation and creating a new active one.
-   **Message Entity**: Stores `role`, `content`, `conversationId`, `createdAt`. Messages are linked to conversations, not directly to users, ensuring natural grouping of chat history.
-   **ChatMetric Entity (Renamed from Analytics)**: Stores per-chat statistics including `responseTimeMs`, `promptTokens`, `completionTokens`, `totalTokens`, `createdAt`, and `conversationId`.

### 4. Prompt Design Decision
-   Simplified for MVP: The `systemPrompt` is now embedded directly within the `Conversation` entity, eliminating the need for a separate `Prompt` table. This simplifies the model for the current scope.

### 5. Prisma Schema Implementation
-   A complete Prisma schema has been created, defining `User`, `Conversation`, `Message`, and `ChatMetric` models, along with `ConversationStatus` (ACTIVE, ARCHIVED) and `MessageRole` (USER, ASSISTANT) enums.
-   **Relations**: `User` -> `Conversation` -> `Message`, and `Conversation` -> `ChatMetric`.

### 6. Prisma Configuration and Migration
-   **Generator**: Updated `provider` in `schema.prisma` from `prisma-client` to `prisma-client-js`.
-   **Prisma Config**: Configured `prisma.config.ts` to load `DATABASE_URL` using `dotenv` to support Prisma 7.
-   **Validation**: Resolved numerous relation formatting errors using `npx prisma format` and `npx prisma validate`.
-   **Migration**: Successfully executed `npx prisma migrate dev --name init`, creating the initial migration, syncing the database, and generating the Prisma Client.

### 7. Supabase Integration
-   Prisma has been successfully connected to a Supabase PostgreSQL database using the Transaction Pooler, and the connection verified.

### 8. Backend API Implementations
-   **User API (`POST /api/user`)**: Implemented to receive a user `name`, generate a UUID, store the user, and return user details. Verified via Postman.
-   **Conversation API (`POST /api/conversation`)**: Implemented to receive a `uuid`, find the user, create a new conversation, and return the `conversationId`. Verified.
-   **Chat API**: The complete chat flow has been implemented, handling incoming messages, loading conversation history, calling the Groq API, saving assistant replies, storing chat metrics, and returning responses.

### 9. Groq API Issues
-   Resolved a `401 Invalid API Key` error by correcting the `GROQ_API_KEY` environment variable and restarting the server.

### 10. First Successful AI Response
-   Achieved the first end-to-end functional AI response, confirming the integration of the database, conversation flow, Groq API, and message persistence.

### 11. Frontend Development
-   Created `app/chat/page.jsx`.
-   Resolved a Next.js routing conflict by moving `page.jsx` from `app/api/chat/` to `app/chat/`.

### 12. Local Storage
-   Verified that the browser correctly stores the user `uuid` in `localStorage`.

### 13. Architecture Decisions
-   The project has largely adhered to the initial architecture document, with a deliberate simplification of the `Prompt` entity for the MVP by embedding `systemPrompt` directly in the `Conversation` model.

## Current Project Status

-   **Backend**: Fully functional, including database design, Prisma configuration, Supabase connection, complete User, Conversation, and Chat APIs, Groq integration, message persistence, and chat metrics storage. UUID persistence is also working.
-   **Frontend**: Basic page rendering is functional, and local storage for UUIDs has been verified.

## Tomorrow’s Roadmap

Focus will shift to frontend development and UI/UX enhancements:
1.  Build the chat UI components (`ChatWindow`, `MessageBubble`, `ChatInput`).
2.  Create the `useChat` hook to interact with `/api/chat`.
3.  Implement display of conversation history from the database.
4.  Develop the prompt editor and connect it to `/api/prompt`.
5.  Implement prompt change behavior (archive active conversation, create new).
6.  Add a sidebar for numerical conversation listing (e.g., "Conversation 1").
7.  Integrate loading states, ensure message persistence, and implement automatic scrolling.
8.  Polish the UI and prepare for deployment.
