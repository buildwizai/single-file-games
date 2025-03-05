import { useEffect } from 'react'
import { useApp } from './context/AppContext'
import Header from './components/Header'
import GamesList from './components/GamesList'
import GitHubStats from './components/GitHubStats'
import ContributeSection from './components/ContributeSection'
import PromptModal from './components/PromptModal'
import Footer from './components/Footer'
import './App.css'

function App() {
  const { actions } = useApp()

  useEffect(() => {
    actions.fetchGithubStats()
  }, [actions])

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto max-w-6xl px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Games</h2>
        <GamesList />
        <ContributeSection />
        <GitHubStats />
      </main>
      
      <Footer />
      <PromptModal />
    </div>
  )
}

export default App
