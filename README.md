# LiveDocs: A Real-time Collaborative Document Editor

LiveDocs is a feature-rich, real-time collaborative document editor, inspired by Google Docs. It provides a seamless and intuitive writing experience, allowing multiple users to create, edit, and collaborate on documents simultaneously.

🔗 [Live Demo](https://live-docs-xi-ten.vercel.app/)

-----

## About The Project

This project was built to demonstrate proficiency in developing real-time, collaborative applications with a modern tech stack. LiveDocs showcases a deep understanding of full-stack development, from a reactive Next.js frontend to a robust backend powered by Liveblocks for real-time data synchronization. The application is designed to be highly performant, scalable, and user-friendly, with a focus on creating a seamless collaborative environment.

Key technical highlights include:

  * **Real-time Collaboration**: Leverages Liveblocks to enable multiple users to edit documents simultaneously, with changes reflected in real-time.
  * **Rich Text-Editing**: Implements a powerful and extensible text editor using the Lexical editor framework.
  * **Authentication and User Management**: Integrates Clerk for secure and easy user authentication and management.
  * **Modern Frontend**: Built with Next.js and TypeScript, styled with Tailwind CSS, and using Shadcn for UI components, resulting in a responsive and modern user interface.
  * **Error Monitoring and Replay**: Utilizes Sentry for proactive error monitoring and session replay to ensure a stable and reliable user experience.

-----

## Built With

This project is built with a modern, industry-standard technology stack:

  * **Frontend**:
      * [Next.js](https://nextjs.org/)
      * [React](https://reactjs.org/)
      * [TypeScript](https://www.typescriptlang.org/)
      * [Tailwind CSS](https://tailwindcss.com/)
      * [Shadcn/ui](https://ui.shadcn.com/)
  * **Backend & Real-time Collaboration**:
      * [Liveblocks](https://liveblocks.io/)
  * **Authentication**:
      * [Clerk](https://clerk.com/)
  * **Text Editor**:
      * [Lexical Editor](https://lexical.dev/)
  * **Error Monitoring**:
      * [Sentry](https://sentry.io/)

-----

## Features

LiveDocs comes with a comprehensive set of features designed for a rich, collaborative experience:

  * **Real-time Collaborative Editing**: Multiple users can edit the same document simultaneously, with cursors and text changes appearing in real-time for all collaborators.
  * **Document Management**:
      * **Create, Read, Update, Delete (CRUD)**: Users can create new documents, view their existing documents, update document titles, and delete documents they own.
      * **Document Listing**: A centralized dashboard to view and access all documents.
  * **Sharing and Permissions**:
      * **Share via Email**: Easily share documents with other users by inviting them via email.
      * **Role-based Access Control**: Assign "editor" or "viewer" roles to collaborators to manage document permissions.
  * **Commenting System**:
      * **Real-time Comments**: Add and view comments in real-time, fostering seamless communication and feedback.
      * **Threaded Conversations**: Engage in threaded conversations within the comments section.
  * **User Presence**:
      * **Active Collaborators**: View the avatars of other users who are currently active in the document.
  * **Notifications**:
      * **In-app Notifications**: Receive notifications for document shares and other important events.
  * **Rich Text Editor**:
      * **Formatting Options**: A full-featured toolbar with options for text formatting (bold, italic, underline, etc.), headings, and alignment.
  * **Responsive Design**: A fully responsive user interface that works seamlessly across all devices.

-----

## Getting Started

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

## License

This project is licensed under the **MIT License** – see the [LICENSE](https://www.google.com/search?q=https://github.com/AkshayTiwari27/LiveDocs/blob/main/LICENSE) file for details.
