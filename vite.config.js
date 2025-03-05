import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get the repository name from package.json or environment variable
const getBase = () => {
  if (process.env.GITHUB_REPOSITORY) {
    // In GitHub Actions, use the repository name as the base
    const [, repo] = process.env.GITHUB_REPOSITORY.split('/')
    return `/${repo}/`
  }
  // In development, use the root
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBase(),
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})
