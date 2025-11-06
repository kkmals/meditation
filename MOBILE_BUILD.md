# 📱 Mobile App Build Guide - iOS, Android & Apple Watch

Complete guide to building **Coral Reef Sanctuary** for mobile platforms.

## 🎯 Overview

Your React PWA is now configured to build as native apps for:
- ✅ **iOS** (iPhone & iPad) - App Store
- ✅ **Android** (Phones & Tablets) - Google Play Store
- ✅ **Apple Watch** - Companion app (separate guide below)

---

## 📋 Prerequisites

### For iOS Development:
- **macOS** (required for iOS builds)
- **Xcode 15+** - Download from Mac App Store
- **CocoaPods** - Install: `sudo gem install cocoapods`
- **Apple Developer Account** - $99/year for App Store distribution

### For Android Development:
- **Android Studio** - Download from https://developer.android.com/studio
- **Java JDK 17+** - Included with Android Studio
- **Works on Mac, Windows, or Linux**
- **Google Play Developer Account** - $25 one-time fee

---

## 🚀 Quick Start

### 1. Initial Setup (One Time)

```bash
# Install dependencies
npm install

# Build the web app
npm run build

# Add iOS platform (Mac only)
npx cap add ios

# Add Android platform
npx cap add android
```

### 2. Daily Development Workflow

```bash
# After making changes to your React app:

# For iOS:
npm run mobile:ios

# For Android:
npm run mobile:android

# Or just sync without opening:
npm run mobile:sync
```

---

## 📱 iOS App Build Guide

### Step 1: Add iOS Platform

```bash
# First time only
npx cap add ios
```

This creates an `ios/` folder with your Xcode project.

### Step 2: Open in Xcode

```bash
npm run mobile:ios
```

Or manually:
```bash
npx cap open ios
```

### Step 3: Configure in Xcode

1. **Select your project** in the left sidebar
2. **General Tab:**
   - Display Name: `Coral Reef Sanctuary`
   - Bundle Identifier: `com.coralreef.meditation`
   - Version: `1.0.0`
   - Minimum Deployments: iOS 13.0+

3. **Signing & Capabilities:**
   - Team: Select your Apple Developer account
   - Automatically manage signing: ✅ Checked
   - Add Capabilities if needed:
     - Push Notifications (for focus reminders)
     - Background Modes → Background fetch

4. **App Icons:**
   - Click App Icon → Select your icon set
   - Use a 1024x1024px coral reef icon

### Step 4: Build for Simulator (Testing)

1. Select a simulator device (e.g., iPhone 15)
2. Click the Play button (▶️) or press `Cmd+R`
3. App will launch in iOS Simulator

### Step 5: Build for Physical Device

1. Connect your iPhone via USB
2. Select your device from the device list
3. Click Play button
4. Xcode will install the app on your device

### Step 6: App Store Submission

1. **Archive the app:**
   - Product → Archive
   - Wait for build to complete

2. **Upload to App Store Connect:**
   - Window → Organizer
   - Select your archive
   - Click "Distribute App"
   - Choose "App Store Connect"
   - Follow the wizard

3. **App Store Connect Setup:**
   - Go to https://appstoreconnect.apple.com
   - Create new app
   - Fill in metadata:
     - App Name: Coral Reef Sanctuary
     - Subtitle: Focus timer that grows coral reefs
     - Description: (see below)
     - Keywords: focus, productivity, timer, pomodoro, meditation
     - Screenshots: Take from iPhone simulator
     - Privacy Policy URL: Required

4. **Submit for Review:**
   - Add build
   - Fill all required info
   - Submit for review
   - Review takes 1-3 days

---

## 🤖 Android App Build Guide

### Step 1: Add Android Platform

```bash
# First time only
npx cap add android
```

This creates an `android/` folder with your Android Studio project.

### Step 2: Open in Android Studio

```bash
npm run mobile:android
```

Or manually:
```bash
npx cap open android
```

### Step 3: Configure in Android Studio

1. **Wait for Gradle sync** to complete (first time takes a while)

