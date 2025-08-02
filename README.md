# 🌍 ClimateAI Frontend - Vercel Deployment

## Overview

This is the frontend application for ClimateAI, built with React, TypeScript, and Vite. This package is optimized for deployment on Vercel.

### ✨ Features

- **Modern React Application** - Built with React 18 and TypeScript
- **Responsive Design** - Mobile-first responsive interface using Tailwind CSS
- **Component Library** - shadcn/ui components for consistent design
- **State Management** - TanStack Query for server state management
- **Routing** - Wouter for lightweight client-side routing
- **AI Integration** - Climate recommendations via backend API

## 🚀 Quick Deployment to Vercel

### Method 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/climateai-frontend.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings (auto-detected)
   - Set environment variables (see below)
   - Deploy!

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend URL: https://your-backend.onrender.com
   ```

## ⚙️ Environment Configuration

### Required Environment Variables

Set these in your Vercel dashboard under Project Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Development Environment

For local development, create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000
```

## 🔧 Build Configuration

### Build Settings (Vercel Dashboard)

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Custom Build Configuration

The project includes a `vercel.json` configuration file that:
- Handles React Router routing
- Proxies API requests to backend
- Sets up proper redirects

## 📁 Project Structure

```
vercel-frontend/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.tsx      # Main navigation
│   │   ├── Footer.tsx      # Site footer
│   │   └── ...             # Feature components
│   ├── pages/              # Page components
│   │   ├── dashboard.tsx   # Main dashboard
│   │   ├── about.tsx       # About page
│   │   ├── contact.tsx     # Contact page
│   │   └── privacy.tsx     # Privacy policy
│   ├── lib/                # Utilities and services
│   │   ├── api.ts          # API interfaces
│   │   ├── queryClient.ts  # TanStack Query setup
│   │   └── utils.ts        # Helper functions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── vercel.json            # Vercel configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Theming

The application uses Tailwind CSS with a custom color scheme. Modify colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... other shades
  }
}
```

### Adding Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

### API Integration

The frontend communicates with the backend via the API client in `src/lib/queryClient.ts`. All API calls are automatically configured to use the `VITE_API_URL` environment variable.

## 🔌 API Endpoints

The frontend expects these backend endpoints:

- `GET /api/health` - Health check
- `GET /api/location` - IP-based location detection
- `GET /api/weather?lat=X&lon=Y` - Weather data
- `GET /api/forecast?lat=X&lon=Y&period=daily` - Weather forecast
- `GET /api/search/cities/:query` - City search
- `POST /api/ai/suggestions` - AI recommendations
- `POST /api/climate/insights` - Climate insights
- `POST /api/climate/simulator` - Climate simulation

## 🚨 Troubleshooting

### Common Issues

**1. Build Failures**
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

**2. API Connection Issues**
- Verify `VITE_API_URL` is set correctly
- Check backend URL is accessible
- Ensure CORS is configured on backend

**3. Environment Variables Not Working**
- Environment variables must start with `VITE_`
- Redeploy after adding new variables
- Check Vercel dashboard for correct values

**4. Routing Issues**
- Ensure `vercel.json` is properly configured
- Check React Router setup in `App.tsx`
- Verify all routes are defined

### Performance Optimization

**1. Bundle Size**
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

**2. Image Optimization**
- Use WebP format for images
- Implement lazy loading
- Optimize SVG icons

**3. Code Splitting**
```typescript
// Implement lazy loading for pages
const About = lazy(() => import('./pages/about'));
```

## 🔐 Security

### Content Security Policy

The application includes CSP headers via `vercel.json`. Modify as needed for additional integrations.

### Environment Variables

- Never commit `.env` files
- Use Vercel's secure environment variable storage
- Rotate API keys regularly

## 📈 Monitoring

### Analytics

To add analytics, configure in `vercel.json`:

```json
{
  "analytics": {
    "id": "your-analytics-id"
  }
}
```

### Error Tracking

Consider integrating error tracking services:
- Sentry
- LogRocket
- Bugsnag

## 🔄 Updates and Maintenance

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions carefully
npm install package@latest
```

### Vercel CLI Commands

```bash
# View deployments
vercel list

# View logs
vercel logs

# Remove project
vercel remove
```

## 📞 Support

For deployment issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Test locally with `npm run build && npm run preview`
4. Contact Vercel support for platform issues

---

**🌍 ClimateAI Frontend** - Modern React application for climate intelligence