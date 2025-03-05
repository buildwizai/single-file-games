# Contributing to Single File Games Collection

Thank you for your interest in contributing to the Single File Games Collection! This document provides guidelines and instructions for contributing to the project.

## How to Contribute

There are several ways you can contribute to this project:

1. Adding new games
2. Implementing existing games with different AI models
3. Improving the UI/UX of the game collection
4. Fixing bugs and issues
5. Improving documentation

## Adding a New Game

1. **Create a New Game Directory**
   - Create a new directory under `games/` with a descriptive name
   - Use kebab-case for directory names (e.g., `space-shooter`, `puzzle-game`)

2. **Create the Game Files**
   - Create a single HTML file for each AI model implementation
   - Name format: `<model-name>.html` (e.g., `grok3.html`, `chatgpt.html`)
   - Ensure your game is completely self-contained in a single file

3. **Add the Prompt**
   - Create a `prompt.md` file in your game directory
   - Include the original prompt used to generate the game
   - Document any modifications or additional context provided

4. **Test Your Game**
   - Ensure the game works in different browsers
   - Test on both desktop and mobile devices
   - Verify that all assets are properly embedded

## Code Standards

### HTML Games
- All game code must be in a single HTML file
- Use embedded CSS and JavaScript
- Minimize external dependencies
- Include clear comments explaining the game mechanics
- Ensure responsive design when possible

### React Application
- Follow the existing component structure
- Use functional components with hooks
- Maintain consistent code formatting
- Write clear, descriptive commit messages

## Pull Request Process

1. **Fork the Repository**
   - Create a fork of the repository
   - Clone your fork locally

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the code standards
   - Keep commits atomic and well-described
   - Test your changes thoroughly

4. **Submit Your PR**
   - Push your changes to your fork
   - Create a Pull Request to our main branch
   - Fill out the PR template completely
   - Wait for review and address any feedback

## Development Setup

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm (v6 or higher)

2. **Installation**
   ```bash
   git clone https://github.com/buildwizai/single-file-games.git
   cd single-file-games
   npm install
   npm run dev
   ```

## Best Practices

### Game Development
- Keep file sizes reasonable (< 1MB if possible)
- Use efficient algorithms and data structures
- Include clear instructions for players
- Implement proper game state management
- Handle errors gracefully

### UI Components
- Follow existing design patterns
- Use Tailwind CSS for styling
- Ensure accessibility (WCAG guidelines)
- Maintain responsive design

## Need Help?

- Check existing [issues](https://github.com/buildwizai/single-file-games/issues)
- Join discussions in the repository
- Ask questions in pull requests
- Reach out through GitHub Issues

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

Thank you for contributing to the Single File Games Collection! 🎮