2. **Update app configuration:**
   - Open `android/app/build.gradle`
   - Set:
     ```gradle
     defaultConfig {
         applicationId "com.coralreef.meditation"
         minSdkVersion 22
         targetSdkVersion 34
         versionCode 1
         versionName "1.0.0"
     }
     ```

3. **Update app name:**
   - Open `android/app/src/main/res/values/strings.xml`
   - Set: `<string name="app_name">Coral Reef Sanctuary</string>`

4. **Add app icon:**
   - Right-click `res` → New → Image Asset
   - Upload your coral reef icon
   - Generate icons for all sizes

### Step 4: Build for Emulator (Testing)

1. Create an AVD (Android Virtual Device):
   - Tools → Device Manager → Create Device
   - Choose Pixel 7
   - System Image: Android 14 (API 34)

2. Run the app:
   - Click Run button (▶️) or `Shift+F10`
   - Select your emulator
   - App will launch

### Step 5: Build for Physical Device

1. **Enable Developer Mode on your Android phone:**
   - Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back → Developer Options
   - Enable "USB Debugging"

2. **Connect phone via USB**
3. **Select your device** from device list
4. **Click Run button**

### Step 6: Build APK for Testing

```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

Share this APK with testers!

### Step 7: Build AAB for Play Store

```bash
cd android
./gradlew bundleRelease
```

You'll need to sign it first. Follow Google's signing guide.

### Step 8: Google Play Store Submission

1. **Create Play Console account:**
   - Go to https://play.google.com/console
   - Pay $25 one-time fee

2. **Create new app:**
   - Click "Create app"
   - Fill in details:
     - App name: Coral Reef Sanctuary
     - Language: English
     - Type: App
     - Free or Paid: Free

3. **Complete Store Listing:**
   - Short description: Focus timer that grows beautiful coral reefs
   - Full description: (see below)
   - App icon: 512x512px
   - Feature graphic: 1024x500px
   - Screenshots: At least 2 per device type
   - Privacy Policy URL: Required

4. **Upload AAB:**
   - Production → Create new release
   - Upload your signed AAB
   - Fill release notes
   - Submit for review

---

## ⌚ Apple Watch Companion App

The Apple Watch app shows:
- **Active timer** with circular progress
- **Today's stats** (focus time, corals grown)
- **Quick start** buttons (15m, 25m, 30m)
- **Haptic feedback** when timer completes

### Building the Watch App:

1. **Open your iOS project in Xcode**

2. **Add Watch Target:**
   - File → New → Target
   - watchOS → App
   - Product Name: `Coral Reef Watch`
   - Check "Include Notification Scene"

3. **Design Watch Interface:**
   - Use SwiftUI
   - Create circular timer view matching your app style
   - Add complications for watch face

4. **Sync with iPhone app:**
   - Use WatchConnectivity framework
   - Share session data between devices

5. **Test on Watch Simulator:**
   - Select Watch target
   - Run on paired simulator

### Watch App Code Structure:

```
ios/App/Watch/
├── ContentView.swift       # Main timer interface
├── StatsView.swift        # Today's stats
├── TimerView.swift        # Active timer display
└── Complications/         # Watch face widgets
```

**Note:** Watch app requires additional Swift development. Consider hiring an iOS developer or using a template if not familiar with SwiftUI.

---

## 🔧 Troubleshooting

### iOS Issues:

**"No signing certificate found":**
- Go to Xcode → Preferences → Accounts
- Sign in with your Apple ID
- Select your team in project settings

**"Could not launch app":**
- Clean build folder: Product → Clean Build Folder
- Delete app from device/simulator
- Rebuild and run

**"CocoaPods not installed":**
```bash
sudo gem install cocoapods
cd ios/App
pod install
```

### Android Issues:

**"SDK not found":**
- Open Android Studio → Preferences → Android SDK
- Install required SDK versions (API 22-34)

**"Gradle sync failed":**
- File → Invalidate Caches → Restart
- Update Gradle: Tools → AGP Upgrade Assistant

**"App crashes on launch":**
- Check Logcat for errors
- Verify all Capacitor plugins are installed
- Clear app data and reinstall

---

## 📝 App Store Descriptions

### Short Description (80 chars):
Focus timer that transforms your productivity into a thriving coral reef

### Full Description:

**Coral Reef Sanctuary** is a gamified focus and productivity app that helps you build better habits by growing a vibrant virtual coral reef.

**HOW IT WORKS:**
🪸 Start a focus session (15-60 minutes)
🌊 Watch your coral polyp grow in real-time
✨ Complete the session to add healthy coral to your reef
💎 Earn pearls to unlock new coral types and marine life

**FEATURES:**
• Pomodoro-style timer with customizable durations
• Beautiful ocean-themed interface with soothing animations
• 9 coral types from common to legendary rarity
• 9 marine creatures to discover and collect
• Daily streak tracking with bonus rewards
• Progress visualization through your growing reef
• Motivational messages throughout your focus journey
• Consequence system: corals bleach if you abandon early
• Local data storage - no account required
• Works offline

**PERFECT FOR:**
• Students studying for exams
• Remote workers staying focused
• Anyone building better focus habits
• Meditation and mindfulness practice
• Breaking phone addiction

**WHY CORAL REEFS?**
Like real coral reefs that grow polyp by polyp, your focus builds session by session. Watch your dedication transform into something beautiful!

Transform your screen time into reef time. Download now and start growing your sanctuary! 🪸⏱️

---

## 🎨 Required Assets

### App Icons:
- **iOS:** 1024x1024px (App Store), various sizes generated by Xcode
- **Android:** 512x512px (Play Store), various sizes generated

### Screenshots:
- **iOS:**
  - 6.7" (iPhone 15 Pro Max): 1290 x 2796px
  - 5.5" (iPhone 8 Plus): 1242 x 2208px
  - iPad Pro: 2048 x 2732px

- **Android:**
  - Phone: 1080 x 1920px minimum
  - Tablet: 1200 x 1920px (optional)

### Feature Graphics:
- **Android:** 1024 x 500px banner for Play Store

### Design Tips:
- Use ocean colors (blues, teals)
- Show the coral reef prominently
- Display the timer interface
- Highlight the reward system
- Keep it calming and inviting

---

## 🚢 Release Checklist

Before submitting to stores:

- [ ] Test on physical devices (iOS and Android)
- [ ] Verify all features work offline
- [ ] Test timer accuracy and persistence
- [ ] Check notifications work properly
- [ ] Ensure data persistence across app restarts
- [ ] Test on different screen sizes
- [ ] Verify app icons display correctly
- [ ] Take all required screenshots
- [ ] Write Privacy Policy (required by both stores)
- [ ] Prepare marketing materials
- [ ] Set up app analytics (optional)
- [ ] Create app support page/email
- [ ] Test in-app purchases if added later
- [ ] Run final build with production settings
- [ ] Update version numbers
- [ ] Create release notes

---

## 📊 Post-Launch

### Monitor:
- App Store/Play Console reviews
- Crash reports and analytics
- User feedback and ratings
- Download numbers

### Update Strategy:
- Fix critical bugs within 24-48 hours
- Regular updates every 2-4 weeks
- New coral types and features monthly
- Respond to user reviews

### Marketing:
- Share on social media
- Create demo video
- Reach out to productivity bloggers
- Post on Product Hunt
- Submit to app review sites

---

## 🆘 Getting Help

**Official Documentation:**
- Capacitor: https://capacitorjs.com/docs
- iOS: https://developer.apple.com/documentation/
- Android: https://developer.android.com/docs

**Community:**
- Capacitor Discord: https://discord.gg/capacitor
- Stack Overflow: Tag with `capacitor`, `ios`, `android`

**Need a Developer?**
- **iOS/Watch:** Hire Swift developer for watch app
- **Android:** Most work is already done!
- **Both:** Budget $2000-5000 for professional polish

---

## 🎉 You're Ready!

Your Coral Reef Sanctuary app is configured for mobile deployment. Follow the platform-specific guides above to build and submit your apps.

**Remember:** First submission takes the longest (setup, learning). Future updates are much faster!

Good luck with your app launch! 🚀🪸
