# Snyder LDC Frontend Application

## 📋 Overview

Professional React frontend application for **Snyder LDC (Local Distribution Company) Management System**. This application provides a comprehensive interface for managing LDC operations including charges, meter types, quantities, pooling points, storage, tariffs, and pricing products.

## ✨ Features

- **8 Complete CRUD Modules** - One for each backend controller
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Validation** - Form validation with instant feedback
- **Toast Notifications** - Success/error messages for all operations
- **Reusable Components** - Modular architecture with shared components
- **Industry-Standard Structure** - Organized by feature with separate HTML, CSS, JSX

## 🏗️ Project Structure

```
snyder-ldc-frontend/
├── index.html                 # Entry HTML file
├── package.json               # Dependencies
├── vite.config.js            # Vite configuration
├── src/
│   ├── main.jsx              # Application entry point
│   ├── App.jsx               # Main app component with routing
│   ├── components/           # Reusable components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   └── Modal.css
│   │   └── Table/
│   │       ├── Table.jsx
│   │       └── Table.css
│   ├── pages/                # Feature pages
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── LdcCharges/
│   │   │   ├── LdcCharges.jsx
│   │   │   └── LdcCharges.css
│   │   ├── MeterTypes/
│   │   ├── Quantities/
│   │   ├── PoolingPoints/
│   │   ├── StorageTypes/
│   │   ├── Tariffs/
│   │   ├── MonthlyTol/
│   │   └── PriceProducts/
│   ├── services/
│   │   └── apiService.js     # Axios API service
│   ├── utils/
│   │   └── dateUtils.js      # Date formatting utilities
│   └── styles/
│       └── global.css        # Global styles
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Spring Boot Backend** running on `http://localhost:8081`

### Installation

1. **Extract the project**
   ```bash
   cd snyder-ldc-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 UI Components

### Layout
- **Sidebar Navigation** - Collapsible sidebar with all modules
- **Header** - Toggle button and user info
- **Responsive** - Mobile-friendly design

### Reusable Components
- **Button** - Multiple variants (primary, secondary, danger, outline, ghost)
- **Table** - Data table with edit/delete actions
- **Modal** - Dialog for create/edit forms
- **Form** - Styled form inputs with validation

## 🔌 API Integration

The application connects to your Spring Boot backend at `http://localhost:8081/api/v1/ldc/`

### Endpoints Used:
- `/charges` - LDC Charges
- `/meter-types` - Meter Types
- `/quantities` - Quantities
- `/pooling-points` - Pooling Points
- `/storage-types` - Storage Types
- `/tariffs` - Tariffs
- `/monthly-tol` - Monthly TOL
- `/price-products` - Price Products

## 📱 Pages & Features

### 1. Dashboard
- Overview of all modules
- Quick navigation cards
- Clean, modern interface

### 2. LDC Charges
- Create/Edit/Delete charges
- Support for FIXED and VARIABLE types
- Effective date tracking
- Status management (ACTIVE/INACTIVE)

### 3. Meter Types
- Manage meter categories
- Pressure category classification
- Max capacity tracking
- Description support

### 4. Quantities
- Track gas volume measurements
- Support for ALLOCATED, DELIVERED, SCHEDULED
- Unit conversion (MCF, MMBTU)
- Meter association

### 5. Pooling Points
- Manage aggregation locations
- Capacity tracking
- Active contracts management
- Service area association

### 6. Storage Types
- Define storage categories
- Support for UNDERGROUND, LNG, LINE_PACK
- Injection/Withdrawal rates
- Total capacity management

### 7. Tariffs
- Configure pricing rules
- Slab-based pricing
- Meter type association
- Effective date management

### 8. Monthly TOL
- Transportation Overrun Limits
- Variance percentage calculation
- Penalty amount tracking
- Monthly tracking

### 9. Price Products
- Gas pricing contracts
- FIXED and FLOATING types
- Pooling point association
- Formula reference support

## 🎨 Design System

### Colors
```css
Primary: #2563eb (Blue)
Secondary: #10b981 (Green)
Danger: #ef4444 (Red)
Warning: #f59e0b (Orange)
Background: #f8fafc
Surface: #ffffff
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 600-700 weight
- **Body**: 400-500 weight

## 🔧 Configuration

### Backend URL
Update in `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8081', // Change this
      changeOrigin: true
    }
  }
}
```

## 📝 Code Quality

- **ES6+ JavaScript** - Modern syntax
- **React Hooks** - Functional components
- **Clean Code** - Well-organized and commented
- **Consistent Naming** - Follows React conventions
- **No Errors** - Production-ready code

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

### Deploy Options
- **Netlify** - Drag and drop `dist/` folder
- **Vercel** - Import from GitHub
- **AWS S3** - Upload `dist/` to S3 bucket
- **Traditional Hosting** - Upload `dist/` contents

## 🐛 Troubleshooting

### Backend Connection Error
- Ensure Spring Boot backend is running on port 8081
- Check CORS configuration in Spring Boot
- Verify API endpoints match

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in vite.config.js
server: {
  port: 3001  // Use different port
}
```

## 📚 Technologies Used

- **React 18.2** - UI library
- **React Router 6** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **date-fns** - Date formatting
- **Vite** - Build tool

## 👨‍💻 Development

### Adding a New Page

1. Create folder in `src/pages/NewModule/`
2. Create `NewModule.jsx` and `NewModule.css`
3. Add route in `App.jsx`
4. Add navigation link in `Layout.jsx`
5. Create API service calls

### Customizing Styles

- Global styles: `src/styles/global.css`
- Component styles: Individual `.css` files
- Theme variables: CSS custom properties in `global.css`

## 📄 License

This project is part of the Snyder LDC Management System.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review console errors
3. Verify backend connectivity
4. Check browser console for errors

---

**Built with ❤️ for Snyder LDC**
