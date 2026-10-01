# oh-my-rn

<p align="center">
  <img src="assets/images/icon.png" alt="oh-my-rn mascot" width="180" />
</p>

**Stop wrestling with mobile app setup. Start solving your problem.**

Since vibe coding took off, thousands of web apps have been shipped overnight. But mobile apps? Not so much. There's a reason for that -- building a mobile app still has real barriers. Simulators, native toolchains, build configs, signing, platform quirks -- none of it is obvious, and none of it is your actual problem.

React Native is a mature, open-source cross-platform framework powering countless productivity and utility apps in production. This boilerplate gives you a clean, working starting point so you can skip the setup grind and go straight to building what matters.

Fork it. Run it. Ship your idea.

> **모바일 앱 세팅에 시간 낭비하지 마세요. 진짜 문제에 집중하세요.**
>
> 바이브 코딩이 시작된 이후, 수많은 웹 앱이 하룻밤 사이에 쏟아져 나왔습니다. 하지만 모바일 앱은 그렇지 않습니다. 이유가 있습니다 -- 모바일 앱을 만드는 데는 여전히 실질적인 장벽이 존재합니다. 시뮬레이터, 네이티브 툴체인, 빌드 설정, 코드 사이닝, 플랫폼별 이슈 -- 어느 것 하나 직관적이지 않고, 어느 것 하나 당신이 풀어야 할 진짜 문제가 아닙니다.
>
> React Native는 수많은 생산성 앱과 유틸리티 앱이 채택하고 있는 성숙한 크로스 플랫폼 오픈소스 프레임워크입니다. 이 보일러플레이트는 깔끔하게 작동하는 출발점을 제공해서, 세팅과의 씨름을 건너뛰고 중요한 것을 바로 만들 수 있게 해줍니다.
>
> 포크하고. 실행하고. 당신의 아이디어를 세상에 내보내세요.

---

## Testimonials

> "As someone with zero app development experience, I was intimidated by the idea of building a mobile app from scratch. oh-my-rn completely changed that. With just a few prompts, I went from nothing to a fully functional AI-powered iOS app in just 3 hours — no prior React Native knowledge required. The boilerplate is thoughtfully structured in a way that AI tools can immediately understand and build on top of. It genuinely felt like having a head start I didn't know I needed. Highly recommend it to anyone who wants to build fast without getting lost in setup."
>
> — **JY**

---

A production-ready React Native boilerplate powered by Expo SDK 57 -- clone, install, and run on both platforms in under a minute.

## Prerequisites

