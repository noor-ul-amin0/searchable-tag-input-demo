# Copilot Instructions for ang-tag-input-demo

## Project Overview

This is a modern Angular v20 application demonstrating a Gmail-style tag input component for selecting users. Features standalone components, signal-based state management, and TailwindCSS styling with a fake API for user data.

## Architecture Patterns

### Modern Angular v20 Features

- **Standalone Components**: All components use `imports: []` instead of NgModules
- **Signal-based State**: Components use `signal()` for reactive state management
- **RxJS Integration**: Uses observables with debouncing and search optimization
- **Separate Template Files**: Components use external HTML templates (`.html`) and stylesheets (`.css`)

### Component Structure

```
src/app/
├── components/
│   ├── tag-input/           # Main tag input component
│   │   ├── tag-input.ts     # Component logic with signals
│   │   ├── tag-input.html   # Template with keyboard navigation
│   │   └── tag-input.css    # Styling and animations
│   ├── user-form.ts         # Demo form component
│   └── user-form.html       # Form template
├── interfaces/
│   └── user.interface.ts    # User data model
├── services/
│   └── user.service.ts      # Fake API service
└── app.ts                   # Root component
```

## Tag Input Component Features

### Core Functionality

- **Multi-select Tags**: Users appear as chips with avatar, name, and email
- **Real-time Search**: Debounced search with fake API simulation (300ms delay)
- **Creatable Tags**: Allow creating new users when no exact match exists
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Backspace support
- **Click Interactions**: Mouse hover and click selection
- **Loading States**: Spinner during search operations
- **Visual Differentiation**: New users show green styling with "NEW" badge

### Signal Architecture

```typescript
readonly selectedUsers = signal<User[]>([]);     // Selected user tags
readonly suggestions = signal<User[]>([]);       // Search results
readonly isLoading = signal(false);              // Loading state
readonly showSuggestions = signal(false);        // Dropdown visibility
readonly canCreateNew = computed(() => ...);     // Can create new user
readonly showCreateOption = computed(() => ...); // Show create option
```

### Search Implementation

- **Debounced Input**: 300ms debounce using RxJS `debounceTime`
- **Duplicate Prevention**: Filters out already selected users
- **Create New Logic**: Shows "Create new" option when no exact match exists
- **Email Detection**: Automatically detects email format vs. name input
- **Focus Management**: Auto-focus input after tag operations

### Creatable Feature

- **Smart Detection**: Identifies when user input doesn't match existing users
- **Email Validation**: Distinguishes between email and name inputs
- **Auto-generation**: Creates email from name or name from email
- **Visual Indicators**: Green styling and "NEW" badge for created users
- **Keyboard Support**: Enter key creates new user when no suggestions selected

## Styling & UI Framework

### TailwindCSS Integration

- **Responsive Design**: Flexbox layout with proper mobile support
- **Interactive States**: Hover, focus, and active state styling
- **Custom Components**: Tag chips with rounded corners and color coding
- **Dropdown Styling**: Elevated suggestions with proper z-index and shadows

### Design Patterns

```html
<!-- Existing User Tag -->
<div class="inline-flex items-center gap-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
  <img class="w-5 h-5 rounded-full" [src]="user.avatar" />
  <span class="font-medium">{{ user.name }}</span>
  <button class="ml-1 text-blue-600 hover:text-blue-800">×</button>
</div>

<!-- New User Tag (Creatable) -->
<div class="inline-flex items-center gap-2 px-2 py-1 bg-green-100 text-green-800 rounded-full">
  <img class="w-5 h-5 rounded-full" [src]="user.avatar" />
  <span class="font-medium">{{ user.name }}</span>
  <span class="text-xs bg-green-200 text-green-700 px-1 rounded">NEW</span>
  <button class="ml-1 text-green-600 hover:text-green-800">×</button>
</div>
```

## Development Workflows

### Essential Commands

- **Start Development**: `npm start` (port 4200)
- **Build**: `npm run build`
- **Test**: `npm test`

### Key Services

- **UserService**: Provides fake user data with search functionality
- **HttpClient**: Configured with `provideHttpClient(withFetch())`

## Implementation Notes

1. **Fake API**: Uses UI Avatars service for user profile images
2. **Accessibility**: Proper ARIA labels and keyboard navigation
3. **Performance**: Debounced search prevents excessive API calls
4. **User Experience**: Gmail-style interaction patterns
5. **Type Safety**: Strict TypeScript configuration enforced

When extending the tag input, maintain the signal-based architecture and ensure keyboard accessibility.
