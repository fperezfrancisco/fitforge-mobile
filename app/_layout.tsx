import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? "light"] ?? Colors.light;
  //const { isAuthenticated } = useContext(AuthContext)!;

  return (
    <>
      <StatusBar hidden={true} />
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </>
  );
}
