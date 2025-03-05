# Single File Games Collection 🎮

A showcase of AI-generated, self-contained games written in a single HTML file. This project demonstrates the capabilities of various AI models in generating complete, playable games using different approaches and techniques.


## 🎯 Project Structure

```
single-file-games/
├── src/                    # Source files
│   ├── components/         # React components
│   ├── redux/             # Redux state management
│   │   ├── sagas/         # Redux-Saga middleware
│   │   └── slices/        # Redux Toolkit slices
│   └── assets/            # Static assets
├── games/                  # Game implementations
│   └── sky-fight/         # Sky Fight game variants
│       ├── grok3.html     # GROK implementation
│       ├── chatgpt.html   # ChatGPT implementation
│       ├── gemini2.0.html # Gemini implementation
│       └── prompt.md      # Original game prompt
└── public/                # Public assets
```

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Redux-Saga](https://redux-saga.js.org/) - Side effect management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons

## 🎮 Games

### Sky Fight
A 3D aerial combat game where you control a fighter plane and battle enemies. Available in multiple implementations:
- GROK 3
- ChatGPT
- Gemini 2.0

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a new game or improve existing ones
3. Submit a pull request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Adding a New Game

1. Create a new directory under `games/` with your game name
2. Add your game implementations (one file per AI model)
3. Include a `prompt.md` file with the original prompt
4. Update the game listing in the application

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Star Us!

If you find this project interesting, please consider giving it a star on GitHub! It helps us reach more developers and grow our community.

## 📧 Contact

For questions, suggestions, or issues, please use our [GitHub Issues](https://github.com/buildwizai/single-file-games/issues) page.

## 🙏 Acknowledgments

- Thanks to all AI models that helped generate these games
- Special thanks to our contributors and the open-source community
- Built with ❤️ for the coding community
