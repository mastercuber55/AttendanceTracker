import { Stack } from "expo-router";
import { PaperProvider, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";

export default function RootLayout() {

  return (  
    <PaperProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

function AppNavigator() {
  const theme = useTheme();

  // NavigationBar.setBackgroundColorAsync(theme.colors.surface);

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
      <Stack.Screen name="signUp" options={{ headerShown: false }}/>
      <Stack.Screen name="logIn" options={{ headerShown: false }}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
