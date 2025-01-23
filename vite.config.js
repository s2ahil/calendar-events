import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables from .env files
dotenv.config()

// Validate required environment variables
const requiredEnvs = ['supabaseUrl', 'supbaseKey']
requiredEnvs.forEach(env => {
  if (!process.env[env]) {
    console.warn(`Warning: ${env} is not set in environment variables`)
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  // Environment variable definition with type safety
  define: {
    // Ensure environment variables are explicitly typed and stringified
    'import.meta.env.supabaseUrl': JSON.stringify(process.env.supabaseUrl),
    'import.meta.env.supbaseKey': JSON.stringify(process.env.supbaseKey),
  },
  plugins: [react()],
  
  // Optional: Additional Vite configurations
  resolve: {
    alias: {
      // Optional: Set up path aliases for easier imports
      '@': '/src',
    },
  },

  // Optional: Build optimizations
  build: {
    // Reduce bundle size
    sourcemap: process.env.NODE_ENV === 'development',
    minify: process.env.NODE_ENV === 'production',
  },
})