- **Node.js** 24+ LTS ([download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **iOS**: [Xcode](https://developer.apple.com/xcode/) with Command Line Tools and an iOS Simulator runtime installed (macOS only)
- **Android**: [Android Studio](https://developer.android.com/studio) with an emulator configured

### iOS Simulator Setup (macOS)

1. Install Xcode from the Mac App Store
2. Open Xcode > Settings > Platforms > install the iOS Simulator runtime
3. Open Xcode > Settings > Locations > set Command Line Tools to the Xcode version
4. Open Simulator from Xcode > Open Developer Tool > Simulator

### Android Emulator Setup

1. Install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio > More Actions > Virtual Device Manager
3. Create a device (e.g. Pixel 8) with a recent Android API level (API 34+)
4. Start the emulator from Virtual Device Manager
5. Verify with `adb devices` -- you should see your emulator listed

## Quick Start

1. **Fork** this repo -- click the "Fork" button at the top right of this page
2. **Clone** your fork and start building:

```bash
git clone https://github.com/YOUR_USERNAME/oh-my-rn.git
cd oh-my-rn
npm install
cp .env.example .env
npm start
```

3. Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go on a physical device.

## Running the App

There are two ways to run on simulators:

### Expo Go (recommended for development)

Uses the [Expo Go](https://expo.dev/go) app -- no native build required. Fast iteration.

```bash
npm start              # Start Metro, then press i or a
npm run ios            # Start and open iOS simulator directly
npm run android        # Start and open Android emulator directly
```

`npm start` intentionally uses Expo Go. The template also includes `expo-dev-client`; use `npm run start:dev-client` when you need a custom native development build.

### Native Build (when you need native modules)

Runs `expo prebuild` + Xcode/Gradle build. Required when using libraries with native code not supported by Expo Go.

```bash
npx expo run:ios       # Build and run on iOS simulator
npx expo run:android   # Build and run on Android emulator
```

> **Note:** Native builds require Xcode (iOS) or Android Studio (Android) with matching SDK versions installed.

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `expo start --go` | Start the Expo dev server for Expo Go |
| `npm run start:dev-client` | `expo start --dev-client` | Start for an installed development build |
| `npm run ios` | `expo start --go --ios` | Start and open on iOS simulator (Expo Go) |
| `npm run android` | `expo start --go --android` | Start and open on Android emulator (Expo Go) |
| `npm run web` | `expo start --web` | Start for web browser |
| `npm test` | `jest` | Run unit tests |
| `npm run lint` | `biome check .` | Lint all source files |
| `npm run lint:fix` | `biome check --write .` | Lint and auto-fix |
| `npm run format` | `biome format --write .` | Format all source files |
| `npm run typecheck` | `tsc --noEmit` | Run TypeScript type checking |
| `npm run update:preview` | `EXPO_NO_DOTENV=1 eas update --channel preview --environment preview` | Publish a preview OTA update |
| `npm run update:production` | `EXPO_NO_DOTENV=1 eas update --channel production --environment production` | Publish a production OTA update |

## Project Structure

```
oh-my-rn/
├── app/                          # Expo Router pages (file-based routing)
│   ├── _layout.tsx              # Root layout: providers, fonts, splash
│   ├── (tabs)/                  # Tab navigator group
│   │   ├── _layout.tsx          # Tab bar configuration
│   │   ├── index.tsx            # Home screen
│   │   └── settings.tsx         # Settings screen
│   └── +not-found.tsx           # 404 fallback screen
│
├── components/                   # Reusable UI components
│   ├── Button.tsx               # Themed button (primary/secondary/outline)
│   ├── Text.tsx                 # Themed typography component
│   ├── Card.tsx                 # Themed card container
│   ├── Screen.tsx               # Screen wrapper (safe area + scroll)
│   └── __tests__/               # Component tests
│
├── stores/                       # Zustand state stores
│   ├── settingsStore.ts         # Theme preference, app settings
│   ├── exampleStore.ts          # Demo CRUD store with persistence
│   └── __tests__/               # Store tests
│
├── providers/                    # React context providers
│   └── ThemeProvider.tsx         # Dark/light theme provider
│
├── lib/                          # Utilities and helpers
│   ├── theme.ts                 # Theme definitions (colors, spacing, typography)
│   ├── secureStorage.ts         # Typed wrapper for expo-secure-store
│   └── env.ts                   # Type-safe environment variable access
│
├── constants/                    # App-wide constants
│   └── index.ts                 # Layout constants, app metadata
│
├── assets/                       # Static assets (images, fonts)
├── __tests__/                    # Integration tests
│
├── app.json                      # Expo app configuration
├── app.config.ts                 # Dynamic Expo config (env vars)
├── eas.json                      # EAS Build profiles
├── tsconfig.json                 # TypeScript configuration
├── biome.json                    # Biome linter/formatter config
├── jest.config.cjs                # Jest test configuration
└── package.json                  # Dependencies and scripts
```

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | React Native | 0.86.x |
| Framework | Expo | SDK 57 |
| Language | TypeScript | ~6.0 (strict mode) |
| UI Framework | React | 19.x |
| Navigation | Expo Router | SDK 57 (file-based) |
| State Management | Zustand | v5 (with persist middleware) |
| Storage (general) | AsyncStorage | v2 |
| Storage (secure) | expo-secure-store | 57.x |
| Icons | lucide-react-native | latest |
| OTA updates | expo-updates + EAS Update | SDK 57 |
| Testing | Jest + @testing-library/react-native | latest |
| Linting/Formatting | Biome | latest |
| Git Hooks | Husky + lint-staged | latest |

## Architecture Decisions

- **Expo Managed Workflow** -- zero native toolchain setup; `npm start` just works
- **Expo Router** -- file-based routing with automatic deep linking
- **EAS Update** -- automatic OTA delivery for JavaScript and asset changes
- **Zustand** -- lightweight state management (~1KB) with persistence
- **StyleSheet.create** -- native styling, no CSS-in-JS overhead
- **Biome** -- 100x faster than ESLint+Prettier, unified linting and formatting
- **TypeScript strict mode** -- no `any` types, no `@ts-ignore`

## Customization Guide

### Adding a New Screen

1. Create a file in `app/` (e.g., `app/(tabs)/profile.tsx`)
2. Export a default component:
   ```tsx
   import { Screen } from '@/components/Screen';
   import { Text } from '@/components/Text';

   export default function ProfileScreen() {
     return (
       <Screen>
         <Text variant="h1">Profile</Text>
       </Screen>
     );
   }
   ```
3. Add a tab in `app/(tabs)/_layout.tsx` if it should appear in the tab bar

### Adding a New Store

1. Create a file in `stores/` (e.g., `stores/profileStore.ts`)
2. Follow the pattern in `stores/exampleStore.ts` for CRUD + persistence
3. Add tests in `stores/__tests__/`

### Adding a New Component

1. Create a file in `components/` (e.g., `components/Avatar.tsx`)
2. Use `useTheme()` for colors -- never hardcode color values
3. Use `StyleSheet.create()` for styles
4. Add tests in `components/__tests__/`

## Environment Variables

Copy the example env file:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `API_URL` | Backend API base URL | `http://localhost:3000` |
| `APP_ENV` | Environment (`development`, `staging`, `production`) | `development` |

Environment variables are loaded through `app.config.ts` and accessed via `lib/env.ts`. In non-development environments, `API_URL` must use HTTPS.

## Building for Production

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for native builds.

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Log in to your Expo account
eas login

# Development build (for simulators)
eas build --profile development:simulator --platform ios
eas build --profile development --platform android

# Preview build (internal distribution)
eas build --profile preview --platform all

# Production build (for app stores)
eas build --profile production --platform all

# Submit to app stores
eas submit --profile production --platform all
```

Build profiles are configured in [`eas.json`](eas.json):
- **development** -- development client, internal distribution
- **development:simulator** -- development client for iOS simulator
- **preview** -- internal distribution for testing
- **production** -- store distribution with auto-incrementing build numbers

## Over-the-Air Updates

This template includes [EAS Update](https://docs.expo.dev/eas-update/introduction/) through `expo-updates`. OTA updates can ship JavaScript and asset changes without a new app-store submission; native dependency or native configuration changes still require a new EAS build.

1. Create or link an EAS project. EAS writes the non-secret project ID to `extra.eas.projectId` in `app.json`:

   ```bash
   eas init
   ```

   The EAS build profiles fail configuration if this ID is still empty. The local `.env` file keeps development working after project linking.

2. Define `API_URL` and `APP_ENV` in every EAS environment used for builds and updates. The update scripts set `EXPO_NO_DOTENV=1`, so publishing always uses EAS environment variables and cannot accidentally read a developer's local `.env` file:

   ```bash
   eas env:set --name API_URL --value http://localhost:3000 --environment development --visibility plaintext
   eas env:set --name APP_ENV --value development --environment development --visibility plaintext
   eas env:set --name API_URL --value https://preview.example.com --environment preview --visibility plaintext
   eas env:set --name APP_ENV --value staging --environment preview --visibility plaintext
   eas env:set --name API_URL --value https://example.com --environment production --visibility plaintext
   eas env:set --name APP_ENV --value production --environment production --visibility plaintext
   ```

3. Verify that the final config contains a fingerprint runtime and an update URL:

   ```bash
   npx expo config --type public
   ```

4. Build a preview or production app. The build embeds the update runtime and receives updates from its configured channel.

   ```bash
   eas build --profile preview --platform all
   ```

5. Publish a JavaScript or asset update:

   ```bash
   npm run update:preview -- --message "Update home screen"
   ```

Release builds check EAS Update on launch and download compatible updates in the background. A downloaded update is applied on the next cold start, so a user may need to open the app twice to see a hotfix.

The `fingerprint` runtime policy prevents an update from being offered to a build whose native runtime changed. `fingerprint.config.js` excludes Expo’s `extra` section because those values are delivered with the update manifest; this keeps `API_URL` and `APP_ENV` differences from creating an incompatible runtime fingerprint.

For high-assurance production releases, add [update code signing](https://docs.expo.dev/eas-update/code-signing/) so devices reject unsigned manifests.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Made by

Built by [@jooddang](https://github.com/jooddang) at [sfvibe.fun](https://sfvibe.fun)

Questions or feedback? Reach out at **gm@sfvibe.fun**

## License

[MIT](LICENSE)
