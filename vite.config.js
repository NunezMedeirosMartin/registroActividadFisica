import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/registroActividadFisica/',  // nombre exacto de tu repo con barras / al inicio y final
})


