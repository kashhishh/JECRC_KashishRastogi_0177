# Enterprise E-Commerce Application

A comprehensive React-based e-commerce application demonstrating advanced routing patterns, authentication, and layout management.

## Features

### 1. **Multiple Layouts**
- **MainLayout**: Used for public pages (Home, About, Contact, Products)
- **AuthLayout**: Dedicated layout for authentication pages (Login, Registration)
- **DashboardLayout**: Protected layout for authenticated users with sidebar navigation

### 2. **Authentication System**
- User login and registration
- Protected routes that redirect unauthenticated users to login
- Context-based authentication state management
- Mock authentication (can be replaced with real backend API calls)

### 3. **Route Structure**

#### Public Routes
- `/` - Home page
- `/about` - About page
- `/contact` - Contact form
- `/products` - Product listing
- `/products/:productId` - Product detail page with nested routes

#### Authentication Routes
- `/login` - User login page
- `/register` - User registration page

#### Protected Dashboard Routes
- `/dashboard` - Dashboard home with statistics
- `/dashboard/analytics` - Analytics and sales data
- `/dashboard/settings` - User preferences and account settings

### 4. **Dynamic & Nested Routing**
- Product listing with dynamic routing (`/products/:productId`)
- Nested routes within product detail:
  - `/products/:productId/reviews` - Customer reviews
  - `/products/:productId/specs` - Product specifications

### 5. **Components**

**Layouts**
- `MainLayout.js` - Public website layout with navbar and footer
- `AuthLayout.js` - Minimal authentication layout
- `DashboardLayout.js` - Dashboard layout with sidebar

**Components**
- `Navbar.js` - Navigation with authentication status
- `Sidebar.js` - Dashboard navigation
- `Footer.js` - Website footer
- `ProtectedRoute.js` - Route protection component

**Pages**
- Public: Home, About, Contact
- Auth: Login, Registration
- Dashboard: DashboardHome, Analytics, Settings
- Products: Products, ProductDetail, Reviews, Specs

## Installation

1. Navigate to the project directory:
```bash
cd Assessment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── Sidebar.js
│   ├── Footer.js
│   └── ProtectedRoute.js
├── context/
│   └── AuthContext.js
├── layouts/
│   ├── MainLayout.js
│   ├── AuthLayout.js
│   └── DashboardLayout.js
├── pages/
│   ├── public/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── Contact.js
│   ├── auth/
│   │   ├── Login.js
│   │   └── Registration.js
│   ├── dashboard/
│   │   ├── DashboardHome.js
│   │   ├── Analytics.js
│   │   └── Settings.js
│   └── products/
│       ├── Products.js
│       ├── ProductDetail.js
│       ├── Reviews.js
│       └── Specs.js
├── App.js
└── index.js
```

## Key Concepts Demonstrated

### 1. **Layout Management**
Different layouts are used for different sections of the application, showing how to organize complex routing structures.

### 2. **Authentication & Protected Routes**
The `ProtectedRoute` component demonstrates how to protect routes from unauthorized access.

### 3. **Nested Routing**
Product detail pages use nested routes with the `<Outlet>` component to render child routes.

### 4. **Dynamic Routing**
Product IDs are captured from URL parameters using `useParams()` hook.

### 5. **Context API for State Management**
Authentication state is managed using React Context API for global state management.

## Demo Credentials

- **Email**: demo@example.com
- **Password**: demo123

(You can use any email/password combination as this uses mock authentication)

## Technologies Used

- React 18
- React Router DOM v6
- React Context API
- CSS3 with responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Integration with backend API for authentication
- Real product database
- Shopping cart functionality
- Payment gateway integration
- User profile management
- Order tracking
- Admin dashboard
- Product search and filtering

## License

MIT License

---

This application serves as a comprehensive example of building enterprise-level React applications with proper routing, authentication, and layout management patterns.
