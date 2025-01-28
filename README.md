# Players Code Challenge

A mini dashboard built with Next.js and ShadCN UI to display depth charts and key performance metrics for athletes across various sports.

## Live Demo

View the live project at: [https://players-code-challenge.vercel.app/](https://players-code-challenge.vercel.app/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/solidmedium/players-code-challenge.git
```

2. Navigate to the project directory:

```bash
cd players-code-challenge
```

3. Install dependencies:
   This project uses `pnpm` but you can use any of the below

```bash
npm i
# or
yarn i
# or
pnpm i
# or
bun i
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### (Basic) Folder Structure

sports-performance-dashboard/
├── app/

│ ├── layout.tsx

│ └── page.tsx

│ └── globals.css

├── components/

│ ├── elements/

│ │ └── players-stats-dialog.tsx

│ ├── pages/

│ │ └── challenge.tsx

│ ├── ui/

│ │ └── card.tsx

├── lib/

│ └── utils.ts

├── public/

├── .gitignore

├── next.config.js

├── package.json

├── README.md

└── tsconfig.json

### Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [ShadCN UI](https://ui.shadcn.com/) - UI Component Library

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

### Acknowledgments

- ShadCN UI for the beautiful components
- Vercel for hosting the live demo
