# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Program overview

This repository contains a small mood tracking app built with **React Native**
and [Expo Router](https://expo.dev/router). It showcases a tab based
navigation structure with three screens:

- **Home** – a landing page with a simple "waving hand" animation.
- **Explore** – demonstrates reusable components such as collapsible sections
  and the `ParallaxScrollView` header.
- **Calendar** – the main feature where mood entries are displayed on a
  calendar. Selecting a marked day opens a modal to view or edit the entry.

Mood entries are persisted with
`@react-native-async-storage/async-storage`. Sample data is loaded on first
launch so the calendar is populated with entries. The entry modal uses
`react-native-reanimated` and `react-native-gesture-handler` for drag to dismiss
interactions.

All screens reside in the `app/` directory and are wired up automatically
through file based routing. Shared hooks live in `hooks/` and reusable UI
components can be found in `components/`.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Calendar screen and day detail modal

Navigate to the **Calendar** tab to view saved mood entries. Days containing an
entry are shown with a colored dot. Tap on a marked day to open a modal with the
details for that entry. Dismiss the modal by dragging it down or by pressing the
**Dismiss** button.

### Dependencies

These features use several libraries that are already listed in
`package.json`:

- `react-native-calendars` for the calendar UI
- `react-native-reanimated` and `react-native-gesture-handler` for modal
  animations and gestures
- `@react-native-async-storage/async-storage` to persist mood entries

Install them together with the rest of the dependencies and then start the app:

```bash
npm install
npx expo start
```

### Running tests

Unit tests cover the calendar screen, modal behaviour and storage utilities. Run
them with:

```bash
npm test
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
