import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],


  base: '/registroActividadFisica/',  // La carpeta donde se aloja tu repo en GitHub Pages

})

