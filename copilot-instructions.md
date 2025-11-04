# AI Assistant Guide for nexa-ai-flow

This guide helps AI assistants understand the structure, conventions, and patterns of this codebase to be more effective.

## 1. Project Overview & Tech Stack

This is a Vite-based React SPA using TypeScript. The UI is built with **shadcn/ui** and styled with **Tailwind CSS**.

- **Framework**: React 18+ with Vite
- **Language**: TypeScript
- **UI Components**: shadcn/ui (located in `src/components/ui`)
- **Styling**: Tailwind CSS with `clsx` and `tailwind-merge` via the `cn` utility in `src/lib/utils.ts`.
- **Icons**: `lucide-react`

## 2. Core Architectural Patterns

### The `Sidebar` Component System

The most complex component is the sidebar, located at `src/components/ui/sidebar.tsx`. It's a highly reusable and configurable system.

- **Context-Driven**: It uses `SidebarContext` to share state (`expanded`, `collapsed`, mobile vs. desktop) among its parts. When working on the sidebar, use the `useSidebar()` hook to access this context.
- **Compound Components**: The sidebar is composed of multiple exported parts like `SidebarProvider`, `Sidebar`, `SidebarMenu`, `SidebarMenuButton`, etc. This pattern is used for building flexible and composable UI.
- **Styling with `data-*` attributes**: The sidebar's state (e.g., `data-state="collapsed"`, `data-variant="inset"`) is used for styling. You'll see this pattern used extensively in `sidebar.tsx` for conditional styling.

### Feature Components

Feature components like `WellnessCoach.tsx`, `SmartCalendar.tsx`, and `TaskExtractor.tsx` are located in `src/components`. They are largely self-contained and manage their own state using `React.useState`. They demonstrate how to compose UI using the `shadcn/ui` components from `src/components/ui`.

Example from `TaskExtractor.tsx`:
```tsx
const [tasks, setTasks] = useState([...]);

const handleApprove = (id: number) => {
  setTasks(tasks.map(task => 
    task.id === id ? { ...task, approved: true, ignored: false } : task
  ));
};
```

## 3. Developer Workflow

The development workflow is standard for a Vite project.

- **Install dependencies**: `npm i`
- **Run dev server**: `npm run dev`

The project uses path aliases, with `@/` pointing to the `src/` directory.