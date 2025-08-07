import { Platform, StatusBar, View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import * as SecureStore from 'expo-secure-store'


export default function RootLayout() {
  // Get the publishable key
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing publishable Key. Please set EXPO");
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          paddingTop: Platform.OS === 'ios' ? 40: StatusBar.currentHeight ,
        }}>
        <StatusBar barStyle="light-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ClerkProvider>
  );
}
