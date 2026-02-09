# 📚 OnlineBookStore

A full-stack e-commerce platform for buying and selling e-books, built with Angular and ASP.NET Core.

> 🤖 **AI-Assisted Development**: This project was built with the help of AI (GitHub Copilot) to accelerate the learning process and boost productivity. AI assistance was used for code generation, debugging, best practices guidance, and rapid prototyping - demonstrating how modern developers can leverage AI tools to learn faster and build better software.

## 🛠️ Tech Stack

### Frontend
- **Angular 19** - Modern web framework
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Lucide Icons** - Beautiful icons
- **Reactive Forms** - Form validation with real-time feedback

### Backend
- **ASP.NET Core 10** - Web API
- **Entity Framework Core** - ORM
- **SQLite** - Database
- **JWT Authentication** - Secure auth tokens

## ✨ Features

- 🔐 **User Authentication** - Register/Login with JWT tokens
- 👤 **User Roles** - Buyer and Store Owner accounts
- 📖 **Browse Books** - Search and filter e-books
- 🏪 **Store Management** - Store owners can manage their stores
- 🛒 **Shopping Cart** - Add books and checkout
- 📦 **Order Management** - Track orders and history
- ✅ **Form Validation** - Real-time validation with visual feedback (red/green borders)

## 📁 Project Structure

```
OnlineBookStore/
├── BookStoreApi/              # ASP.NET Core Backend
│   ├── Controllers/           # API Controllers
│   ├── Data/                  # DbContext & Migrations
│   ├── DTOS/                  # Data Transfer Objects
│   ├── Entities/              # Domain Models
│   ├── Extensions/            # Extension Methods
│   ├── Interfaces/            # Service Interfaces
│   └── Services/              # Service Implementations
│
├── client/                    # Angular Frontend
│   ├── src/
│   │   ├── app/              # App config & routes
│   │   ├── Core/             # Services
│   │   ├── Features/         # Feature modules
│   │   ├── Layout/           # Nav, Footer components
│   │   ├── Pages/            # Page components
│   │   ├── Shared/           # Shared components
│   │   └── Types/            # TypeScript interfaces
│   └── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

### Backend Setup

```bash
cd BookStoreApi

# Restore packages
dotnet restore

# Run migrations
dotnet ef database update

# Trust HTTPS certificate (first time only)
dotnet dev-certs https --trust

# Start the API
dotnet run
```

The API runs at `https://localhost:5002`

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
ng serve
```

The app runs at `http://localhost:4200`

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/account/register` | Register new user |
| POST | `/api/account/login` | Login user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get all users |
| GET | `/api/user/{id}` | Get user by ID |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ebook` | Get all books |
| GET | `/api/ebook/{id}` | Get book by ID |
| POST | `/api/ebook` | Create book (Store Owner) |

### Stores
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/store` | Get all stores |
| GET | `/api/store/{id}` | Get store details |
| POST | `/api/store` | Create store |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/order` | Get user orders |
| POST | `/api/order` | Create order |

## 👥 User Roles

| Role | Value | Permissions |
|------|-------|-------------|
| Buyer | 1 | Browse, purchase books, manage orders |
| Store Owner | 2 | All buyer permissions + manage store & books |

## 🔧 Configuration

### Backend (`appsettings.Development.json`)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=bookstore.db"
  },
  "TokenKey": "your-secret-key-here"
}
```

### Frontend Environment
API base URL is configured in `account-service.ts`:
```typescript
baseUrl = "https://localhost:5002/api/";
```

## 🤖 AI-Assisted Development

This project demonstrates the power of AI-assisted development for educational purposes:

### How AI Helped
- **Code Generation** - Rapidly scaffolding components, services, and API endpoints
- **Debugging** - Identifying and fixing errors quickly (e.g., Identity configuration issues)
- **Best Practices** - Implementing reactive forms, proper validation, and clean architecture
- **Learning** - Understanding concepts through real-time explanations and examples
- **Productivity** - Reducing boilerplate code and focusing on business logic

### Tools Used
- **GitHub Copilot** - AI pair programmer in VS Code
- **Claude** - For complex problem-solving and architecture decisions

### Key Learnings
1. **Type Safety** - Using TypeScript interfaces that mirror backend DTOs
2. **Reactive Forms** - Real-time validation with visual feedback
3. **JWT Authentication** - Secure token-based auth flow
4. **Clean Architecture** - Separation of concerns between layers
5. **Angular Signals** - Modern state management


## 📝 License

This project is for educational purposes.

---

Made with ❤️ using Angular & .NET | AI-Assisted Development 🤖
