import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( )],
  define: {
    // Garante que a variável de ambiente VITE_OPENWEATHER_API_KEY seja injetada no bundle
    'import.meta.env.VITE_OPENWEATHER_API_KEY': JSON.stringify(process.env.VITE_OPENWEATHER_API_KEY),
  },
})
