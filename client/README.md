# Employee Management System

A professional React-based employee management system with comprehensive tracking and bonus calculation features.

## Features

- 📋 **Employee List Management** - View and search employee records with advanced filtering
- 👤 **Detailed Employee Profiles** - Complete employee information with photo support
- 🎁 **Automatic Bonus Calculation** - Track 6-year service milestone bonuses
- 📊 **Export Functionality** - Export data to PDF and Excel formats
- 🔍 **Advanced Search & Filters** - Filter by status, department, and search terms
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Export**: jsPDF + xlsx

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Setting Up JSON Server (Optional)

For persistent data storage, set up json-server:

```bash
# Install json-server globally
npm install -g json-server

# Run json-server (in a separate terminal)
json-server --watch public/db.json --port 3001
```

If json-server is not running, the app will use mock data automatically.

## Project Structure

```
src/
├── components/          # React components
│   ├── EmployeeList.tsx
│   ├── EmployeeDetail.tsx
│   └── EmployeeForm.tsx
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── lib/                # API and utilities
├── utils/              # Helper functions
└── hooks/              # Custom React hooks
```

## Features in Detail

### Employee Data Fields

- Basic Information: Name, NIK, Position, Status, Years of Service, Joining Year
- Personal Details: Date/Place of Birth, Religion, Gender, Department
- Contact Information: Address, Phone Number, Email
- Photo Upload: Employee face photo with preview

### Work Bonus System

The system automatically calculates work bonuses based on years of service:
- Eligibility triggers at 6 years of service
- Tracks bonus count (every 6 years)
- Shows next bonus milestone
- Provides detailed notes and status

### Export Options

- **PDF Export**: Clean, professional format with company branding
- **Excel Export**: Full data export with proper formatting

## API Endpoints

When using json-server:

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

## Customization

### Updating Mock Data

Edit `src/lib/mockData.ts` to modify the default employee records.

### Styling

The design system is defined in:
- `src/index.css` - CSS variables and base styles
- `tailwind.config.ts` - Tailwind configuration

## Deployment

```bash
npm run build
```

Built files will be in the `dist/` directory.

## License

MIT License
