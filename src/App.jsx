import { useEffect } from 'react'
import { useApp } from './context/AppContext'
import Header from './components/Header'
import GamesList from './components/GamesList'
import GitHubStats from './components/GitHubStats'
import ContributeSection from './components/ContributeSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  const { actions } = useApp()

  useEffect(() => {
    actions.fetchGithubStats()
  }, [actions])

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-8 retro-text text-center">AVAILABLE GAMES</h2>
        <GamesList />
        <ContributeSection />
        <GitHubStats />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
