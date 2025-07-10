# LiveDocs: Real-Time Collaborative Document Editor

        

## Executive Summary

LiveDocs is a high-performance, real-time collaborative document editor engineered to deliver a seamless, Google Docs-like experience. This full-stack application showcases a modern, reactive architecture using Next.js and Liveblocks, enabling multiple users to create, edit, and collaborate on documents simultaneously. The platform integrates a powerful rich-text editor based on the Lexical framework, robust user authentication with Clerk, and proactive error monitoring with Sentry, resulting in a scalable, user-friendly, and reliable collaborative environment.

-----

### 📌 Live Demo

[🚀 Click here to view the deployed project](https://live-docs-xi-ten.vercel.app/)

-----

### ✨ Features & Technical Implementation

| 🧩 Feature | ⚙️ Technical Implementation |
| :--- | :--- |
| **Real-Time Collaborative Editing** | Leverages **Liveblocks** for real-time data synchronization of editor state between multiple users, including cursor presence and text changes. The `CollaborativeRoom` component manages the Liveblocks `RoomProvider` and `ClientSideSuspense` for a smooth collaborative session. |
| **Rich-Text Editor & Formatting** | Implements a powerful and extensible text editor using the **Lexical editor framework**. Features a comprehensive toolbar with formatting options like headings, bold, italics, underline, strikethrough, and alignment, managed by `ToolbarPlugin`. |
| **User Authentication & Management** | Integrates **Clerk** for secure user authentication, sign-up, and sign-in flows. Middleware is used to protect routes and manage user sessions, ensuring secure access to documents. |
| **Document CRUD & Management** | Provides full Create, Read, Update, and Delete (CRUD) functionality for documents. Users can create new documents, view a list of their documents on the home page, update titles, and delete documents they own, all handled via Next.js Server Actions in `room.actions.ts`. |
| **Sharing, Permissions & Access Control** | Users can share documents via email and assign roles ("editor" or "viewer") to collaborators to manage permissions. This is implemented in the `ShareModal` component and `updateDocumentAccess` server action. |
| **Real-time Commenting System** | A complete commenting system with real-time updates and threaded conversations, powered by Liveblocks' `useThreads` and `Composer` components. |
| **Notifications & User Presence**| In-app notifications for document shares and mentions are handled via **Liveblocks Inbox**. The UI displays active collaborators in a document, showing their avatars in real-time.|
| **Modern, Responsive Frontend** | Built with **Next.js** and **TypeScript**, styled with **Tailwind CSS**, and utilizing **Shadcn UI** for a responsive, modern, and consistent component library.|
| **Error Monitoring & Reliability** | Integrates **Sentry** for proactive error monitoring and session replay, ensuring a stable and reliable user experience across the application. |

-----

## 🏗️ System Architecture

LiveDocs is built on a modern, serverless architecture optimized for performance, scalability, and developer experience. The system is logically structured to separate concerns, from the user interface to the real-time backend services.

```
livedocs/
├── 📁 app/                      # Next.js App Router (Core Application)
│   ├── 📁 (auth)/              # Authentication pages (Clerk)
│   ├── 📁 (root)/              # Main application features (Protected Routes)
│   └── 📁 api/                   # API routes for Liveblocks auth & webhooks
├── 📁 components/              # Reusable React components (Shadcn UI & custom)
│   ├── 📁 editor/               # Lexical editor components and plugins
│   └── 📁 ui/                   # Shadcn UI components
├── 📁 lib/                      # Helper functions and client initializations
│   ├── 📁 actions/              # Server-side logic (Next.js Server Actions)
│   └── 📄 liveblocks.ts        # Liveblocks client configuration
├── 📄 middleware.ts             # Authentication and route protection
└── 📄 package.json             # Project dependencies and scripts
```

### Architectural Breakdown

1.  **Client-Side (Frontend)**
    The frontend is a dynamic and responsive single-page application built with **Next.js** and **React**, utilizing the **App Router** paradigm.

      * **UI Components**: The interface is constructed with a combination of custom components and **Shadcn UI**, styled with **Tailwind CSS**, ensuring a consistent and modern aesthetic.
      * **Routing**: Employs a file-based routing system with route groups for clear separation of `(auth)` and `(main)` application sections.

2.  **Server-Side (Backend)**
    The backend leverages a serverless approach with **Next.js Server Actions** and API Routes, creating a seamless and efficient integration between the client and server.

      * **Server Actions**: Core business logic, such as document creation, updates, and sharing, is encapsulated in Server Actions within `lib/actions/`. This allows for direct, secure client-server communication without the overhead of traditional REST APIs.
      * **Authentication & Authorization**: User authentication is powered by **Clerk**. A robust middleware (`middleware.ts`) protects application routes and manages user sessions, ensuring secure document access.

3.  **Real-time Collaboration & Data Layer**
    The real-time and data layers are managed by **Liveblocks**, which serves as the backend for collaborative features.

      * **Liveblocks**: Handles all real-time data synchronization, including document content, user presence, and comments. The authentication for Liveblocks is managed through a dedicated API route (`app/api/liveblocks-auth/route.ts`).
      * **Data Persistence**: Liveblocks manages the storage and persistence of document data, ensuring that all collaborative changes are saved reliably.

4.  **External Services**
    LiveDocs integrates with external services to enhance its functionality.

      * **Sentry**: Used for comprehensive error tracking and performance monitoring on both the client and server, ensuring a high-quality user experience.

-----

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

  * [Git](https://git-scm.com/)
  * [Node.js](https://nodejs.org/en) (v18.17.0 or later)
  * [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AkshayTiwari27/LiveDocs.git
    cd LiveDocs
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

### Running the Project

Once the installation and environment variables are set up, you can run the project locally:

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to view the project.

-----

## 🔐 Environment Variables

To run this project locally, create a `.env.local` file in the root directory and add the following variables:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk Auth Routes (use defaults or customize)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Liveblocks API Keys for Realtime Collaboration
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

You can obtain these keys by creating an account on [Clerk](https://clerk.com/) and [Liveblocks](https://liveblocks.io/).

-----

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](https://www.google.com/search?q=https://github.com/AkshayTiwari27/LiveDocs/blob/main/LICENSE) file for details.
