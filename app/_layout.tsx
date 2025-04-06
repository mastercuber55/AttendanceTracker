import { AuthProvider } from "@/contexts/auth";
import { Stack } from "expo-router";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, useTheme } from "react-native-paper";

export default function RootLayout() {

  return (  
    <AuthProvider>
      <PaperProvider>
        <AppNavigator/>
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthProvider>
  );
}

function AppNavigator() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerStyle: { 
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () =>   {
            return <Image
              source={require("../assets/images/icon.png")}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
          },
          headerTitle: "Attendance Tracker",
          headerTintColor: theme.colors.onSurface,
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}