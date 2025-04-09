import { Slot, SplashScreen, Stack } from "expo-router";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { LogBox } from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useEffect } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

// this will ignore the warning about clerk
LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

// prevent auto hide of the splash screen
SplashScreen.preventAutoHideAsync();

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// this is what will be loaded, clearer view of components
const InitialLayout = () => {
  // load the fonts
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // this will hide the splash screen when the fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  });

  return <Slot />;
};

// do this so that down here we can have all the providers
export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey!}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <InitialLayout />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
