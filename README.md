# Searchable Tag Input Demo

A modern **Gmail-style tag input component** built with Angular v20, featuring real-time search, creatable users, and a polished UI experience.

![Angular](https://img.shields.io/badge/Angular-v20-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### Core Functionality
- 🔍 **Real-time Search** - Debounced search with DummyJSON API integration (300ms delay)
- 🏷️ **Multi-select Tags** - Users appear as chips with avatar, name, and email
- ➕ **Creatable Users** - Create new users when no exact match exists
- ⌨️ **Full Keyboard Support** - Arrow keys, Enter, Escape, Backspace navigation
- 🖱️ **Click Interactions** - Mouse hover and click selection
- ⚡ **Loading States** - Visual spinner during search operations
- 🎨 **Visual Differentiation** - New users display with green styling and "NEW" badge

### Technical Highlights
- 🆕 **Angular v20** - Latest features with standalone components
- 📡 **Signal-based State** - Modern reactive state management
- 🔄 **RxJS Integration** - Observables with smart debouncing and caching
- 🎯 **TypeScript Strict Mode** - Full type safety and error prevention
- 🎨 **TailwindCSS v4** - Modern utility-first styling
- 📱 **Responsive Design** - Mobile-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/noor-ul-amin0/searchable-tag-input-demo.git

# Navigate to project directory
cd searchable-tag-input-demo

# Install dependencies
npm install

# Start development server
npm start
```

Open your browser and navigate to `http://localhost:4200/`

## 🎮 How to Use

1. **Start Typing** - Enter a name or email in the input field
2. **Browse Suggestions** - Real users from DummyJSON API appear in dropdown
3. **Navigate with Keyboard** - Use ↑↓ arrow keys, Enter to select, Escape to close
4. **Create New Users** - When no exact match exists, create new users on-the-fly
5. **Remove Tags** - Click the × button on any tag or use Backspace when input is empty
6. **Send Email** - Click "Send Email" to see selected data logged in console

### Example Searches
- Try: `John`, `Emily`, `Michael` - Real users from API
- Try: `newuser@example.com` - Creates new user automatically
- Try: `Sarah Johnson` - Creates user with generated email

## 🏗️ Project Structure

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
│   └── user.interface.ts    # User data models
├── services/
│   └── user.service.ts      # DummyJSON API service
└── app.ts                   # Root component
```

## 🔧 Key Components

### TagInputComponent
- **Search Logic** - Debounced API calls with intelligent caching
- **Keyboard Navigation** - Full accessibility support
- **Visual Feedback** - Loading states and hover effects
- **Smart Creation** - Email detection and auto-generation

### UserService
- **API Integration** - Real data from DummyJSON users API
- **Caching System** - Performance optimization for repeated searches
- **Error Handling** - Graceful fallbacks and error management
- **Data Transformation** - Maps API response to internal User interface

## 🎨 Design System

### User Tags
- **Existing Users**: Blue chips with standard styling
- **New Users**: Green chips with "NEW" badge
- **Interactive States**: Hover effects and focus management

### Search Experience
- **Real-time Results**: 300ms debounced search
- **Visual Indicators**: Loading spinners and empty states
- **Create Option**: Prominent "Create new" suggestion when applicable

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run watch      # Build in watch mode
npm test           # Run unit tests
```

### Code Style
- **Prettier** - Configured for consistent formatting
- **ESLint** - Angular and TypeScript best practices
- **Strict TypeScript** - Maximum type safety

## 🌐 API Integration

This demo uses the [DummyJSON Users API](https://dummyjson.com/docs/users) for realistic user data:

```
GET https://dummyjson.com/users/search?q=John
```

Response includes real user profiles with names, emails, and avatars.

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Angular Team](https://angular.io/) - For the amazing framework
- [DummyJSON](https://dummyjson.com/) - For providing realistic test data
- [TailwindCSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [UI Avatars](https://ui-avatars.com/) - For generated user avatars

---

Built with ❤️ using Angular v20 and modern web technologies.
