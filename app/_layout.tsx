import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper'; 
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {

  return (
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
  );
}
