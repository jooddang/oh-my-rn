# Contributing to oh-my-rn

Thank you for your interest in contributing to oh-my-rn! This guide will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/oh-my-rn.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/my-feature`

## Development

```bash
npm start          # Start Expo dev server
npm run ios        # Open on iOS simulator
npm run android    # Open on Android emulator
npm test           # Run tests
npm run lint       # Check for lint errors
npm run typecheck  # TypeScript type checking
```

## Code Style

- **TypeScript strict mode** -- no `any` types, no `@ts-ignore`
- **Biome** for linting and formatting (runs automatically on pre-commit via Husky)
- **StyleSheet.create** for all styles -- no inline style objects
- Use `useTheme()` for colors -- never hardcode color values

## Submitting Changes

1. Ensure all checks pass: `npm test && npm run lint && npm run typecheck`
2. Write clear, descriptive commit messages
3. Push your branch and open a Pull Request
4. Describe what changed and why in the PR description

## Reporting Issues

- Use GitHub Issues to report bugs or suggest features
- Include steps to reproduce for bugs
- Include your environment (OS, Node version, Expo SDK version)

## Project Maintainers

- **jooddang** -- creator and lead maintainer

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
