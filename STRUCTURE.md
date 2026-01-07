# Project Structure

This document describes the improved file structure of the Metaval Contract & Procurement App.

## Directory Structure

```
src/
├── app/                    # Application entry point and main App component
│   └── App.tsx            # Main application component with routing and layout
├── components/             # All React components
│   ├── modules/           # Page-level module components (features/pages)
│   │   ├── Dashboard.tsx
│   │   ├── RequestModule.tsx
│   │   ├── GenerateModule.tsx
│   │   ├── NegotiateModule.tsx
│   │   ├── ApprovalModule.tsx
│   │   ├── ExecuteModule.tsx
│   │   ├── SearchModule.tsx
│   │   ├── ComplyModule.tsx
│   │   ├── ReviewModule.tsx
│   │   ├── ExitModule.tsx
│   │   ├── VendorsModule.tsx
│   │   ├── AnalyticsModule.tsx
│   │   └── index.ts       # Barrel export for all modules
│   ├── shared/            # Shared components used across modules
│   │   ├── Auth.tsx
│   │   ├── Settings.tsx
│   │   ├── StageIndicator.tsx
│   │   └── index.ts       # Barrel export for shared components
│   ├── ui/                # UI component library (shadcn/ui components)
│   │   └── ...            # All UI primitives (button, card, dialog, etc.)
│   └── figma/             # Figma-specific components
│       └── ImageWithFallback.tsx
├── constants/             # Application constants and configuration
│   └── navigation.ts     # Navigation items and configuration
├── hooks/                 # Custom React hooks (ready for future use)
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared types (Page type, etc.)
├── styles/                # Global styles and CSS files
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx              # Application entry point
```

## Organization Principles

### 1. **Components Organization**
- **`modules/`**: Page-level components that represent distinct features/pages of the application
- **`shared/`**: Reusable components used across multiple modules
- **`ui/`**: Low-level UI primitives from shadcn/ui component library
- **`figma/`**: Components specific to Figma integration

### 2. **Separation of Concerns**
- **`types/`**: Centralized TypeScript type definitions
- **`constants/`**: Application constants, configuration, and static data
- **`hooks/`**: Custom React hooks (ready for future custom hooks)
- **`styles/`**: Global styles and theme configuration

### 3. **Import Patterns**

Use barrel exports (index.ts files) for cleaner imports:

```typescript
// ✅ Good - Using barrel exports
import { Dashboard, RequestModule } from "../components/modules";
import { Auth, Settings } from "../components/shared";

// ❌ Avoid - Direct file imports
import { Dashboard } from "../components/modules/Dashboard";
```

## Benefits of This Structure

1. **Better Readability**: Clear separation between modules, shared components, and UI primitives
2. **Easier Navigation**: Related files are grouped together logically
3. **Scalability**: Easy to add new modules, hooks, or types without cluttering
4. **Maintainability**: Changes to one area don't affect others
5. **Type Safety**: Centralized types make it easier to maintain consistency
6. **Reusability**: Shared components are clearly separated from page-specific modules

## Adding New Files

### Adding a New Module
1. Create the component file in `src/components/modules/`
2. Export it from `src/components/modules/index.ts`

### Adding a New Shared Component
1. Create the component file in `src/components/shared/`
2. Export it from `src/components/shared/index.ts`

### Adding a New Type
1. Add the type definition to `src/types/index.ts` or create a new file in `src/types/`
2. Export it from the appropriate file

### Adding Constants
1. Add constants to `src/constants/` (create new files as needed)
2. Group related constants together (e.g., `navigation.ts`, `api.ts`, etc.)

