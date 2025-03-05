import React from 'react'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4 shadow-lg">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Single File Games Collection</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          A showcase of AI-generated, self-contained games written in a single HTML file
        </p>
        
        {/* Repository links */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/montimage/buildwizai/tree/main/single-file-games"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
          >
            <i className="fab fa-github"></i> View on GitHub
          </a>
          <a
            href="https://github.com/montimage/buildwizai/tree/main/single-file-games#readme"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
          >
            <i className="fas fa-book"></i> Documentation
          </a>
          <a
            href="https://github.com/montimage/buildwizai/issues/new"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
          >
            <i className="fas fa-bug"></i> Report Issue
          </a>
        </div>
        
        {/* Social media sharing buttons */}
        <div className="mt-6">
          <p className="text-sm mb-2 opacity-80">Share this collection</p>
          <div className="flex justify-center gap-3">
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20collection%20of%20single-file%20HTML%20games!&url=https://github.com/montimage/buildwizai/tree/main/single-file-games"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-[#1DA1F2] hover:bg-[#0d8ad6] rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fab fa-twitter text-white"></i>
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://github.com/montimage/buildwizai/tree/main/single-file-games"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-[#1877F2] hover:bg-[#0d65d9] rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=https://github.com/montimage/buildwizai/tree/main/single-file-games&title=Single%20File%20HTML%20Games&summary=An%20awesome%20collection%20of%20games%20created%20with%20a%20single%20HTML%20file"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-[#0A66C2] hover:bg-[#0952a0] rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fab fa-linkedin-in text-white"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header