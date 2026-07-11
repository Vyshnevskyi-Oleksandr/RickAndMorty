## How to run it

This project uses native modules (specifically `react-native-mmkv` for high-performance storage), which means it requires a custom Development Build rather than the standard Expo Go app.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development build on an Android emulator or plugged-in device:
   ```bash
   npx expo run:android
   ```
   *(For iOS, run `npx expo run:ios` on a Mac with Xcode installed).*

3. To run tests:
   ```bash
   npm test
   ```

## Expo vs CLI

I chose **Expo (with Continuous Native Generation / Prebuild)** over the bare React Native CLI. 

As of 2026, Expo has become the de facto standard for most new projects (officially recommended by the React Native team). By leveraging Expo Development Builds, I get the best of both worlds: the effortless developer experience and routing of Expo (via `expo-router`), while still having full access to any native library (like `react-native-mmkv` or `reanimated`). The `ios` and `android` folders are treated as build artifacts, meaning upgrades and maintenance are vastly simplified.

## What I'd do next with a few more hours

1. I would add a "favorites" tab to display the heroes that have already been added to favorites.
2. I would add seamless shared element transitions using Reanimated when navigating from the character list to the detail screen for a more premium feel.
3. It would be possible to make the app usable offline.
4. I would set up Maestro or Detox to cover the critical user flows (searching, paginating, and favoriting characters).

## Taking this to Production

To release this app to the App Store and Google Play, I would rely heavily on **EAS (Expo Application Services)**:

1. Configure the app identifier, versioning, and icons in `app.json`.
2. Run `eas build --profile production --platform all` to generate the `.aab` (Android) and `.ipa` (iOS) binaries in the cloud. This securely handles all keystore and provisioning profile management.
3. Use `eas submit` to push the binaries directly to Google Play Console and Apple App Store Connect / TestFlight.
4. I would integrate these EAS commands into a GitHub Actions workflow to automatically build and submit releases when code is merged into the `main` branch.

## Handling Platform-Specific / Native Capabilities

When I need native capabilities (like deep linking, biometrics, or camera access), my default approach is to use Expo's robust ecosystem of modules (e.g., `expo-local-authentication`). Unlike the CLI, Expo provides a convenient way to work with native capabilities.

However, if I need a highly specific native capability that isn't covered by existing packages, I would do the following:
- **For native configuration (permissions, manifest changes):** I never manually edit the `ios` or `android` folders. Instead, I write a **Config Plugin** in `app.json` to hook into the prebuild process and automatically inject the necessary changes into `AndroidManifest.xml` or `Info.plist`.
- **For custom native code:** I would create a local **Expo Module**. Expo Modules use a modern Swift/Kotlin API that is incredibly easy to bridge into TypeScript. This allows me to write custom native logic without "ejecting" and without breaking the Continuous Native Generation workflow.
