import Header from './components/Header'
import GamesList from './components/GamesList'
import ContributeSection from './components/ContributeSection'
// Removed GitHubStats import
import Footer from './components/Footer'
import './App.css'
import ShareButtons from './components/ShareButtons'

function App() {
  const shareUrl = window.location.href;
  const shareTitle = "BuildWiz AI - Single File Games";
  const githubRepoUrl = "https://github.com/buildwizai/single-file-games"; // Change to your repo URL

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        {/* Moved share button above the page title and game list */}
        <ShareButtons url={shareUrl} title={shareTitle} />
        <GamesList />
        <ContributeSection />
        {/* Removed GitHubStats; added GitHub repo link */}
        <div className="text-center mt-8">
          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline text-lg"
          >
            View our GitHub Repository
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
