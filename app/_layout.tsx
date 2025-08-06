import { SafeAreaView, Platform, StatusBar, View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '@/constants/theme';

export default function RootLayout() {
  return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          paddingTop: Platform.OS === 'ios' ? 40: StatusBar.currentHeight ,
        }}
      >
        <StatusBar barStyle="light-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
  );
}
