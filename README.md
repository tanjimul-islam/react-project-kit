# React Starter Pack

A modern React starter template with everything you need to build amazing applications.

## Features

- ⚡ **Vite** - Lightning fast development and build tool
- ⚛️ **React 19** - Latest React features and improvements
- 🎨 **Tailwind CSS v4** - Latest CSS framework with simplified setup
- 🛣️ **React Router v7** - Latest client-side routing
- 🔄 **React Query** - Powerful data fetching and caching
- 📝 **React Hook Form** - Performant forms with easy validation
- 🎯 **Lucide React** - Beautiful and consistent icons
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Production Ready** - Optimized for deployment

## Quick Start

```bash
# Create a new project
npx react-starter-pack my-app

# Navigate to project directory
cd my-app

# Start development server
npm run dev
```

## Installation Options

When creating a new project, you'll be prompted to choose:

1. **Language**: JavaScript or TypeScript
2. **Optional Packages**:
   - **shadcn/ui** - Beautiful UI components
   - **Redux Toolkit** - State management
   - **React Redux** - React bindings for Redux

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── assets/        # Static assets (images, fonts, etc.)
├── components/    # Reusable components
├── libs/          # Utility functions and helpers
├── pages/         # Page components
├── routes/        # Router configuration
│   └── routes.jsx # Router setup
├── App.jsx        # Main app component
├── main.jsx       # Entry point
└── index.css      # Global styles
```

## Dependencies

### Default Dependencies

- `react` & `react-dom` - React core
- `tailwindcss@^4.1.12` - CSS framework (latest version)
- `@tailwindcss/vite@^4.1.12` - Vite plugin for Tailwind CSS
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-hook-form` - Form handling
- `@tanstack/react-query` - Data fetching
- `lucide-react` - Icons

### Optional Dependencies

- `@radix-ui/react-slot` - shadcn/ui dependency
- `class-variance-authority` - shadcn/ui dependency
- `clsx` - Utility for conditional classes
- `tailwind-merge` - Merge Tailwind classes
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React Redux bindings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
